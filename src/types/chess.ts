export type TimeCategory = 'bullet' | 'blitz' | 'rapid' | 'classical';

export type GameMode = 'ranked' | 'casual' | 'ai' | 'friend' | 'coach';

export type GameStatus = 'setup' | 'in_progress' | 'checkmate' | 'stalemate' | 'draw' | 'resignation' | 'timeout' | 'abandoned';

export type PieceColor = 'w' | 'b';

export interface TimeControl {
  id: string;
  name: string;
  category: TimeCategory;
  initialSeconds: number;
  incrementSeconds: number;
}

export interface PlayerInfo {
  id: string;
  name: string;
  rating: number;
  avatarUrl?: string;
  isAi?: boolean;
  aiDifficulty?: number; // 1 - 10
}

export interface MoveAnalysis {
  san: string;
  from: string;
  to: string;
  evalBefore?: number;
  evalAfter?: number;
  bestMove?: string;
  classification?: 'brilliant' | 'great' | 'best' | 'excellent' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';
  commentary?: string;
}

export interface GameState {
  id: string;
  fen: string;
  pgn: string;
  history: string[]; // SAN moves
  moveDetails: MoveAnalysis[];
  white: PlayerInfo;
  black: PlayerInfo;
  turn: PieceColor;
  timeControl: TimeControl;
  whiteTime: number; // in seconds or ms
  blackTime: number;
  mode: GameMode;
  isRanked: boolean;
  status: GameStatus;
  winner?: PieceColor | 'draw';
  winReason?: string;
  ratingChangeWhite?: number;
  ratingChangeBlack?: number;
  accuracyWhite?: number;
  accuracyBlack?: number;
  createdAt: string;
  endedAt?: string;
}

export interface CapturedPiecesMap {
  w: { p: number; n: number; b: number; r: number; q: number };
  b: { p: number; n: number; b: number; r: number; q: number };
}
