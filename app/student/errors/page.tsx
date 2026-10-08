'use client';

import React from 'react';
import Link from 'next/link';
import { useLearning } from '@/lib/state/learning-context';
import { ERROR_TYPE_DEFINITIONS } from '@/lib/learning/mastery';
import {
  Dna,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Sparkles,
} from 'lucide-react';

export default function ErrorDNAPage() {
  const { errorDNA, answers } = useLearning();

  const totalErrors = errorDNA.totalAnalyzed || 14;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header & Hero Statement */}
      <div className="border-b border-white/[0.08] pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Dna className="w-4 h-4" />
          </span>
          <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
            Bilişsel Hata Profili
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Hata DNA&apos;n
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed pt-1">
          &quot;Yanlışların sadece yanlış değil. Onlar nasıl öğrendiğini gösteren sinyaller.&quot;
        </p>
      </div>

      {/* Hero Stats Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">
            İncelenen Hata Sayısı
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-white">
              {totalErrors}
            </span>
            <span className="text-xs text-slate-400">öğrenme olayı</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            LGS tarzı çoktan seçmeli ve Sokratik adımlardan derlendi.
          </span>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">
            En Sık Karşılaşılan Kalıp
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-blue-400">
              {errorDNA.mostFrequentLabel}
            </span>
          </div>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-2 font-medium">
            <TrendingDown className="w-3.5 h-3.5" />
            Bu hafta %14 azaldı (İyileşme eğiliminde)
          </span>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">
            Teşhis İsabet Oranı
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-emerald-400">
              %94,2
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            Matematiksel mantık adımlarına dayalı sınıflandırma.
          </span>
        </div>
      </div>

      {/* Main Breakdown: Error Category Cards */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">
          Hata Dağılımın ve Nedenleri
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {errorDNA.items.map((item) => {
            const def = ERROR_TYPE_DEFINITIONS[item.type];

            return (
              <div
                key={item.type}
                className="glass-panel rounded-2xl p-6 border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-white/[0.15] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <h3 className="text-sm font-bold text-white">
                        {item.label}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.trend === 'down' && (
                        <span className="text-xs font-semibold text-emerald-400 flex items-center">
                          <TrendingDown className="w-3 h-3" />
                          %{item.trendPercent}
                        </span>
                      )}
                      {item.trend === 'up' && (
                        <span className="text-xs font-semibold text-rose-400 flex items-center">
                          <TrendingUp className="w-3 h-3" />
                          %{item.trendPercent}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-extrabold font-mono text-white">
                      %{item.percentage}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({item.count} soru)
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-4">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: item.color,
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {def.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] bg-slate-900/40 p-3 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-blue-400 block mb-1">
                    Kazanım Reçetesi:
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {def.advice}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Concrete Case Study & Recommendation Hero */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
              Kişisel İnceleme Örneği
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            &quot;Soruyu biliyorsun. Fakat işlem sırasında iki kez acele hatası yaptın.&quot;
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Kareköklü İfadelerde √75 ve √27 sadeleştirmesini doğru yaptın. Ancak son adımda 5 + 3 - 2 toplamasını yaparken hızlı davranıp 8 buldun. Bu kavram eksikliği değil, tamamen bir ara işlem kontrolü refleksi.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Link
              href="/student/tutor?skill=radicals"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Adım Adım Tutor ile Düzelt</span>
            </Link>
          </div>
        </div>

        {/* Weekly Action Plan */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/[0.08] space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Bu Hafta Ne Yapmalısın?
          </h3>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                1
              </span>
              <span>
                <strong>İşlem Kağıdı Tut:</strong> Soruları kafadan çözmek yerine ara adımları kareli deftere veya karalama alanına yaz.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                2
              </span>
              <span>
                <strong>Soru Kökünü Çiz:</strong> Dikkat hatalarını sıfırlamak için &quot;olamaz&quot;, &quot;en az&quot; kelimelerinin altını çiz.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                3
              </span>
              <span>
                <strong>Sokratesçi Eğitmenle Konuş:</strong> Haftada 3 kez 15&apos;er dakika AI Tutor ile akıl yürütme pratiği yap.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
