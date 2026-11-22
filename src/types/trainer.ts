export interface TrainerPokemon {
  species: string;
  level: number;
  heldItem: string;
  attacks: string[];
  notes?: string;
}

export interface TrainerBattle {
  id: string;
  rawTitle: string;
  name: string;
  badge: string | null;
  specialtyType: string;
  region: 'Johto' | 'Kanto';
  role: string;
  levelCap: number;
  team: TrainerPokemon[];
}
