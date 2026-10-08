'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLearning } from '@/lib/state/learning-context';
import { QUESTION_BANK } from '@/lib/data/questions';
import { selectNextPracticeQuestion } from '@/lib/learning/mastery';
import type { Question, QuestionChoice, ErrorType } from '@/types';
import { ERROR_TYPE_DEFINITIONS } from '@/lib/learning/mastery';
import {
  BrainCircuit,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Lightbulb,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

function PracticeContent() {
  const searchParams = useSearchParams();
  const skillParam = searchParams.get('skill') || 'radicals';

  const { skills, recordAnswer } = useLearning();

  const currentSkill = skills.find((s) => s.id === skillParam) || skills.find((s) => s.id === 'radicals') || skills[0];

  const [answeredIds, setAnsweredIds] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    errorType?: ErrorType;
    explanation: string;
    misconception?: string;
  } | null>(null);

  // Pick question suited for current mastery
  const activeQuestion: Question | null =
    selectNextPracticeQuestion(
      QUESTION_BANK,
      currentSkill.id,
      currentSkill.masteryScore,
      answeredIds
    ) || QUESTION_BANK.find((q) => q.skillId === currentSkill.id) || QUESTION_BANK[0];

  const handleSelectChoice = (choiceId: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setSelectedChoice(choiceId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedChoice || !activeQuestion || isSubmitted) return;

    const isCorrect = selectedChoice === activeQuestion.correctAnswer;
    const errorType = isCorrect ? undefined : activeQuestion.errorTag;

    // Record answer in learning context
    recordAnswer(
      activeQuestion.id,
      currentSkill.id,
      selectedChoice,
      isCorrect,
      activeQuestion.estimatedTimeSec,
      errorType,
      activeQuestion.difficulty
    );

    setFeedback({
      isCorrect,
      errorType,
      explanation: activeQuestion.explanation,
      misconception: activeQuestion.misconception,
    });
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (activeQuestion) {
      setAnsweredIds((prev) => [...prev, activeQuestion.id]);
    }
    setSelectedChoice(null);
    setIsSubmitted(false);
    setFeedback(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <BrainCircuit className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
              Uyarlanabilir Pratik
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">{currentSkill.mebCode}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {currentSkill.title}
          </h1>
        </div>

        {/* Current Difficulty indicator */}
        {activeQuestion && (
          <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-xl border border-white/[0.08]">
            <span className="text-xs text-slate-400">Zorluk:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <span
                  key={lvl}
                  className={`w-2.5 h-2.5 rounded-full ${
                    lvl <= activeQuestion.difficulty
                      ? 'bg-blue-400'
                      : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-mono font-bold text-white">
              {activeQuestion.difficulty}/5
            </span>
          </div>
        )}
      </div>

      {activeQuestion ? (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
          {/* Question Context / Stem */}
          {activeQuestion.contextText && (
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06] text-xs font-semibold text-slate-300">
              {activeQuestion.contextText}
            </div>
          )}

          {/* Question Text */}
          <div className="text-base sm:text-lg text-white font-medium leading-relaxed">
            {activeQuestion.questionText}
          </div>

          {/* Choices Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {activeQuestion.choices.map((choice) => {
              const isSelected = selectedChoice === choice.id;
              const isCorrectChoice = isSubmitted && choice.id === activeQuestion.correctAnswer;
              const isWrongChoice = isSubmitted && isSelected && !isCorrectChoice;

              let choiceStyle = 'bg-slate-900/60 border-white/[0.08] hover:bg-slate-800/60 text-slate-200';

              if (isSelected && !isSubmitted) {
                choiceStyle = 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500';
              } else if (isCorrectChoice) {
                choiceStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
              } else if (isWrongChoice) {
                choiceStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 ring-1 ring-rose-500';
              }

              return (
                <button
                  key={choice.id}
                  onClick={() => handleSelectChoice(choice.id)}
                  disabled={isSubmitted}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between group ${choiceStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                        isSelected && !isSubmitted
                          ? 'bg-blue-500 text-white'
                          : isCorrectChoice
                          ? 'bg-emerald-500 text-white'
                          : isWrongChoice
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-800 text-slate-400 group-hover:text-white'
                      }`}
                    >
                      {choice.id}
                    </span>
                    <span className="text-sm font-medium">{choice.text}</span>
                  </div>

                  {isCorrectChoice && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                  {isWrongChoice && (
                    <AlertCircle className="w-5 h-5 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Submit Action */}
          {!isSubmitted && (
            <div className="pt-4 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedChoice}
                className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 shadow-md shadow-blue-500/25 transition-all flex items-center gap-2"
              >
                <span>Yanıtı Gönder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Nuanced Feedback Section */}
          {feedback && (
            <div
              className={`p-5 rounded-2xl border space-y-4 animate-in fade-in duration-300 ${
                feedback.isCorrect
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-rose-950/20 border-rose-500/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {feedback.isCorrect ? (
                    <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {feedback.isCorrect
                        ? 'Harika! Doğru Yanıt'
                        : 'Yanıtını aldık. Bu bir öğrenme fırsatı!'}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {feedback.isCorrect
                        ? 'Kazanım ustalığın yükseltildi.'
                        : feedback.errorType
                        ? `Tespit Edilen Kalıp: ${ERROR_TYPE_DEFINITIONS[feedback.errorType].label}`
                        : 'Analiz güncellendi.'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
                >
                  <span>Sıradaki Soru</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Misconception Advice */}
              {!feedback.isCorrect && feedback.misconception && (
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/[0.06] text-xs text-slate-300 space-y-1">
                  <span className="font-semibold text-amber-400 block">
                    Kavram Yanılgısı Notu:
                  </span>
                  <p>{feedback.misconception}</p>
                </div>
              )}

              {/* Detailed Explanation */}
              <div className="text-xs text-slate-300 leading-relaxed border-t border-white/[0.08] pt-3">
                <span className="font-semibold text-white block mb-1">
                  Çözüm ve Açıklama:
                </span>
                <p>{feedback.explanation}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-8 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h2 className="text-lg font-bold text-white">
            Bu bölümdeki tüm uyarlanabilir soruları tamamladın!
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Kazanım haritanda yeni seviyeler açıldı veya Sokratesçi AI Eğitmen ile derinlemesine akıl yürütebilirsin.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setAnsweredIds([])}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10"
            >
              Soruları Sıfırla
            </button>
            <a
              href="/student/map"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white"
            >
              Haritaya Dön
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdaptivePracticePage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 text-sm">
          Yükleniyor...
        </div>
      }
    >
      <PracticeContent />
    </Suspense>
  );
}
