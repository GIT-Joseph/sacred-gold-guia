import React from 'react';
import { Search, Menu, Sparkles, BookOpen, MapPin, Swords, GitFork, Package, Shield, Terminal } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface NavbarProps {
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-900 md:hidden transition-colors"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5" />
          </button>

          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight gold-gradient-text leading-tight">
                Sacred Gold
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                Wiki Interactiva
              </span>
            </div>
          </NavLink>
        </div>

        {/* Center: Search Button (Omnibox style) */}
        <button
          onClick={onOpenSearch}
          className="flex-1 max-w-md hidden sm:flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:border-amber-500/40 hover:text-slate-300 transition-all text-xs md:text-sm group shadow-inner"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
            <span>Buscar Pokémon, rutas, gimnasios, MTs...</span>
          </div>
          <kbd className="px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-800/80 border border-slate-700/80 rounded-md">
            Ctrl K
          </kbd>
        </button>

        {/* Right: Quick actions / Mobile Search button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="sm:hidden p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-900"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>

          <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Drayano Romhack v1.05</span>
          </div>
        </div>
      </div>
    </header>
  );
};
