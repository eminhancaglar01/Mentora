import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export function Logo({ className = '', size = 'md', showTagline = false }: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Abstract 'K' Progress Mark */}
      <div
        className={`${iconSizes[size]} relative rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-indigo-700 p-0.5 shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow duration-300 flex items-center justify-center`}
      >
        <div className="w-full h-full bg-slate-950/80 rounded-[10px] flex items-center justify-center backdrop-blur-sm relative overflow-hidden">
          {/* Subtle light streak */}
          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 pointer-events-none" />

          {/* Minimal Geometric M with mentor calibration point */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5/6 h-5/6 text-white"
          >
            <path
              d="M5 19V6L12 13L19 6V19"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Calibration / mentor spark point */}
            <circle cx="12" cy="13" r="2" fill="#38BDF8" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`font-bold tracking-tight text-white font-sans ${textSizes[size]}`}>
            MENTORA
          </span>
          <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            LGS AI
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] text-slate-400 tracking-tight">
            Daha çok soru değil. Daha doğru öğrenme.
          </span>
        )}
      </div>
    </Link>
  );
}
