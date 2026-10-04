'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Swords,
  Bot,
  UserCheck,
  Zap,
  Flame,
  Clock,
  Shield,
  Sparkles,
  Play,
  Sliders,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { TimeControl, TimeCategory, GameMode } from '@/types/chess';
import { Repository } from '@/lib/storage/repository';

const timeControls: TimeControl[] = [
  { id: 'bullet_1_0', name: '1 min', category: 'bullet', initialSeconds: 60, incrementSeconds: 0 },
  { id: 'bullet_1_1', name: '1 + 1', category: 'bullet', initialSeconds: 60, incrementSeconds: 1 },
  { id: 'blitz_3_0', name: '3 min', category: 'blitz', initialSeconds: 180, incrementSeconds: 0 },
  { id: 'blitz_3_2', name: '3 + 2', category: 'blitz', initialSeconds: 180, incrementSeconds: 2 },
  { id: 'blitz_5_0', name: '5 min', category: 'blitz', initialSeconds: 300, incrementSeconds: 0 },
  { id: 'rapid_10_0', name: '10 min', category: 'rapid', initialSeconds: 600, incrementSeconds: 0 },
  { id: 'rapid_10_5', name: '10 + 5', category: 'rapid', initialSeconds: 600, incrementSeconds: 5 },
  { id: 'rapid_15_10', name: '15 + 10', category: 'rapid', initialSeconds: 900, incrementSeconds: 10 },
];

export default function PlaySetupPage() {
  const router = useRouter();
  const profile = Repository.getProfile();

  const [selectedTimeControl, setSelectedTimeControl] = useState<TimeControl>(timeControls[5]); // Default 10 min Rapid
  const [isRanked, setIsRanked] = useState<boolean>(true);
  const [gameMode, setGameMode] = useState<GameMode>('ranked');
  const [aiLevel, setAiLevel] = useState<number>(3); // Level 1-10

  const handleStartGame = () => {
    const params = new URLSearchParams({
      tc: selectedTimeControl.id,
      ranked: isRanked ? '1' : '0',
      mode: gameMode,
      aiLevel: aiLevel.toString(),
    });
    router.push(`/play/game?${params.toString()}`);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
            Create Match
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Select your game mode, rating stakes, and time control.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Setup Card */}
          <div className="lg:col-span-2 bg-[var(--bg-card)] rounded-3xl p-6 md:p-8 border border-[var(--border-color)] space-y-8 shadow-xl">
            {/* Game Type Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Game Mode
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setGameMode('ranked');
                    setIsRanked(true);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    gameMode === 'ranked'
                      ? 'bg-[var(--accent)] text-white border-transparent shadow-lg shadow-[var(--accent)]/20'
                      : 'bg-[var(--bg-main)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-slate-500'
                  }`}
                >
                  <Swords className="w-6 h-6 mb-2" />
                  <div className="font-extrabold text-sm">Online Match</div>
                  <div className="text-[10px] opacity-80">Ranked / Casual</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setGameMode('ai');
                    setIsRanked(false);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    gameMode === 'ai'
                      ? 'bg-[var(--accent)] text-white border-transparent shadow-lg shadow-[var(--accent)]/20'
                      : 'bg-[var(--bg-main)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-slate-500'
                  }`}
                >
                  <Bot className="w-6 h-6 mb-2" />
                  <div className="font-extrabold text-sm">Play vs AI</div>
                  <div className="text-[10px] opacity-80">Stockfish Engine</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setGameMode('friend');
                    setIsRanked(false);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    gameMode === 'friend'
                      ? 'bg-[var(--accent)] text-white border-transparent shadow-lg shadow-[var(--accent)]/20'
                      : 'bg-[var(--bg-main)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-slate-500'
                  }`}
                >
                  <UserCheck className="w-6 h-6 mb-2" />
                  <div className="font-extrabold text-sm">Pass & Play</div>
                  <div className="text-[10px] opacity-80">Play Locally</div>
                </button>
              </div>
            </div>

            {/* Ranked vs Casual Toggle */}
            {gameMode !== 'ai' && gameMode !== 'friend' && (
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Stakes
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsRanked(true)}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                      isRanked
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                        : 'bg-[var(--bg-main)] border-[var(--border-color)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <div className="text-left">
                      <div className="text-sm">Ranked Match</div>
                      <div className="text-[10px] opacity-80">Affects Elo rating</div>
                    </div>
                    <Shield className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRanked(false)}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                      !isRanked
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400 font-bold'
                        : 'bg-[var(--bg-main)] border-[var(--border-color)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <div className="text-left">
                      <div className="text-sm">Casual Practice</div>
                      <div className="text-[10px] opacity-80">No rating change</div>
                    </div>
                    <Clock className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* AI Difficulty Slider if VS AI selected */}
            {gameMode === 'ai' && (
              <div className="space-y-3 p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase text-[var(--text-secondary)]">
                    Stockfish Engine Difficulty
                  </label>
                  <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                    Level {aiLevel} (Approx. {700 + aiLevel * 150} Elo)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={aiLevel}
                  onChange={(e) => setAiLevel(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            )}

            {/* Time Control Grid */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Time Controls
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timeControls.map((tc) => {
                  const isSelected = selectedTimeControl.id === tc.id;
                  return (
                    <button
                      key={tc.id}
                      type="button"
                      onClick={() => setSelectedTimeControl(tc)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-extrabold shadow-md'
                          : 'bg-[var(--bg-main)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-slate-500'
                      }`}
                    >
                      <div className="text-sm">{tc.name}</div>
                      <div className="text-[10px] text-[var(--text-secondary)] capitalize">
                        {tc.category}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Play Button */}
            <button
              type="button"
              onClick={handleStartGame}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-base shadow-xl shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-white" /> Start Match
            </button>
          </div>

          {/* Side Overview / Player Card */}
          <div className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border-color)] space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                Match Configuration
              </h3>

              <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--text-secondary)]">Format:</span>
                  <span className="font-bold text-[var(--text-primary)] capitalize">
                    {selectedTimeControl.category} ({selectedTimeControl.name})
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--text-secondary)]">Stakes:</span>
                  <span className={`font-bold ${isRanked ? 'text-amber-400' : 'text-indigo-400'}`}>
                    {isRanked ? 'Ranked Match' : 'Casual Practice'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--text-secondary)]">Your Current Rating:</span>
                  <span className="font-extrabold text-[var(--text-primary)]">
                    {profile.ratings[selectedTimeControl.category]}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1 text-indigo-300">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" /> AI Coach Active
              </div>
              <div>
                Every move in this match will be automatically evaluated by Stockfish to generate post-game tactical insights.
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
