export interface EncounterPokemon {
  pokemon: string;
  rate: string;
}

export interface EncounterMethod {
  method: string;
  rawContent: string;
  pokemon: EncounterPokemon[];
}

export interface LocationArea {
  id: string;
  name: string;
  region: 'Johto' | 'Kanto';
  page: number;
  wildLevels: string;
  screenshot: string | null;
  encounterMethods: EncounterMethod[];
}
