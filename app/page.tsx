'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navigation/navbar';
import { Logo } from '@/components/brand/logo';
import {
  ArrowRight,
  Sparkles,
  Compass,
  Dna,
  Target,
  BotMessageSquare,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Zap,
  BarChart3,
  Users,
  Layers,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col selection:bg-blue-600/30">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden border-b border-white/[0.08]">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/15 to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/[0.1] text-xs font-semibold text-slate-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Türkiye&apos;nin İlk LGS Ustalık & Bilişsel Hata Teşhis Platformu</span>
          </div>

          {/* Main Title & Tagline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Daha çok soru değil.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300">
                Daha doğru öğrenme.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Yapay zekâ önce neyi bildiğini ve neyi bilmediğini bulur.
              Ardından sana özel bir LGS öğrenme rotası oluşturur.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Ücretsiz Başla</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/demo"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Demo Öğrenciyle İncele</span>
            </Link>
          </div>

          {/* Hero Visual Mockup: Dashboard Cockpit Preview */}
          <div className="pt-10 max-w-4xl mx-auto">
            <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-white/[0.12] shadow-2xl relative text-left">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-slate-400 font-mono ml-2">
                    mentora.app / student / dashboard
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  LGS 450+ Canlı Takip
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Metric 1 */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                  <span className="text-[11px] text-slate-400 block">Tahmini Seviye</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold font-mono text-white">412</span>
                    <span className="text-xs text-blue-400 font-medium">→ 450 Hedef</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                  <span className="text-[11px] text-slate-400 block">En Yüksek Getirili Konu</span>
                  <div className="text-sm font-bold text-amber-400 mt-1 truncate">
                    Kareköklü İfadeler
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">+9 puan potansiyeli</span>
                </div>

                {/* Metric 3 */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06]">
                  <span className="text-[11px] text-slate-400 block">Baskın Hata Tipi</span>
                  <div className="text-sm font-bold text-blue-400 mt-1 truncate">
                    İşlem Hatası (%35)
                  </div>
                  <span className="text-[10px] text-slate-400">Kavram eksikliği değil</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE PROBLEM */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Geleneksel Yaklaşımın Çıkmazı
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              &quot;Günde 100 soru çöz&quot; demek neden çalışmıyor?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Öğrenci bildiği konunun sorularını hızla çözer, yapamadığı konunun sorularına gelince takılıp motivasyon kaybeder. Sonuç: Saatler süren yorgunluk ve değişmeyen netler.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Asıl mesele daha fazla test çözmek değil; öğrencinin zihnindeki kavram yanılgısını ya da işlem alışkanlığını tespit etmektir.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] space-y-4">
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
              <strong className="block text-sm text-rose-200 mb-1">Geleneksel Model:</strong>
              &quot;İşte 100 soru. Yanlış yaparsan arkadaki cevaba bak ve geç.&quot;
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
              <strong className="block text-sm text-blue-200 mb-1">Mentora Modeli:</strong>
              &quot;Önce neyi bildiğini bulalım. Neden hata yaptığını teşhis edip sana özel adımlarla pekiştirelim.&quot;
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS (4 STEPS) */}
      <section id="nasil-calisir" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Döngüsel Öğrenme Modeli
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Önce teşhis. Sonra öğretim.
          </h2>
          <p className="text-sm text-slate-400">
            Mentora 4 aşamalı sürekli kalibrasyon ile öğrenciyi LGS hedefine ulaştırır.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] space-y-3 relative">
            <span className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 font-bold font-mono text-sm flex items-center justify-center">
              1
            </span>
            <h3 className="text-base font-bold text-white">Teşhis Et</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              10 soruluk seviye analiziyle 12 MEB kazanımındaki güçlü ve riskli alanları haritalandırır.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] space-y-3 relative">
            <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold font-mono text-sm flex items-center justify-center">
              2
            </span>
            <h3 className="text-base font-bold text-white">Sokratesçi Öğren</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cevabı hazır vermek yerine yönlendirici sorularla öğrencinin kendi kendine kavramasını sağlar.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] space-y-3 relative">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 font-bold font-mono text-sm flex items-center justify-center">
              3
            </span>
            <h3 className="text-base font-bold text-white">Uyarlanabilir Pratik</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Öğrencinin güncel ustalığına göre zorluğu 1&apos;den 5&apos;e otomatik ayarlanan LGS soruları sunar.
            </p>
          </div>

          {/* Step 4 */}
          <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] space-y-3 relative">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold font-mono text-sm flex items-center justify-center">
              4
            </span>
            <h3 className="text-base font-bold text-white">Ustalaş & İlerle</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Konu %85 barajını aştığında kilit açılır, en yüksek getirili sıradaki kazanıma geçilir.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: KEY DIFFERENTIATOR - ERROR DNA & SOCRATIC TUTOR */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="glass-panel rounded-3xl p-8 border border-white/[0.08] space-y-6">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Dna className="w-4 h-4" />
              <span>Fark Yaratan Özellik</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Hata DNA&apos;sı: Yanlışların rastgele değil.
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Bir sorunun yanlış çıkması &quot;öğrenci konuyu bilmiyor&quot; demek değildir. Mentora her hatayı 6 pedagojik kategoriye ayırır:
            </p>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <strong>İşlem Hatası:</strong> Formülü bilip adımlarda kayma.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <strong>Kavram Eksiği:</strong> Kuralın mantığının tam oturmaması.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <strong>Dikkat Hatası:</strong> &quot;Olamaz / en az&quot; ifadelerini atlama.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <strong>Strateji Hatası:</strong> Gereksiz uzun yöntem seçimi.
              </li>
            </ul>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-white/[0.08] space-y-6">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <BotMessageSquare className="w-4 h-4" />
              <span>Sokratesçi Eğitmen</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Cevabı hazır veren yapay zekâ öğrenmeyi öldürür.
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              ChatGPT gibi sohbet botları öğrenci yerine soruyu çözer. Mentora ise Sokrates gibi ipuçlarıyla düşünmeye zorlar:
            </p>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.08] space-y-2 text-xs">
              <div className="text-blue-400 font-semibold">
                AI Eğitmen: &quot;√48&apos;i sadeleştirelim. 48&apos;i içinde tam kare olan hangi iki sayının çarpımı şeklinde yazabiliriz?&quot;
              </div>
              <div className="text-slate-300">
                Öğrenci: &quot;16 × 3&quot;
              </div>
              <div className="text-blue-400 font-semibold">
                AI Eğitmen: &quot;Harika! Peki √16 kaç eder?&quot;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          LGS hedefine daha doğru bir rotayla ulaş.
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Hemen 10 soruluk mini analizle başla ya da örnek öğrenci profilimizle platformu test et.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/onboarding"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Öğrenme Haritanı Çıkar</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/demo"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all flex items-center justify-center gap-2"
          >
            <span>Demo Öğrenciyi Başlat</span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] py-8 bg-[#0B0F17]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <Logo size="sm" showTagline={false} />
          <p>
            Mentora • Türkiye için kişiselleştirilmiş öğrenme. MEB 8. Sınıf LGS Matematik dikeyinde hazırlanmıştır.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/parent" className="hover:text-slate-300 transition-colors">
              Veli Görünümü
            </Link>
            <Link href="/demo" className="hover:text-slate-300 transition-colors">
              Demo Modu
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
