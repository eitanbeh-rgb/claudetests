'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PuzzleBoard } from '@/components/puzzles/PuzzleBoard';
import { CURATED_PUZZLES } from '@/lib/puzzles/puzzles';
import { Repository } from '@/lib/storage/repository';
import { Puzzle, Filter } from 'lucide-react';

export default function PuzzlesPage() {
  const [profile, setProfile] = useState(() => Repository.getProfile());
  const [settings] = useState(() => Repository.getSettings());

  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Checkmate', 'Fork', 'Pin', 'Sacrifice', 'Tactics', 'Discovered Attack'];

  const filteredPuzzles = selectedCategory === 'All'
    ? CURATED_PUZZLES
    : CURATED_PUZZLES.filter((p) => p.category === selectedCategory);

  const activePuzzle = filteredPuzzles[currentPuzzleIdx % filteredPuzzles.length] || CURATED_PUZZLES[0];

  const handlePuzzleSolved = (pointsEarned: number) => {
    const updatedProfile = { ...profile };
    updatedProfile.puzzlePoints += pointsEarned;
    updatedProfile.ratings.puzzle += 12;
    updatedProfile.xp += 25;

    Repository.saveProfile(updatedProfile);
    setProfile(updatedProfile);
  };

  const handleNextPuzzle = () => {
    setCurrentPuzzleIdx((prev) => prev + 1);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase">
              <Puzzle className="w-4 h-4" /> Tactical Training Engine
            </div>
            <h1 className="text-2xl font-black text-[var(--text-primary)]">
              Chess Puzzles & Rewards
            </h1>
            <p className="text-xs text-[var(--text-secondary)]">
              Solve puzzles to earn points and unlock exclusive board and piece skins.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-center">
              <div className="text-[10px] text-[var(--text-secondary)] uppercase">Puzzle Rating</div>
              <div className="text-lg font-black text-amber-400">{profile.ratings.puzzle}</div>
            </div>
            <div className="p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-center">
              <div className="text-[10px] text-[var(--text-secondary)] uppercase">Puzzle Points</div>
              <div className="text-lg font-black text-indigo-400">{profile.puzzlePoints} PTS</div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-[var(--text-secondary)] shrink-0 ml-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPuzzleIdx(0);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Puzzle Component */}
        <PuzzleBoard
          puzzle={activePuzzle}
          onSolved={handlePuzzleSolved}
          onNextPuzzle={handleNextPuzzle}
          boardSkinId={settings.boardSkin}
          pieceSkinId={settings.pieceSkin}
        />
      </div>
    </MainLayout>
  );
}
