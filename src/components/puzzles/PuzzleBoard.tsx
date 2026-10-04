'use client';

import React, { useState, useEffect } from 'react';
import { Chess, Square } from 'chess.js';
import { Puzzle } from '@/types/puzzles';
import { ChessBoard } from '@/components/chess/ChessBoard';
import { CheckCircle2, XCircle, Lightbulb, RotateCcw, ArrowRight, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PuzzleBoardProps {
  puzzle: Puzzle;
  onSolved: (pointsEarned: number) => void;
  onNextPuzzle: () => void;
  boardSkinId?: string;
  pieceSkinId?: string;
}

export function PuzzleBoard({
  puzzle,
  onSolved,
  onNextPuzzle,
  boardSkinId = 'classic_wood',
  pieceSkinId = 'classic_standard',
}: PuzzleBoardProps) {
  const [game, setGame] = useState<Chess>(new Chess(puzzle.fen));
  const [currentMoveIdx, setCurrentMoveIdx] = useState<number>(0);
  const [status, setStatus] = useState<'solving' | 'correct' | 'failed'>('solving');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);

  useEffect(() => {
    setGame(new Chess(puzzle.fen));
    setCurrentMoveIdx(0);
    setStatus('solving');
    setShowHint(false);
    setLastMove(null);
  }, [puzzle]);

  const handleMove = (from: Square, to: Square, promotion?: string) => {
    if (status !== 'solving') return false;

    try {
      // Test move on a temporary copy to prevent corrupting state on wrong moves
      const tempGame = new Chess(game.fen());
      const expectedMoveSan = puzzle.solution[currentMoveIdx];
      const moveResult = tempGame.move({ from, to, promotion: promotion || 'q' });

      if (!moveResult) return false;

      // Check if player move matches expected SAN
      if (moveResult.san === expectedMoveSan) {
        setGame(tempGame);
        setLastMove({ from, to });

        if (currentMoveIdx + 1 >= puzzle.solution.length) {
          // Solved!
          setStatus('correct');
          try {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
          } catch {
            // Ignore if canvas-confetti fails
          }
          onSolved(puzzle.points);
        } else {
          // Automatic opponent response in multi-move puzzle
          const nextIdx = currentMoveIdx + 1;
          setCurrentMoveIdx(nextIdx);
          setTimeout(() => {
            const opponentMoveSan = puzzle.solution[nextIdx];
            if (opponentMoveSan) {
              tempGame.move(opponentMoveSan);
              setGame(new Chess(tempGame.fen()));
              setCurrentMoveIdx(nextIdx + 1);
            }
          }, 500);
        }
        return true;
      } else {
        // Failed move
        setStatus('failed');
        return false;
      }
    } catch {
      setStatus('failed');
      return false;
    }
  };

  const handleRetry = () => {
    setGame(new Chess(puzzle.fen));
    setCurrentMoveIdx(0);
    setStatus('solving');
    setShowHint(false);
    setLastMove(null);
  };

  return (
    <div className="space-y-6">
      {/* Puzzle Header Banner */}
      <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            <span>Category: {puzzle.category}</span> • <span>Rating: {puzzle.rating}</span>
          </div>
          <p className="text-sm font-bold text-[var(--text-primary)] mt-1">
            {puzzle.description || 'Find the best tactical continuation for White.'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-extrabold text-sm shrink-0">
          <Trophy className="w-4 h-4" />
          <span>+{puzzle.points} PTS</span>
        </div>
      </div>

      {/* Main Board Container */}
      <ChessBoard
        game={game}
        orientation="w"
        onMove={handleMove}
        lastMove={lastMove}
        boardSkinId={boardSkinId}
        pieceSkinId={pieceSkinId}
        disabled={status !== 'solving'}
      />

      {/* Result / Status Bar */}
      {status === 'correct' && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-3 animate-fadeIn">
          <div className="flex items-center gap-2 font-black text-base">
            <CheckCircle2 className="w-6 h-6" /> Puzzle Solved! (+{puzzle.points} Puzzle Points)
          </div>
          {puzzle.explanation && (
            <p className="text-xs text-slate-200">{puzzle.explanation}</p>
          )}
          <button
            type="button"
            onClick={onNextPuzzle}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            Next Tactical Puzzle <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {status === 'failed' && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 space-y-3 animate-fadeIn">
          <div className="flex items-center gap-2 font-black text-base">
            <XCircle className="w-6 h-6" /> Incorrect Move
          </div>
          <p className="text-xs text-slate-200">
            That move was not the optimal engine tactical line. Try again!
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleRetry}
              className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <button
              type="button"
              onClick={onNextPuzzle}
              className="flex-1 py-2.5 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--bg-card)] text-slate-200 border border-[var(--border-color)] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              Skip Puzzle <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {status === 'solving' && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowHint((prev) => !prev)}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline"
          >
            <Lightbulb className="w-4 h-4" /> {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>

          {showHint && (
            <span className="text-xs font-mono text-[var(--text-secondary)] italic">
              Expected first move starts with piece: {puzzle.solution[0]?.[0]}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
