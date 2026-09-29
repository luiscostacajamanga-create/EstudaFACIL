import React from 'react';
import { TabType } from '../types';
import { GraduationCap, Sun, Moon, Flame } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  streakDays: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  isDark,
  onToggleTheme,
  streakDays
}) => {
  const navItems: { id: TabType; label: string }[] = [
    { id: 'inicio', label: 'Início' },
    { id: 'materias', label: 'Matérias' },
    { id: 'exercicios', label: 'Exercícios' },
    { id: 'tutor', label: 'Tutor IA' },
    { id: 'perfil', label: 'Perfil' }
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 h-15 flex items-center justify-between">
        {/* Zone 1: Brand title */}
        <button
          onClick={() => onNavigate('inicio')}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
          aria-label="Ir para a página inicial do EstudaFácil"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
            Estuda<span className="text-emerald-600 dark:text-emerald-400">Fácil</span>
          </span>
        </button>

        {/* Zone 2: Desktop clean text navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Install PWA + Streak + Dark/Light toggle) */}
        <div className="flex items-center gap-2">
          {/* In-App PWA Install Button */}
          <PWAInstallButton variant="header" />

          {/* Streak indicator */}
          <div 
            title={`${streakDays} dias seguidos estudando!`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-amber-700 dark:text-amber-400 text-xs font-semibold"
          >
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
            <span className="tabular-nums">{streakDays}d</span>
          </div>

          {/* Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className="min-w-10 min-h-10 p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center cursor-pointer"
            aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            title={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
