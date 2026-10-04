'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Chess, Square, Move } from 'chess.js';
import { PieceColor } from '@/types/chess';
import { PieceIcon } from './PieceIcon';
import { BOARD_SKINS } from '@/lib/skins/skins';

interface ChessBoardProps {
  game: Chess;
  orientation?: PieceColor;
  onMove?: (from: Square, to: Square, promotion?: string) => boolean;
  lastMove?: { from: Square; to: Square } | null;
  boardSkinId?: string;
  pieceSkinId?: string;
  showLegalMoves?: boolean;
  showCoordinates?: boolean;
  disabled?: boolean;
}

export function ChessBoard({
  game,
  orientation = 'w',
  onMove,
  lastMove,
  boardSkinId = 'classic_wood',
  pieceSkinId = 'classic_standard',
  showLegalMoves = true,
  showCoordinates = true,
  disabled = false,
}: ChessBoardProps) {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalSquares, setLegalSquares] = useState<Square[]>([]);
  const [pendingPromotion, setPendingPromotion] = useState<{ from: Square; to: Square } | null>(null);

  const activeBoardSkin = useMemo(
    () => BOARD_SKINS.find((s) => s.id === boardSkinId) || BOARD_SKINS[0],
    [boardSkinId]
  );

  const boardArray = useMemo(() => game.board(), [game.fen()]);

  // Find King in check
  const inCheckSquare = useMemo(() => {
    if (!game.inCheck()) return null;
    const turn = game.turn();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = boardArray[r][c];
        if (piece && piece.type === 'k' && piece.color === turn) {
          const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
          return `${files[c]}${8 - r}` as Square;
        }
      }
    }
    return null;
  }, [game.fen(), boardArray]);

  // Compute legal moves when a square is clicked
  const handleSquareClick = useCallback(
    (square: Square) => {
      if (disabled) return;

      // If already selecting promotion, don't allow square selection
      if (pendingPromotion) return;

      if (selectedSquare) {
        if (selectedSquare === square) {
          // Deselect
          setSelectedSquare(null);
          setLegalSquares([]);
          return;
        }

        // Check if clicked square is a legal destination
        const isLegal = legalSquares.includes(square);

        if (isLegal) {
          // Check if this move is a pawn promotion
          const piece = game.get(selectedSquare);
          const isPawn = piece && piece.type === 'p';
          const isPromotionRank = (piece?.color === 'w' && square[1] === '8') || (piece?.color === 'b' && square[1] === '1');

          if (isPawn && isPromotionRank) {
            setPendingPromotion({ from: selectedSquare, to: square });
            return;
          }

          // Execute normal move
          if (onMove) {
            onMove(selectedSquare, square);
          }
          setSelectedSquare(null);
          setLegalSquares([]);
          return;
        }
      }

      // Try selecting a piece of the current turn's color
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
        const moves = game.moves({ square, verbose: true }) as Move[];
        setLegalSquares(moves.map((m) => m.to));
      } else {
        setSelectedSquare(null);
        setLegalSquares([]);
      }
    },
    [disabled, pendingPromotion, selectedSquare, legalSquares, game, onMove]
  );

  const handlePromotionChoice = (promotionPiece: 'q' | 'r' | 'b' | 'n') => {
    if (pendingPromotion && onMove) {
      onMove(pendingPromotion.from, pendingPromotion.to, promotionPiece);
    }
    setPendingPromotion(null);
    setSelectedSquare(null);
    setLegalSquares([]);
  };

  const files = orientation === 'w' ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] : ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
  const ranks = orientation === 'w' ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className={`relative w-full aspect-square max-w-[600px] mx-auto select-none rounded-2xl overflow-hidden shadow-2xl ${activeBoardSkin.borderStyle || 'border-4 border-[var(--board-border)]'}`}>
      {/* 8x8 Board Grid */}
      <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
        {ranks.map((rank, rankIdx) =>
          files.map((file, fileIdx) => {
            const square = `${file}${rank}` as Square;
            const isLight = (rankIdx + fileIdx) % 2 === 0;

            // In chess.js boardArray, index 0 is rank 8 and index 0 of row is file 'a'
            const boardRowIdx = 8 - rank;
            const boardColIdx = file.charCodeAt(0) - 97;
            const piece = boardArray[boardRowIdx]?.[boardColIdx];

            const isSelected = selectedSquare === square;
            const isLegalDestination = legalSquares.includes(square);
            const isLastMoveSquare = lastMove && (lastMove.from === square || lastMove.to === square);
            const isInCheck = inCheckSquare === square;

            return (
              <div
                key={square}
                onClick={() => handleSquareClick(square)}
                style={{
                  backgroundColor: isLight ? activeBoardSkin.boardLight : activeBoardSkin.boardDark,
                }}
                className="relative flex items-center justify-center cursor-pointer transition-colors"
              >
                {/* Last move highlight */}
                {isLastMoveSquare && (
                  <div className="absolute inset-0 bg-amber-400/35 pointer-events-none" />
                )}

                {/* Selected square highlight */}
                {isSelected && (
                  <div className="absolute inset-0 bg-yellow-300/50 ring-4 ring-yellow-400 pointer-events-none z-10" />
                )}

                {/* King check indicator */}
                {isInCheck && (
                  <div className="absolute inset-0 bg-red-600/60 ring-4 ring-red-600 animate-pulse pointer-events-none z-10" />
                )}

                {/* Piece Renderer */}
                {piece && (
                  <div className="w-4/5 h-4/5 z-20 transition-transform active:scale-95 pointer-events-none">
                    <PieceIcon
                      type={piece.type}
                      color={piece.color}
                      pieceSkinId={pieceSkinId}
                    />
                  </div>
                )}

                {/* Legal Move Marker */}
                {showLegalMoves && isLegalDestination && (
                  <div className="absolute z-30 pointer-events-none flex items-center justify-center">
                    {piece ? (
                      <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-emerald-400/80 rounded-full" />
                    ) : (
                      <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-emerald-400/70 rounded-full shadow-md" />
                    )}
                  </div>
                )}

                {/* Coordinates */}
                {showCoordinates && (
                  <>
                    {/* Rank Number on File A */}
                    {fileIdx === 0 && (
                      <span
                        className={`absolute top-0.5 left-1 text-[10px] md:text-xs font-bold ${
                          isLight ? 'text-slate-700' : 'text-slate-200'
                        }`}
                      >
                        {rank}
                      </span>
                    )}
                    {/* File Letter on Rank 1 */}
                    {rankIdx === 7 && (
                      <span
                        className={`absolute bottom-0.5 right-1 text-[10px] md:text-xs font-bold ${
                          isLight ? 'text-slate-700' : 'text-slate-200'
                        }`}
                      >
                        {file}
                      </span>
                    )}
                  </>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Pawn Promotion Modal Overlay */}
      {pendingPromotion && (
        <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 shadow-2xl space-y-3 text-center">
            <h3 className="text-sm font-bold text-white">Choose Promotion Piece</h3>
            <div className="flex gap-3">
              {(['q', 'r', 'b', 'n'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePromotionChoice(p)}
                  className="w-14 h-14 bg-slate-800 hover:bg-amber-500 rounded-xl border border-slate-700 hover:border-amber-400 flex items-center justify-center p-2 transition-all transform hover:scale-105"
                >
                  <PieceIcon type={p} color={game.turn()} pieceSkinId={pieceSkinId} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
