import { TimeCategory } from '@/types/chess';

export interface EloChangeResult {
  newRatingPlayer: number;
  newRatingOpponent: number;
  changePlayer: number;
  changeOpponent: number;
}

/**
 * Standard Elo Rating Calculator
 * K-factor: 32 for games < 30, 24 for games < 100, 16 afterwards
 */
export function calculateElo(
  ratingPlayer: number,
  ratingOpponent: number,
  scorePlayer: 1 | 0.5 | 0, // 1 = Win, 0.5 = Draw, 0 = Loss
  gamesPlayed: number = 0
): EloChangeResult {
  const K = gamesPlayed < 30 ? 32 : gamesPlayed < 100 ? 24 : 16;

  // Expected score calculation
  const expectedPlayer = 1 / (1 + Math.pow(10, (ratingOpponent - ratingPlayer) / 400));
  const expectedOpponent = 1 - expectedPlayer;

  const scoreOpponent = 1 - scorePlayer;

  const changePlayer = Math.round(K * (scorePlayer - expectedPlayer));
  const changeOpponent = Math.round(K * (scoreOpponent - expectedOpponent));

  const newRatingPlayer = Math.max(100, ratingPlayer + changePlayer);
  const newRatingOpponent = Math.max(100, ratingOpponent + changeOpponent);

  return {
    newRatingPlayer,
    newRatingOpponent,
    changePlayer,
    changeOpponent,
  };
}
