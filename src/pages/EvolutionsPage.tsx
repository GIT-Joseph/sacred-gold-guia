import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import evolutionsData from '../data/evolutions.json';
import { EvolutionsData, EvolutionCategory, EvolutionMethod } from '../types/evolution';
import { GitFork, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { getSpriteUrl } from '../services/pokeapi';
import { getPokemonDexNumber } from '../utils/pokemonNames';

const evolutionItemImages: Record<string, string> = {
  'Escamadragón': 'images/items/obj_p4_img14_24x24.png',
  'Revestimiento Metálico': 'images/items/obj_p4_img19_24x24.png',
  'Roca del Rey': 'images/items/obj_p4_img17_24x24.png',
  'Escama Marina': 'images/items/obj_p4_img12_24x24.png',
  'Diente Marino': 'images/items/obj_p4_img13_24x24.png',
  'Protector': 'images/items/obj_p4_img21_24x24.png',
  'Telaterrible': 'images/items/obj_p4_img24_24x24.png',
  'Magmatizador': 'images/items/obj_p4_img18_24x24.png',
  'Electrizador': 'images/items/obj_p4_img16_24x24.png',
  'Mejora': 'images/items/obj_p4_img26_24x24.png',
  'Discoxtraño': 'images/items/obj_p4_img15_24x24.png',
  'Orbe Unión': 'images/items/obj_p4_img11_19x22.png',
  'Mineral Voltaico': 'images/items/obj_p4_img27_26x24.png',
  'Piedra Agua': 'images/items/obj_p4_img8_24x24.png',
  'Piedratrueno': 'images/items/obj_p4_img7_24x24.png',
  'Piedra Fuego': 'images/items/obj_p4_img2_24x24.png',
  'Orbe Albor': 'images/items/obj_p4_img9_18x18.png',
  'Orbe Ocaso': 'images/items/obj_p4_img25_20x17.png',
  'Mineral Forestal': 'images/items/obj_p4_img28_23x23.png',
  'Mineral Helado': 'images/items/obj_p4_img10_26x24.png',
  'Piedra Día': 'images/items/obj_p4_img5_24x24.png',
  'Piedra Noche': 'images/items/obj_p4_img1_24x24.png',
  'Piedra Alba (Macho)': 'images/items/obj_p4_img0_24x24.png',
  'Piedra Alba (Hembra)': 'images/items/obj_p4_img0_24x24.png',
  'Comillagudo': 'images/items/obj_p4_img23_24x24.png',
  'Garrafilada': 'images/items/obj_p4_img22_24x24.png',
  'Piedra Oval': 'images/items/obj_p4_img20_24x24.png'
};

export const EvolutionsPage: React.FC = () => {
  const data = evolutionsData as EvolutionsData;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories = data.categories.filter((cat) => {
    if (activeCategory === 'all') return true;
    return cat.id === activeCategory;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
          <GitFork className="w-4 h-4" />
          <span>Documento Cambios Evolutivos Oficial</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Métodos de Evolución en Sacred Gold
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
          En Pokémon Sacred Gold se han eliminado por completo las necesidades de intercambio para completar la Pokédex. Los objetos que antes requerían intercambio ahora se <strong>Usan directamente</strong>, y se introducen objetos exclusivos como el <strong>Orbe Unión</strong> y el <strong>Mineral Voltaico</strong>.
        </p>
      </div>

      {/* Categories Toggle Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === 'all'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          Todas las Familias
        </button>
        {data.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Categories Content */}
      <div className="flex flex-col gap-8">
        {filteredCategories.map((cat: EvolutionCategory) => (
          <section
            key={cat.id}
            id={cat.id}
            className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 flex flex-col gap-5 shadow-lg"
          >
            {/* Category Header */}
            <div className="pb-4 border-b border-slate-800/60">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {cat.name}
                </h2>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                {cat.description}
              </p>
            </div>

            {/* Methods Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.methods.map((m: EvolutionMethod, mIdx: number) => {
                const baseDex = getPokemonDexNumber(m.basePokemon);
                const targetDex = getPokemonDexNumber(m.targetPokemon);
                const itemImg = m.item ? evolutionItemImages[m.item] : null;

                return (
                  <div
                    key={mIdx}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between gap-3 group"
                  >
                    {/* Visual Diagram: Base Pokemon -> Target Pokemon */}
                    <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800/50">
                      {/* Base Pokemon Card */}
                      <NavLink
                        to={`/pokedex/${baseDex}`}
                        className="flex flex-col items-center gap-1 group/pk hover:opacity-90 transition-opacity"
                        title={`Ver ficha de ${m.basePokemon}`}
                      >
                        <div className="w-14 h-14 rounded-xl bg-slate-950/80 border border-slate-800 p-1 flex items-center justify-center group-hover/pk:scale-105 transition-transform">
                          <img
                            src={getSpriteUrl(baseDex)}
                            alt={m.basePokemon}
                            loading="lazy"
                            className="w-full h-full object-contain filter drop-shadow"
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-200 group-hover/pk:text-amber-400 transition-colors">
                          {m.basePokemon}
                        </span>
                      </NavLink>

                      {/* Evolution Connector (Arrow + Item Sprite if exists) */}
                      <div className="flex flex-col items-center gap-1 px-1 shrink-0">
                        {itemImg && (
                          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 p-1 flex items-center justify-center shadow-sm">
                            <img
                              src={itemImg}
                              alt={m.item}
                              title={m.item}
                              className="w-full h-full object-contain image-pixelated"
                              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                            />
                          </div>
                        )}
                        <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>

                      {/* Target Pokemon Card */}
                      <NavLink
                        to={`/pokedex/${targetDex}`}
                        className="flex flex-col items-center gap-1 group/pk hover:opacity-90 transition-opacity"
                        title={`Ver ficha de ${m.targetPokemon}`}
                      >
                        <div className="w-14 h-14 rounded-xl bg-slate-950/80 border border-slate-800 p-1 flex items-center justify-center group-hover/pk:scale-105 transition-transform">
                          <img
                            src={getSpriteUrl(targetDex)}
                            alt={m.targetPokemon}
                            loading="lazy"
                            className="w-full h-full object-contain filter drop-shadow"
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        </div>
                        <span className="text-xs font-bold text-amber-300 group-hover/pk:text-amber-200 transition-colors">
                          {m.targetPokemon}
                        </span>
                      </NavLink>
                    </div>

                    {/* New Method Highlight Box */}
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Requisito en Sacred Gold:</span>
                      </div>
                      <span className="font-semibold text-slate-100 text-xs">
                        {m.newMethod}
                      </span>
                    </div>

                    {/* Original Method comparison */}
                    <div className="text-[11px] text-slate-500 pt-1.5 border-t border-slate-800/60">
                      <span className="text-slate-500">Original en HGSS:</span> {m.originalMethod}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
