'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ACHIEVEMENTS_LIST } from '@/lib/achievements/achievements';
import { Trophy, Award, CheckCircle2, Lock, Sparkles } from 'lucide-react';

export default function AchievementsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase">
            <Trophy className="w-4 h-4" /> Mastery Milestones
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
            Achievements & Trophies
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Unlock achievements through ranked victories, puzzle progression, and AI coaching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACHIEVEMENTS_LIST.map((ach) => (
            <div
              key={ach.id}
              className={`p-5 rounded-3xl border transition-all space-y-3 ${
                ach.unlocked
                  ? 'bg-[var(--bg-card)] border-amber-500/50 shadow-xl'
                  : 'bg-[var(--bg-main)] border-[var(--border-color)] opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${
                      ach.unlocked
                        ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {ach.unlocked ? <Award className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      {ach.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {ach.description}
                    </p>
                  </div>
                </div>

                {ach.unlocked && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-color)] text-[10px] font-extrabold uppercase">
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  +{ach.rewardXp} XP
                </span>
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  +{ach.rewardPoints} Puzzle Points
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
