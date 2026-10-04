'use client';

import React from 'react';
import { PieceColor } from '@/types/chess';
import { PieceIcon } from './PieceIcon';

interface CapturedPiecesProps {
  captured: {
    w: { p: number; n: number; b: number; r: number; q: number };
    b: { p: number; n: number; b: number; r: number; q: number };
  };
  color: PieceColor; // Show pieces captured BY this player
  pieceSkinId?: string;
  materialAdvantage?: number;
}

export function CapturedPieces({ captured, color, pieceSkinId, materialAdvantage = 0 }: CapturedPiecesProps) {
  // If color === 'w', white captured black pieces
  const piecesToDisplay = color === 'w' ? captured.b : captured.w;
  const capturedColor: PieceColor = color === 'w' ? 'b' : 'w';

  const pieceOrder: Array<keyof typeof piecesToDisplay> = ['q', 'r', 'b', 'n', 'p'];

  return (
    <div className="flex items-center gap-2 min-h-6">
      <div className="flex items-center -space-x-1 overflow-x-auto py-0.5">
        {pieceOrder.map((pieceType) => {
          const count = piecesToDisplay[pieceType];
          if (count <= 0) return null;

          return (
            <div key={pieceType} className="flex items-center relative">
              {Array.from({ length: count }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-5 h-5 md:w-6 md:h-6 shrink-0 transform transition-transform hover:scale-125 hover:z-10"
                  style={{ marginLeft: idx > 0 ? '-10px' : '0px' }}
                >
                  <PieceIcon type={pieceType} color={capturedColor} pieceSkinId={pieceSkinId} />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {materialAdvantage > 0 && (
        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
          +{materialAdvantage}
        </span>
      )}
    </div>
  );
}
