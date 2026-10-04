'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Swords, Puzzle, Bot, User, Flame, GraduationCap } from 'lucide-react';

const mobileNavItems = [
  { name: 'Home', href: '/', icon: Flame },
  { name: 'Play', href: '/play', icon: Swords },
  { name: 'Puzzles', href: '/puzzles', icon: Puzzle },
  { name: 'Coach', href: '/coach', icon: Bot },
  { name: 'Learn', href: '/learn', icon: GraduationCap },
  { name: 'Profile', href: '/profile', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-[var(--bg-card)] border-t border-[var(--border-color)] px-2 flex items-center justify-around backdrop-blur-lg">
      {mobileNavItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
              isActive
                ? 'text-[var(--accent)] font-semibold'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[var(--accent)]' : ''}`} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
