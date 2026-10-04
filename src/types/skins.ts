export interface Skin {
  id: string;
  name: string;
  type: 'board' | 'piece';
  preview: string;
  boardLight?: string; // Hex color or CSS value
  boardDark?: string;  // Hex color or CSS value
  boardBg?: string;    // Accent border/bg
  unlockType: 'free' | 'points' | 'achievement' | 'level' | 'premium';
  unlockRequirement: number | string; // e.g. 500 points, or level 5
  description: string;
  isPremium?: boolean;
}

export type ThemeMode = 'light' | 'dark' | 'midnight' | 'forest' | 'royal' | 'cyber';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  accent: string;
  cardBg: string;
  mainBg: string;
  previewGradient: string;
}
