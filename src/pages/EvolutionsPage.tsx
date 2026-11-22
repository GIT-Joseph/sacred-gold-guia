import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import evolutionsData from '../data/evolutions.json';
import { EvolutionsData, EvolutionCategory, EvolutionMethod } from '../types/evolution';
import { GitFork, ArrowRight, Sparkles, CheckCircle2, Zap, Heart } from 'lucide-react';
import { getSpriteUrl } from '../services/pokeapi';
import { getPokemonDexNumber } from '../utils/pokemonNames';

// Standard Pokemon items mapped to PokeAPI official item sprites
const POKEAPI_ITEM_SLUGS: Record<string, string> = {
  'Escamadragón': 'dragon-scale',
  'Revestimiento Metálico': 'metal-coat',
  'Roca del Rey': 'kings-rock',
  'Escama Marina': 'deep-sea-scale',
  'Diente Marino': 'deep-sea-tooth',
  'Protector': 'protector',
  'Telaterrible': 'reaper-cloth',
  'Magmatizador': 'magmarizer',
  'Electrizador': 'electirizer',
  'Mejora': 'up-grade',
  'Discoxtraño': 'dubious-disc',
  'Piedra Agua': 'water-stone',
  'Piedratrueno': 'thunder-stone',
  'Piedra Fuego': 'fire-stone',
  'Piedra Día': 'shiny-stone',
  'Piedra Noche': 'dusk-stone',
  'Piedra Alba': 'dawn-stone',
  'Piedra Alba (Macho)': 'dawn-stone',
  'Piedra Alba (Hembra)': 'dawn-stone',
  'Comillagudo': 'razor-fang',
  'Garrafilada': 'razor-claw',
  'Piedra Oval': 'oval-stone',
  'Piedra Solar': 'sun-stone',
  'Piedra Lunar': 'moon-stone',
  'Piedra Hoja': 'leaf-stone',
};

// Exclusive Sacred Gold items extracted directly from Drayano's official document
const EXCLUSIVE_ITEM_IMAGES: Record<string, string> = {
  'Orbe Unión': 'images/items/orbe_union.png',
  'Mineral Voltaico': 'images/items/mineral_voltaico.png',
  'Mineral Forestal': 'images/items/mineral_forestal.png',
  'Mineral Helado': 'images/items/mineral_helado.png',
  'Orbe Albor': 'images/items/orbe_albor.png',
  'Orbe Ocaso': 'images/items/orbe_ocaso.png',
};

export const EvolutionsPage: React.FC = () => {
  const data = evolutionsData as EvolutionsData;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories = data.categories.filter((cat) => {
    if (activeCategory === 'all') return true;
    return cat.id === activeCategory;
  });

  const getItemVisual = (item: string | undefined) => {
    if (!item) return null;

    // Check if exclusive Sacred Gold item
    if (EXCLUSIVE_ITEM_IMAGES[item]) {
      return {
        type: 'exclusive-item',
        src: EXCLUSIVE_ITEM_IMAGES[item],
        label: item,
        badge: 'Exclusivo Sacred Gold'
      };
    }

    // Check if standard PokeAPI item
    if (POKEAPI_ITEM_SLUGS[item]) {
      const slug = POKEAPI_ITEM_SLUGS[item];
      return {
        type: 'standard-item',
        src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${slug}.png`,
        label: item,
        badge: 'Objeto Evolutivo'
      };
    }

    // If it's a move requirement
    if (item === 'Poder Pasado' || item === 'Doble Golpe' || item === 'Rodar') {
      return {
        type: 'move',
        label: item,
        badge: 'Movimiento'
      };
    }

    // If it's a condition (e.g. Belleza)
    if (item.includes('Belleza')) {
      return {
        type: 'condition',
        label: item,
        badge: 'Condición'
      };
    }

    return null;
  };

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
          En Pokémon Sacred Gold se eliminaron por completo las necesidades de intercambio para completar la Pokédex. Los objetos que antes requerían intercambio ahora se <strong>Usan directamente</strong>, y se introducen objetos exclusivos como el <strong>Orbe Unión</strong> y el <strong>Mineral Voltaico</strong> con sus sprites correspondientes.
        </p>
      </div>

      {/* Categories Toggle Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === 'all'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
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
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
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
                const visual = getItemVisual(m.item);

                return (
                  <div
                    key={mIdx}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between gap-3 group"
                  >
                    {/* Visual Diagram: Base Pokemon -> Connector with Item -> Target Pokemon */}
                    <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/50">
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

                      {/* Evolution Connector (Arrow + Item Sprite or Move Badge) */}
                      <div className="flex flex-col items-center gap-1 px-1 shrink-0">
                        {visual?.src ? (
                          <div 
                            className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 p-1 flex items-center justify-center shadow-md relative group/item"
                            title={`${visual.label} (${visual.badge})`}
                          >
                            <img
                              src={visual.src}
                              alt={visual.label}
                              className="w-full h-full object-contain image-pixelated hover:scale-110 transition-transform"
                              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                            />
                          </div>
                        ) : visual?.type === 'move' ? (
                          <div 
                            className="px-2 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/30 text-[10px] font-bold text-purple-300 flex items-center gap-1"
                            title={`Aprender ${visual.label}`}
                          >
                            <Zap className="w-3 h-3 text-purple-400" />
                            <span>{visual.label}</span>
                          </div>
                        ) : visual?.type === 'condition' ? (
                          <div 
                            className="px-2 py-0.5 rounded-md bg-pink-500/15 border border-pink-500/30 text-[10px] font-bold text-pink-300 flex items-center gap-1"
                            title={visual.label}
                          >
                            <Heart className="w-3 h-3 text-pink-400" />
                            <span>Belleza</span>
                          </div>
                        ) : null}

                        <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />

                        {visual?.src && (
                          <span className="text-[9px] font-semibold text-amber-400/90 max-w-[80px] text-center truncate">
                            {visual.label}
                          </span>
                        )}
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
