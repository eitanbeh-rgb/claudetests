'use client';

import React from 'react';
import { Flag, Handshake, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface GameControlsProps {
  onResign: () => void;
  onOfferDraw: () => void;
  onFlipBoard: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isGameOver?: boolean;
  onNewGame?: () => void;
}

export function GameControls({
  onResign,
  onOfferDraw,
  onFlipBoard,
  soundEnabled,
  onToggleSound,
  isGameOver,
  onNewGame,
}: GameControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
      {isGameOver ? (
        <button
          type="button"
          onClick={onNewGame}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all"
        >
          <Sparkles className="w-4 h-4" /> Play New Game
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={onResign}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-xs transition-colors"
          >
            <Flag className="w-3.5 h-3.5" /> Resign
          </button>
          <button
            type="button"
            onClick={onOfferDraw}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-colors"
          >
            <Handshake className="w-3.5 h-3.5" /> Draw
          </button>
        </>
      )}

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onFlipBoard}
          className="p-2 rounded-xl bg-[var(--bg-main)] hover:bg-slate-700/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors"
          title="Flip Board"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onToggleSound}
          className="p-2 rounded-xl bg-[var(--bg-main)] hover:bg-slate-700/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors"
          title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>
      </div>
    </div>
  );
}
