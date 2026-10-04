'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode, ThemeConfig } from '@/types/skins';
import { Repository } from '@/lib/storage/repository';

export const THEMES: ThemeConfig[] = [
  {
    id: 'midnight',
    name: 'Midnight',
    accent: '#6366f1',
    cardBg: '#121829',
    mainBg: '#090d16',
    previewGradient: 'from-slate-900 via-indigo-950 to-slate-900',
  },
  {
    id: 'dark',
    name: 'Dark Obsidian',
    accent: '#3b82f6',
    cardBg: '#1e293b',
    mainBg: '#0f172a',
    previewGradient: 'from-slate-900 to-slate-800',
  },
  {
    id: 'light',
    name: 'Clean Light',
    accent: '#2563eb',
    cardBg: '#ffffff',
    mainBg: '#f8fafc',
    previewGradient: 'from-slate-100 to-white',
  },
  {
    id: 'forest',
    name: 'Deep Forest',
    accent: '#10b981',
    cardBg: '#0d2b1f',
    mainBg: '#061811',
    previewGradient: 'from-emerald-950 to-teal-950',
  },
  {
    id: 'royal',
    name: 'Royal Velvet',
    accent: '#a855f7',
    cardBg: '#211233',
    mainBg: '#13091e',
    previewGradient: 'from-purple-950 to-slate-950',
  },
  {
    id: 'cyber',
    name: 'Cyberpunk Neon',
    accent: '#00f0ff',
    cardBg: '#0f0f23',
    mainBg: '#05050d',
    previewGradient: 'from-blue-950 via-slate-950 to-fuchsia-950',
  },
];

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  currentThemeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('midnight');

  useEffect(() => {
    const settings = Repository.getSettings();
    if (settings.theme && THEMES.some((t) => t.id === settings.theme)) {
      setThemeState(settings.theme as ThemeMode);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    const settings = Repository.getSettings();
    Repository.saveSettings({ ...settings, theme: newTheme });
  };

  const currentThemeConfig = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentThemeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
