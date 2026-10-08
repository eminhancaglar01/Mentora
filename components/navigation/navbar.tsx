'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/logo';
import { Sparkles, ArrowRight, Compass, ShieldAlert, BarChart3, Users } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0B0F17]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo size="md" showTagline={false} />

        {/* Public Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link
            href="/#nasil-calisir"
            className="hover:text-white transition-colors"
          >
            Nasıl Çalışır?
          </Link>
          <Link
            href="/student/map"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4 text-indigo-400" />
            Öğrenme Haritası
          </Link>
          <Link
            href="/student/errors"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Hata DNA'sı
          </Link>
          <Link
            href="/parent"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            Veli Görünümü
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/demo"
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-white/25 bg-slate-900/50 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Demo Öğrenci</span>
          </Link>
          <Link
            href="/onboarding"
            className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm shadow-blue-500/30 transition-all flex items-center gap-1"
          >
            <span>Ücretsiz Başla</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
