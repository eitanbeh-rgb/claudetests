export type PuzzleCategory =
  | 'Checkmate'
  | 'Fork'
  | 'Pin'
  | 'Skewer'
  | 'Discovered Attack'
  | 'Sacrifice'
  | 'Defense'
  | 'Endgame'
  | 'Opening'
  | 'Tactics';

export interface Puzzle {
  id: string;
  fen: string;
  solution: string[]; // List of expected SAN or UCI moves
  rating: number;
  category: PuzzleCategory;
  points: number; // e.g. 10, 20, 30, 50
  description?: string;
  explanation?: string;
}

export interface PuzzleAttempt {
  id: string;
  userId: string;
  puzzleId: string;
  solved: boolean;
  pointsEarned: number;
  timeSpentSeconds: number;
  attemptedAt: string;
}
