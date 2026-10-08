'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLearning } from '@/lib/state/learning-context';
import type { TutorMessage, ErrorType } from '@/types';
import {
  Sparkles,
  Send,
  HelpCircle,
  Lightbulb,
  Compass,
  RotateCcw,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BrainCircuit,
  MessageSquare,
  Bot,
  User,
} from 'lucide-react';

function TutorContent() {
  const searchParams = useSearchParams();
  const skillParam = searchParams.get('skill') || 'radicals';

  const { profile, skills, updateSkillScore, errorDNA } = useLearning();

  const currentSkill = skills.find((s) => s.id === skillParam) || skills.find((s) => s.id === 'radicals') || skills[0];

  // Initial Socratic conversation
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: 'm-1',
      role: 'assistant',
      content:
        'Merhaba Efe! Bugün Kareköklü İfadeler konusunu adım adım çözümleyeceğiz. Hazırsan başlayalım:\n\n√48 sayısını sadeleştirmeyi deneyelim. 48\'i içinde tam kare olan hangi iki sayının çarpımı şeklinde yazabiliriz?',
      intent: 'question',
      timestamp: new Date().toISOString(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionProgress, setSessionProgress] = useState(3);
  const [diagnosedMisconception, setDiagnosedMisconception] = useState<string | null>(
    'Tam kare çarpanı eksik çıkarma'
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend?: string, quickAction?: 'hint' | 'simplify' | 'example' | 'why') => {
    const userText = (textToSend || input).trim();
    if (!userText && !quickAction) return;

    const userMessage: TutorMessage = {
      id: `m-${Date.now()}`,
      role: 'user',
      content: quickAction
        ? quickAction === 'hint'
          ? 'Bana bir ipucu verebilir misin?'
          : quickAction === 'simplify'
          ? 'Bunu biraz daha basit anlatabilir misin?'
          : quickAction === 'example'
          ? 'Bununla ilgili bir örnek gösterebilir misin?'
          : 'Neden böyle yapıyoruz?'
        : userText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: profile.name,
          grade: profile.grade,
          skillTitle: currentSkill.title,
          skillMastery: currentSkill.masteryScore,
          currentQuestionText: '√48 sayısını a√b şeklinde yazma',
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          userPrompt: userText || quickAction || '',
          quickAction,
        }),
      });

      const data = await response.json();

      const assistantMessage: TutorMessage = {
        id: `m-${Date.now() + 1}`,
        role: 'assistant',
        content: data.message || 'Harika bir akıl yürütme. Şimdi sıradaki adıma geçelim.',
        intent: data.intent,
        diagnosedError: data.diagnosedError,
        masterySignal: data.masterySignal,
        nextAction: data.nextAction,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // If student reasons through or succeeds, advance progress and increase mastery!
      if (data.masterySignal && data.masterySignal >= 0.7) {
        setSessionProgress((prev) => Math.min(8, prev + 1));
        updateSkillScore(currentSkill.id, 8); // e.g. 43% -> 51%
      }

      if (data.diagnosedError) {
        setDiagnosedMisconception(
          data.diagnosedError === 'kavram_eksigi'
            ? 'Kavram eksiği: Tam kare çarpanı eksik çıkarma'
            : data.diagnosedError === 'islem_hatasi'
            ? 'İşlem hatası: İşaret veya çarpma kontrolü gerekli'
            : 'Dikkat hatası: Soru kökünü tekrar gözden geçir'
        );
      }
    } catch (err) {
      console.error('Tutor response error:', err);
      // Fallback response
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now() + 1}`,
          role: 'assistant',
          content: 'Güzel deneme! Adım adım düşünelim. 48 = 16 × 3. Buradan √16 kaç olur?',
          intent: 'question',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header & Session Progress */}
      <div className="glass-panel rounded-2xl p-5 border border-white/[0.08] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Bot className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
              Sokratesçi AI Eğitmen
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">{currentSkill.mebCode}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {currentSkill.title}
          </h1>
        </div>

        {/* Progress & Milestone */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Ders İlerlemesi</span>
            <span className="text-sm font-bold font-mono text-white">
              {sessionProgress} / 8 Adım
            </span>
          </div>
          <div className="w-28 h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${(sessionProgress / 8) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3-Column Layout: Left (Context) | Center (Chat) | Right (Diagnostic State) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Lesson Focus & Key Rules (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-panel rounded-2xl p-5 border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                Konu Odağı
              </h2>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-200 block">
                √a²b = a√b Kuralı
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kök içindeki sayının en büyük tam kare çarpanını bulup dışarı tek olarak alıyoruz.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.04] space-y-1.5 text-xs">
              <span className="font-mono text-slate-300 block">
                √48 = √(16 × 3)
              </span>
              <span className="font-mono text-blue-400 font-bold block">
                = √16 × √3 = 4√3
              </span>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <span className="font-medium text-slate-300 block">Unutma:</span>
              <p>
                Yapay zekâ sana cevabı doğrudan söylemez. Sorularıyla doğru adımı keşfetmeni sağlar.
              </p>
            </div>
          </div>
        </div>

        {/* Center Column: Socratic Chat Arena (6 cols) */}
        <div className="lg:col-span-6 glass-panel rounded-2xl border border-white/[0.08] flex flex-col h-[600px] overflow-hidden">
          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 rounded-br-none'
                      : 'bg-slate-900/90 text-slate-200 border border-white/[0.08] rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-white/[0.08] flex items-center justify-center text-slate-300 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-slate-900/80 border border-white/[0.08] text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse delay-200" />
                  <span>Sokratesçi Eğitmen düşünüyor...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Pill Bar */}
          <div className="px-4 py-2 border-t border-white/[0.06] bg-slate-950/40 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => handleSendMessage(undefined, 'hint')}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>İpucu</span>
            </button>
            <button
              onClick={() => handleSendMessage(undefined, 'simplify')}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08] transition-colors whitespace-nowrap"
            >
              Daha basit anlat
            </button>
            <button
              onClick={() => handleSendMessage(undefined, 'example')}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08] transition-colors whitespace-nowrap"
            >
              Örnek ver
            </button>
            <button
              onClick={() => handleSendMessage(undefined, 'why')}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08] transition-colors whitespace-nowrap"
            >
              Neden?
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-950/80 border-t border-white/[0.08] flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Cevabını veya akıl yürütmeni yaz..."
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white transition-all shadow-md shadow-blue-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Real-time Learning Context & Diagnostics (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Live Mastery Meter */}
          <div className="glass-panel rounded-2xl p-5 border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                Anlık Konu Ustalığı
              </span>
              <span className="text-lg font-bold font-mono text-emerald-400">
                %{currentSkill.masteryScore}
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${currentSkill.masteryScore}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Sokratesçi adımları doğru yanıtladıkça konunun ustalık puanı canlı olarak güncellenir.
            </p>
          </div>

          {/* Diagnosed Misconception Card */}
          <div className="glass-panel rounded-2xl p-5 border border-amber-500/20 bg-amber-500/[0.02] space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Teşhis Edilen Hata</span>
            </div>
            <p className="text-xs text-slate-200 font-medium">
              {diagnosedMisconception || 'Kavram eksiği: Tam kare çarpan'}
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Yapay zekâ bu adımda hata kökenini izole ediyor ve bir sonraki soruya aktarıyor.
            </p>
          </div>

          {/* Next Recommended Practice Action */}
          <div className="glass-panel rounded-2xl p-5 border border-white/[0.08] space-y-3">
            <span className="text-xs font-semibold text-slate-300 block">
              Pratik Aşama
            </span>
            <p className="text-xs text-slate-400">
              Bu Sokratik oturumu tamamladıktan sonra uyarlanabilir soru çözmeye geç.
            </p>
            <a
              href={`/student/practice?skill=${currentSkill.id}`}
              className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Pratik Sorularına Geç</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentTutorPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-400 text-sm">
          Yükleniyor...
        </div>
      }
    >
      <TutorContent />
    </Suspense>
  );
}
