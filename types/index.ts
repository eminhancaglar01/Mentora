export type SkillCategory = 'Sayılar' | 'Cebir' | 'Veri & Olasılık' | 'Geometri';

export type MasteryStatus = 'mastered' | 'strong' | 'developing' | 'at-risk' | 'locked';

export type ErrorType = 
  | 'islem_hatasi'
  | 'kavram_eksigi'
  | 'dikkat_hatasi'
  | 'soru_okuma'
  | 'strateji_hatasi'
  | 'on_kosul_eksikligi';

export interface ErrorTypeInfo {
  key: ErrorType;
  label: string;
  description: string;
  color: string;
  advice: string;
}

export interface Skill {
  id: string;
  mebCode: string;
  title: string;
  category: SkillCategory;
  grade: number;
  order: number;
  description: string;
  prerequisites: string[]; // skill IDs
  masteryScore: number; // 0 - 100
  status: MasteryStatus;
  questionsCount: number;
  sourceUrl?: string;
}

export interface QuestionChoice {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: string;
  skillId: string;
  subject: string;
  grade: number;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1 easiest, 5 hardest
  questionText: string;
  contextText?: string;
  choices: QuestionChoice[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  misconception: string;
  errorTag: ErrorType;
  estimatedTimeSec: number;
}

export interface HistoricalAnswer {
  id: string;
  questionId: string;
  skillId: string;
  isCorrect: boolean;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
  timeSpentSec: number;
  errorTag?: ErrorType;
  timestamp: string;
  difficulty: number;
}

export interface ErrorDNAItem {
  type: ErrorType;
  label: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'neutral';
  trendPercent: number;
  color: string;
}

export interface ErrorDNAProfile {
  totalAnalyzed: number;
  items: ErrorDNAItem[];
  mostFrequent: ErrorType;
  mostFrequentLabel: string;
  weeklyInsight: string;
  recommendedAction: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  grade: number;
  examTarget: 'LGS';
  targetScore: number; // e.g. 450
  currentEstimatedScore: number; // e.g. 412
  mathConfidence: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
  createdAt: string;
  weeklyStudyMinutes: number;
  questionsSolvedTotal: number;
  accuracyRate: number;
}

export interface Recommendation {
  skillId: string;
  skillTitle: string;
  reason: string;
  timeMinutes: number;
  expectedScoreImpact: number;
  priority: 1 | 2 | 3;
  suggestedAction: string;
}

export interface TutorMessage {
  id: string;
  role: 'assistant' | 'user' | 'system';
  content: string;
  intent?: 'hint' | 'question' | 'explanation' | 'encouragement';
  diagnosedError?: ErrorType;
  masterySignal?: number;
  nextAction?: 'ask_question' | 'give_hint' | 'summarize';
  timestamp: string;
}

export interface ParentSummary {
  studentName: string;
  weeklyTimeSpentMinutes: number;
  masteryStartScore: number;
  masteryCurrentScore: number;
  mostImprovedSkill: string;
  needsAttentionSkill: string;
  aiGuidanceNote: string;
  lastActiveDate: string;
}
