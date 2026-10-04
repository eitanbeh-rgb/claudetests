'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { ThemeProvider } from '@/lib/theme/theme-context';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-200">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
        <MobileNav />
      </div>
    </ThemeProvider>
  );
}
