'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Trophy, Medal, Flame, Zap } from 'lucide-react';

const mockLeaderboard = [
  { rank: 1, username: 'GrandmasterForge', rating: 1850, wins: 42, streak: 8 },
  { rank: 2, username: 'StockfishSlayer', rating: 1720, wins: 38, streak: 5 },
  { rank: 3, username: 'TacticalWizard', rating: 1680, wins: 35, streak: 4 },
  { rank: 4, username: 'PawnPusher99', rating: 1540, wins: 29, streak: 2 },
  { rank: 5, username: 'KnightRider', rating: 1420, wins: 21, streak: 1 },
];

export default function LeaderboardPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase">
            <Trophy className="w-4 h-4" /> Global Standings
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
            ChessForge Leaderboard
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Top ranked players across Rapid and Blitz game modes.
          </p>
        </div>

        <div className="bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-xl">
          <div className="grid grid-cols-12 px-6 py-3 bg-[var(--bg-main)] border-b border-[var(--border-color)] text-xs font-extrabold uppercase text-[var(--text-secondary)]">
            <span className="col-span-2">Rank</span>
            <span className="col-span-5">Player</span>
            <span className="col-span-3 text-right">Rating</span>
            <span className="col-span-2 text-right">Wins</span>
          </div>

          <div className="divide-y divide-[var(--border-color)]">
            {mockLeaderboard.map((user) => (
              <div
                key={user.rank}
                className="grid grid-cols-12 items-center px-6 py-4 hover:bg-[var(--bg-main)] transition-colors text-sm font-semibold"
              >
                <div className="col-span-2 flex items-center gap-2 font-black">
                  {user.rank === 1 ? (
                    <Medal className="w-5 h-5 text-amber-400" />
                  ) : user.rank === 2 ? (
                    <Medal className="w-5 h-5 text-slate-300" />
                  ) : user.rank === 3 ? (
                    <Medal className="w-5 h-5 text-amber-600" />
                  ) : (
                    <span className="text-[var(--text-secondary)] ml-1">#{user.rank}</span>
                  )}
                </div>

                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                    {user.username.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[var(--text-primary)] font-bold">{user.username}</span>
                </div>

                <div className="col-span-3 text-right font-extrabold text-amber-400">
                  {user.rating}
                </div>

                <div className="col-span-2 text-right text-[var(--text-secondary)]">
                  {user.wins}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
