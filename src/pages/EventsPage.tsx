import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import eventsData from '../data/events.json';
import { SpecialEvent, ArceusPlate } from '../types/event';
import { Flame, CheckCircle2, Award, Key } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { getSpriteUrl } from '../services/pokeapi';
import { getPokemonDexNumber } from '../utils/pokemonNames';

export const EventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'no-leg' | 'gifts' | 'legendary' | 'arceus'>('all');
  const [selectedPlate, setSelectedPlate] = useState<string | null>(null);

  const filteredEvents = eventsData.events.filter((ev: SpecialEvent) => {
    if (activeTab === 'no-leg') return ev.category.includes('No-Legendarios');
    if (activeTab === 'gifts') return ev.category.includes('Regalados');
    if (activeTab === 'legendary') return ev.category.includes('Legendarios');
    if (activeTab === 'arceus') return ev.category.includes('Arceus');
    return true;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
          <Flame className="w-4 h-4" />
          <span>Documento Legendarios y Eventos Oficial</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Legendarios, Eventos Especiales & Desafío Arceus
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
          Guía paso a paso para desbloquear los <strong>38 encuentros únicos</strong>, legendarios y Pokémon regalados en Sacred Gold, con sus sprites oficiales, requisitos exactos y las 16 Tablas Elementales de Arceus.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
        {[
          { id: 'all', label: `Todos los Eventos (${eventsData.events.length})` },
          { id: 'legendary', label: 'Pokémon Legendarios' },
          { id: 'gifts', label: 'Pokémon Regalados' },
          { id: 'no-leg', label: 'No-Legendarios Especiales' },
          { id: 'arceus', label: 'Arceus & 16 Tablas' },
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

      {/* Arceus Elemental Plates Interactive Grid (When Arceus or All is active) */}
      {(activeTab === 'arceus' || activeTab === 'all') && (
        <section className="p-6 rounded-3xl bg-slate-900/60 border border-amber-500/30 flex flex-col gap-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                Las 16 Tablas Elementales de Arceus
              </h2>
            </div>
            <span className="text-xs font-bold text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              Requisito de Arceus (16/16)
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Para que Arceus acepte tu desafío en el <strong>Estrado Mistrío (Ruinas Sinjoh)</strong>, debes haber capturado a los otros 492 Pokémon y tener las 16 Tablas Elementales en tu mochila:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {eventsData.arceusPlates.map((plate: ArceusPlate) => (
              <button
                key={plate.id}
                onClick={() => setSelectedPlate(selectedPlate === plate.id ? null : plate.id)}
                className={`p-2.5 rounded-xl text-center border transition-all flex flex-col items-center justify-center gap-1 ${
                  selectedPlate === plate.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg scale-105'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <span className="text-xs font-semibold">{plate.name}</span>
                <Badge label={plate.type} variant="type" className="text-[8px] px-1.5 py-0" />
              </button>
            ))}
          </div>

          {/* Selected Plate Detail Box */}
          {selectedPlate && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 animate-in fade-in flex items-start gap-3">
              <Key className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-white">
                  {eventsData.arceusPlates.find(p => p.id === selectedPlate)?.name}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {eventsData.arceusPlates.find(p => p.id === selectedPlate)?.location}
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Events List */}
      <div className="flex flex-col gap-6">
        {filteredEvents.map((ev: SpecialEvent) => (
          <section
            key={ev.id}
            id={ev.id}
            className="p-5 sm:p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all shadow-md flex flex-col gap-5"
          >
            {/* Event Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {ev.name}
                  </h2>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Categoría: {ev.category}
                  </span>
                </div>
              </div>

              {/* Featured Pokemon Sprites with Dex Links */}
              {ev.pokemon && ev.pokemon.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {ev.pokemon.map((pkName) => {
                    const dexNum = getPokemonDexNumber(pkName);
                    return (
                      <NavLink
                        key={pkName}
                        to={`/pokedex/${dexNum}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all group/pk shadow-sm"
                        title={`Ver ficha completa de ${pkName} (#${dexNum})`}
                      >
                        <img
                          src={getSpriteUrl(dexNum)}
                          alt={pkName}
                          loading="lazy"
                          className="w-7 h-7 object-contain group-hover/pk:scale-115 transition-transform"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                        <span className="text-xs font-semibold text-slate-200 group-hover/pk:text-amber-400">
                          {pkName}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          #{dexNum.toString().padStart(3, '0')}
                        </span>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Event Layout: Screenshot + Requirements & Guide */}
            <div className="flex flex-col lg:flex-row gap-5 items-start">
              {/* Authentic In-Game DS Screenshot */}
              <div className="w-full sm:w-64 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 shadow-inner group relative flex items-center justify-center">
                {ev.screenshot ? (
                  <>
                    <img
                      src={ev.screenshot}
                      alt={ev.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/85 backdrop-blur-sm border border-slate-800 text-[10px] font-mono text-amber-400 font-semibold pointer-events-none">
                      Captura del Evento
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-950 text-slate-500 text-xs">
                    <Flame className="w-6 h-6 text-amber-500/50 mb-1" />
                    <span>Evento Especial</span>
                  </div>
                )}
              </div>

              {/* Instructions and Requirements */}
              <div className="flex-1 w-full flex flex-col gap-3">
                {/* Requirements Checklist */}
                {ev.requirements.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Requisitos de activación:
                    </span>
                    <ul className="flex flex-col gap-1">
                      {ev.requirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Description */}
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/50">
                  {ev.description}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
