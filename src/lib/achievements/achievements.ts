export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'games' | 'rating' | 'puzzles' | 'ai';
  unlocked: boolean;
  rewardXp: number;
  rewardPoints: number;
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'first_game',
    title: 'First Blood',
    description: 'Play your first online or AI game on ChessForge.',
    iconName: 'Swords',
    category: 'games',
    unlocked: true,
    rewardXp: 50,
    rewardPoints: 10,
  },
  {
    id: 'first_win',
    title: 'Victorious',
    description: 'Win your first chess game.',
    iconName: 'Trophy',
    category: 'games',
    unlocked: true,
    rewardXp: 100,
    rewardPoints: 20,
  },
  {
    id: 'puzzle_beginner',
    title: 'Tactical Mind',
    description: 'Solve 5 chess puzzles correctly.',
    iconName: 'Puzzle',
    category: 'puzzles',
    unlocked: true,
    rewardXp: 75,
    rewardPoints: 25,
  },
  {
    id: 'beat_ai',
    title: 'Machine Defeater',
    description: 'Beat Stockfish AI in a match.',
    iconName: 'Bot',
    category: 'ai',
    unlocked: false,
    rewardXp: 200,
    rewardPoints: 50,
  },
  {
    id: 'reach_1300',
    title: 'Rising Master',
    description: 'Reach a rating of 1300 in Rapid or Blitz.',
    iconName: 'Award',
    category: 'rating',
    unlocked: false,
    rewardXp: 300,
    rewardPoints: 100,
  },
];
