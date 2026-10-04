'use client';

import React from 'react';
import {
  Trophy,
  Swords,
  Sparkles,
  RotateCcw,
  Home,
  Bot,
  Brain,
  TrendingUp,
} from 'lucide-react';

interface GameEndModalProps {
  isOpen: boolean;
  resultTitle: string; // "YOU WON!", "GAME DRAW", "DEFEAT"
  resultSubtitle: string; // "Checkmate", "Resignation", "Timeout"
  isWinner?: boolean;
  isDraw?: boolean;
  ratingChange?: number;
  newRating?: number;
  whiteAccuracy?: number;
  blackAccuracy?: number;
  onPlayAgain: () => void;
  onAnalyzeGame: () => void;
  onHome: () => void;
}

export function GameEndModal({
  isOpen,
  resultTitle,
  resultSubtitle,
  isWinner,
  isDraw,
  ratingChange = 0,
  newRating = 1200,
  whiteAccuracy = 85,
  blackAccuracy = 78,
  onPlayAgain,
  onAnalyzeGame,
  onHome,
}: GameEndModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-6 text-center relative overflow-hidden">
        {/* Glow Header Background */}
        <div
          className={`absolute top-0 left-0 right-0 h-32 -z-10 bg-gradient-to-b ${
            isWinner
              ? 'from-emerald-500/20 to-transparent'
              : isDraw
              ? 'from-amber-500/20 to-transparent'
              : 'from-red-500/20 to-transparent'
          }`}
        />

        {/* Badge Icon */}
        <div
          className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-lg ${
            isWinner
              ? 'bg-emerald-500 text-white shadow-emerald-500/30'
              : isDraw
              ? 'bg-amber-500 text-white shadow-amber-500/30'
              : 'bg-red-500 text-white shadow-red-500/30'
          }`}
        >
          {isWinner ? <Trophy className="w-8 h-8" /> : <Swords className="w-8 h-8" />}
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--text-primary)]">
            {resultTitle}
          </h2>
          <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
            {resultSubtitle}
          </p>
        </div>

        {/* Rating Change & Stats Box */}
        <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] space-y-3">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>Rating Impact</span>
            <span className="font-bold text-[var(--text-primary)]">New Rating: {newRating}</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-2xl font-black">
            {ratingChange >= 0 ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-6 h-6" /> +{ratingChange}
              </span>
            ) : (
              <span className="text-red-400">{ratingChange}</span>
            )}
          </div>

          {/* Accuracy Breakdown */}
          <div className="pt-2 border-t border-[var(--border-color)] grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
              <div className="text-[10px] text-[var(--text-secondary)]">White Accuracy</div>
              <div className="font-extrabold text-amber-400 text-sm">{whiteAccuracy}%</div>
            </div>
            <div className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]">
              <div className="text-[10px] text-[var(--text-secondary)]">Black Accuracy</div>
              <div className="font-extrabold text-indigo-400 text-sm">{blackAccuracy}%</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onAnalyzeGame}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all"
          >
            <Brain className="w-4 h-4" /> Coach Review & AI Analysis
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onPlayAgain}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-[var(--accent)] text-white font-bold text-xs hover:opacity-90 transition-opacity"
            >
              <RotateCcw className="w-4 h-4" /> Play Again
            </button>
            <button
              type="button"
              onClick={onHome}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-[var(--bg-main)] text-[var(--text-primary)] border border-[var(--border-color)] font-bold text-xs hover:bg-[var(--bg-card)] transition-colors"
            >
              <Home className="w-4 h-4" /> Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
