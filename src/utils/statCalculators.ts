export interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
  originalValue?: number;
}

export const getStatColor = (statName: string): string => {
  switch (statName.toLowerCase()) {
    case 'hp':
      return 'bg-emerald-500';
    case 'attack':
    case 'atk':
      return 'bg-orange-500';
    case 'defense':
    case 'def':
      return 'bg-amber-500';
    case 'specialattack':
    case 'spatk':
    case 'satk':
      return 'bg-blue-500';
    case 'specialdefense':
    case 'spdef':
    case 'sdef':
      return 'bg-indigo-500';
    case 'speed':
    case 'spd':
      return 'bg-pink-500';
    default:
      return 'bg-amber-400';
  }
};
