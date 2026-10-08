'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLearning } from '@/lib/state/learning-context';
import type { Skill, SkillCategory, MasteryStatus } from '@/types';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  Sparkles,
  BrainCircuit,
  Filter,
  Info,
  Layers,
  ChevronRight,
  TrendingUp,
  X,
} from 'lucide-react';

export default function MasteryMapPage() {
  const { skills, errorDNA } = useLearning();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'Tümü'>('Tümü');
  const [activeSkill, setActiveSkill] = useState<Skill | null>(
    skills.find((s) => s.id === 'radicals') || skills[0]
  );

  const categories: SkillCategory[] = ['Sayılar', 'Cebir', 'Veri & Olasılık', 'Geometri'];

  const filteredSkills = selectedCategory === 'Tümü'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  const getStatusBadge = (status: MasteryStatus, score: number) => {
    switch (status) {
      case 'mastered':
        return {
          label: 'Ustalaşıldı',
          badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          dotColor: 'bg-emerald-400',
          borderClass: 'border-emerald-500/30 hover:border-emerald-400',
          glow: 'shadow-emerald-500/10',
        };
      case 'strong':
        return {
          label: 'Güçlü',
          badgeClass: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          dotColor: 'bg-blue-400',
          borderClass: 'border-blue-500/30 hover:border-blue-400',
          glow: 'shadow-blue-500/10',
        };
      case 'developing':
        return {
          label: 'Gelişiyor',
          badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          dotColor: 'bg-amber-400',
          borderClass: 'border-amber-500/30 hover:border-amber-400',
          glow: 'shadow-amber-500/10',
        };
      case 'at-risk':
        return {
          label: 'Kritik Açık',
          badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          dotColor: 'bg-rose-400',
          borderClass: 'border-rose-500/40 hover:border-rose-400 animate-pulse-subtle',
          glow: 'shadow-rose-500/20',
        };
      default:
        return {
          label: 'Kilitli',
          badgeClass: 'bg-slate-700/30 text-slate-400 border-slate-700',
          dotColor: 'bg-slate-500',
          borderClass: 'border-slate-800',
          glow: '',
        };
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
              Kazanım Grafiği
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Öğrenme Haritan
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Henüz öğrenmediğin değil, sıradaki en doğru adımın önemli.
          </p>
        </div>

        {/* Legend / Status explanation */}
        <div className="flex flex-wrap items-center gap-2 text-xs bg-slate-900/60 p-2 rounded-xl border border-white/[0.06]">
          <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Usta (≥%85)
          </span>
          <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Güçlü (%70-84)
          </span>
          <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Gelişiyor (%45-69)
          </span>
          <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Risk Altında (&lt;%45)
          </span>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('Tümü')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'Tümü'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
          }`}
        >
          Tüm Alanlar ({skills.length})
        </button>
        {categories.map((cat) => {
          const count = skills.filter((s) => s.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Main Graph Grid with Side Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Visual Graph Area (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          {categories
            .filter((c) => selectedCategory === 'Tümü' || selectedCategory === c)
            .map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              return (
                <div
                  key={cat}
                  className="glass-panel rounded-2xl p-5 border border-white/[0.08] relative"
                >
                  {/* Category branch header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                        {cat}
                      </h2>
                    </div>
                    <span className="text-xs text-slate-400">
                      Ort. Ustalık: %
                      {Math.round(
                        catSkills.reduce((a, b) => a + b.masteryScore, 0) / catSkills.length
                      )}
                    </span>
                  </div>

                  {/* Skills nodes in this category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {catSkills.map((skill) => {
                      const isSelected = activeSkill?.id === skill.id;
                      const statusStyle = getStatusBadge(skill.status, skill.masteryScore);

                      return (
                        <div
                          key={skill.id}
                          onClick={() => setActiveSkill(skill)}
                          className={`p-4 rounded-xl cursor-pointer transition-all border relative overflow-hidden ${
                            isSelected
                              ? 'bg-slate-800/90 border-blue-500 shadow-lg shadow-blue-500/15 ring-1 ring-blue-500/50'
                              : `bg-slate-900/60 ${statusStyle.borderClass} hover:bg-slate-800/50`
                          }`}
                        >
                          {/* Connection line indicator */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-[10px] font-mono text-slate-400">
                              {skill.mebCode}
                            </span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${statusStyle.badgeClass}`}
                            >
                              {statusStyle.label}
                            </span>
                          </div>

                          <h3 className="text-xs font-bold text-white leading-tight mb-3">
                            {skill.title}
                          </h3>

                          {/* Mini Progress */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-400">Ustalık</span>
                              <span className="font-mono font-bold text-white">
                                %{skill.masteryScore}
                              </span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className={`h-full ${
                                  skill.masteryScore >= 80
                                    ? 'bg-emerald-500'
                                    : skill.masteryScore >= 65
                                    ? 'bg-blue-500'
                                    : skill.masteryScore >= 45
                                    ? 'bg-amber-500'
                                    : 'bg-rose-500'
                                } rounded-full transition-all duration-500`}
                                style={{ width: `${skill.masteryScore}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Selected Skill Detail Side Panel */}
        {activeSkill && (
          <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] sticky top-20 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {activeSkill.mebCode} • {activeSkill.category}
                </span>
                <h2 className="text-lg font-bold text-white mt-2">
                  {activeSkill.title}
                </h2>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeSkill.description}
            </p>

            {/* Score & Status Card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Kazanım Ustalığı</span>
                <span className="text-xl font-extrabold font-mono text-white">
                  %{activeSkill.masteryScore}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full ${
                    activeSkill.masteryScore >= 80
                      ? 'bg-emerald-500'
                      : activeSkill.masteryScore >= 65
                      ? 'bg-blue-500'
                      : activeSkill.masteryScore >= 45
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  } rounded-full`}
                  style={{ width: `${activeSkill.masteryScore}%` }}
                />
              </div>

              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-slate-400">
                <span>LGS Soru Havuzu: {activeSkill.questionsCount} Soru</span>
                <span className="text-blue-400 font-medium">8. Sınıf MEB</span>
              </div>
            </div>

            {/* Common Misconception Insight */}
            <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 space-y-1.5">
              <div className="flex items-center gap-1.5 text-indigo-300 text-xs font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Bu Konudaki En Yaygın Hatan:</span>
              </div>
              <p className="text-xs text-slate-300">
                {activeSkill.id === 'radicals'
                  ? 'Kavram eksiği: Kökün içindeki tam kare çarpanı sonuna kadar dışarı çıkarmamak.'
                  : activeSkill.id === 'algebraic-expressions'
                  ? 'Tam kare açılımında ortadaki 2ab terimini unutmak.'
                  : 'İşlem basamaklarını atlama ve işaret kaymaları.'}
              </p>
            </div>

            {/* Recommended Action */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Önerilen Aksiyon
              </span>
              <p className="text-xs font-medium text-slate-200">
                {activeSkill.masteryScore < 60
                  ? '10 dk Sokratesçi AI Eğitmen + 5 Uyarlanabilir Soru'
                  : '3 Zorluk Seviyeli LGS Pratik Sorusu Çöz'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <Link
                href={`/student/tutor?skill=${activeSkill.id}`}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Tutor ile Öğrenmeye Başla</span>
              </Link>
              <Link
                href={`/student/practice?skill=${activeSkill.id}`}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <BrainCircuit className="w-4 h-4 text-emerald-400" />
                <span>Bu Konudan Soru Çöz</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
