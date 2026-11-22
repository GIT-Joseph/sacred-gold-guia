import React, { useMemo, useEffect, useRef } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import pokemonData from '../data/pokemon_changes.json';
import { PokemonChange } from '../types/pokemon';
import { Badge } from '../components/common/Badge';
import { getSpriteUrl } from '../services/pokeapi';
import { Search, Sparkles, SlidersHorizontal } from 'lucide-react';

export const PokedexPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read state directly from URL search params to guarantee persistence
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const filterType = searchParams.get('type') || 'ALL';
  const onlyTypeChanged = searchParams.get('typeChanged') === 'true';
  const onlyStatsChanged = searchParams.get('statsChanged') === 'true';
  const onlyAbilityChanged = searchParams.get('abilityChanged') === 'true';

  const itemsPerPage = 36;
  const pokemonList = pokemonData as PokemonChange[];

  // Helper to update search params
  const updateParams = (updates: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === '' || val === 'ALL' || val === 'false') {
        nextParams.delete(key);
      } else {
        nextParams.set(key, val);
      }
    });
    setSearchParams(nextParams, { replace: true });
  };

  // Restore scroll position when returning from Pokemon detail
  useEffect(() => {
    const savedScroll = sessionStorage.getItem('pokedex_scroll_pos');
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedScroll, 10),
          behavior: 'instant'
        });
        sessionStorage.removeItem('pokedex_scroll_pos');
      }, 50);
    }
  }, []);

  const handlePokemonClick = () => {
    sessionStorage.setItem('pokedex_scroll_pos', String(window.scrollY));
  };

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((p) => {
      // Search by name or number
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchNumber = String(p.dexNumber).includes(q);
        if (!matchName && !matchNumber) return false;
      }

      // Filter by special changes
      if (onlyTypeChanged && !p.typeChange) return false;
      if (onlyStatsChanged && !p.statChanges) return false;
      if (onlyAbilityChanged && p.abilities.length === 0) return false;

      // Filter by Type
      if (filterType !== 'ALL') {
        const typeChange = p.typeChange as any;
        const typesToCheck: string[] = [];
        if (typeChange?.modified) {
          typesToCheck.push(...typeChange.modified);
        } else if (typeChange?.original) {
          typesToCheck.push(...typeChange.original);
        }
        if (typesToCheck.length > 0 && !typesToCheck.some(t => t.toLowerCase() === filterType.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [pokemonList, search, filterType, onlyTypeChanged, onlyStatsChanged, onlyAbilityChanged]);

  const totalPages = Math.max(1, Math.ceil(filteredPokemon.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);

  const paginatedPokemon = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPokemon.slice(start, start + itemsPerPage);
  }, [filteredPokemon, currentPage]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Documento Cambios Pokémon Oficial</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Pokédex de Sacred Gold ({pokemonList.length} Registros)
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
          Catálogo con todas las modificaciones mecánicas introducidas por Drayano: rebalanceo de tipos elementales, incrementos de estadísticas base, habilidades añadidas y nuevos movimientos por nivel.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => updateParams({ search: e.target.value, page: '1' })}
              placeholder="Buscar por nombre o número (ej. Venomoth, Farfetch'd, 049)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm outline-none focus:border-amber-500/50"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={filterType}
              onChange={(e) => updateParams({ type: e.target.value, page: '1' })}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm outline-none focus:border-amber-500/50"
            >
              <option value="ALL">Todos los tipos</option>
              {['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Steel', 'Dark'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Tag Toggles */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-800/60">
          <span className="text-xs text-slate-500 font-medium">Filtrar por cambios:</span>
          
          <button
            onClick={() => updateParams({ typeChanged: onlyTypeChanged ? 'false' : 'true', page: '1' })}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              onlyTypeChanged 
                ? 'bg-amber-500 text-slate-950 shadow-sm' 
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Cambio de Tipo
          </button>

          <button
            onClick={() => updateParams({ statsChanged: onlyStatsChanged ? 'false' : 'true', page: '1' })}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              onlyStatsChanged 
                ? 'bg-amber-500 text-slate-950 shadow-sm' 
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Stats Modificadas
          </button>

          <button
            onClick={() => updateParams({ abilityChanged: onlyAbilityChanged ? 'false' : 'true', page: '1' })}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              onlyAbilityChanged 
                ? 'bg-amber-500 text-slate-950 shadow-sm' 
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Habilidad Nueva
          </button>

          {(onlyTypeChanged || onlyStatsChanged || onlyAbilityChanged || filterType !== 'ALL' || search) && (
            <button
              onClick={() => {
                setSearchParams(new URLSearchParams(), { replace: true });
              }}
              className="text-xs text-amber-400 hover:underline ml-auto"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Grid of Pokemon Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {paginatedPokemon.map((pk) => {
          const typeChange = pk.typeChange as any;
          return (
            <NavLink
              key={pk.dexNumber}
              to={`/pokedex/${pk.dexNumber}`}
              onClick={handlePokemonClick}
              className="group p-3 sm:p-3.5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/90 border border-slate-800/80 hover:border-amber-500/40 transition-all flex flex-col justify-between hover:scale-[1.02] hover:shadow-lg"
            >
              <div>
                {/* Dex number & Badge tags */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[11px] font-mono text-slate-500 group-hover:text-amber-400 transition-colors">
                    #{String(pk.dexNumber).padStart(3, '0')}
                  </span>
                  {typeChange && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Tipo
                    </span>
                  )}
                  {pk.statChanges && !typeChange && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Stats
                    </span>
                  )}
                </div>

                {/* Pokemon Sprite */}
                <div className="w-full aspect-square flex items-center justify-center p-2 mb-2 bg-slate-950/40 rounded-xl">
                  <img
                    src={getSpriteUrl(pk.dexNumber)}
                    alt={pk.name}
                    loading="lazy"
                    className="w-20 h-20 object-contain drop-shadow group-hover:scale-110 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Name */}
                <h3 className="font-bold text-sm text-slate-200 group-hover:text-amber-400 transition-colors truncate">
                  {pk.name}
                </h3>

                {/* Type changed preview or modified abilities */}
                {typeChange?.modified && (
                  <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                    {typeChange.modified.map((t: string) => (
                      <Badge key={t} label={t} variant="type" className="text-[9px] px-1.5 py-0" />
                    ))}
                  </div>
                )}

                {/* Abilities added */}
                {pk.abilities.length > 0 && !typeChange && (
                  <div className="text-[10px] text-slate-400 truncate mt-1">
                    {pk.abilities[0]}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-800/60">
                <span>{pk.levelUpMoves.length} atqs</span>
                <span className="text-amber-500 group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </NavLink>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredPokemon.length)} de {filteredPokemon.length} Pokémon
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => updateParams({ page: String(Math.max(1, currentPage - 1)) })}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-colors"
            >
              Anterior
            </button>
            <span className="text-xs text-slate-400 font-medium px-2">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => updateParams({ page: String(Math.min(totalPages, currentPage + 1)) })}
              disabled={currentPage === totalPages}
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
