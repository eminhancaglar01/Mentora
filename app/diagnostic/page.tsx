'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLearning } from '@/lib/state/learning-context';
import { QUESTION_BANK } from '@/lib/data/questions';
import { Logo } from '@/components/brand/logo';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  Dna,
  ShieldCheck,
  Check,
} from 'lucide-react';

export default function DiagnosticPage() {
  const router = useRouter();
  const { completeDiagnosticAssessment, recordAnswer, skills } = useLearning();

  // Pick 10 representative diagnostic questions
  const questions = QUESTION_BANK.slice(0, 10);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerRecorded, setIsAnswerRecorded] = useState(false);
  const [results, setResults] = useState<{
    skillId: string;
    questionId: string;
    isCorrect: boolean;
    errorTag?: any;
  }[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (choiceId: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerRecorded) return;
    setSelectedAnswer(choiceId);
  };

  const handleNextOrSubmit = () => {
    if (!selectedAnswer || !currentQ) return;

    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    const errorTag = isCorrect ? undefined : currentQ.errorTag;

    const newResult = {
      skillId: currentQ.skillId,
      questionId: currentQ.id,
      isCorrect,
      errorTag,
    };

    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    // Also record into history
    recordAnswer(
      currentQ.id,
      currentQ.skillId,
      selectedAnswer,
      isCorrect,
      currentQ.estimatedTimeSec,
      errorTag,
      currentQ.difficulty
    );

    setIsAnswerRecorded(true);

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setIsAnswerRecorded(false);
      } else {
        // Assessment finished!
        completeDiagnosticAssessment(updatedResults);
        setIsComplete(true);
      }
    }, 450);
  };

  // If completed, show diagnostic result summary
  if (isComplete) {
    const correctCount = results.filter((r) => r.isCorrect).length;
    const totalCount = results.length;
    const accuracy = Math.round((correctCount / totalCount) * 100);

    return (
      <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto w-full flex items-center justify-between pb-6">
          <Logo size="md" showTagline={false} />
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Analiz Tamamlandı
          </span>
        </div>

        <div className="max-w-2xl mx-auto w-full my-auto space-y-6 text-center animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-500/25">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Analiz Tamamlandı
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Öğrenme haritan hazır!
            </h1>
            <p className="text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
              10 soruluk seviye analizin işlendi. Eksiklerin, işlem kalıpların ve en yüksek getirili konuların belirlendi.
            </p>
          </div>

          {/* Results Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06]">
              <span className="text-xs text-slate-400 block mb-1">Doğruluk Oranı</span>
              <span className="text-2xl font-extrabold font-mono text-white">
                %{accuracy}
              </span>
              <span className="text-[11px] text-slate-500 block mt-1">
                {correctCount} / {totalCount} Soru
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06]">
              <span className="text-xs text-slate-400 block mb-1">En Güçlü Alan</span>
              <span className="text-base font-bold text-emerald-400 block truncate">
                Üslü İfadeler
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">
                Kavram temeli sağlam
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06]">
              <span className="text-xs text-slate-400 block mb-1">İlk Öncelik Konusu</span>
              <span className="text-base font-bold text-amber-400 block truncate">
                Kareköklü İfadeler
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">
                +9 puan potansiyeli
              </span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => router.push('/student/dashboard')}
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25 transition-all inline-flex items-center gap-2"
            >
              <span>Öğrenme Paneline Git</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto w-full pt-6 text-center text-xs text-slate-500">
          Mentora • Seviye Teşhis Motoru
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between pb-6">
        <Logo size="md" showTagline={false} />

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Compass className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-white">Seviye Analizi</span>
          </div>

          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-white/[0.08]">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Main Question Arena */}
      <div className="max-w-3xl mx-auto w-full my-auto space-y-6">
        {/* Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        {currentQ && (
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-6 animate-in fade-in duration-200">
            {currentQ.contextText && (
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06] text-xs font-semibold text-slate-300">
                {currentQ.contextText}
              </div>
            )}

            <div className="text-base sm:text-lg text-white font-medium leading-relaxed">
              {currentQ.questionText}
            </div>

            {/* Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {currentQ.choices.map((choice) => {
                const isSelected = selectedAnswer === choice.id;

                return (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectAnswer(choice.id)}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500'
                        : 'bg-slate-900/60 border-white/[0.08] hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {choice.id}
                      </span>
                      <span className="text-sm font-medium">{choice.text}</span>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {isAnswerRecorded ? 'Yanıtını aldık...' : 'Bir seçenek işaretle ve ilerle'}
              </span>

              <button
                onClick={handleNextOrSubmit}
                disabled={!selectedAnswer || isAnswerRecorded}
                className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 shadow-md shadow-blue-500/25 transition-all flex items-center gap-2"
              >
                <span>
                  {currentIndex + 1 === questions.length ? 'Analizi Bitir' : 'Sonraki Soru'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-3xl mx-auto w-full pt-6 text-center text-xs text-slate-500">
        Mentora • Bilişsel Seviye Teşhis Sistemi
      </div>
    </div>
  );
}
