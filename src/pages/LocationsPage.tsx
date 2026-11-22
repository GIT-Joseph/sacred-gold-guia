import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import locationsData from '../data/locations.json';
import { LocationArea, EncounterMethod } from '../types/location';
import { MapPin, Search, Sun, Moon, Compass, Waves, Fish, Radio, Mountain, TreePine, Landmark, Building2 } from 'lucide-react';
import { getSpriteUrl } from '../services/pokeapi';
import { getPokemonDexNumber } from '../utils/pokemonNames';

export const LocationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'ALL' | 'Johto' | 'Kanto'>('ALL');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

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

  const getLocationTypeInfo = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('ruta')) {
      return { label: 'Ruta Terrestre', icon: <Compass className="w-4 h-4 text-emerald-400" />, theme: 'from-emerald-950/40 to-slate-950' };
    }
    if (n.includes('ciudad') || n.includes('pueblo')) {
      return { label: 'Ciudad / Población', icon: <Landmark className="w-4 h-4 text-amber-400" />, theme: 'from-amber-950/40 to-slate-950' };
    }
    if (n.includes('cueva') || n.includes('monte') || n.includes('túnel') || n.includes('guarida')) {
      return { label: 'Caverna Subterránea', icon: <Mountain className="w-4 h-4 text-stone-400" />, theme: 'from-stone-900/40 to-slate-950' };
    }
    if (n.includes('torre')) {
      return { label: 'Torre Ancestral', icon: <Building2 className="w-4 h-4 text-orange-400" />, theme: 'from-orange-950/40 to-slate-950' };
    }
    if (n.includes('bosque') || n.includes('encinar') || n.includes('parque')) {
      return { label: 'Espacio Natural / Bosque', icon: <TreePine className="w-4 h-4 text-teal-400" />, theme: 'from-teal-950/40 to-slate-950' };
    }
    if (n.includes('isla') || n.includes('lago') || n.includes('cataratas') || n.includes('pozo')) {
      return { label: 'Área Acuática / Surf', icon: <Waves className="w-4 h-4 text-cyan-400" />, theme: 'from-cyan-950/40 to-slate-950' };
    }
    return { label: 'Hábitat Salvaje', icon: <MapPin className="w-4 h-4 text-amber-400" />, theme: 'from-slate-900 to-slate-950' };
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
          Ubicaciones y Hábitats Salvajes ({locationsList.length} Zonas)
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
          Consulta todos los encuentros salvajes por ruta, piso de cueva, surf y cañas de pesca con las probabilidades matemáticas exactas, niveles de Sacred Gold y sprites oficiales de cada Pokémon.
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
            placeholder="Buscar por ruta (ej. 'Ruta 29', 'Cueva Unión') o Pokémon (ej. 'Larvitar')..."
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
          const validMethods = loc.encounterMethods.filter(em => em.pokemon && em.pokemon.length > 0);
          const typeInfo = getLocationTypeInfo(loc.name);

          // Extract top unique pokemon for the habitat card preview
          const distinctPokemon: string[] = [];
          for (const m of validMethods) {
            for (const p of m.pokemon) {
              const clean = p.pokemon.split(/[\(\/]/)[0].trim();
              if (!distinctPokemon.includes(clean)) {
                distinctPokemon.push(clean);
              }
              if (distinctPokemon.length >= 4) break;
            }
            if (distinctPokemon.length >= 4) break;
          }

          return (
            <div
              key={loc.id}
              id={loc.id}
              className="p-5 sm:p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all shadow-md flex flex-col gap-5"
            >
              {/* Area Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                    loc.region === 'Johto'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  }`}>
                    {loc.region[0]}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {loc.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs font-semibold ${
                        loc.region === 'Johto' ? 'text-amber-400/90' : 'text-cyan-400/90'
                      }`}>
                        Región de {loc.region}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-slate-300 font-medium">
                        Niveles salvajes: <strong className="text-amber-400">{loc.wildLevels || 'N/A'}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-slate-400 self-start sm:self-auto bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                  Doc Pág. {loc.page}
                </span>
              </div>

              {/* Layout: Dedicated Habitat Card + Encounter Methods Grid */}
              <div className="flex flex-col lg:flex-row gap-5 items-stretch">
                {/* Pokémon Pokégear / Habitat Identity Card */}
                <div className={`w-full lg:w-72 rounded-2xl p-4 border border-slate-800 bg-gradient-to-b ${typeInfo.theme} flex flex-col justify-between gap-4 shrink-0 shadow-inner`}>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950/70 border border-slate-800 text-[11px] font-medium text-slate-300">
                        {typeInfo.icon}
                        <span>{typeInfo.label}</span>
                      </div>
                      <span className="text-[10px] font-bold tracking-wider uppercase font-mono px-2 py-0.5 rounded bg-slate-950/60 border border-slate-800 text-slate-400">
                        {loc.region}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mt-1 leading-tight line-clamp-2">
                      {loc.name}
                    </h3>
                  </div>

                  {/* Wild Species Preview */}
                  {distinctPokemon.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Especies Destacadas:
                      </span>
                      <div className="flex items-center gap-2">
                        {distinctPokemon.map((pName, pIdx) => {
                          const dex = getPokemonDexNumber(pName);
                          return (
                            <NavLink
                              key={pIdx}
                              to={`/pokedex/${dex}`}
                              className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-0.5 flex items-center justify-center transition-all hover:scale-105"
                              title={pName}
                            >
                              <img
                                src={getSpriteUrl(dex)}
                                alt={pName}
                                loading="lazy"
                                className="w-full h-full object-contain filter drop-shadow"
                                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                              />
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Habitat Status Footer */}
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Niveles:</span>
                    <span className="font-mono font-bold text-amber-400">
                      {loc.wildLevels || 'Varios'}
                    </span>
                  </div>
                </div>

                {/* Encounters Grid */}
                <div className="flex-1 w-full flex flex-col gap-3">
                  {validMethods.length > 0 ? (
                    validMethods.map((em: EncounterMethod, emIdx: number) => (
                      <div
                        key={emIdx}
                        className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/70 shadow-sm"
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
                      No hay encuentros salvajes convencionales en esta sección (ver eventos o regalos).
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
