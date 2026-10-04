'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useTheme, THEMES } from '@/lib/theme/theme-context';
import { Repository } from '@/lib/storage/repository';
import { Settings as SettingsIcon, Palette, Shield } from 'lucide-react';
import { ThemeMode } from '@/types/skins';

function SettingsContent() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState(() => Repository.getSettings());

  const handleToggle = (key: keyof typeof settings) => {
    const updated = { ...settings, [key]: !settings[key] };
    Repository.saveSettings(updated);
    setSettings(updated);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase">
            <SettingsIcon className="w-4 h-4" /> Application Preferences
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">
            Settings & Customization
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Manage your site theme, board preferences, and game sound effects.
          </p>
        </div>

        {/* Theme Selection Section */}
        <div className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border-color)] space-y-4 shadow-xl">
          <div className="flex items-center gap-2 font-bold text-sm text-[var(--text-primary)]">
            <Palette className="w-5 h-5 text-indigo-400" /> Website Theme Engine (6 Themes)
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {THEMES.map((t) => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id as ThemeMode)}
                  className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                    isSelected
                      ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-[var(--bg-main)] shadow-lg'
                      : 'border-[var(--border-color)] hover:border-slate-500 bg-[var(--bg-main)]'
                  }`}
                >
                  <div
                    className={`w-full h-10 rounded-xl bg-gradient-to-r ${t.previewGradient} border border-slate-700/50`}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-primary)]">{t.name}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chess Game Settings */}
        <div className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border-color)] space-y-4 shadow-xl">
          <div className="flex items-center gap-2 font-bold text-sm text-[var(--text-primary)]">
            <Shield className="w-5 h-5 text-amber-400" /> Board & Gameplay Settings
          </div>

          <div className="divide-y divide-[var(--border-color)] text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-[var(--text-primary)]">Show Legal Moves</div>
                <div className="text-[var(--text-secondary)]">Highlight destination squares on piece selection</div>
              </div>
              <input
                type="checkbox"
                checked={settings.showLegalMoves}
                onChange={() => handleToggle('showLegalMoves')}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-[var(--text-primary)]">Show Coordinates</div>
                <div className="text-[var(--text-secondary)]">Display rank numbers and file letters on board edge</div>
              </div>
              <input
                type="checkbox"
                checked={settings.showCoordinates}
                onChange={() => handleToggle('showCoordinates')}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-[var(--text-primary)]">Auto Queen Promotion</div>
                <div className="text-[var(--text-secondary)]">Automatically promote pawns to Queen on rank 8</div>
              </div>
              <input
                type="checkbox"
                checked={settings.autoQueen}
                onChange={() => handleToggle('autoQueen')}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-[var(--text-primary)]">Enable Sound Effects</div>
                <div className="text-[var(--text-secondary)]">Play audio cues on moves, captures, and checks</div>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={() => handleToggle('soundEnabled')}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function SettingsPage() {
  return <SettingsContent />;
}
