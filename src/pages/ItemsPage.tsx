import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import itemsData from '../data/items.json';
import { ItemsData, TMItem, GeneralItem } from '../types/item';
import { Package, Search, Sparkles, MapPin, Disc, Check, AlertCircle } from 'lucide-react';
import { getSpriteUrl } from '../services/pokeapi';
import { getPokemonDexNumber } from '../utils/pokemonNames';

const FOSSILS_LIST = [
  { name: 'Fósil Hélix', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/helix-fossil.png', pokemon: 'Omanyte', dex: 138 },
  { name: 'Fósil Domo', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dome-fossil.png', pokemon: 'Kabuto', dex: 140 },
  { name: 'Fósil Raíz', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/root-fossil.png', pokemon: 'Lileep', dex: 345 },
  { name: 'Fósil Garra', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/claw-fossil.png', pokemon: 'Anorith', dex: 347 },
  { name: 'Fósil Cráneo', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/skull-fossil.png', pokemon: 'Cranidos', dex: 408 },
  { name: 'Fósil Coraza', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/armor-fossil.png', pokemon: 'Shieldon', dex: 410 },
];

export const ItemsPage: React.FC = () => {
  const data = itemsData as ItemsData;
  const [activeTab, setActiveTab] = useState<'tms' | 'evolution' | 'stones' | 'key' | 'fossils'>('tms');
  const [search, setSearch] = useState('');

  const filteredTms = useMemo(() => {
    return data.tms.filter((tm) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return tm.name.toLowerCase().includes(q) || tm.move.toLowerCase().includes(q) || tm.location.toLowerCase().includes(q);
    });
  }, [data.tms, search]);

  const filteredEvoItems = useMemo(() => {
    return data.evolutionItems.filter((it) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return it.name.toLowerCase().includes(q) || it.location.toLowerCase().includes(q);
    });
  }, [data.evolutionItems, search]);

  const filteredStones = useMemo(() => {
    return data.evolutionStones.filter((st) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return st.name.toLowerCase().includes(q) || st.location.toLowerCase().includes(q);
    });
  }, [data.evolutionStones, search]);

  const filteredKeyItems = useMemo(() => {
    return data.keyItems.filter((it) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return it.name.toLowerCase().includes(q) || it.location.toLowerCase().includes(q);
    });
  }, [data.keyItems, search]);

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
          <Package className="w-4 h-4" />
          <span>Documento Objetos Importantes Oficial</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Objetos Importantes, MTs & Objetos Exclusivos
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
          Consulta las ubicaciones de las <strong>{data.totalTms} Máquinas Técnicas modificadas</strong>, todos los objetos de evolución con sus sprites oficiales, fósiles gratuitos del Centro Arqueológico y los nuevos objetos exclusivos de Sacred Gold.
        </p>
      </div>

      {/* Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {[
            { id: 'tms', label: `Máquinas Técnicas (${data.tms.length})` },
            { id: 'evolution', label: `Objetos Evolutivos (${data.evolutionItems.length})` },
            { id: 'stones', label: `Piedras Evolutivas (${data.evolutionStones.length})` },
            { id: 'key', label: `Objetos Clave (${data.keyItems.length})` },
            { id: 'fossils', label: 'Fósiles & Especiales' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar objeto o ubicación..."
            className="pl-9 pr-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs sm:text-sm outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Tab: TMs (Máquinas Técnicas - Sin imágenes según lo solicitado) */}
      {activeTab === 'tms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredTms.map((tm: TMItem) => (
            <div
              key={tm.id}
              id={tm.id}
              className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between gap-3 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <Disc className="w-4 h-4 text-amber-400" />
                    <span className="font-extrabold text-sm text-white">
                      {tm.code}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {tm.move}
                  </span>
                </div>

                <div className="text-xs text-slate-300 mt-2 leading-relaxed flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>{tm.location}</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800/60">
                Modificada en Sacred Gold
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Evolution Items (Con imágenes de sprites oficiales y exclusivos) */}
      {activeTab === 'evolution' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredEvoItems.map((it: GeneralItem) => (
            <div
              key={it.id}
              id={it.id}
              className={`p-4 rounded-2xl bg-slate-900/40 border transition-all flex flex-col justify-between gap-3 shadow-sm ${
                it.isExclusiveHack ? 'border-amber-500/40 bg-amber-500/5' : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800/90 p-1.5 flex items-center justify-center shrink-0 shadow-inner group">
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-full h-full object-contain image-pixelated filter drop-shadow group-hover:scale-115 transition-transform"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{it.name}</h3>
                      <span className="text-[10px] text-slate-500 block">
                        {it.isExclusiveHack ? 'Objeto Exclusivo' : 'Objeto Evolutivo'}
                      </span>
                    </div>
                  </div>

                  {it.isExclusiveHack && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
                      Exclusivo Hack
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-300 mt-2 leading-relaxed flex items-start gap-1.5 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/40">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{it.location}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                <span>{it.category}</span>
                {it.isExclusiveHack && (
                  <span className="text-amber-400 font-semibold text-[10px]">Nuevo en HGSS</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Stones (Con imágenes de sprites oficiales de piedras) */}
      {activeTab === 'stones' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredStones.map((st: GeneralItem) => (
            <div
              key={st.id}
              id={st.id}
              className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between gap-3 shadow-sm"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800/90 p-1.5 flex items-center justify-center shrink-0 shadow-inner group">
                    <img
                      src={st.image}
                      alt={st.name}
                      className="w-full h-full object-contain image-pixelated filter drop-shadow group-hover:scale-115 transition-transform"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{st.name}</h3>
                    <span className="text-[10px] text-slate-500 block">Piedra Evolutiva</span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 mt-2 leading-relaxed flex items-start gap-1.5 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/40">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{st.location}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                <span>Piedra Elemental</span>
                <span className="text-slate-400 font-mono text-[10px]">Uso directo</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Key Items (Con imágenes de sprites oficiales de objetos clave) */}
      {activeTab === 'key' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredKeyItems.map((it: GeneralItem) => (
            <div
              key={it.id}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-start gap-4 hover:border-slate-700 transition-all shadow-md"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center shrink-0 shadow-inner group">
                <img
                  src={it.image}
                  alt={it.name}
                  className="w-full h-full object-contain image-pixelated filter drop-shadow group-hover:scale-115 transition-transform"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base text-white">{it.name}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{it.location}</p>
                <span className="inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  {it.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Fossils and Special */}
      {activeTab === 'fossils' && (
        <div className="flex flex-col gap-6">
          {/* Fossil Center Highlight */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Centro Arqueológico de Ciudad Trigal
                </h2>
              </div>
              <span className="text-xs font-bold text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                Novedad Sacred Gold
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {data.fossils[0].location}
            </p>

            {/* Fossils Sprites Grid */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Fósiles disponibles y Pokémon revividos (Nivel 20):
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {FOSSILS_LIST.map((fossil) => (
                  <NavLink
                    key={fossil.name}
                    to={`/pokedex/${fossil.dex}`}
                    className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col items-center text-center gap-2 group"
                    title={`Ver ficha de ${fossil.pokemon}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 p-1 flex items-center justify-center">
                      <img
                        src={fossil.sprite}
                        alt={fossil.name}
                        className="w-full h-full object-contain image-pixelated group-hover:scale-115 transition-transform"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-200 block truncate">
                        {fossil.name}
                      </span>
                      <span className="text-[10px] text-amber-400 font-semibold flex items-center justify-center gap-1 mt-0.5">
                        <img
                          src={getSpriteUrl(fossil.dex)}
                          alt={fossil.pokemon}
                          className="w-4 h-4 object-contain inline-block"
                        />
                        {fossil.pokemon}
                      </span>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Other Items */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Otros Objetos Especiales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {data.otherItems.map((it: GeneralItem) => (
                <div
                  key={it.id}
                  className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all flex items-start gap-3.5 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800/90 p-1.5 flex items-center justify-center shrink-0 shadow-inner group">
                    <img
                      src={it.image}
                      alt={it.name}
                      className="w-full h-full object-contain image-pixelated filter drop-shadow group-hover:scale-115 transition-transform"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{it.name}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{it.location}</p>
                    <span className="inline-block mt-1 text-[10px] text-slate-500 font-mono">{it.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
