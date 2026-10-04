'use client';

import React from 'react';
import Link from 'next/link';
import {
  Swords,
  Bot,
  Puzzle,
  TrendingUp,
  Zap,
  Flame,
  Award,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Play,
  Brain,
  CheckCircle2,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Repository } from '@/lib/storage/repository';

export default function HomePage() {
  const profile = Repository.getProfile();

  const ratingsList = [
    { name: 'Rapid', rating: profile.ratings.rapid, icon: Zap, color: 'text-amber-400' },
    { name: 'Blitz', rating: profile.ratings.blitz, icon: Flame, color: 'text-orange-500' },
    { name: 'Bullet', rating: profile.ratings.bullet, icon: Swords, color: 'text-red-500' },
    { name: 'Puzzle Rating', rating: profile.ratings.puzzle, icon: Puzzle, color: 'text-indigo-400' },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Main Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-[var(--border-color)] p-6 md:p-10 shadow-2xl">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" /> Next-Gen AI Chess Platform
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Play Chess.{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                Learn from every mistake.
              </span>{' '}
              Improve.
            </h1>

            <p className="text-base md:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Forge your mastery with real-time Stockfish engine evaluation and personalized AI Chess Coaching. Track your weaknesses and rank up across all game formats.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/play"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Play className="w-5 h-5 fill-white" />
                Play Chess Now
              </Link>

              <Link
                href="/coach"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-200 border border-indigo-500/30 font-bold backdrop-blur-md transition-all hover:-translate-y-0.5"
              >
                <Bot className="w-5 h-5 text-indigo-400" />
                Train with AI Coach
              </Link>

              <Link
                href="/puzzles"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800/90 text-slate-200 border border-slate-700 font-bold transition-all hover:-translate-y-0.5"
              >
                <Puzzle className="w-5 h-5 text-emerald-400" />
                Solve Puzzles
              </Link>
            </div>
          </div>
        </div>

        {/* User Ratings Overview Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
              Your Chess Ratings
            </h2>
            <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
              Updated Realtime
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ratingsList.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-color)] space-y-2 hover:border-[var(--accent)] transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[var(--text-secondary)] uppercase">
                      {item.name}
                    </span>
                    <Icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <div className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
                    {item.rating}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Peak performance</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Learning Loop & Weakness Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Coach Core Differentiator Highlight */}
          <div className="lg:col-span-2 bg-[var(--bg-card)] rounded-3xl p-6 md:p-8 border border-[var(--border-color)] space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    AI Coach Diagnostics
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Realtime tactical & strategic analysis
                  </p>
                </div>
              </div>
              <Link
                href="/coach"
                className="text-xs font-bold text-[var(--accent)] hover:underline flex items-center gap-1"
              >
                View Full Diagnostics <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                  <CheckCircle2 className="w-4 h-4" /> Top Strengths
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 font-medium">
                  <li>• King safety during early middlegame</li>
                  <li>• Solid endgame pawn conversions</li>
                  <li>• Rapid tactical calculation (+85%)</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
                  <ShieldAlert className="w-4 h-4" /> Focus Areas
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 font-medium">
                  <li>• Moving Queen too early in opening</li>
                  <li>• Hanging minor pieces under time pressure</li>
                  <li>• Missed knight fork opportunities</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span>Recommended Drill: <strong className="text-white">Opening Development & Queen Safety</strong></span>
              <Link
                href="/learn"
                className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white font-semibold hover:opacity-90"
              >
                Start Drill
              </Link>
            </div>
          </div>

          {/* Quick Streak & Progress */}
          <div className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border-color)] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Level Progression
                </h3>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                  Lvl {profile.level}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-[var(--text-secondary)]">
                  <span>XP Progress</span>
                  <span>{profile.xp} / 500 XP</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${(profile.xp / 500) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">
                    Next Cosmetic Reward
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    Galaxy Board Skin (Requires 500 XP)
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/skins"
              className="w-full text-center py-2.5 rounded-xl border border-[var(--border-color)] text-xs font-bold hover:bg-[var(--bg-main)] transition-colors"
            >
              Browse Cosmetic Shop
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
