import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import locationsData from '../data/locations.json';
import { LocationArea, EncounterMethod } from '../types/location';
import { MapPin, Search, Sun, Moon, Compass, Waves, Fish, Radio, Mountain, TreePine } from 'lucide-react';
import { getSpriteUrl } from '../services/pokeapi';
import { getPokemonDexNumber } from '../utils/pokemonNames';

export const LocationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'ALL' | 'Johto' | 'Kanto'>('ALL');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const locationsList = locationsData as unknown as LocationArea[];

  const filteredLocations = useMemo(() => {
    return locationsList.filter((loc) => {
      if (selectedRegion !== 'ALL' && loc.region !== selectedRegion) {
        return false;
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = loc.name.toLowerCase().includes(q);
        const matchPokemon = loc.encounterMethods.some(m => 
          m.pokemon.some(p => p.pokemon.toLowerCase().includes(q))
        );
        return matchName || matchPokemon;
      }
      return true;
    });
  }, [locationsList, searchTerm, selectedRegion]);

  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);
  const paginatedLocations = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredLocations.slice(start, start + itemsPerPage);
  }, [filteredLocations, page]);

  const getMethodIcon = (method: string) => {
    const m = method.toLowerCase();
    if (m.includes('morning') || m.includes('day')) return <Sun className="w-3.5 h-3.5 text-amber-400" />;
    if (m.includes('night')) return <Moon className="w-3.5 h-3.5 text-indigo-400" />;
    if (m.includes('surf')) return <Waves className="w-3.5 h-3.5 text-blue-400" />;
    if (m.includes('rod')) return <Fish className="w-3.5 h-3.5 text-cyan-400" />;
    if (m.includes('sound') || m.includes('radio')) return <Radio className="w-3.5 h-3.5 text-purple-400" />;
    if (m.includes('cave') || m.includes('rock')) return <Mountain className="w-3.5 h-3.5 text-stone-400" />;
    if (m.includes('tree') || m.includes('headbutt')) return <TreePine className="w-3.5 h-3.5 text-emerald-400" />;
    return <Compass className="w-3.5 h-3.5 text-emerald-400" />;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
          <MapPin className="w-4 h-4" />
          <span>Documento Ubicación Pokémon Oficial</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ubicaciones y Hábitats Salvajes ({locationsList.length} Áreas)
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
          Consulta todos los encuentros salvajes por ruta, piso de cueva, surf y cañas de pesca con las probabilidades matemáticas exactas, niveles de Sacred Gold y sprites de cada Pokémon.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            placeholder="Buscar por nombre de ruta (ej. 'Ruta 29') o Pokémon (ej. 'Dratini')..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm outline-none focus:border-amber-500/50"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {['ALL', 'Johto', 'Kanto'].map((reg) => (
            <button
              key={reg}
              onClick={() => { setSelectedRegion(reg as any); setPage(1); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedRegion === reg
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {reg === 'ALL' ? 'Todas las Regiones' : reg}
            </button>
          ))}
        </div>
      </div>

      {/* Locations List */}
      <div className="flex flex-col gap-6">
        {paginatedLocations.map((loc) => {
          // Filter encounter methods that have at least one pokemon
          const validMethods = loc.encounterMethods.filter(em => em.pokemon && em.pokemon.length > 0);

          return (
            <div
              key={loc.id}
              id={loc.id}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all shadow-md flex flex-col gap-5"
            >
              {/* Area Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-sm">
                    {loc.region[0]}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {loc.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">Región de {loc.region}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-amber-400/90 font-medium">
                        Niveles salvajes: {loc.wildLevels || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-slate-500 self-start sm:self-auto bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  Doc Pág. {loc.page}
                </span>
              </div>

              {/* In-Game DS Screenshot & Encounters Layout */}
              <div className="flex flex-col lg:flex-row gap-5 items-start">
                {/* DS Screenshot Thumbnail or Habitat Card */}
                <div className="w-full sm:w-64 aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 shadow-inner group relative flex items-center justify-center">
                  {loc.screenshot ? (
                    <>
                      <img
                        src={loc.screenshot}
                        alt={loc.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          // Hide image and fallback if broken
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/85 backdrop-blur-sm border border-slate-800 text-[10px] font-mono text-amber-400 font-semibold pointer-events-none">
                        DS In-Game
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-slate-900 to-slate-950">
                      <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-amber-400 mb-2">
                        <Compass className="w-5 h-5 opacity-80" />
                      </div>
                      <span className="text-xs font-semibold text-slate-300">
                        Subzona Interior
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 line-clamp-1 max-w-[200px]">
                        {loc.name}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400/80 mt-2 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Nv. {loc.wildLevels || 'Varios'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Encounters Grid */}
                <div className="flex-1 w-full flex flex-col gap-3">
                  {validMethods.length > 0 ? (
                    validMethods.map((em: EncounterMethod, emIdx: number) => (
                      <div
                        key={emIdx}
                        className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70"
                      >
                        <div className="flex items-center gap-2 mb-2.5 pb-1.5 border-b border-slate-800/50">
                          {getMethodIcon(em.method)}
                          <span className="font-semibold text-xs text-slate-200">
                            {em.method}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 ml-auto">
                            {em.pokemon.length} especie{em.pokemon.length !== 1 ? 's' : ''}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {em.pokemon.map((pk, pkIdx) => {
                            const dexId = getPokemonDexNumber(pk.pokemon);
                            const spriteUrl = getSpriteUrl(dexId);
                            const cleanSearchName = pk.pokemon.split(/[\(\/]/)[0].trim();

                            return (
                              <NavLink
                                key={pkIdx}
                                to={`/pokedex?search=${encodeURIComponent(cleanSearchName)}`}
                                className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800/90 hover:border-amber-500/40 text-xs text-slate-200 hover:text-amber-300 transition-all group shadow-sm"
                                title={`Ver ficha de ${pk.pokemon} en la Pokédex`}
                              >
                                <img
                                  src={spriteUrl}
                                  alt={pk.pokemon}
                                  loading="lazy"
                                  className="w-7 h-7 object-contain group-hover:scale-110 transition-transform shrink-0"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                                <span className="font-medium text-slate-200 group-hover:text-amber-300">
                                  {pk.pokemon}
                                </span>
                                <span className="font-mono text-[10px] text-amber-400 font-bold bg-amber-500/15 border border-amber-500/20 px-1.5 py-0.5 rounded">
                                  {pk.rate}
                                </span>
                              </NavLink>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/50 text-slate-500 text-xs text-center italic">
                      No hay encuentros de hierba/agua convencionales en esta sección (ver eventos o regalos).
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            Mostrando {((page - 1) * itemsPerPage) + 1} - {Math.min(page * itemsPerPage, filteredLocations.length)} de {filteredLocations.length} Zonas
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-colors"
            >
              Anterior
            </button>
            <span className="text-xs text-slate-400 font-medium px-2">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-colors"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
