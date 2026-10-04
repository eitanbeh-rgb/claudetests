'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Repository } from '@/lib/storage/repository';
import { User, Trophy, Flame, Zap, Puzzle, Swords, Award, Shield, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const profile = Repository.getProfile();

  const stats = [
    { name: 'Rapid', rating: profile.ratings.rapid, peak: profile.ratingStats.rapid.highest, games: profile.ratingStats.rapid.gamesPlayed, wins: profile.ratingStats.rapid.wins },
    { name: 'Blitz', rating: profile.ratings.blitz, peak: profile.ratingStats.blitz.highest, games: profile.ratingStats.blitz.gamesPlayed, wins: profile.ratingStats.blitz.wins },
    { name: 'Bullet', rating: profile.ratings.bullet, peak: profile.ratingStats.bullet.highest, games: profile.ratingStats.bullet.gamesPlayed, wins: profile.ratingStats.bullet.wins },
    { name: 'Puzzle', rating: profile.ratings.puzzle, peak: profile.ratingStats.puzzle.highest, games: profile.ratingStats.puzzle.gamesPlayed, wins: profile.ratingStats.puzzle.wins },
  ];

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* User Banner Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 border border-[var(--border-color)] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-black text-white text-2xl shadow-xl shadow-orange-500/20 shrink-0 border-2 border-white/20">
              {profile.username.substring(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{profile.username}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
                  Lvl {profile.level} Player
                </span>
              </div>
              <p className="text-xs text-slate-300">Member since October 2024 • {profile.email}</p>
              <div className="flex items-center gap-3 pt-1 text-xs font-semibold text-amber-400">
                <span className="flex items-center gap-1">
                  <Flame className="w-4 h-4 fill-amber-500" /> {profile.currentStreak} Day Streak
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1 text-indigo-400">
                  <Trophy className="w-4 h-4" /> {profile.puzzlePoints} Puzzle PTS
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center min-w-[160px] shrink-0">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Peak Rapid Rating</div>
            <div className="text-2xl font-black text-amber-400">{profile.ratingStats.rapid.highest}</div>
          </div>
        </div>

        {/* Format Statistics Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-[var(--text-primary)]">
            Rating Performance Breakdown
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.name}
                className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-3"
              >
                <div className="flex justify-between items-center text-xs font-bold text-[var(--text-secondary)] uppercase">
                  <span>{s.name} Format</span>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-[var(--text-primary)]">{s.rating}</div>
                <div className="text-xs space-y-1 text-[var(--text-secondary)] border-t border-[var(--border-color)] pt-2">
                  <div className="flex justify-between">
                    <span>Highest:</span> <strong className="text-[var(--text-primary)]">{s.peak}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Games Played:</span> <strong className="text-[var(--text-primary)]">{s.games}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Victories:</span> <strong className="text-emerald-400">{s.wins}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
