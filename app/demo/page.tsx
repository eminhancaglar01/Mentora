'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLearning } from '@/lib/state/learning-context';
import { Logo } from '@/components/brand/logo';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  BrainCircuit,
  Target,
  Dna,
} from 'lucide-react';

export default function DemoPage() {
  const router = useRouter();
  const { profile, resetToDemo } = useLearning();

  const handleStartDemo = () => {
    resetToDemo();
    router.push('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between pb-6">
        <Logo size="md" showTagline={false} />
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Canlı Jüri & Demo Modu
        </span>
      </div>

      {/* Main Card */}
      <div className="max-w-xl mx-auto w-full my-auto space-y-6">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] relative overflow-hidden space-y-6 text-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Mentora Demo Öğrenci
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
              Kayıt veya şifre gerekmeden, hazır analizleri ve soru geçmişi olan kurgusal öğrencimiz <strong>Efe Yılmaz</strong> ile platformu test edin.
            </p>
          </div>

          {/* Student Profile Card Preview */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.08] text-left space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div>
                <span className="text-sm font-bold text-white block">Efe Yılmaz</span>
                <span className="text-xs text-slate-400">8. Sınıf • LGS Hazırlık</span>
              </div>
              <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Hedef: 450+
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-slate-400">
                Mevcut Tahmini Seviye: <strong className="text-white font-mono">412 Puan</strong>
              </div>
              <div className="text-slate-400">
                En Yüksek Getirili Konu: <strong className="text-amber-400">Kareköklü İfadeler</strong>
              </div>
              <div className="text-slate-400">
                Ana Hata Kalıbı: <strong className="text-blue-400">İşlem Hatası (%35)</strong>
              </div>
              <div className="text-slate-400">
                Çözülen Soru Sayısı: <strong className="text-emerald-400 font-mono">78 Soru</strong>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleStartDemo}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Demo Öğrenciyle Başla</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                resetToDemo();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Demo Verisini Sıfırla</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-2xl mx-auto w-full pt-6 text-center text-xs text-slate-500">
        Mentora • Türkiye için kişiselleştirilmiş öğrenme
      </div>
    </div>
  );
}
