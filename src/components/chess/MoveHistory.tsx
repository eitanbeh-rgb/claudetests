'use client';

import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface MoveHistoryProps {
  history: string[]; // SAN moves
  currentMoveIndex?: number;
  onSelectMove?: (index: number) => void;
}

export function MoveHistory({ history, currentMoveIndex, onSelectMove }: MoveHistoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new moves
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Pair history into turns (1. e4 e5, 2. Nf3 Nc6)
  const pairedMoves: { moveNumber: number; white: string; black?: string; whiteIdx: number; blackIdx?: number }[] = [];
  for (let i = 0; i < history.length; i += 2) {
    pairedMoves.push({
      moveNumber: Math.floor(i / 2) + 1,
      white: history[i],
      black: history[i + 1],
      whiteIdx: i,
      blackIdx: history[i + 1] ? i + 1 : undefined,
    });
  }

  return (
    <div className="flex flex-col h-full bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] overflow-hidden">
      <div className="px-4 py-2.5 bg-[var(--bg-main)] border-b border-[var(--border-color)] flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
          Move Notation ({history.length} moves)
        </span>
      </div>

      {/* Move History Table */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-2 space-y-0.5 text-xs font-mono">
        {pairedMoves.length === 0 ? (
          <div className="h-full flex items-center justify-center text-[var(--text-secondary)] italic">
            No moves played yet
          </div>
        ) : (
          pairedMoves.map((turn) => (
            <div key={turn.moveNumber} className="grid grid-cols-12 items-center py-1 px-2 rounded hover:bg-[var(--bg-main)] transition-colors">
              <span className="col-span-2 text-[var(--text-secondary)] font-semibold">
                {turn.moveNumber}.
              </span>
              <button
                type="button"
                onClick={() => onSelectMove?.(turn.whiteIdx)}
                className={`col-span-5 text-left px-2 py-0.5 rounded transition-all font-semibold ${
                  currentMoveIndex === turn.whiteIdx
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-[var(--text-primary)] hover:bg-slate-700/50'
                }`}
              >
                {turn.white}
              </button>
              {turn.black ? (
                <button
                  type="button"
                  onClick={() => turn.blackIdx !== undefined && onSelectMove?.(turn.blackIdx)}
                  className={`col-span-5 text-left px-2 py-0.5 rounded transition-all font-semibold ${
                    currentMoveIndex === turn.blackIdx
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-[var(--text-primary)] hover:bg-slate-700/50'
                  }`}
                >
                  {turn.black}
                </button>
              ) : (
                <span className="col-span-5" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Quick Move Navigation Bar */}
      <div className="px-3 py-2 bg-[var(--bg-main)] border-t border-[var(--border-color)] flex items-center justify-around">
        <button
          type="button"
          onClick={() => onSelectMove?.(-1)}
          disabled={history.length === 0}
          className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-secondary)] disabled:opacity-30"
          title="Start of game"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => currentMoveIndex !== undefined && onSelectMove?.(Math.max(-1, currentMoveIndex - 1))}
          disabled={history.length === 0 || currentMoveIndex === -1}
          className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-secondary)] disabled:opacity-30"
          title="Previous move"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => currentMoveIndex !== undefined && onSelectMove?.(Math.min(history.length - 1, currentMoveIndex + 1))}
          disabled={history.length === 0 || currentMoveIndex === history.length - 1}
          className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-secondary)] disabled:opacity-30"
          title="Next move"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onSelectMove?.(history.length - 1)}
          disabled={history.length === 0}
          className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-secondary)] disabled:opacity-30"
          title="Latest move"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
