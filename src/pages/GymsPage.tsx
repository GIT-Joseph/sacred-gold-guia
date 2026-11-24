import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import trainersData from '../data/trainers_levelcaps.json';
import { TrainerBattle, TrainerPokemon } from '../types/trainer';
import { Badge } from '../components/common/Badge';
import { Swords, Shield, Trophy, Sparkles, AlertCircle, Award, Languages, Search } from 'lucide-react';
import { getSpriteUrl } from '../services/pokeapi';
import { getPokemonDexNumber } from '../utils/pokemonNames';
import { getMoveTranslation } from '../utils/pokemonMoves';

const trainerImageKeyMap: Record<string, string> = {
  'falkner': 'falkner',
  'bugsy': 'bugsy',
  'whitney': 'whitney',
  'morty': 'morty',
  'chuck': 'chuck',
  'jasmine': 'jasmine',
  'pryce': 'pryce',
  'clair': 'clair',
  'will': 'will',
  'koga': 'koga',
  'bruno': 'bruno',
  'karen': 'karen',
  'lance': 'lance',
  'brock': 'brock',
  'misty': 'misty',
  'lt-surge': 'ltsurge',
  'erika': 'erika',
  'janine': 'janine',
  'sabrina': 'sabrina',
  'blaine': 'blaine',
  'blue': 'blue',
  'red': 'red',
  'lyra-battle-1': 'lyra',
  'ethan-battle-1': 'ethan',
  'eusine': 'eusine',
  'proton-radio-tower': 'proton',
  'underground-rival-if-player-choose-cyndaquil': 'silver',
  'underground-rival-if-player-choose-chikorita': 'silver',
  'underground-rival-if-player-choose-totodile': 'silver',
  'victory-road-rival-if-player-choose-cyndaquil': 'silver',
  'victory-road-rival-if-player-choose-chikorita': 'silver',
  'victory-road-rival-if-player-choose-totodile': 'silver',
};

