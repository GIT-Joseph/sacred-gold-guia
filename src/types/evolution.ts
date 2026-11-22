export interface EvolutionMethod {
  basePokemon: string;
  targetPokemon: string;
  item?: string;
  originalMethod: string;
  newMethod: string;
}

export interface EvolutionCategory {
  id: string;
  name: string;
  description: string;
  methods: EvolutionMethod[];
}

export interface EvolutionsData {
  title: string;
  description: string;
  categories: EvolutionCategory[];
}
