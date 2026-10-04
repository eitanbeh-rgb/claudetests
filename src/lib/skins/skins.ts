export interface BoardSkin {
  id: string;
  name: string;
  boardLight: string;
  boardDark: string;
  boardBg: string;
  borderStyle?: string;
  isPremium?: boolean;
  unlockRequirement: string;
}

export interface PieceSkin {
  id: string;
  name: string;
  type: 'classic' | 'modern' | 'minimal' | 'royal' | 'neon' | 'cyber';
  isPremium?: boolean;
  unlockRequirement: string;
}

export const BOARD_SKINS: BoardSkin[] = [
  {
    id: 'classic_wood',
    name: 'Classic Walnut',
    boardLight: '#f0d9b5',
    boardDark: '#b58863',
    boardBg: '#4a3319',
    unlockRequirement: 'Free',
  },
  {
    id: 'ocean_blue',
    name: 'Ocean Depths',
    boardLight: '#e2f1f8',
    boardDark: '#4682b4',
    boardBg: '#1c3144',
    unlockRequirement: '100 Puzzle Points',
  },
  {
    id: 'emerald_forest',
    name: 'Emerald Forest',
    boardLight: '#e8f5e9',
    boardDark: '#388e3c',
    boardBg: '#1b4332',
    unlockRequirement: '250 Puzzle Points',
  },
  {
    id: 'cyber_neon',
    name: 'Cyberpunk Grid',
    boardLight: '#1e293b',
    boardDark: '#0f172a',
    boardBg: '#00f0ff',
    borderStyle: 'ring-2 ring-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.3)]',
    unlockRequirement: '500 Puzzle Points',
  },
  {
    id: 'royal_purple',
    name: 'Royal Purple',
    boardLight: '#f3e8ff',
    boardDark: '#7e22ce',
    boardBg: '#3b0764',
    unlockRequirement: '750 Puzzle Points',
  },
  {
    id: 'galaxy_void',
    name: 'Galaxy Nebula',
    boardLight: '#334155',
    boardDark: '#1e1b4b',
    boardBg: '#4338ca',
    borderStyle: 'ring-2 ring-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]',
    unlockRequirement: '1000 Puzzle Points',
  },
];

export const PIECE_SKINS: PieceSkin[] = [
  {
    id: 'classic_standard',
    name: 'Staunton Classic',
    type: 'classic',
    unlockRequirement: 'Free',
  },
  {
    id: 'modern_smooth',
    name: 'Modern Vector',
    type: 'modern',
    unlockRequirement: '150 Puzzle Points',
  },
  {
    id: 'minimal_flat',
    name: 'Minimalist Line',
    type: 'minimal',
    unlockRequirement: '300 Puzzle Points',
  },
  {
    id: 'royal_gold',
    name: 'Royal Crown',
    type: 'royal',
    unlockRequirement: '600 Puzzle Points',
  },
  {
    id: 'cyber_glow',
    name: 'Cyber Matrix',
    type: 'cyber',
    unlockRequirement: '1000 Puzzle Points',
  },
];
