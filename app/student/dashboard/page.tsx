'use client';

import React from 'react';
import Link from 'next/link';
import { useLearning } from '@/lib/state/learning-context';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  BrainCircuit,
  Clock,
  Dna,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  BookOpen,
  Zap,
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { profile, skills, errorDNA, recommendation, timelineEvents } = useLearning();

  // Find top priority skills for chart
  const highlightSkills = [...skills]
    .sort((a, b) => {
      // Prioritize key topics or lowest mastery
      return a.masteryScore - b.masteryScore;
    })
    .slice(0, 6);

  const getScoreColor = (score: number) => {
    if (score >= 80) return { bar: 'bg-emerald-500', text: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
    if (score >= 65) return { bar: 'bg-blue-500', text: 'text-blue-400', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
    if (score >= 45) return { bar: 'bg-amber-500', text: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
    return { bar: 'bg-rose-500', text: 'text-rose-400', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
  };

  const scoreGap = Math.max(0, profile.targetScore - profile.currentEstimatedScore);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-semibold tracking-wider text-blue-400">
              8. Sınıf LGS Hazırlık
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-500" />
            <span className="text-xs text-slate-400">Kişiselleştirilmiş Öğrenme</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Mentora&apos;ya tekrar hoş geldin, {profile.name} 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Bugün hedefine 1 adım daha yaklaşmak için sistem en verimli çalışma rotanı hesapladı.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <Link
            href="/student/practice"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border border-white/10 transition-colors"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Hızlı Pratik</span>
          </Link>
          <Link
            href="/student/tutor?skill=radicals"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Tutor&apos;a Sor</span>
          </Link>
        </div>
      </div>

      {/* Target & High-Yield Action Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LGS Target Card */}
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/[0.08]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
                  LGS Hedef Skoru
                </h2>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {profile.targetScore}+
              </span>
            </div>

            <div className="my-3">
              <div className="text-xs text-slate-400 mb-1">Mevcut Tahmini Seviye</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {profile.currentEstimatedScore}
                </span>
                <span className="text-sm text-slate-400 font-medium">
                  → {profile.targetScore}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mt-2">
              Hedefine ulaşmak için <span className="text-amber-400 font-semibold">{scoreGap} puanlık</span> bir
              gelişim alanı var. Rastgele soru çözmek yerine açık kazanıma odaklan.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
            <span className="text-slate-400">Çözülen Soru: {profile.questionsSolvedTotal}</span>
            <Link
              href="/student/target"
              className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 group"
            >
              Hedef Analizi
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Highest ROI Activity - Hero Banner */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 relative overflow-hidden border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Bugün için en yüksek getirili çalışma
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {recommendation.skillTitle}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.08]">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  {recommendation.timeMinutes} dk
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +{recommendation.expectedScoreImpact} puan potansiyeli
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mt-3 max-w-2xl">
              {recommendation.reason}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-xs text-slate-400">
              Öneri: {recommendation.suggestedAction}
            </span>
            <Link
              href={`/student/tutor?skill=${recommendation.skillId}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-indigo-500/25 transition-all"
            >
              <span>Bugünkü Derse Başla</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mastery Map & Error DNA Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Mastery Breakdown */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Öğrenme Haritan</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Kazanımların anlık ustalık seviyesi ve öncelik sıralaması
              </p>
            </div>
            <Link
              href="/student/map"
              className="text-xs font-medium text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
            >
              Haritanın Tamamı
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Skill Mastery Bars */}
          <div className="space-y-4">
            {highlightSkills.map((skill) => {
              const colors = getScoreColor(skill.masteryScore);
              return (
                <div key={skill.id} className="group">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {skill.title}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ({skill.category})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${colors.badge}`}>
                        {skill.masteryScore >= 80 ? 'Usta' : skill.masteryScore >= 65 ? 'Güçlü' : skill.masteryScore >= 45 ? 'Gelişiyor' : 'Kritik'}
                      </span>
                      <span className={`font-mono font-bold ${colors.text}`}>
                        %{skill.masteryScore}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
                    <div
                      className={`h-full ${colors.bar} rounded-full transition-all duration-700`}
                      style={{ width: `${skill.masteryScore}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error DNA Preview Card */}
        <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Dna className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base font-bold text-white">Hata DNA&apos;n</h2>
              </div>
              <Link
                href="/student/errors"
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                Detay
              </Link>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Son {errorDNA.totalAnalyzed} hatanın dağılımı:
            </p>

            {/* Error Distribution List */}
            <div className="space-y-3">
              {errorDNA.items.slice(0, 5).map((item) => (
                <div
                  key={item.type}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-white/[0.04] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs font-medium text-slate-200">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.trend === 'down' && (
                      <span className="text-[10px] text-emerald-400 font-medium">↓ {item.trendPercent}%</span>
                    )}
                    {item.trend === 'up' && (
                      <span className="text-[10px] text-rose-400 font-medium">↑ {item.trendPercent}%</span>
                    )}
                    <span className="text-xs font-bold text-white font-mono">
                      %{item.percentage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/[0.08]">
            <p className="text-[11px] text-slate-400 italic leading-relaxed">
              &quot;{errorDNA.weeklyInsight}&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Recent Developments Timeline */}
      <div className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Son Gelişmeler</h2>
          </div>
          <span className="text-xs text-slate-400">Son 7 günlük aktivite</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {timelineEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-xl bg-slate-900/50 border border-white/[0.06] flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-white block">
                  {event.skillTitle}
                </span>
                <span className="text-[11px] text-slate-400">{event.date}</span>
              </div>
              <span
                className={`text-sm font-bold font-mono px-2 py-0.5 rounded ${
                  event.change.startsWith('+')
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {event.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
