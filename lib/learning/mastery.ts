import type { Skill, MasteryStatus, HistoricalAnswer, ErrorType, ErrorDNAProfile, ErrorDNAItem, Recommendation, Question } from '@/types';

export const ERROR_TYPE_DEFINITIONS: Record<ErrorType, { label: string; description: string; color: string; advice: string }> = {
  islem_hatasi: {
    label: 'İşlem Hatası',
    description: 'Adımları doğru kurguladın ancak dört işlem, işaret veya sadeleştirme aşamasında kaydın.',
    color: '#3B82F6', // Blue
    advice: 'İşlemleri kafadan yapmak yerine ara basamakları yazarak ve işaret kontrolü yaparak ilerle.',
  },
  kavram_eksigi: {
    label: 'Kavram Eksiği',
    description: 'Kökün tanımı, üssün negatifliği gibi kuralın matematiksel mantığı tam oturmamış.',
    color: '#EF4444', // Red
    advice: 'Formülü ezberlemek yerine temel kuralın görsel ya da geometrik mantığını Socratic Tutor ile gözden geçir.',
  },
  dikkat_hatasi: {
    label: 'Dikkat Hatası',
    description: 'Soru kökündeki "olamaz", "en az", "farklı" gibi yönlendiricileri gözden kaçırdın.',
    color: '#F59E0B', // Amber
    advice: 'Soru kökünün altını çiz ve bulduğun sonucun soruda istenen birimle eşleştiğini doğrula.',
  },
  soru_okuma: {
    label: 'Soruyu Yanlış Okuma',
    description: 'Yeni nesil LGS metninde verilen ipucunu ya da tablo/grafik detayını atladın.',
    color: '#8B5CF6', // Purple
    advice: 'Metni bir kere sakince oku, verilenleri maddeleyip ardından işleme başla.',
  },
  strateji_hatasi: {
    label: 'Strateji Hatası',
    description: 'Uzun ve karmaşık bir yola girdin; pratik çarpanlara ayırma veya eleme yöntemini kullanmadın.',
    color: '#EC4899', // Pink
    advice: 'Şıkları eleyerek veya en küçük/büyük sınır değerleri test ederek strateji geliştir.',
  },
  on_kosul_eksikligi: {
    label: 'Ön Koşul Eksikliği',
    description: '7. sınıf tam sayılar, rasyonel sayılar veya harfli ifadeler temeli bu konuyu engelliyor.',
    color: '#14B8A6', // Teal
    advice: '7. sınıf bağlantılı 5 dakikalık köprü alıştırmasıyla temeli tazele.',
  },
};

/**
 * Deterministic mastery score update
 */
export function calculateSkillMastery(
  currentScore: number,
  isCorrect: boolean,
  difficulty: number,
  streak: number = 0
): number {
  if (isCorrect) {
    // Correct answer bonus proportional to difficulty
    const difficultyMultiplier = 1 + (difficulty - 1) * 0.35; // 1.0 to 2.4
    const streakBonus = Math.min(streak * 0.5, 2.5);
    
    // Diminishing returns as mastery approaches 100
    const headroom = (100 - currentScore) / 100;
    const gain = (7 * difficultyMultiplier + streakBonus) * Math.max(0.35, headroom);
    
    return Math.min(100, Math.round(currentScore + gain));
  } else {
    // Mistake penalty: mistakes on easier questions impact score more
    const vulnerability = (6 - difficulty) * 0.8; // easy: ~4.0, hard: ~0.8
    const penalty = 5 + vulnerability;
    
    return Math.max(5, Math.round(currentScore - penalty));
  }
}

/**
 * Determine status based on mastery score
 */
export function getMasteryStatus(score: number): MasteryStatus {
  if (score >= 85) return 'mastered';
  if (score >= 70) return 'strong';
  if (score >= 45) return 'developing';
  return 'at-risk';
}

/**
 * Calculate overall weighted mastery
 */
export function calculateOverallMastery(skills: Skill[]): number {
  if (skills.length === 0) return 0;
  const total = skills.reduce((acc, s) => acc + s.masteryScore, 0);
  return Math.round(total / skills.length);
}

/**
 * Predict realistic LGS Total Score (out of 500)
 * Uses MEB LGS weighted distribution: Math constitutes major variance.
 */
export function estimateLGSScore(skills: Skill[], targetScore: number = 450): number {
  const mathMastery = calculateOverallMastery(skills); // 0 - 100
  // Base score for students at target 450 track is ~350 baseline + up to 150 points from mastery
  const estimated = 320 + (mathMastery / 100) * 150;
  return Math.min(500, Math.max(200, Math.round(estimated)));
}

/**
 * Compute Error DNA profile from historical student answers
 */
