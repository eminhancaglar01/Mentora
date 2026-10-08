'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLearning } from '@/lib/state/learning-context';
import { Logo } from '@/components/brand/logo';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Target,
  GraduationCap,
  BrainCircuit,
  Compass,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { startFreshStudent } = useLearning();

  const [step, setStep] = useState(1);
  const [studentName, setStudentName] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('LGS');
  const [selectedGrade, setSelectedGrade] = useState('8');
  const [targetScore, setSelectedTargetScore] = useState(450);
  const [confidence, setConfidence] = useState<'very_low' | 'low' | 'medium' | 'high' | 'very_high'>('medium');

  const goals = [
    { id: 'LGS', title: 'LGS Hazırlık', desc: 'LGS sınavında en yüksek puan hedefine ulaşmak.' },
    { id: 'okul', title: 'Okul Başarısı', desc: 'Yazılı sınavlarda ve MEB müfredatında 90+ almak.' },
    { id: 'konu', title: 'Konu Kapatma', desc: 'Geçmiş yıllardan kalan temel eksikleri gidermek.' },
    { id: 'eksik', title: 'Eksiklerimi Bulmak', desc: 'Neyi bilip neyi bilmediğimi yapay zekâ ile keşfetmek.' },
  ];

  const confidences: {
    id: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
    title: string;
    desc: string;
  }[] = [
    { id: 'very_low', title: 'Çok zorlanıyorum', desc: 'Matematik görünce tedirgin oluyorum.' },
    { id: 'low', title: 'Bazen takılıyorum', desc: 'Basit soruları yapıyorum, yeni nesilde zorlanıyorum.' },
    { id: 'medium', title: 'Orta', desc: 'Formülleri biliyorum ama süre ve dikkatte kaçıyor.' },
    { id: 'high', title: 'İyiyim', desc: 'Matematikte genel olarak kendime güveniyorum.' },
    { id: 'very_high', title: 'Çok iyiyim', desc: 'Hedefim fullemek ya da 19-20 net.' },
  ];

  const handleFinishOnboarding = () => {
    startFreshStudent(studentName || 'Yeni Öğrenci', targetScore, confidence);
    router.push('/diagnostic');
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between pb-6">
        <Logo size="md" showTagline={false} />
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <span>Adım {step}</span>
          <span>/</span>
          <span>5</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto w-full my-auto">
        {/* Step Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mb-8">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* SCREEN 1: Goal */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
                Başlarken
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Hoş geldin 👋 Bugün neyi hedefliyorsun?
              </h1>
              <p className="text-sm text-slate-400 mt-2">
                Mentora, hedefine göre öğretim hızını ve soru zorluğunu ayarlar.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                İsmin nedir?
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Örn: Efe"
                className="w-full bg-slate-900 border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGoal(g.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedGoal === g.id
                      ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500'
                      : 'bg-slate-900/60 border-white/[0.08] hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <h3 className="text-sm font-bold text-white mb-1">{g.title}</h3>
                  <p className="text-xs text-slate-400">{g.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 2: Grade */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
                Eğitim Kademesi
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Kaçıncı sınıftasın?
              </h1>
              <p className="text-sm text-slate-400 mt-2">
                İlk çalışan dikeyimiz MEB 8. Sınıf ve LGS Matematik müfredatıdır.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold font-mono">
                  8
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">8. Sınıf (LGS Hazırlık)</h3>
                  <span className="text-xs text-slate-400">12 MEB Matematik Kazanımı • Tam Müfredat</span>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        )}

        {/* SCREEN 3: Target Score */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
                Sınav Hedefi
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                LGS Hedef Puanın Kaç?
              </h1>
              <p className="text-sm text-slate-400 mt-2">
                Hedefine göre en yüksek getirili konuları sıralayacağız.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[400, 425, 450, 475, 500].map((score) => (
                <button
                  key={score}
                  onClick={() => setSelectedTargetScore(score)}
                  className={`p-4 rounded-xl border text-center font-mono font-bold transition-all ${
                    targetScore === score
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/25 scale-105'
                      : 'bg-slate-900/60 border-white/[0.08] text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-xl block">{score}</span>
                  <span className="text-[10px] font-sans font-normal text-slate-400">
                    {score === 450 ? 'Varsayılan' : score === 500 ? 'Fen Lisesi' : 'Puan'}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-white/[0.06] text-xs text-slate-400 text-center">
              Seçilen Hedef: <strong className="text-white font-mono">{targetScore}+</strong> puan
            </div>
          </div>
        )}

        {/* SCREEN 4: Confidence */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
                Öz Değerlendirme
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Matematikte kendine ne kadar güveniyorsun?
              </h1>
              <p className="text-sm text-slate-400 mt-2">
                Doğru tespit, seviyene tam uygun adımlarla başlamamızı sağlar.
              </p>
            </div>

            <div className="space-y-3">
              {confidences.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setConfidence(c.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    confidence === c.id
                      ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500'
                      : 'bg-slate-900/60 border-white/[0.08] hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div>
                    <h3 className="text-sm font-bold text-white">{c.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{c.desc}</p>
                  </div>
                  {confidence === c.id && (
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 5: Ready for Diagnostic */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in duration-300 text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-500/25">
              <Compass className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
                Hazırsın
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Şimdi sana özel öğrenme haritanı çıkaralım.
              </h1>
              <p className="text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                10 soruluk kısa bir seviye analiziyle eksiklerini, işlem alışkanlıklarını ve güçlü yönlerini haritalandıracağız.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-white/[0.08] max-w-sm mx-auto text-xs text-slate-400 text-left space-y-1.5">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Her soru bir kazanımı test eder.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Yanlışların hata kalıplarını belirler.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Doğru ya da yanlış; her yanıt öğrenme rotanı kurar.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleFinishOnboarding}
                className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 transition-all inline-flex items-center gap-2"
              >
                <span>Mini Analize Başla</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        {step < 5 && (
          <div className="flex items-center justify-between pt-8 border-t border-white/[0.08] mt-8">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Geri</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/25 flex items-center gap-2 transition-all"
            >
              <span>Devam Et</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-2xl mx-auto w-full pt-6 text-center text-xs text-slate-500">
        Mentora • Türkiye için kişiselleştirilmiş öğrenme
      </div>
    </div>
  );
}
