import React, { useEffect, useState, useMemo } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import pokemonData from '../data/pokemon_changes.json';
import locationsData from '../data/locations.json';
import evolutionsData from '../data/evolutions.json';
import baseStatsData from '../data/pokemon_base_stats_gen4.json';
import { PokemonChange, PokeAPIData } from '../types/pokemon';
import { fetchPokemonData, getOfficialArtworkUrl, getSpriteUrl } from '../services/pokeapi';
import { getPokemonDexNumber } from '../utils/pokemonNames';
import { Badge } from '../components/common/Badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  GitFork, 
  Swords, 
  Zap, 
  ShieldCheck, 
  Layers, 
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

export const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dexNumber = parseInt(id || '1', 10);

  const [pokeApi, setPokeApi] = useState<PokeAPIData | null>(null);
  const [loadingApi, setLoadingApi] = useState(true);

  // Sacred Gold changes
  const sgData = useMemo(() => {
    return (pokemonData as PokemonChange[]).find(p => p.dexNumber === dexNumber) || null;
  }, [dexNumber]);

  // Verified Gen 4 original vs Sacred Gold stats
  const statComparison = useMemo(() => {
    const raw = (baseStatsData as any)[String(dexNumber)];
    return raw || null;
  }, [dexNumber]);

  // Locations where this Pokemon appears
  const locationsFound = useMemo(() => {
    if (!sgData) return [];
    const results: { areaName: string; region: string; page: number; method: string; rate: string }[] = [];
    
    const targetName = sgData.name.toLowerCase();
    locationsData.forEach((loc: any) => {
      loc.encounterMethods.forEach((method: any) => {
        method.pokemon.forEach((pk: any) => {
          if (pk.pokemon.toLowerCase().includes(targetName)) {
            results.push({
              areaName: loc.name,
              region: loc.region,
              page: loc.page,
              method: method.method,
              rate: pk.rate
            });
          }
        });
      });
    });
    return results;
  }, [sgData]);

  // Evolutions
  const evolutionsFound = useMemo(() => {
    if (!sgData) return [];
    const targetName = sgData.name.toLowerCase();
    const results: any[] = [];

    evolutionsData.categories.forEach((cat: any) => {
      cat.methods.forEach((m: any) => {
        if (m.basePokemon.toLowerCase() === targetName || m.targetPokemon.toLowerCase() === targetName) {
          results.push({
            categoryName: cat.name,
            ...m
          });
        }
      });
    });
    return results;
  }, [sgData]);

  useEffect(() => {
    let mounted = true;
    setLoadingApi(true);
    fetchPokemonData(dexNumber).then((data) => {
      if (mounted) {
        setPokeApi(data);
        setLoadingApi(false);
      }
    });
    return () => { mounted = false; };
  }, [dexNumber]);

  if (!sgData && !pokeApi && !loadingApi) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Pokémon no encontrado</h2>
        <button onClick={() => navigate(-1)} className="text-amber-400 hover:underline text-sm">
          Volver a la Pokédex
        </button>
      </div>
    );
  }

  const name = sgData?.name || pokeApi?.name || `Pokémon #${dexNumber}`;
  const typeChange = sgData?.typeChange as any;

  const statLabels: Record<string, string> = {
    hp: 'PS',
    attack: 'Ataque',
    defense: 'Defensa',
    spAtk: 'Atq. Especial',
    spDef: 'Def. Especial',
    speed: 'Velocidad',
    total: 'BST (Total)'
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Pokédex (Conservar filtros y página)</span>
        </button>

        <div className="flex items-center gap-2">
          {dexNumber > 1 && (
            <button
              onClick={() => navigate(`/pokedex/${dexNumber - 1}`)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              title="Pokémon Anterior"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <span className="font-mono text-xs text-slate-500 font-semibold">
            #{String(dexNumber).padStart(3, '0')}
          </span>
          {dexNumber < 493 && (
            <button
              onClick={() => navigate(`/pokedex/${dexNumber + 1}`)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              title="Pokémon Siguiente"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Artwork / Sprite Display */}
        <div className="w-48 sm:w-56 aspect-square shrink-0 flex items-center justify-center p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner group">
          <img
            src={pokeApi?.sprites.official_artwork || getOfficialArtworkUrl(dexNumber)}
            alt={name}
            className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getSpriteUrl(dexNumber);
            }}
          />
        </div>

        {/* Core Info */}
        <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="text-sm font-mono font-bold text-amber-400">
                #{String(dexNumber).padStart(3, '0')}
              </span>
              {sgData && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Modificado en Sacred Gold (Pág. {sgData.page})
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {name}
            </h1>
          </div>

          {/* Types (Original vs Sacred Gold) */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {typeChange ? 'Tipos (Modificación en Sacred Gold):' : 'Tipos:'}
            </span>
            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              {typeChange?.modified ? (
                <>
                  <div className="flex items-center gap-1 opacity-60">
                    <span className="text-xs text-slate-500 line-through">Original:</span>
                    {typeChange.original.map((t: string) => (
                      <Badge key={t} label={t} variant="type" className="line-through opacity-70" />
                    ))}
                  </div>
                  <span className="text-amber-400 font-bold">→</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-amber-400 font-semibold">Sacred Gold:</span>
                    {typeChange.modified.map((t: string) => (
                      <Badge key={t} label={t} variant="type" />
                    ))}
                  </div>
                </>
              ) : (
                pokeApi?.types.map((t) => (
                  <Badge key={t} label={t} variant="type" />
                )) || <Badge label="Normal" variant="type" />
              )}
            </div>
          </div>

          {/* Abilities in Sacred Gold */}
          {sgData?.abilities && sgData.abilities.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Habilidades Añadidas / Reemplazadas:
              </span>
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                {sgData.abilities.map((ab, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                  >
                    + {ab}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Physical Attributes from PokeAPI */}
          {pokeApi && (
            <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div>
                <span className="text-slate-500">Altura:</span> <span className="text-slate-300 font-medium">{pokeApi.height} m</span>
              </div>
              <div>
                <span className="text-slate-500">Peso:</span> <span className="text-slate-300 font-medium">{pokeApi.weight} kg</span>
              </div>
              {sgData?.baseExpChange && (
                <div>
                  <span className="text-slate-500">Exp. Base:</span> <span className="text-amber-300 font-medium">{sgData.baseExpChange}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Side-by-side Stats Comparison Section (Original Gen 4 vs Sacred Gold) */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Comparativa de Estadísticas Base: Original HGSS vs. Sacred Gold
            </h2>
          </div>
          {statComparison?.hasStatChanges ? (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 self-start sm:self-auto">
              Estadísticas Rebalanceadas
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 self-start sm:self-auto">
              Estadísticas Estándar HGSS
            </span>
          )}
        </div>

        {statComparison ? (
          <div className="flex flex-col gap-3">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800/60 px-3">
              <div className="col-span-3">Estadística</div>
              <div className="col-span-2 text-center">Original (HGSS)</div>
              <div className="col-span-2 text-center">Sacred Gold</div>
              <div className="col-span-2 text-center">Diferencia</div>
              <div className="col-span-3 text-right">Comparativa Visual</div>
            </div>

            {/* Stat Rows */}
            {['hp', 'attack', 'defense', 'spAtk', 'spDef', 'speed', 'total'].map((sKey) => {
              const origVal = statComparison.originalStats[sKey] || 0;
              const sgVal = statComparison.sacredGoldStats[sKey] || 0;
              const diff = statComparison.difference[sKey] || 0;
              const isTotal = sKey === 'total';
              const maxScale = isTotal ? 700 : 160;
              const pctOrig = Math.min(100, Math.round((origVal / maxScale) * 100));
              const pctSg = Math.min(100, Math.round((sgVal / maxScale) * 100));

              return (
                <div
                  key={sKey}
                  className={`p-3 rounded-xl transition-all ${
                    isTotal 
                      ? 'bg-slate-950/90 border border-slate-700/80 font-bold mt-2' 
                      : 'bg-slate-950/50 border border-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                    {/* Stat Label */}
                    <div className="sm:col-span-3 flex items-center justify-between sm:justify-start gap-2">
                      <span className={`text-xs ${isTotal ? 'text-amber-400 font-extrabold' : 'text-slate-300 font-medium'}`}>
                        {statLabels[sKey]}
                      </span>
                    </div>

                    {/* Original Value */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-center text-xs font-mono">
                      <span className="sm:hidden text-slate-500">Original:</span>
                      <span className="text-slate-400">{origVal}</span>
                    </div>

                    {/* Sacred Gold Value */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-center text-xs font-mono">
                      <span className="sm:hidden text-slate-500">Sacred Gold:</span>
                      <span className={diff !== 0 ? 'text-amber-300 font-bold' : 'text-slate-200'}>
                        {sgVal}
                      </span>
                    </div>

                    {/* Difference Pill */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-center text-xs font-mono">
                      <span className="sm:hidden text-slate-500">Diferencia:</span>
                      {diff > 0 ? (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          <TrendingUp className="w-3 h-3" />
                          +{diff}
                        </span>
                      ) : diff < 0 ? (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-500/15 text-red-300 border border-red-500/30">
                          <TrendingDown className="w-3 h-3" />
                          {diff}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-400 border border-slate-700/60">
                          <Minus className="w-3 h-3" />
                          0
                        </span>
                      )}
                    </div>

                    {/* Visual Comparison Bar */}
                    <div className="sm:col-span-3 flex flex-col gap-1 mt-1 sm:mt-0">
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                        <div
                          style={{ width: `${pctOrig}%` }}
                          className="bg-slate-600 h-full rounded-full opacity-80"
                          title={`Original: ${origVal}`}
                        />
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                        <div
                          style={{ width: `${pctSg}%` }}
                          className={`h-full rounded-full transition-all ${
                            diff > 0 ? 'bg-gradient-to-r from-emerald-500 to-amber-400' : diff < 0 ? 'bg-red-500' : 'bg-amber-400/80'
                          }`}
                          title={`Sacred Gold: ${sgVal}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-500">Cargando comparativa de estadísticas...</p>
        )}
      </div>

      {/* Level-Up Moves Added in Sacred Gold */}
      {sgData?.levelUpMoves && sgData.levelUpMoves.length > 0 && (
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Swords className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Movimientos por Nivel Añadidos / Modificados ({sgData.levelUpMoves.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {sgData.levelUpMoves.map((mv, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80"
              >
                <span className="font-medium text-sm text-slate-200">
                  {mv.move || mv.raw}
                </span>
                {mv.level && (
                  <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    Nv. {mv.level}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sacred Gold Encounter Locations */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Ubicaciones de Encuentro en Sacred Gold ({locationsFound.length})
            </h2>
          </div>
          <NavLink to="/locations" className="text-xs text-amber-400 hover:underline">
            Ver todas las rutas
          </NavLink>
        </div>

        {locationsFound.length === 0 ? (
          <p className="text-xs text-slate-500">
            No se encontraron encuentros salvajes directos documentados en las rutas principales (puede obtenerse por evolución, evento especial o intercambio in-game).
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {locationsFound.map((loc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-200">{loc.areaName}</h4>
                  <span className="text-xs text-slate-400 mt-0.5 block">{loc.method}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="px-2 py-1 rounded-md text-xs font-bold font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {loc.rate}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">{loc.region}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Evolution Methods in Sacred Gold */}
      {evolutionsFound.length > 0 && (
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <GitFork className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Línea Evolutiva en Sacred Gold
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {evolutionsFound.map((ev, idx) => {
              const baseDex = getPokemonDexNumber(ev.basePokemon);
              const targetDex = getPokemonDexNumber(ev.targetPokemon);

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <NavLink to={`/pokedex/${baseDex}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <img src={getSpriteUrl(baseDex)} alt={ev.basePokemon} className="w-10 h-10 object-contain" />
                      <span className="font-bold text-sm text-slate-200">{ev.basePokemon}</span>
                    </NavLink>

                    <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />

                    <NavLink to={`/pokedex/${targetDex}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <img src={getSpriteUrl(targetDex)} alt={ev.targetPokemon} className="w-10 h-10 object-contain" />
                      <span className="font-bold text-sm text-amber-300">{ev.targetPokemon}</span>
                    </NavLink>
                  </div>

                  <div className="text-right self-stretch sm:self-auto">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block">
                      {ev.newMethod}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      Original: {ev.originalMethod}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
