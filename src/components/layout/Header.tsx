'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Trophy, Zap, Sparkles, User } from 'lucide-react';
import { Repository } from '@/lib/storage/repository';

export function Header() {
  const profile = Repository.getProfile();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md px-4 md:px-6 flex items-center justify-between transition-colors duration-200">
      {/* Mobile Brand Logo */}
      <div className="flex items-center gap-2 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-extrabold tracking-wider bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
            CHESSFORGE
          </span>
        </Link>
      </div>

      {/* Header Stats Bar */}
      <div className="hidden sm:flex items-center gap-3 ml-auto md:ml-0">
        {/* Streak */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold">
          <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>{profile.currentStreak} Day Streak</span>
        </div>

        {/* Puzzle Points */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
          <Trophy className="w-4 h-4 text-indigo-400" />
          <span>{profile.puzzlePoints} PTS</span>
        </div>

        {/* Level */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Lvl {profile.level}</span>
        </div>
      </div>

      {/* User Profile Quick Access */}
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-[var(--bg-main)] border border-transparent hover:border-[var(--border-color)] transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            {profile.username.substring(0, 2).toUpperCase()}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-[var(--text-primary)] leading-tight">
              {profile.username}
            </div>
            <div className="text-[10px] text-[var(--text-secondary)]">
              {profile.ratings.rapid} Rapid
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
