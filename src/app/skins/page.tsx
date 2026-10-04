'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { BOARD_SKINS, PIECE_SKINS } from '@/lib/skins/skins';
import { Repository } from '@/lib/storage/repository';
import { Palette, Check, Lock, Trophy, Sparkles } from 'lucide-react';

export default function SkinsPage() {
  const [profile, setProfile] = useState(() => Repository.getProfile());
  const [settings, setSettings] = useState(() => Repository.getSettings());
  const [activeTab, setActiveTab] = useState<'boards' | 'pieces'>('boards');

  const handleEquipBoard = (skinId: string) => {
    const updatedSettings = { ...settings, boardSkin: skinId };
    const updatedProfile = { ...profile, equippedBoardSkin: skinId };
    Repository.saveSettings(updatedSettings);
    Repository.saveProfile(updatedProfile);
    setSettings(updatedSettings);
    setProfile(updatedProfile);
  };

  const handleEquipPiece = (skinId: string) => {
    const updatedSettings = { ...settings, pieceSkin: skinId };
    const updatedProfile = { ...profile, equippedPieceSkin: skinId };
    Repository.saveSettings(updatedSettings);
    Repository.saveProfile(updatedProfile);
    setSettings(updatedSettings);
    setProfile(updatedProfile);
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase">
              <Palette className="w-4 h-4" /> Customization Vault
            </div>
            <h1 className="text-2xl font-black text-[var(--text-primary)]">
              Board & Piece Cosmetics
            </h1>
            <p className="text-xs text-[var(--text-secondary)]">
              Unlock exclusive themes and styles with your Puzzle Points.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] text-center shrink-0">
            <div className="text-[10px] text-[var(--text-secondary)] uppercase">Available Points</div>
            <div className="text-lg font-black text-indigo-400">{profile.puzzlePoints} PTS</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[var(--bg-card)] p-1.5 rounded-2xl border border-[var(--border-color)] w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('boards')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'boards'
                ? 'bg-[var(--accent)] text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Board Skins ({BOARD_SKINS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pieces')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'pieces'
                ? 'bg-[var(--accent)] text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Piece Sets ({PIECE_SKINS.length})
          </button>
        </div>

        {/* Board Skins Grid */}
        {activeTab === 'boards' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BOARD_SKINS.map((skin) => {
              const isEquipped = settings.boardSkin === skin.id;

              return (
                <div
                  key={skin.id}
                  className={`bg-[var(--bg-card)] rounded-3xl p-5 border transition-all space-y-4 ${
                    isEquipped
                      ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-xl'
                      : 'border-[var(--border-color)] hover:border-slate-500'
                  }`}
                >
                  {/* Board Skin Color Preview Box */}
                  <div className="w-full aspect-video rounded-2xl border border-slate-800 p-2 grid grid-cols-4 grid-rows-2 gap-0 overflow-hidden shadow-inner">
                    <div style={{ backgroundColor: skin.boardLight }} />
                    <div style={{ backgroundColor: skin.boardDark }} />
                    <div style={{ backgroundColor: skin.boardLight }} />
                    <div style={{ backgroundColor: skin.boardDark }} />
                    <div style={{ backgroundColor: skin.boardDark }} />
                    <div style={{ backgroundColor: skin.boardLight }} />
                    <div style={{ backgroundColor: skin.boardDark }} />
                    <div style={{ backgroundColor: skin.boardLight }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">
                        {skin.name}
                      </h3>
                      <p className="text-[10px] text-[var(--text-secondary)]">
                        Requirement: {skin.unlockRequirement}
                      </p>
                    </div>

                    {isEquipped ? (
                      <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-extrabold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Equipped
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleEquipBoard(skin.id)}
                        className="px-4 py-2 rounded-xl bg-[var(--accent)] hover:opacity-90 text-white font-bold text-xs shadow-md transition-opacity"
                      >
                        Equip Skin
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Piece Skins Grid */}
        {activeTab === 'pieces' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PIECE_SKINS.map((skin) => {
              const isEquipped = settings.pieceSkin === skin.id;

              return (
                <div
                  key={skin.id}
                  className={`bg-[var(--bg-card)] rounded-3xl p-5 border transition-all space-y-4 ${
                    isEquipped
                      ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl'
                      : 'border-[var(--border-color)] hover:border-slate-500'
                  }`}
                >
                  <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center justify-center font-bold text-xs text-indigo-400 uppercase tracking-widest">
                    {skin.type} Piece Vector Set
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">
                        {skin.name}
                      </h3>
                      <p className="text-[10px] text-[var(--text-secondary)]">
                        Requirement: {skin.unlockRequirement}
                      </p>
                    </div>

                    {isEquipped ? (
                      <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-extrabold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Equipped
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleEquipPiece(skin.id)}
                        className="px-4 py-2 rounded-xl bg-[var(--accent)] hover:opacity-90 text-white font-bold text-xs shadow-md transition-opacity"
                      >
                        Equip Piece Set
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
