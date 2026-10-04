'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Swords,
  Puzzle,
  Bot,
  GraduationCap,
  User,
  Settings,
  Trophy,
  Palette,
  ShieldAlert,
  Flame,
  Zap,
} from 'lucide-react';
import { Repository } from '@/lib/storage/repository';

const navItems = [
  { name: 'Dashboard', href: '/', icon: Flame },
  { name: 'Play Chess', href: '/play', icon: Swords },
  { name: 'Puzzles', href: '/puzzles', icon: Puzzle },
  { name: 'AI Coach', href: '/coach', icon: Bot },
  { name: 'Learn', href: '/learn', icon: GraduationCap },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Cosmetics', href: '/skins', icon: Palette },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const profile = Repository.getProfile();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-[var(--border-color)] bg-[var(--bg-sidebar)] p-4 shrink-0 transition-colors duration-200">
      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-3 px-3 py-4 mb-6 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-600 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
          <Zap className="w-6 h-6 text-white fill-white" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
            CHESSFORGE
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-medium">
            Forge Your Mastery
          </p>
        </div>
      </Link>

      {/* Main Navigation Links */}
      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20 font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[var(--text-secondary)]'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Progress Mini Card */}
      <div className="mt-auto pt-4 border-t border-[var(--border-color)]">
        <div className="bg-[var(--bg-card)] p-3.5 rounded-2xl border border-[var(--border-color)] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shrink-0">
              {profile.username.substring(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate text-[var(--text-primary)]">
                {profile.username}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Lvl {profile.level} • {profile.ratings.rapid} Rapid
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