export function calculateErrorDNA(answers: HistoricalAnswer[]): ErrorDNAProfile {
  const incorrectAnswers = answers.filter((a) => !a.isCorrect && a.errorTag);
  const totalAnalyzed = Math.max(incorrectAnswers.length, 1);

  const counts: Record<ErrorType, number> = {
    islem_hatasi: 0,
    kavram_eksigi: 0,
    dikkat_hatasi: 0,
    soru_okuma: 0,
    strateji_hatasi: 0,
    on_kosul_eksikligi: 0,
  };

  incorrectAnswers.forEach((a) => {
    if (a.errorTag && counts[a.errorTag] !== undefined) {
      counts[a.errorTag]++;
    }
  });

  // Calculate percentages
  const items: ErrorDNAItem[] = (Object.keys(counts) as ErrorType[]).map((type) => {
    const count = counts[type];
    const percentage = Math.round((count / totalAnalyzed) * 100);
    const def = ERROR_TYPE_DEFINITIONS[type];

    // Trends based on canonical error distribution
    let trend: 'up' | 'down' | 'neutral' = 'neutral';
    let trendPercent = 0;
    if (type === 'islem_hatasi') {
      trend = 'down';
      trendPercent = 14;
    } else if (type === 'kavram_eksigi') {
      trend = 'down';
      trendPercent = 8;
    } else if (type === 'dikkat_hatasi') {
      trend = 'up';
      trendPercent = 6;
    }

    return {
      type,
      label: def.label,
      count,
      percentage,
      trend,
      trendPercent,
      color: def.color,
    };
  });

  // Sort descending by percentage
  items.sort((a, b) => b.percentage - a.percentage);

  const mostFrequent = items[0]?.type || 'islem_hatasi';
  const mostFrequentLabel = ERROR_TYPE_DEFINITIONS[mostFrequent].label;

  const weeklyInsight =
    mostFrequent === 'islem_hatasi'
      ? 'Son 20 hatanın %35\'i işlem hatası. Konuyu ve formülü biliyorsun, ancak ara adımları kafadan yazarken işaret ve çarpma kaymaları yaşanıyor.'
      : 'Kavram eksiği sinyalleri tespit edildi. Yeni soru çözmeden önce kök/üslü kurallarını tazelemelisin.';

  const recommendedAction =
    'Bugün 20 dakika işlem temizliği ve Socratic Tutor ile adım adım çözüm pratiği yap.';

  return {
    totalAnalyzed: incorrectAnswers.length,
    items,
    mostFrequent,
    mostFrequentLabel,
    weeklyInsight,
    recommendedAction,
  };
}

/**
 * Recommend next high-yield skill based on target gap and LGS question weight
 */
export function recommendNextSkill(skills: Skill[], targetScore: number = 450): Recommendation {
  // LGS question frequency weights
  const lgsWeights: Record<string, number> = {
    'M.8.1.3': 3.5, // Kareköklü İfadeler (often 3 questions on LGS)
    'M.8.1.2': 2.5, // Üslü İfadeler
    'M.8.2.1': 3.0, // Cebirsel İfadeler
    'M.8.2.2': 3.0, // Doğrusal Denklemler
    'M.8.5.1': 1.5, // Olasılık
    'M.8.4.1': 1.5, // Veri Analizi
    'M.8.3.1': 2.5, // Üçgenler
  };

  // Find the skill with highest improvement yield:
  // Yield = (100 - masteryScore) * lgsWeight
  const scoredSkills = skills.map((skill) => {
    const weight = lgsWeights[skill.mebCode] || 1.8;
    const potential = (100 - skill.masteryScore) * weight;
    return { skill, potential, weight };
  });

  scoredSkills.sort((a, b) => b.potential - a.potential);

  const best = scoredSkills[0]?.skill || skills[0];

  let reason = 'Buradaki gelişim, hedef skoruna ulaşman için en yüksek potansiyele sahip.';
  let timeMinutes = 25;
  let expectedScoreImpact = 9;

  if (best.mebCode === 'M.8.1.3') {
    reason = 'Kareköklü İfadeler LGS\'de 3 soru getirir. 43% seviyesinden 70%\'e çıkmak tahmini netini +2.5 artırır.';
    timeMinutes = 25;
    expectedScoreImpact = 9;
  } else if (best.mebCode === 'M.8.2.2') {
    reason = 'Doğrusal Denklemler hem cebir hem problem sorularının omurgasıdır.';
    timeMinutes = 20;
    expectedScoreImpact = 7;
  }

  return {
    skillId: best.id,
    skillTitle: best.title,
    reason,
    timeMinutes,
    expectedScoreImpact,
    priority: 1,
    suggestedAction: '10 dk Socratic Öğretim + 5 Uyarlanabilir Soru',
  };
}

/**
 * Calculate distance to target
 */
export function calculateTargetGap(currentEstimate: number, targetScore: number): number {
  return Math.max(0, targetScore - currentEstimate);
}

/**
 * Select adaptive question suited for student's mastery level
 */
export function selectNextPracticeQuestion(
  questions: Question[],
  skillId: string,
  currentMastery: number,
  answeredQuestionIds: string[] = []
): Question | null {
  const skillQuestions = questions.filter((q) => q.skillId === skillId);
  if (skillQuestions.length === 0) return null;

  // Target difficulty based on mastery
  let targetDifficulty = 2;
  if (currentMastery < 40) targetDifficulty = 1;
  else if (currentMastery < 65) targetDifficulty = 2;
  else if (currentMastery < 80) targetDifficulty = 3;
  else if (currentMastery < 90) targetDifficulty = 4;
  else targetDifficulty = 5;

  // Filter out recently answered if alternatives exist
  const unhandled = skillQuestions.filter((q) => !answeredQuestionIds.includes(q.id));
  const pool = unhandled.length > 0 ? unhandled : skillQuestions;

  // Pick question closest to target difficulty
  pool.sort((a, b) => {
    const diffA = Math.abs(a.difficulty - targetDifficulty);
    const diffB = Math.abs(b.difficulty - targetDifficulty);
    return diffA - diffB;
  });

  return pool[0];
}
