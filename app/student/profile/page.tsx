'use client';

import React, { useState } from 'react';
import { useLearning } from '@/lib/state/learning-context';
import {
  User,
  Target,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
} from 'lucide-react';

export default function StudentProfilePage() {
  const { profile, resetToDemo, setTargetScore } = useLearning();

  const [targetInput, setTargetInput] = useState(profile.targetScore);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setTargetScore(Number(targetInput));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="p-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <User className="w-4 h-4" />
          </span>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
            Öğrenci Profili
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Hesap ve Hedef Tercihleri
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Kişiselleştirilmiş LGS yol haritanı ve profil bilgilerini yönet.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold font-mono">
            {profile.name[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{profile.name}</h2>
            <span className="text-xs text-slate-400">
              {profile.grade}. Sınıf • LGS Adayı • Kayıt: Eylül 2026
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.04]">
            <span className="text-xs text-slate-400 block mb-1">Hedef Sınav</span>
            <span className="text-base font-bold text-white">LGS 2027</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.04]">
            <span className="text-xs text-slate-400 block mb-1">Mevcut Tahmini Seviye</span>
            <span className="text-base font-bold text-blue-400 font-mono">
              {profile.currentEstimatedScore} Puan
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.04]">
            <span className="text-xs text-slate-400 block mb-1">Çözülen Soru</span>
            <span className="text-base font-bold text-emerald-400 font-mono">
              {profile.questionsSolvedTotal} Soru
            </span>
          </div>
        </div>
      </div>

      {/* Target Setting */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-400" />
          LGS Hedef Skoru Ayarla
        </h3>

        <div className="flex items-center gap-4 max-w-xs">
          <input
            type="number"
            min={350}
            max={500}
            step={5}
            value={targetInput}
            onChange={(e) => setTargetInput(Number(e.target.value))}
            className="w-full bg-slate-900 border border-white/[0.1] rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shrink-0"
          >
            {isSaved ? 'Kaydedildi ✓' : 'Güncelle'}
          </button>
        </div>
      </div>

      {/* Demo Reset Card */}
      <div className="glass-panel rounded-2xl p-6 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Demo Durumunu Sıfırla</h3>
          <p className="text-xs text-slate-400 mt-1">
            Efe Yılmaz&apos;ın varsayılan 412 puanlık başlangıç verilerine ve hata geçmişine dön.
          </p>
        </div>

        <button
          onClick={resetToDemo}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Demo Verisini Sıfırla</span>
        </button>
      </div>
    </div>
  );
}
