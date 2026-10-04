'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { GraduationCap, BookOpen, Target, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

const modules = [
  {
    title: 'Opening Development & Queen Safety',
    category: 'Opening Principles',
    description: 'Learn why moving the Queen early in the opening allows your opponent to gain development tempo.',
    difficulty: 'Beginner',
    duration: '10 mins',
  },
  {
    title: 'Tactical Patterns: Knight Forks & Pins',
    category: 'Tactics',
    description: 'Master double-attacks and pinning enemy pieces against higher value targets or the King.',
    difficulty: 'Intermediate',
    duration: '15 mins',
  },
  {
    title: 'Pawn Structure & Endgames',
    category: 'Endgame Mastery',
    description: 'Convert passed pawns and utilize King activity in late-game positions.',
    difficulty: 'Advanced',
    duration: '20 mins',
  },
];

export default function LearnPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase">
            <GraduationCap className="w-4 h-4" /> ChessForge Academy
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
            Weakness-Targeted Lessons
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Interactive courses directly connected to weaknesses detected by the AI Coach.
          </p>
        </div>

        <div className="space-y-4">
          {modules.map((mod) => (
            <div
              key={mod.title}
              className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-4 hover:border-[var(--accent)] transition-all shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  {mod.category}
                </span>
                <span className="text-xs font-semibold text-[var(--text-secondary)]">
                  {mod.difficulty} • {mod.duration}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{mod.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {mod.description}
                </p>
              </div>

              <Link
                href="/puzzles"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Start Training Module <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
