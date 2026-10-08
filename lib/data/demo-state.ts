import type { StudentProfile, HistoricalAnswer, ParentSummary } from '@/types';
import { INITIAL_SKILLS } from './curriculum';

export const DEMO_STUDENT: StudentProfile = {
  id: 'student-efe-yilmaz',
  name: 'Efe Yılmaz',
  grade: 8,
  examTarget: 'LGS',
  targetScore: 450,
  currentEstimatedScore: 412,
  mathConfidence: 'medium',
  createdAt: '2026-09-15T08:00:00Z',
  weeklyStudyMinutes: 260, // 4s 20dk
  questionsSolvedTotal: 78,
  accuracyRate: 72,
};

export const DEMO_HISTORICAL_ANSWERS: HistoricalAnswer[] = [
  // Radicals (Kareköklü İfadeler) - Mistakes recorded
  { id: 'ha-1', questionId: 'q-radicals-1', skillId: 'radicals', isCorrect: false, selectedAnswer: 'C', timeSpentSec: 72, errorTag: 'kavram_eksigi', timestamp: '2026-10-06T14:20:00Z', difficulty: 2 },
  { id: 'ha-2', questionId: 'q-radicals-2', skillId: 'radicals', isCorrect: false, selectedAnswer: 'A', timeSpentSec: 85, errorTag: 'kavram_eksigi', timestamp: '2026-10-06T14:25:00Z', difficulty: 3 },
  { id: 'ha-3', questionId: 'q-radicals-3', skillId: 'radicals', isCorrect: false, selectedAnswer: 'C', timeSpentSec: 90, errorTag: 'strateji_hatasi', timestamp: '2026-10-06T14:32:00Z', difficulty: 4 },
  { id: 'ha-4', questionId: 'q-radicals-4', skillId: 'radicals', isCorrect: true, selectedAnswer: 'D', timeSpentSec: 32, timestamp: '2026-10-06T14:35:00Z', difficulty: 1 },
  
  // Linear equations mistakes (İşlem hatası)
  { id: 'ha-5', questionId: 'q-equations-1', skillId: 'linear-equations', isCorrect: false, selectedAnswer: 'B', timeSpentSec: 54, errorTag: 'islem_hatasi', timestamp: '2026-10-05T16:10:00Z', difficulty: 3 },
  { id: 'ha-6', questionId: 'q-algebra-2', skillId: 'algebraic-expressions', isCorrect: false, selectedAnswer: 'C', timeSpentSec: 68, errorTag: 'islem_hatasi', timestamp: '2026-10-05T16:15:00Z', difficulty: 4 },
  { id: 'ha-7', questionId: 'q-triangles-2', skillId: 'triangles', isCorrect: false, selectedAnswer: 'A', timeSpentSec: 62, errorTag: 'islem_hatasi', timestamp: '2026-10-04T18:00:00Z', difficulty: 4 },
  { id: 'ha-8', questionId: 'q-data-1', skillId: 'data-analysis', isCorrect: false, selectedAnswer: 'C', timeSpentSec: 60, errorTag: 'islem_hatasi', timestamp: '2026-10-04T18:10:00Z', difficulty: 3 },

  // Attention mistakes (Dikkat hatası)
  { id: 'ha-9', questionId: 'q-probability-1', skillId: 'probability', isCorrect: false, selectedAnswer: 'A', timeSpentSec: 40, errorTag: 'dikkat_hatasi', timestamp: '2026-10-03T11:00:00Z', difficulty: 2 },
  { id: 'ha-10', questionId: 'q-radicals-4', skillId: 'radicals', isCorrect: false, selectedAnswer: 'A', timeSpentSec: 25, errorTag: 'dikkat_hatasi', timestamp: '2026-10-03T11:05:00Z', difficulty: 1 },

  // Prerequisite gap (Ön koşul)
  { id: 'ha-11', questionId: 'q-triangles-1', skillId: 'triangles', isCorrect: false, selectedAnswer: 'D', timeSpentSec: 50, errorTag: 'on_kosul_eksikligi', timestamp: '2026-10-02T15:00:00Z', difficulty: 3 },

  // Additional successful answers
  { id: 'ha-12', questionId: 'q-exponents-1', skillId: 'exponents', isCorrect: true, selectedAnswer: 'A', timeSpentSec: 45, timestamp: '2026-10-07T10:00:00Z', difficulty: 2 },
  { id: 'ha-13', questionId: 'q-exponents-2', skillId: 'exponents', isCorrect: true, selectedAnswer: 'A', timeSpentSec: 65, timestamp: '2026-10-07T10:08:00Z', difficulty: 3 },
  { id: 'ha-14', questionId: 'q-factors-1', skillId: 'factors-multiples', isCorrect: true, selectedAnswer: 'B', timeSpentSec: 70, timestamp: '2026-10-07T10:15:00Z', difficulty: 3 },
  { id: 'ha-15', questionId: 'q-algebra-1', skillId: 'algebraic-expressions', isCorrect: true, selectedAnswer: 'B', timeSpentSec: 48, timestamp: '2026-10-07T10:22:00Z', difficulty: 3 },
];

export const DEMO_PARENT_SUMMARY: ParentSummary = {
  studentName: 'Efe Yılmaz',
  weeklyTimeSpentMinutes: 260, // 4 saat 20 dakika
  masteryStartScore: 68,
  masteryCurrentScore: 81,
  mostImprovedSkill: 'Üslü İfadeler ve Cebir',
  needsAttentionSkill: 'Kareköklü İfadeler (İşlem & Kavram)',
  aiGuidanceNote: 'Efe bu hafta üst üste çalışma alışkanlığını korudu. Kareköklü ifadelerde ezberden ziyade ara işlem basamaklarını kağıda yazması, sınav anında işlem hatalarını %30 azaltacaktır.',
  lastActiveDate: 'Bugün, 16:45',
};

export const DEMO_TIMELINE_EVENTS = [
  { id: 'tl-1', skillTitle: 'Köklü İfadeler', change: '+12', date: 'Bugün', status: 'developing' },
  { id: 'tl-2', skillTitle: 'Olasılık', change: '+8', date: 'Dün', status: 'strong' },
  { id: 'tl-3', skillTitle: 'Doğrusal Denklemler', change: '+6', date: '3 gün önce', status: 'developing' },
  { id: 'tl-4', skillTitle: 'Cebirsel İfadeler', change: '+15', date: '5 gün önce', status: 'strong' },
];
