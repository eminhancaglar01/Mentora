'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLearning } from '@/lib/state/learning-context';
import {
  Target,
  TrendingUp,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Sliders,
} from 'lucide-react';

export default function TargetOptimizerPage() {
  const { profile, skills, setTargetScore } = useLearning();

  const [sliderValue, setSliderValue] = useState(profile.targetScore);
  const [isPlanSaved, setIsPlanSaved] = useState(false);

  const gap = Math.max(0, profile.targetScore - profile.currentEstimatedScore);

  const highYieldAreas = [
    {
      title: 'Kareköklü İfadeler',
      category: 'Sayılar',
      currentMastery: 43,
      potentialImpact: '+9 puan',
      reason: 'LGS sınavında en az 3 doğrudan soru getirir. Buradaki her %15 artış net puanını doğrudan sıçratır.',
      href: '/student/tutor?skill=radicals',
    },
    {
      title: 'Doğrusal Denklemler & Eğim',
      category: 'Cebir',
      currentMastery: 67,
      potentialImpact: '+7 puan',
      reason: 'Yeni nesil LGS problem sorularının ve grafik okuma tablolarının temel taşıdır.',
      href: '/student/practice?skill=linear-equations',
    },
    {
      title: 'Basit Olayların Olasılığı',
      category: 'Veri & Olasılık',
      currentMastery: 81,
      potentialImpact: '+6 puan',
      reason: 'Soru kaçırma lüksünün olmadığı, 81%\'den 95%\'e çok hızlı çıkabilecek yüksek güvenli alan.',
      href: '/student/practice?skill=probability',
    },
  ];

  const handleUpdateTarget = (newTarget: number) => {
    setSliderValue(newTarget);
    setTargetScore(newTarget);
    setIsPlanSaved(true);
    setTimeout(() => setIsPlanSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Target className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
              LGS Skor Optimizer
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Hedef ve İlerleme Rotası
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Hedef puanına en hızlı ve en az eforla nasıl ulaşacağını matematiksel modelleme ile hesaplıyoruz.
          </p>
        </div>

        {/* Target Slider Selector */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-white/[0.08]">
          {[400, 425, 450, 475, 500].map((score) => (
            <button
              key={score}
              onClick={() => handleUpdateTarget(score)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                sliderValue === score
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {score}+
            </button>
          ))}
        </div>
      </div>

      {/* Target Trajectory Hero Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">
              Mevcut Tahmini Seviye
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold font-mono text-white">
                {profile.currentEstimatedScore}
              </span>
              <span className="text-xs text-slate-400">/ 500 Puan</span>
            </div>
          </div>

          <div className="text-center md:border-x md:border-white/[0.08] px-4">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide block mb-1">
              Kapatılacak Fark
            </span>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-extrabold font-mono text-amber-400">
                {gap}
              </span>
              <span className="text-xs text-amber-300">puan</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Yaklaşık 3-4 kilit MEB kazanımına eşdeğer
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide block mb-1">
              LGS Hedef Skoru
            </span>
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-4xl font-extrabold font-mono text-blue-400">
                {profile.targetScore}+
              </span>
            </div>
          </div>
        </div>

        {/* Trajectory Progress Bar */}
        <div className="mt-8 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Başlangıç (320)</span>
            <span className="text-white font-semibold">
              Mevcut: {profile.currentEstimatedScore}
            </span>
            <span className="text-blue-400 font-semibold">
              Hedef: {profile.targetScore}+
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(
                  100,
                  Math.round(
                    ((profile.currentEstimatedScore - 300) /
                      (profile.targetScore - 300)) *
                      100
                  )
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
          <span>* LGS tahmini skorları öğrencinin güncel kazanım çözümlerine göre modellenir; resmi sınav garantisi değildir.</span>
          {isPlanSaved && (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Hedef güncellendi
            </span>
          )}
        </div>
      </div>

      {/* Top 3 Highest ROI Improvement Areas */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white">
            En Yüksek Getirili 3 Alan
          </h2>
          <p className="text-xs text-slate-400">
            Her konuya eşit zaman harcamak yerine, hedef skoruna en yüksek katkıyı sağlayacak konular:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {highYieldAreas.map((area, idx) => (
            <div
              key={area.title}
              className="glass-panel rounded-2xl p-6 border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-blue-500/30 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 font-bold font-mono text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {area.potentialImpact}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                  {area.title}
                </h3>
                <span className="text-[11px] text-slate-400 block mb-2">
                  {area.category} • Mevcut Seviye: %{area.currentMastery}
                </span>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {area.reason}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <Link
                  href={area.href}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-white/[0.06] hover:bg-blue-600 text-white border border-white/10 hover:border-transparent flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Çalışmaya Başla</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Study Plan: Today / This Week / This Month */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base sm:text-lg font-bold text-white">
            Mentora LGS Çalışma Takvimi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-white/[0.06] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Bugün
            </span>
            <div className="text-xl font-extrabold text-white">25 Dakika</div>
            <p className="text-xs text-slate-400">
              10 dk Karekök Sokratik AI Eğitmen + 5 adet a√b uyarlanabilir soru.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-white/[0.06] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Bu Hafta
            </span>
            <div className="text-xl font-extrabold text-white">3 Kazanım</div>
            <p className="text-xs text-slate-400">
              Kareköklü İfadeler, Doğrusal Denklemler ve Üçgen Eşitsizliği açıklarını kapat.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/60 border border-white/[0.06] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Bu Ay
            </span>
            <div className="text-xl font-extrabold text-white">+24 Puan Artışı</div>
            <p className="text-xs text-slate-400">
              Düzenli 25 dk günlük plan takip edildiğinde hedeflenen model artışı.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
