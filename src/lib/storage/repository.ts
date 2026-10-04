import { UserProfile, UserSettings } from '@/types/user';
import { GameState } from '@/types/chess';
import { PuzzleAttempt } from '@/types/puzzles';

const STORAGE_KEY_PROFILE = 'chessforge_user_profile';
const STORAGE_KEY_SETTINGS = 'chessforge_user_settings';
const STORAGE_KEY_GAMES = 'chessforge_user_games';
const STORAGE_KEY_PUZZLE_ATTEMPTS = 'chessforge_puzzle_attempts';

export const DEFAULT_PROFILE: UserProfile = {
  id: 'usr_default_guest',
  username: 'GrandmasterForge',
  email: 'player@chessforge.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  ratings: {
    bullet: 1200,
    blitz: 1200,
    rapid: 1200,
    classical: 1200,
    puzzle: 1000,
  },
  ratingStats: {
    bullet: { rating: 1200, highest: 1200, gamesPlayed: 0, wins: 0, losses: 0, draws: 0 },
    blitz: { rating: 1200, highest: 1200, gamesPlayed: 0, wins: 0, losses: 0, draws: 0 },
    rapid: { rating: 1200, highest: 1200, gamesPlayed: 0, wins: 0, losses: 0, draws: 0 },
    classical: { rating: 1200, highest: 1200, gamesPlayed: 0, wins: 0, losses: 0, draws: 0 },
    puzzle: { rating: 1000, highest: 1000, gamesPlayed: 0, wins: 0, losses: 0, draws: 0 },
  },
  xp: 350,
  level: 2,
  puzzlePoints: 120,
  currentStreak: 3,
  bestStreak: 7,
  lastActiveDate: new Date().toISOString().split('T')[0],
  equippedBoardSkin: 'classic_wood',
  equippedPieceSkin: 'classic_standard',
  theme: 'midnight',
  unlockedSkins: ['classic_wood', 'classic_standard', 'ocean_blue'],
  achievements: ['first_game', 'first_puzzle'],
  createdAt: new Date().toISOString(),
};

export const DEFAULT_SETTINGS: UserSettings = {
  showLegalMoves: true,
  showCoordinates: true,
  highlightLastMove: true,
  confirmMoves: false,
  autoQueen: true,
  boardOrientation: 'white',
  soundEnabled: true,
  theme: 'midnight',
  boardSkin: 'classic_wood',
  pieceSkin: 'classic_standard',
};

export class Repository {
  static getProfile(): UserProfile {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;
    try {
      const data = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (!data) {
        this.saveProfile(DEFAULT_PROFILE);
        return DEFAULT_PROFILE;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_PROFILE;
    }
  }

  static saveProfile(profile: UserProfile): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile to localStorage', e);
    }
  }

  static getSettings(): UserSettings {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    try {
      const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (!data) {
        this.saveSettings(DEFAULT_SETTINGS);
        return DEFAULT_SETTINGS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  static saveSettings(settings: UserSettings): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings to localStorage', e);
    }
  }

  static getGames(): GameState[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY_GAMES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveGame(game: GameState): void {
    if (typeof window === 'undefined') return;
    try {
      const games = this.getGames();
      const updated = [game, ...games.filter((g) => g.id !== game.id)];
      localStorage.setItem(STORAGE_KEY_GAMES, JSON.stringify(updated.slice(0, 50)));
    } catch (e) {
      console.error('Error saving game', e);
    }
  }

  static getPuzzleAttempts(): PuzzleAttempt[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY_PUZZLE_ATTEMPTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static recordPuzzleAttempt(attempt: PuzzleAttempt): void {
    if (typeof window === 'undefined') return;
    try {
      const attempts = this.getPuzzleAttempts();
      localStorage.setItem(STORAGE_KEY_PUZZLE_ATTEMPTS, JSON.stringify([attempt, ...attempts]));
    } catch (e) {
      console.error('Error recording puzzle attempt', e);
    }
  }
}
