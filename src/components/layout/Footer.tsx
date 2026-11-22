import React from 'react';
import { Heart, Sparkles, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
            SG
          </div>
          <span className="font-semibold text-slate-300">Pokémon Sacred Gold & Storm Silver Wiki</span>
        </div>

        <div className="text-center sm:text-right text-[11px] text-slate-400 leading-relaxed">
          <p>Hack ROM desarrollado por Drayano. Guía estructurada a partir de los documentos oficiales del proyecto.</p>
          <p className="mt-0.5 text-slate-400">Pokémon y todos sus nombres son marcas registradas de Nintendo, Game Freak y The Pokémon Company.</p>
        </div>
      </div>
    </footer>
  );
};
