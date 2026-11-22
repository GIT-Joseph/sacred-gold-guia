import { useMemo, useState } from 'react';
import pokemonData from '../data/pokemon_changes.json';
import trainersData from '../data/trainers_levelcaps.json';
import locationsData from '../data/locations.json';
import itemsData from '../data/items.json';
import eventsData from '../data/events.json';
import actionReplayData from '../data/action_replay.json';

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'Pokémon' | 'Líder / Gimnasio' | 'Ubicación' | 'Objeto' | 'Evento / Legendario' | 'Action Replay';
  url: string;
  badge?: string;
}

export function useGlobalSearch() {
  const [query, setQuery] = useState('');

  const allItems: SearchResult[] = useMemo(() => {
    const list: SearchResult[] = [];

    // 1. Pokémon
    pokemonData.forEach((pk: any) => {
      const typeNote = pk.typeChange ? ' (Tipo modificado)' : '';
      const statNote = pk.statChanges ? ' (Stats modificadas)' : '';
      list.push({
        id: `pk-${pk.dexNumber}`,
        title: `#${String(pk.dexNumber).padStart(3, '0')} ${pk.name}`,
        subtitle: `Pokémon Sacred Gold${typeNote}${statNote}`,
        category: 'Pokémon',
        url: `/pokedex/${pk.dexNumber}`,
        badge: pk.typeChange ? 'Cambio Tipo' : undefined
      });
    });

    // 2. Líderes & Level Caps
    trainersData.forEach((tr: any) => {
      list.push({
        id: `tr-${tr.id}`,
        title: tr.name,
        subtitle: `${tr.role} • Level Cap: Nv. ${tr.levelCap}`,
        category: 'Líder / Gimnasio',
        url: `/gyms#${tr.id}`,
        badge: `Cap: ${tr.levelCap}`
      });
    });

    // 3. Ubicaciones
    locationsData.forEach((loc: any) => {
      list.push({
        id: `loc-${loc.id}`,
        title: loc.name,
        subtitle: `Región: ${loc.region} • Niveles salvajes: ${loc.wildLevels}`,
        category: 'Ubicación',
        url: `/locations#${loc.id}`,
        badge: loc.region
      });
    });

    // 4. Objetos (MTs y Evolutivos)
    itemsData.tms.forEach((tm: any) => {
      list.push({
        id: `item-tm-${tm.id}`,
        title: `${tm.code}: ${tm.move}`,
        subtitle: tm.location,
        category: 'Objeto',
        url: `/items#${tm.id}`,
        badge: 'MT'
      });
    });

    itemsData.evolutionItems.forEach((it: any) => {
      list.push({
        id: `item-evo-${it.id}`,
        title: it.name,
        subtitle: it.location,
        category: 'Objeto',
        url: `/items#${it.id}`,
        badge: it.isExclusiveHack ? 'Exclusivo' : 'Evolutivo'
      });
    });

    // 5. Eventos y Legendarios
    eventsData.events.forEach((ev: any) => {
      list.push({
        id: `ev-${ev.id}`,
        title: ev.name,
        subtitle: `${ev.category} • Pág. ${ev.page}`,
        category: 'Evento / Legendario',
        url: `/events#${ev.id}`,
        badge: ev.category
      });
    });

    // 6. Action Replay
    actionReplayData.codes.forEach((ar: any) => {
      list.push({
        id: `ar-${ar.id}`,
        title: `AR: ${ar.title}`,
        subtitle: ar.description,
        category: 'Action Replay',
        url: `/action-replay#${ar.id}`,
        badge: ar.category
      });
    });

    return list;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allItems
      .filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      )
      .slice(0, 15);
  }, [query, allItems]);

  return { query, setQuery, results };
}
