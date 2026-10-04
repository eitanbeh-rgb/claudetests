import { TimeCategory } from './chess';

export interface UserRatings {
  bullet: number;
  blitz: number;
  rapid: number;
  classical: number;
  puzzle: number;
}

export interface RatingStats {
  rating: number;
  highest: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  ratings: UserRatings;
  ratingStats: Record<TimeCategory | 'puzzle', RatingStats>;
  xp: number;
  level: number;
  puzzlePoints: number;
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string;
  equippedBoardSkin: string; // skin id
  equippedPieceSkin: string; // skin id
  theme: string;
  unlockedSkins: string[]; // skin ids
  achievements: string[]; // achievement ids
  createdAt: string;
}

export interface UserSettings {
  showLegalMoves: boolean;
  showCoordinates: boolean;
  highlightLastMove: boolean;
  confirmMoves: boolean;
  autoQueen: boolean;
  boardOrientation: 'white' | 'black' | 'auto';
  soundEnabled: boolean;
  theme: string;
  boardSkin: string;
  pieceSkin: string;
}
