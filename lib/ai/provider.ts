import { z } from 'zod';
import type { TutorMessage, ErrorType } from '@/types';

export const TutorResponseSchema = z.object({
  message: z.string(),
  intent: z.enum(['hint', 'question', 'explanation', 'encouragement']),
  diagnosedError: z.enum([
    'islem_hatasi',
    'kavram_eksigi',
    'dikkat_hatasi',
    'soru_okuma',
    'strateji_hatasi',
    'on_kosul_eksikligi',
  ]).optional(),
  masterySignal: z.number().min(0).max(1),
  nextAction: z.enum(['ask_question', 'give_hint', 'summarize']),
});

export type TutorResponsePayload = z.infer<typeof TutorResponseSchema>;

export interface TutorRequestContext {
  studentName?: string;
  grade?: number;
  skillTitle: string;
  skillMastery: number;
  currentQuestionText?: string;
  history: { role: 'user' | 'assistant'; content: string }[];
  userPrompt: string;
  quickAction?: 'hint' | 'simplify' | 'example' | 'why';
}

/**
 * Deterministic fallback Socratic responses tailored to 8th grade math & Kareköklü İfadeler
 */
export function getDeterministicFallback(context: TutorRequestContext): TutorResponsePayload {
  const promptLower = context.userPrompt.toLowerCase().trim();
  const { quickAction, skillTitle } = context;

  if (quickAction === 'hint') {
    return {
      message: 'İpucu: 48 sayısını çarpanlarına ayırırken, içindeki en büyük "tam kare" sayıyı düşün. 48 = 16 × 3 olduğuna dikkat et.',
      intent: 'hint',
      diagnosedError: 'kavram_eksigi',
      masterySignal: 0.55,
      nextAction: 'ask_question',
    };
  }

  if (quickAction === 'simplify') {
    return {
      message: 'Şöyle basitleştirelim: Bir sayıyı kök dışına çıkarmak, onun içindeki "kare" olan kısmı dışarı tek olarak atmaktır. Örneğin √4 = 2 gibi. 48\'in içinde hangi tam kare sayı saklı?',
      intent: 'explanation',
      masterySignal: 0.5,
      nextAction: 'ask_question',
    };
  }

  if (quickAction === 'example') {
    return {
      message: 'Benzer bir örnek yapalım: √18 sayısını düşünelim. 18 = 9 × 2\'dir. 9 tam kare olduğu için dışarı 3 olarak çıkar ve 3√2 olur. Şimdi bu mantığı √48 için uygularsan ne elde edersin?',
      intent: 'explanation',
      masterySignal: 0.6,
      nextAction: 'ask_question',
    };
  }

  if (quickAction === 'why') {
    return {
      message: 'Neden böyle yapıyoruz? Çünkü √(a × b) = √a × √b özelliğini kullanıyoruz. 48 = 16 × 3 olduğu için √(16 × 3) = √16 × √3 = 4√3 olur. Böylece kök içindeki sayı en sade haline gelir.',
      intent: 'explanation',
      masterySignal: 0.65,
      nextAction: 'summarize',
    };
  }

  // Conversation step matching (ordered from final step to initial step):
  if (promptLower.includes('4√3') || promptLower.includes('4 kok 3') || promptLower.includes('4kök3')) {
    return {
      message: 'Mükemmel akıl yürüttün! √48 = 4√3. a = 4, b = 3 olduğundan toplamları da 4 + 3 = 7 olur. Şimdi bu kuralı pekiştirmek için sıradaki soruya geçelim mi?',
      intent: 'encouragement',
      masterySignal: 0.92,
      nextAction: 'summarize',
    };
  }

  if (promptLower === '4' || promptLower.startsWith('4 ') || promptLower.endsWith(' 4')) {
    return {
      message: 'Tebrikler, tam olarak 4! O halde √16 yerine 4 yazdığımızda, ifadenin en sade a√b biçimi ne olur?',
      intent: 'question',
      masterySignal: 0.85,
      nextAction: 'ask_question',
    };
  }

  if (promptLower.includes('√16') || promptLower.includes('kok 16') || promptLower.includes('kök 16')) {
    return {
      message: 'Aynen öyle: √16 × √3. Peki √16 tam kare olduğuna göre dışarı kaç olarak çıkar?',
      intent: 'question',
      masterySignal: 0.74,
      nextAction: 'ask_question',
    };
  }

  if (promptLower.includes('16') && promptLower.includes('3')) {
    return {
      message: 'Harika bir başlangıç! 48 = 16 × 3. Şimdi √(16 × 3) ifadesini kök kurallarına göre ayrı ayrı nasıl yazabiliriz?',
      intent: 'question',
      masterySignal: 0.68,
      nextAction: 'ask_question',
    };
  }

  if (promptLower.includes('24') || promptLower.includes('6') || promptLower.includes('bilmiyorum')) {
    return {
      message: 'Adım adım gidelim, hiç sorun değil. 48\'i çarpanlarına ayıralım. 48; 16 ile hangi sayının çarpımıdır?',
      intent: 'question',
      diagnosedError: 'kavram_eksigi',
      masterySignal: 0.45,
      nextAction: 'ask_question',
    };
  }

  // Default Socratic prompt response
  return {
    message: `${skillTitle} konusunda mantığı kuruyoruz. Bu adımda hangi matematiksel özelliği kullanmamız gerektiğini düşünüyorsun?`,
    intent: 'question',
    masterySignal: 0.5,
    nextAction: 'ask_question',
  };
}

