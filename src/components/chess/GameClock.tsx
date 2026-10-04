'use client';

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface GameClockProps {
  timeInSeconds: number;
  isActive: boolean;
  isLowTime?: boolean;
  playerName: string;
  playerRating: number;
  avatarUrl?: string;
}

export function GameClock({
  timeInSeconds,
  isActive,
  playerName,
  playerRating,
  avatarUrl,
}: GameClockProps) {
  const formatTime = (secondsTotal: number) => {
    if (secondsTotal <= 0) return '00:00';
    const mins = Math.floor(secondsTotal / 60);
    const secs = Math.floor(secondsTotal % 60);
    const tenths = Math.floor((secondsTotal % 1) * 10);

    if (mins === 0 && secs < 20) {
      return `${secs.toString().padStart(2, '0')}.${tenths}`;
    }

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLow = timeInSeconds < 30;

  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-xl border transition-all duration-200 ${
        isActive
          ? 'bg-slate-800/90 border-amber-500 shadow-lg shadow-amber-500/10'
          : 'bg-[var(--bg-card)] border-[var(--border-color)] opacity-90'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden border border-slate-500/30">
          {avatarUrl ? (
            <img src={avatarUrl} alt={playerName} className="w-full h-full object-cover" />
          ) : (
            playerName.substring(0, 2).toUpperCase()
          )}
        </div>
        <div className="min-w-0">
          <div className="text-xs font-bold truncate text-[var(--text-primary)]">
            {playerName}
          </div>
          <div className="text-[10px] text-[var(--text-secondary)]">
            Rating: {playerRating}
          </div>
        </div>
      </div>

      {/* Clock Timer Display */}
      <div
        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-base font-extrabold transition-colors ${
          isActive
            ? isLow
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-amber-500 text-slate-950'
            : isLow
            ? 'bg-red-950/50 text-red-400 border border-red-500/30'
            : 'bg-slate-900 text-slate-300 border border-slate-800'
        }`}
      >
        <Clock className="w-4 h-4 shrink-0" />
        <span>{formatTime(timeInSeconds)}</span>
      </div>
    </div>
  );
}
