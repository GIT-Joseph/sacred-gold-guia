import React, { useState, useMemo } from 'react';
import itemsData from '../data/items.json';
import { ItemsData, TMItem, GeneralItem } from '../types/item';
import { Package, Search, Sparkles, MapPin, Disc, Check, AlertCircle } from 'lucide-react';

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
          Ubicaciones de las <strong>{data.totalTms} Máquinas Técnicas modificadas</strong>, objetos de evolución disponibles antes de la Liga Pokémon, fósiles gratuitos y los nuevos objetos exclusivos de Sacred Gold.
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
            { id: 'fossils', label: 'Fósiles & Otros' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
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

      {/* Tab: TMs */}
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

      {/* Tab: Evolution Items */}
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
                  <div className="flex items-center gap-2.5">
                    <img
                      src={it.image}
                      alt={it.name}
                      className="w-6 h-6 object-contain image-pixelated"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                    <h3 className="font-bold text-sm text-white">{it.name}</h3>
                  </div>

                  {it.isExclusiveHack && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Exclusivo Hack
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-300 mt-2 leading-relaxed flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
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

      {/* Tab: Stones */}
      {activeTab === 'stones' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredStones.map((st: GeneralItem) => (
            <div
              key={st.id}
              id={st.id}
              className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between gap-3 shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <img
                    src={st.image}
                    alt={st.name}
                    className="w-6 h-6 object-contain image-pixelated"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                  <h3 className="font-bold text-sm text-white">{st.name}</h3>
                </div>

                <div className="text-xs text-slate-300 mt-2 leading-relaxed flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>{st.location}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
                Piedra Evolutiva
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Key Items */}
      {activeTab === 'key' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.keyItems.map((it: GeneralItem) => (
            <div
              key={it.id}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                <img
                  src={it.image}
                  alt={it.name}
                  className="w-7 h-7 object-contain image-pixelated"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
              <div>
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
        <div className="flex flex-col gap-5">
          {/* Fossil Center Highlight */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-64 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
              <img
                src={data.fossils[0].image}
                alt="Centro Arqueológico"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Novedad Sacred Gold
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Centro Arqueológico de Ciudad Trigal
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                {data.fossils[0].location}
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400">
                Incluye Fósil Hélix (Omanyte), Fósil Domo (Kabuto), Fósil Raíz (Lileep), Fósil Garra (Anorith), Fósil Cráneo (Cranidos) y Fósil Coraza (Shieldon).
              </div>
            </div>
          </div>

          {/* Other Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {data.otherItems.map((it: GeneralItem) => (
              <div key={it.id} className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col gap-2">
                <h4 className="font-bold text-sm text-white">{it.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{it.location}</p>
                <span className="text-[10px] text-slate-500 font-mono mt-1">{it.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