export const GymsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'johto' | 'league' | 'kanto' | 'story'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [moveLang, setMoveLang] = useState<'both' | 'es' | 'en'>('both');

  const filteredTrainers = trainersData.filter((trainer: any) => {
    // Filter by tab
    if (activeTab === 'johto') {
      if (trainer.region !== 'Johto' || trainer.role.includes('Alto Mando') || trainer.role.includes('Campeón') || trainer.role.includes('Rival') || trainer.role.includes('Historia') || trainer.role.includes('Rocket')) {
        return false;
      }
    } else if (activeTab === 'league') {
      if (!trainer.role.includes('Alto Mando') && !trainer.role.includes('Campeón')) {
        return false;
      }
    } else if (activeTab === 'kanto') {
      if (trainer.region !== 'Kanto') {
        return false;
      }
    } else if (activeTab === 'story') {
      if (!trainer.role.includes('Rival') && !trainer.role.includes('Historia') && !trainer.role.includes('Rocket')) {
        return false;
      }
    }

    // Filter by search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = trainer.name.toLowerCase().includes(q);
      const matchPokemon = trainer.team.some((p: any) => {
        const matchSpecies = p.species.toLowerCase().includes(q);
        const matchAttack = p.attacks.some((a: string) => {
          const { es, en } = getMoveTranslation(a);
          return es.toLowerCase().includes(q) || en.toLowerCase().includes(q);
        });
        return matchSpecies || matchAttack;
      });
      const matchType = trainer.specialtyType.toLowerCase().includes(q);
      const matchBadge = trainer.badge && trainer.badge.toLowerCase().includes(q);
      return matchName || matchPokemon || matchType || matchBadge;
    }

    return true;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
          <Award className="w-4 h-4" />
          <span>Documento Word Oficial de Level Caps</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Líderes de Gimnasio, Liga Pokémon & Level Caps
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
          Los <strong>Level Caps</strong> indican el nivel máximo al que deberías entrenar a tu equipo antes de cada líder o desafío importante para mantener la experiencia justa y retadora diseñada por Drayano. Consulta los equipos completos y movimientos en <strong>Español e Inglés</strong>.
        </p>
      </div>

      {/* Tabs and Controls Bar */}
      <div className="flex flex-col gap-3 pb-2 border-b border-slate-800">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'Todos (32)' },
            { id: 'johto', label: 'Gimnasios Johto (8)' },
            { id: 'league', label: 'Liga Pokémon (5)' },
            { id: 'kanto', label: 'Gimnasios Kanto & Red (9)' },
            { id: 'story', label: 'Rivales e Historia (10)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Move Language Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por líder, Pokémon o ataque (ej. 'Terremoto', 'Rayo', 'Gengar')..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs sm:text-sm outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5 px-2 text-xs font-semibold text-slate-400">
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span>Ataques:</span>
            </div>
            <button
              onClick={() => setMoveLang('both')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                moveLang === 'both'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mostrar nombres de ataques en español y en inglés simultáneamente"
            >
              ES + EN
            </button>
            <button
              onClick={() => setMoveLang('es')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                moveLang === 'es'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mostrar ataques solo en español"
            >
              Solo ES
            </button>
            <button
              onClick={() => setMoveLang('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                moveLang === 'en'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mostrar ataques solo en inglés"
            >
              Solo EN
            </button>
          </div>
        </div>
      </div>

      {/* Trainers Cards List */}
      <div className="flex flex-col gap-6">
        {filteredTrainers.map((trainer: any) => {
          const trainerImgFile = trainerImageKeyMap[trainer.id] 
            ? `images/trainers/${trainerImageKeyMap[trainer.id]}.png` 
            : null;

          return (
            <section
              key={trainer.id}
              id={trainer.id}
              className="p-5 sm:p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all shadow-lg flex flex-col gap-5"
            >
              {/* Trainer Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
                <div className="flex items-center gap-4">
                  {/* Authentic Trainer Portrait Thumbnail */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/30 p-1 flex items-center justify-center shrink-0 shadow-inner group">
                    {trainerImgFile ? (
                      <img
                        src={trainerImgFile}
                        alt={trainer.name}
                        loading="lazy"
                        className="w-full h-full object-contain filter drop-shadow group-hover:scale-110 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <Swords className="w-7 h-7 text-amber-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {trainer.name}
                      </h2>
                      {trainer.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          {trainer.badge}
                        </span>
                      )}
                      <span className="text-xs text-slate-300 font-medium px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/60">
                        {trainer.specialtyType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {trainer.role} • Región: {trainer.region}
                    </p>
                  </div>
                </div>

                {/* Big Level Cap Highlight */}
                <div className="flex items-center gap-2.5 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 shrink-0">
                  <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400/90">Level Cap</span>
                    <span className="text-lg sm:text-xl font-black text-amber-400 leading-none">
                      Nv. {trainer.levelCap}
                    </span>
                  </div>
                </div>
              </div>

              {/* Team Grid with Pokemon Sprites */}
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Equipo Pokémon ({trainer.team.length} miembros)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {trainer.team.map((pk: TrainerPokemon, idx: number) => {
                    const dexNum = getPokemonDexNumber(pk.species);
                    const spriteUrl = getSpriteUrl(dexNum);

                    return (
                      <div
                        key={`${trainer.id}-${pk.species}-${idx}`}
                        className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start gap-3"
                      >
                        {/* Pokemon Sprite with direct link to Pokedex */}
                        <NavLink
                          to={`/pokedex/${dexNum}`}
                          className="w-14 h-14 shrink-0 rounded-xl bg-slate-900/80 border border-slate-800 p-1 flex items-center justify-center hover:border-amber-500/40 hover:scale-105 transition-all group"
                          title={`Ver ficha de ${pk.species}`}
                        >
                          <img
                            src={spriteUrl}
                            alt={pk.species}
                            loading="lazy"
                            className="w-full h-full object-contain filter drop-shadow group-hover:scale-110 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </NavLink>

                        {/* Pokemon Data */}
                        <div className="flex-1 min-w-0">
                          {/* Species & Level */}
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <NavLink
                              to={`/pokedex/${dexNum}`}
                              className="font-bold text-slate-200 text-sm hover:text-amber-400 transition-colors truncate"
                            >
                              {pk.species}
                            </NavLink>
                            <span className="px-2 py-0.5 rounded text-xs font-black bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                              Nv. {pk.level}
                            </span>
                          </div>

                          {/* Held Item */}
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                            <span className="text-slate-500 text-[11px]">Objeto:</span>
                            <span className={pk.heldItem === 'Ninguno' ? 'text-slate-500' : 'text-amber-300 font-medium truncate'}>
                              {pk.heldItem}
                            </span>
                          </div>

                          {/* Attacks in Spanish and English */}
                          <div className="grid grid-cols-2 gap-1.5 mb-1">
                            {pk.attacks.map((atk, aIdx) => {
                              const { es, en } = getMoveTranslation(atk);

                              return (
                                <div
                                  key={aIdx}
                                  className="px-2 py-1 rounded-lg bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/30 transition-colors flex flex-col justify-center min-w-0"
                                  title={`${es} (${en})`}
                                >
                                  {moveLang === 'both' ? (
                                    <>
                                      <span className="text-[11px] font-bold text-slate-100 truncate leading-tight">
                                        {es}
                                      </span>
                                      <span className="text-[9px] text-slate-400 font-mono truncate leading-tight">
                                        {en}
                                      </span>
                                    </>
                                  ) : moveLang === 'es' ? (
                                    <span className="text-[11px] font-bold text-slate-100 truncate leading-tight">
                                      {es}
                                    </span>
                                  ) : (
                                    <span className="text-[11px] font-mono text-slate-200 truncate leading-tight">
                                      {en}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Note if any */}
                          {pk.notes && (
                            <div className="mt-1.5 p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 flex items-start gap-1">
                              <AlertCircle className="w-3 h-3 shrink-0 mt-0.5 text-amber-400" />
                              <span>{pk.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
