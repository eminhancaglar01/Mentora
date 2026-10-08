'use client';

import React from 'react';
import Link from 'next/link';
import { useLearning } from '@/lib/state/learning-context';
import { Logo } from '@/components/brand/logo';
import {
  Users,
  Clock,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export default function ParentDashboardPage() {
  const { profile, parentSummary, skills } = useLearning();

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-white/[0.08] bg-slate-950/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo size="md" showTagline={false} />
          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Güvenli Veli Özeti
            </span>
            <Link
              href="/student/dashboard"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 border border-white/10 transition-colors"
            >
              Öğrenci Paneline Dön
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 space-y-8 w-full">
        {/* Hero Greeting & Philosophy */}
        <div className="border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Users className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Ebeveyn Rehberi
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {parentSummary.studentName}&apos;ın Haftalık Öğrenme Raporu
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Mentora, öğrencinin özel sohbet ve soru metinlerini teşhir etmeden, gelişim trendini ve yapıcı veli desteği noktalarını özetler.
          </p>
        </div>

        {/* 3 Key Parent Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Study Time */}
          <div className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Bu Hafta Toplam Odaklanma</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-white">
                4s 20dk
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Düzenli 25 dakikalık seanslar halinde çalıştı. Yorgunluk hissetmeden verimli tamamlandı.
            </p>
          </div>

          {/* Mastery Trend */}
          <div className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Genel Konu Ustalığı</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-emerald-400">
                %{parentSummary.masteryStartScore} → %{parentSummary.masteryCurrentScore}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Hafta başında tespit edilen eksiklikler Sokratik rehberlikle pekiştirildi.
            </p>
          </div>

          {/* Target Track */}
          <div className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>LGS Hedef Rotası</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-white">
                {profile.targetScore}+
              </span>
              <span className="text-xs text-slate-400">hedefli takip</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Tahmini skor seviyesi: <strong className="text-white">{profile.currentEstimatedScore}</strong> (İlerleme devam ediyor).
            </p>
          </div>
        </div>

        {/* Strengths & Growth Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Most Improved */}
          <div className="glass-panel rounded-2xl p-6 border border-emerald-500/20 bg-emerald-500/[0.02] space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>En Çok Gelişme Gösterdiği Konu</span>
            </div>
            <h2 className="text-lg font-bold text-white">
              {parentSummary.mostImprovedSkill}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Üslü İfadeler ve Cebirsel İfadelerde kavram kurallarını tam oturttu. Soru çözüm hızında %28 artış gözlemlendi.
            </p>
          </div>

          {/* Needs Attention */}
          <div className="glass-panel rounded-2xl p-6 border border-amber-500/20 bg-amber-500/[0.02] space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Destek Bekleyen Alan</span>
            </div>
            <h2 className="text-lg font-bold text-white">
              {parentSummary.needsAttentionSkill}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Karekök işlemlerinde acele etme eğiliminde. Bu bir yetenek eksikliği değil; ara basamakları yazma alışkanlığı ile çözülecek bir süreç.
            </p>
          </div>
        </div>

        {/* AI Pedagogical Parent Advice Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 space-y-4">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Yapay Zekâ Destekli Veli Tavsiyesi</span>
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight">
            &quot;Bu hafta çocuğunuzun problem çözme stratejilerine 30 dakika ayırması faydalı olabilir.&quot;
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {parentSummary.aiGuidanceNote}
          </p>

          <div className="pt-3 border-t border-white/[0.08] flex items-center gap-2 text-xs text-slate-400">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span>Ebeveyn İpucu: &quot;Kaç soru çözdün?&quot; yerine &quot;Bugün hangi konuda yeni bir kural keşfettin?&quot; sorusu öğrenci motivasyonunu artırır.</span>
          </div>
        </div>

        {/* Privacy & Safe Tech Guarantee */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] text-xs text-slate-400 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Gizlilik Notu:</strong> Mentora platformunda öğrenci verileri ticari reklam veya üçüncü şahıs profillemesi için kullanılmaz. Öğrencinin yapay zekâ eğitmenle olan özel soru-cevap geçmişi güvenli biçimde sadece kişiselleştirilmiş öğrenme için işlenir.
          </p>
        </div>
      </main>
    </div>
  );
}
