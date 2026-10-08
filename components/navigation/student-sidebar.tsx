'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/logo';
import { useLearning } from '@/lib/state/learning-context';
import {
  LayoutDashboard,
  Compass,
  BotMessageSquare,
  Sparkles,
  Dna,
  Target,
  Users,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  GraduationCap,
} from 'lucide-react';

export function StudentSidebar() {
  const pathname = usePathname();
  const { profile, resetToDemo } = useLearning();

  const navigation = [
    {
      name: 'Ana Sayfa',
      href: '/student/dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'Öğrenme Haritası',
      href: '/student/map',
      icon: Compass,
      badge: 'Görsel',
    },
    {
      name: 'AI Tutor',
      href: '/student/tutor',
      icon: BotMessageSquare,
      badge: 'Sokratesçi',
      highlight: true,
    },
    {
      name: 'Uyarlanabilir Pratik',
      href: '/student/practice',
      icon: BrainCircuit,
      badge: null,
    },
    {
      name: 'Hata DNA\'sı',
      href: '/student/errors',
      icon: Dna,
      badge: 'Analiz',
    },
    {
      name: 'Hedef & LGS Planı',
      href: '/student/target',
      icon: Target,
      badge: null,
    },
    {
      name: 'Veli Görünümü',
      href: '/parent',
      icon: Users,
      badge: 'Güvenli',
    },
  ];

  const scoreGap = Math.max(0, profile.targetScore - profile.currentEstimatedScore);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-30 border-r border-white/[0.08] bg-[#0B0F17]/95 backdrop-blur-xl">
        {/* Brand header */}
        <div className="h-16 px-5 flex items-center border-b border-white/[0.08]">
          <Logo size="sm" showTagline={false} />
        </div>

        {/* Student Target Widget */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-slate-900/80 border border-white/[0.08] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">LGS Hedefi</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {profile.targetScore}+
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white tracking-tight">
                {profile.currentEstimatedScore}
              </span>
              <span className="text-xs text-slate-400">tahmini skor</span>
            </div>
            <span className="text-xs font-medium text-amber-400">
              -{scoreGap} puan
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  Math.round((profile.currentEstimatedScore / profile.targetScore) * 100)
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto pt-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-blue-400'
                        : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-white/[0.06] text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User profile & demo reset */}
        <div className="p-3 border-t border-white/[0.08]">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                {profile.name[0]}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">
                  {profile.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {profile.grade}. Sınıf • LGS
                </span>
              </div>
            </div>

            <button
              onClick={resetToDemo}
              title="Demo verisini sıfırla"
              className="p-1.5 rounded-md hover:bg-white/[0.08] text-slate-400 hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0B0F17]/95 border-t border-white/[0.08] backdrop-blur-xl px-2 py-1.5 flex items-center justify-around">
        <Link
          href="/student/dashboard"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium ${
            pathname === '/student/dashboard' ? 'text-blue-400' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Ana Sayfa</span>
        </Link>
        <Link
          href="/student/map"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium ${
            pathname === '/student/map' ? 'text-blue-400' : 'text-slate-400'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Harita</span>
        </Link>
        <Link
          href="/student/tutor"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-semibold text-blue-400`}
        >
          <div className="p-1.5 rounded-full bg-blue-600 text-white shadow-md shadow-blue-500/30">
            <BotMessageSquare className="w-4 h-4" />
          </div>
          <span>Tutor</span>
        </Link>
        <Link
          href="/student/practice"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium ${
            pathname === '/student/practice' ? 'text-blue-400' : 'text-slate-400'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          <span>Pratik</span>
        </Link>
        <Link
          href="/student/errors"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium ${
            pathname === '/student/errors' ? 'text-blue-400' : 'text-slate-400'
          }`}
        >
          <Dna className="w-4 h-4" />
          <span>Hata DNA</span>
        </Link>
      </nav>
    </>
  );
}