/**
 * Server-side AI generator calling Gemini API when key is available,
 * with seamless graceful fallback.
 */
export async function generateTutorResponse(context: TutorRequestContext): Promise<TutorResponsePayload> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    // Graceful fallback mode
    return getDeterministicFallback(context);
  }

  try {
    const systemPrompt = `Sen Mentora platformunun 8. sınıf LGS Matematik Sokratesçi (Socratic) Yapay Zekâ Eğitmenisin.
Öğrenci: ${context.studentName || 'Efe'}, Hedef: LGS 450+, Konu: ${context.skillTitle}, Konu Ustalığı: %${context.skillMastery}.

ÖNEMLİ PEDAGOJİK KURALLAR:
1. Asla cevabı doğrudan verme! Öğrenciye formülü ya da nihai sonucu tek seferde söyleme.
2. Öğrencinin kavram yanılgısını ya da işlem hatasını teşhis et.
3. Her seferinde SADECE BİR tane yönlendirici, odaklı soru sor veya kısa bir ipucu ver.
4. Türk MEB 8. sınıf müfredatı diline ve LGS soru mantığına sadık kal.
5. Samimi, sakin, destekleyici ol; asla çocuksu ya da küçümseyici konuşma.
6. Yanıtını kesinlikle aşağıdaki JSON şemasına uygun tek bir JSON objesi olarak üret:
{
  "message": "Öğrenciye gidecek Türkçe mesaj",
  "intent": "hint" | "question" | "explanation" | "encouragement",
  "diagnosedError": "islem_hatasi" | "kavram_eksigi" | "dikkat_hatasi" | "soru_okuma" | "strateji_hatasi" | "on_kosul_eksikligi" (isteğe bağlı),
  "masterySignal": 0.0 ile 1.0 arasında sayı,
  "nextAction": "ask_question" | "give_hint" | "summarize"
}`;

    const formattedContents = [
      {
        role: 'user',
        parts: [{ text: `Sistem Bilgisi: ${systemPrompt}\n\nGeçmiş Konuşmalar:\n${context.history.map(h => `${h.role === 'user' ? 'Öğrenci' : 'Eğitmen'}: ${h.content}`).join('\n')}\n\nÖğrencinin Son Mesajı: "${context.userPrompt}"${context.quickAction ? ` [Hızlı Aksiyon: ${context.quickAction}]` : ''}` }],
      },
    ];

    // Call Gemini API (supports gemini-2.5-flash or gemini-1.5-flash)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: formattedContents,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.4,
          maxOutputTokens: 600,
        },
      }),
    });

    if (!response.ok) {
      console.warn('Gemini API call returned status', response.status, 'using fallback.');
      return getDeterministicFallback(context);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      return getDeterministicFallback(context);
    }

    const parsedJson = JSON.parse(candidateText);
    const validated = TutorResponseSchema.safeParse(parsedJson);
    if (validated.success) {
      return validated.data;
    }

    return getDeterministicFallback(context);
  } catch (err) {
    console.error('Error in AI Tutor call:', err);
    return getDeterministicFallback(context);
  }
}
