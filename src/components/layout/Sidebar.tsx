import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  MapPin, 
  Swords, 
  GitFork, 
  Package, 
  ShieldAlert, 
  Terminal, 
  Sparkles,
  Flame,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { to: '/', label: 'Inicio', icon: Home },
    { to: '/pokedex', label: 'Pokédex & Cambios', icon: BookOpen, badge: '433' },
    { to: '/gyms', label: 'Gimnasios & Level Caps', icon: Swords, highlight: true },
    { to: '/locations', label: 'Ubicaciones & Rutas', icon: MapPin },
    { to: '/evolutions', label: 'Evoluciones', icon: GitFork },
    { to: '/items', label: 'Objetos & MTs', icon: Package },
    { to: '/events', label: 'Legendarios & Eventos', icon: Flame },
    { to: '/action-replay', label: 'Action Replay', icon: Terminal },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm md:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed md:sticky top-0 md:top-16 z-50 md:z-30
        h-full md:h-[calc(100vh-4rem)] w-64
        bg-slate-950/95 md:bg-transparent
        border-r border-slate-800/80 md:border-r-0
        p-4 flex flex-col justify-between
        transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col gap-6">
          {/* Mobile close button header */}
          <div className="flex items-center justify-between md:hidden pb-2 border-b border-slate-800">
            <span className="font-bold text-amber-400 text-sm tracking-wide uppercase">Navegación</span>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${isActive 
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60">
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Caps
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom card: Game Info info pill */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Versión Completa</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Basado en la traducción y notas de Drayano. 493 Pokémon capturables.
          </p>
        </div>
      </aside>
    </>
  );
};
