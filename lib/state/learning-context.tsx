'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  StudentProfile,
  Skill,
  HistoricalAnswer,
  ErrorDNAProfile,
  Recommendation,
  ParentSummary,
  ErrorType,
} from '@/types';
import { INITIAL_SKILLS } from '@/lib/data/curriculum';
import {
  DEMO_STUDENT,
  DEMO_HISTORICAL_ANSWERS,
  DEMO_PARENT_SUMMARY,
  DEMO_TIMELINE_EVENTS,
} from '@/lib/data/demo-state';
import {
  calculateSkillMastery,
  getMasteryStatus,
  calculateErrorDNA,
  recommendNextSkill,
  estimateLGSScore,
} from '@/lib/learning/mastery';

interface TimelineEvent {
  id: string;
  skillTitle: string;
  change: string;
  date: string;
  status: string;
}

interface LearningContextType {
  profile: StudentProfile;
  skills: Skill[];
  answers: HistoricalAnswer[];
  errorDNA: ErrorDNAProfile;
  recommendation: Recommendation;
  parentSummary: ParentSummary;
  timelineEvents: TimelineEvent[];
  recordAnswer: (
    questionId: string,
    skillId: string,
    selectedAnswer: 'A' | 'B' | 'C' | 'D',
    isCorrect: boolean,
    timeSpentSec: number,
    errorTag?: ErrorType,
    difficulty?: number
  ) => void;
  updateSkillScore: (skillId: string, delta: number) => void;
  setTargetScore: (target: number) => void;
  resetToDemo: () => void;
  startFreshStudent: (
    name: string,
    targetScore: number,
    mathConfidence: 'very_low' | 'low' | 'medium' | 'high' | 'very_high'
  ) => void;
  completeDiagnosticAssessment: (
    results: { skillId: string; isCorrect: boolean; errorTag?: ErrorType }[]
  ) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

const STORAGE_KEY = 'mentora_learning_state_v1';
const LEGACY_STORAGE_KEY = 'kazanim_learning_state_v1';

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [profile, setProfile] = useState<StudentProfile>(DEMO_STUDENT);
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [answers, setAnswers] = useState<HistoricalAnswer[]>(DEMO_HISTORICAL_ANSWERS);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(DEMO_TIMELINE_EVENTS);
  const [parentSummary, setParentSummary] = useState<ParentSummary>(DEMO_PARENT_SUMMARY);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.skills) setSkills(parsed.skills);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.timelineEvents) setTimelineEvents(parsed.timelineEvents);
        if (parsed.parentSummary) setParentSummary(parsed.parentSummary);
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          profile,
          skills,
          answers,
          timelineEvents,
          parentSummary,
        })
      );
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }, [profile, skills, answers, timelineEvents, parentSummary, isLoaded]);

  // Derived state
  const errorDNA = calculateErrorDNA(answers);
  const recommendation = recommendNextSkill(skills, profile.targetScore);

  const recordAnswer = (
    questionId: string,
    skillId: string,
    selectedAnswer: 'A' | 'B' | 'C' | 'D',
    isCorrect: boolean,
    timeSpentSec: number,
    errorTag?: ErrorType,
    difficulty: number = 3
  ) => {
    // 1. Create historical answer
    const newAnswer: HistoricalAnswer = {
      id: `ans-${Date.now()}`,
      questionId,
      skillId,
      isCorrect,
      selectedAnswer,
      timeSpentSec,
      errorTag,
      timestamp: new Date().toISOString(),
      difficulty,
    };

    setAnswers((prev) => [newAnswer, ...prev]);

    // 2. Update Skill mastery
    setSkills((prevSkills) =>
      prevSkills.map((s) => {
        if (s.id !== skillId) return s;
        const newScore = calculateSkillMastery(s.masteryScore, isCorrect, difficulty);
        return {
          ...s,
          masteryScore: newScore,
          status: getMasteryStatus(newScore),
        };
      })
    );

    // 3. Update timeline if significant change
    const targetSkill = skills.find((s) => s.id === skillId);
    if (targetSkill) {
      const delta = isCorrect ? '+6' : '-4';
      setTimelineEvents((prev) => [
        {
          id: `tl-${Date.now()}`,
          skillTitle: targetSkill.title.split(' ')[0],
          change: delta,
          date: 'Az önce',
          status: isCorrect ? 'strong' : 'developing',
        },
        ...prev.slice(0, 6),
      ]);
    }

    // 4. Update Profile stats and estimated LGS score
    setProfile((prev) => {
      const updatedEstimated = estimateLGSScore(skills, prev.targetScore);
      const newSolved = prev.questionsSolvedTotal + 1;
      const prevCorrectCount = Math.round((prev.accuracyRate / 100) * prev.questionsSolvedTotal);
      const newAccuracy = Math.round(((prevCorrectCount + (isCorrect ? 1 : 0)) / newSolved) * 100);

      return {
        ...prev,
        questionsSolvedTotal: newSolved,
        accuracyRate: newAccuracy,
        currentEstimatedScore: updatedEstimated,
      };
    });
  };

  const updateSkillScore = (skillId: string, delta: number) => {
    setSkills((prevSkills) =>
      prevSkills.map((s) => {
        if (s.id !== skillId) return s;
        const newScore = Math.min(100, Math.max(5, s.masteryScore + delta));
        return {
          ...s,
          masteryScore: newScore,
          status: getMasteryStatus(newScore),
        };
      })
    );

    const targetSkill = skills.find((s) => s.id === skillId);
    if (targetSkill && delta > 0) {
      setTimelineEvents((prev) => [
        {
          id: `tl-${Date.now()}`,
          skillTitle: targetSkill.title.split(' ')[0],
          change: `+${delta}`,
          date: 'Az önce',
          status: 'strong',
        },
        ...prev.slice(0, 6),
      ]);
    }
  };

  const setTargetScore = (target: number) => {
    setProfile((prev) => ({
      ...prev,
      targetScore: target,
    }));
  };

  const resetToDemo = () => {
    setProfile(DEMO_STUDENT);
    setSkills(INITIAL_SKILLS);
    setAnswers(DEMO_HISTORICAL_ANSWERS);
    setTimelineEvents(DEMO_TIMELINE_EVENTS);
    setParentSummary(DEMO_PARENT_SUMMARY);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const startFreshStudent = (
    name: string,
    targetScore: number,
    mathConfidence: 'very_low' | 'low' | 'medium' | 'high' | 'very_high'
  ) => {
    const freshProfile: StudentProfile = {
      id: `student-${Date.now()}`,
      name: name.trim() || 'Öğrenci',
      grade: 8,
      examTarget: 'LGS',
      targetScore,
      currentEstimatedScore: 360,
      mathConfidence,
      createdAt: new Date().toISOString(),
      weeklyStudyMinutes: 0,
      questionsSolvedTotal: 0,
      accuracyRate: 0,
    };

    // Skills initialized to baseline
    const initialBaselineSkills = INITIAL_SKILLS.map((s) => ({
      ...s,
      masteryScore: 35,
      status: 'developing' as const,
    }));

    setProfile(freshProfile);
    setSkills(initialBaselineSkills);
    setAnswers([]);
    setTimelineEvents([
      {
        id: 'tl-welcome',
        skillTitle: 'Hesap Açıldı',
        change: 'Hazır',
        date: 'Bugün',
        status: 'strong',
      },
    ]);
  };

  const completeDiagnosticAssessment = (
    results: { skillId: string; isCorrect: boolean; errorTag?: ErrorType }[]
  ) => {
    setSkills((prev) =>
      prev.map((skill) => {
        const matching = results.filter((r) => r.skillId === skill.id);
        if (matching.length === 0) return skill;
        const correctCount = matching.filter((r) => r.isCorrect).length;
        const newScore = Math.round((correctCount / matching.length) * 100);
        return {
          ...skill,
          masteryScore: Math.max(25, newScore),
          status: getMasteryStatus(Math.max(25, newScore)),
        };
      })
    );

    const newEstimated = estimateLGSScore(skills, profile.targetScore);
    setProfile((prev) => ({
      ...prev,
      currentEstimatedScore: newEstimated,
      questionsSolvedTotal: prev.questionsSolvedTotal + results.length,
    }));
  };

  return (
    <LearningContext.Provider
      value={{
        profile,
        skills,
        answers,
        errorDNA,
        recommendation,
        parentSummary,
        timelineEvents,
        recordAnswer,
        updateSkillScore,
        setTargetScore,
        resetToDemo,
        startFreshStudent,
        completeDiagnosticAssessment,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}
