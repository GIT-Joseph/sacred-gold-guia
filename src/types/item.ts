export interface TMItem {
  id: string;
  code: string;
  name: string;
  move: string;
  category: string;
  location: string;
  isModified: boolean;
  image: string;
}

export interface GeneralItem {
  id: string;
  name: string;
  category: string;
  isExclusiveHack?: boolean;
  location: string;
  image: string;
}

export interface ItemsData {
  totalTms: number;
  totalEvoItems: number;
  totalStones: number;
  totalKeyItems: number;
  tms: TMItem[];
  evolutionItems: GeneralItem[];
  evolutionStones: GeneralItem[];
  keyItems: GeneralItem[];
  fossils: GeneralItem[];
  otherItems: GeneralItem[];
}
