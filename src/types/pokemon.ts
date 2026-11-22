export type PokemonType = 
  | 'Normal' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Ice'
  | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic' | 'Bug'
  | 'Rock' | 'Ghost' | 'Dragon' | 'Steel' | 'Dark' | 'Fairy';

export interface PokemonStatChanges {
  summary: string;
  details?: Record<string, string>;
}

export interface LevelUpMove {
  level?: number;
  move?: string;
  raw?: string;
}

export interface PokemonChange {
  dexNumber: number;
  name: string;
  hasChanges: boolean;
  page: number;
  typeChange?: {
    original: string[];
    modified: string[];
  } | { raw: string } | null;
  abilities: string[];
  statChanges?: PokemonStatChanges | null;
  levelUpMoves: LevelUpMove[];
  tmCompatibility: string[];
  baseExpChange?: string | null;
  rawText: string;
}

export interface PokeAPIData {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  sprites: {
    front_default: string;
    official_artwork: string;
    animated?: string;
  };
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    total: number;
  };
}
