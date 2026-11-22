import { PokeAPIData } from '../types/pokemon';

const CACHE_PREFIX = 'pokeapi_cache_';
const CACHE_EXPIRY_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

// Direct sprite URL template from PokeAPI Github raw sprites (reliable and fast)
export const getOfficialArtworkUrl = (dexNumber: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dexNumber}.png`;
};

export const getSpriteUrl = (dexNumber: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNumber}.png`;
};

export const getAnimatedSpriteUrl = (dexNumber: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${dexNumber}.gif`;
};

export const fetchPokemonData = async (identifier: string | number): Promise<PokeAPIData | null> => {
  const cacheKey = `${CACHE_PREFIX}${identifier}`;
  
  // Try local cache
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS) {
        return parsed.data;
      }
    }
  } catch (e) {
    // localStorage may be disabled or full
  }

  try {
    const cleanId = typeof identifier === 'string' 
      ? identifier.toLowerCase().replace(/[^a-z0-9]/g, '') 
      : identifier;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${cleanId}`, {
      headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    
    const formatted: PokeAPIData = {
      id: json.id,
      name: json.name,
      height: json.height / 10, // decimetres to metres
      weight: json.weight / 10, // hectograms to kg
      types: json.types.map((t: any) => {
        const typeName = t.type.name;
        return typeName.charAt(0).toUpperCase() + typeName.slice(1);
      }),
      sprites: {
        front_default: json.sprites.front_default || getSpriteUrl(json.id),
        official_artwork: json.sprites.other?.['official-artwork']?.front_default || getOfficialArtworkUrl(json.id),
        animated: json.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default || getSpriteUrl(json.id),
      },
      stats: {
        hp: json.stats[0]?.base_stat || 0,
        attack: json.stats[1]?.base_stat || 0,
        defense: json.stats[2]?.base_stat || 0,
        specialAttack: json.stats[3]?.base_stat || 0,
        specialDefense: json.stats[4]?.base_stat || 0,
        speed: json.stats[5]?.base_stat || 0,
        total: json.stats.reduce((acc: number, curr: any) => acc + curr.base_stat, 0)
      }
    };

    try {
      localStorage.setItem(cacheKey, JSON.stringify({
        timestamp: Date.now(),
        data: formatted
      }));
    } catch (e) {
      // Storage quota exceeded
    }

    return formatted;
  } catch (error) {
    console.warn(`Error fetching PokeAPI data for ${identifier}:`, error);
    return null;
  }
};
