'use client';

import React from 'react';
import { PieceColor } from '@/types/chess';

interface PieceIconProps {
  type: string; // p, n, b, r, q, k
  color: PieceColor; // w or b
  pieceSkinId?: string;
  className?: string;
}

export function PieceIcon({ type, color, pieceSkinId = 'classic_standard', className = 'w-full h-full' }: PieceIconProps) {
  const isWhite = color === 'w';

  // Distinct piece skin styling based on active piece skin ID
  const isCyber = pieceSkinId === 'cyber_glow';
  const isRoyal = pieceSkinId === 'royal_gold';
  const isMinimal = pieceSkinId === 'minimal_flat';

  let fillPrimary = isWhite ? '#FFFFFF' : '#1E293B';
  let strokePrimary = isWhite ? '#0F172A' : '#000000';

  if (isCyber) {
    fillPrimary = isWhite ? '#00F0FF' : '#FF007F';
    strokePrimary = isWhite ? '#0099A8' : '#99004C';
  } else if (isRoyal) {
    fillPrimary = isWhite ? '#FDE047' : '#4C1D95';
    strokePrimary = isWhite ? '#CA8A04' : '#2E1065';
  } else if (isMinimal) {
    fillPrimary = isWhite ? '#F8FAFC' : '#334155';
    strokePrimary = isWhite ? '#475569' : '#0F172A';
  }

  // Pure vector SVG renderers for all 6 chess pieces
  const renderSvgContent = () => {
    switch (type.toLowerCase()) {
      case 'p': // Pawn
        return (
          <g transform="translate(0, 0)">
            <path
              d="M 22 9 C 19.79 9 18 10.79 18 13 C 18 13.89 18.29 14.71 18.78 15.38 C 16.83 16.5 15.5 18.59 15.5 21 C 15.5 21.53 15.56 22.05 15.68 22.56 C 14.08 23.41 13 25.07 13 27 C 13 27.65 13.13 28.27 13.36 28.84 C 11.36 29.83 10 31.89 10 34.25 L 10 38 L 35 38 L 35 34.25 C 35 31.89 33.64 29.83 31.64 28.84 C 31.87 28.27 32 27.65 32 27 C 32 25.07 30.92 23.41 29.32 22.56 C 29.44 22.05 29.5 21.53 29.5 21 C 29.5 18.59 28.17 16.5 26.22 15.38 C 26.71 14.71 27 13.89 27 13 C 27 10.79 25.21 9 23 9 L 22 9 Z"
              fill={fillPrimary}
              stroke={strokePrimary}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'r': // Rook
        return (
          <g>
            <path
              d="M 9 39 L 36 39 L 36 36 L 9 36 Z M 12 36 L 12 32 L 33 32 L 33 36 Z M 11 32 L 11 17 L 14 17 L 14 28 L 19 28 L 19 17 L 22 17 L 22 28 L 23 28 L 23 17 L 26 17 L 26 28 L 31 28 L 31 17 L 34 17 L 34 32 Z M 9 17 L 9 9 L 14 9 L 14 13 L 19 13 L 19 9 L 26 9 L 26 13 L 31 13 L 31 9 L 36 9 L 36 17 Z"
              fill={fillPrimary}
              stroke={strokePrimary}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'n': // Knight
        return (
          <g>
            <path
              d="M 22 10 C 32.5 11 38.5 18 38 28 C 37.5 32 37 34 37 34 L 32.5 31.5 C 32.5 31.5 30.5 38.5 23 39 C 14 39.5 10 32.5 10 32.5 C 10 32.5 15.5 31 16.5 27 C 12 26 9 22.5 9 18 C 9 12 14 10 14 10 C 14 10 15.5 14 18.5 14.5 C 18.5 14.5 18.5 10.5 22 10 Z"
              fill={fillPrimary}
              stroke={strokePrimary}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="16" r="2" fill={strokePrimary} />
          </g>
        );

      case 'b': // Bishop
        return (
          <g>
            <path
              d="M 9 36 L 36 36 L 36 39 L 9 39 Z M 11 36 A 14.5 14.5 0 0 1 34 36 L 11 36 Z M 22.5 8 C 17.5 8 13.5 15 13.5 23 C 13.5 28 16.5 32 22.5 32 C 28.5 32 31.5 28 31.5 23 C 31.5 15 27.5 8 22.5 8 Z"
              fill={fillPrimary}
              stroke={strokePrimary}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle cx="22.5" cy="6" r="2.5" fill={fillPrimary} stroke={strokePrimary} strokeWidth="2" />
            <path d="M 20 18 L 25 18 M 22.5 15.5 L 22.5 22.5" stroke={strokePrimary} strokeWidth="2" />
          </g>
        );

      case 'q': // Queen
        return (
          <g>
            <path
              d="M 9 39 L 36 39 L 36 36 L 9 36 Z M 12 36 L 12 32 L 33 32 L 33 36 Z M 9 32 C 9 32 13 22 14 17 L 19 28 L 22.5 13 L 26 28 L 31 17 C 32 22 36 32 36 32 Z"
              fill={fillPrimary}
              stroke={strokePrimary}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="14" r="2" fill={fillPrimary} stroke={strokePrimary} strokeWidth="1.5" />
            <circle cx="14" cy="11" r="2" fill={fillPrimary} stroke={strokePrimary} strokeWidth="1.5" />
            <circle cx="22.5" cy="8" r="2.5" fill={fillPrimary} stroke={strokePrimary} strokeWidth="1.5" />
            <circle cx="31" cy="11" r="2" fill={fillPrimary} stroke={strokePrimary} strokeWidth="1.5" />
            <circle cx="36" cy="14" r="2" fill={fillPrimary} stroke={strokePrimary} strokeWidth="1.5" />
          </g>
        );

      case 'k': // King
        return (
          <g>
            <path
              d="M 9 39 L 36 39 L 36 36 L 9 36 Z M 12 36 L 12 32 L 33 32 L 33 36 Z M 11 32 C 11 32 11 23 16 19 C 18 22 27 22 29 19 C 34 23 34 32 34 32 Z"
              fill={fillPrimary}
              stroke={strokePrimary}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M 22.5 6 L 22.5 16 M 17.5 10 L 27.5 10"
              stroke={strokePrimary}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 45 45" className={className} xmlns="http://www.w3.org/2000/svg">
      {renderSvgContent()}
    </svg>
  );
}
