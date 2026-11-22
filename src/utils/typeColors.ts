export interface TypeStyle {
  bg: string;
  text: string;
  border: string;
  badge: string;
}

export const typeStyles: Record<string, TypeStyle> = {
  Normal: {
    bg: 'bg-stone-500/20',
    text: 'text-stone-300',
    border: 'border-stone-500/40',
    badge: 'bg-[#A8A878] text-white',
  },
  Fire: {
    bg: 'bg-orange-500/20',
    text: 'text-orange-400',
    border: 'border-orange-500/40',
    badge: 'bg-[#F08030] text-white',
  },
  Water: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/40',
    badge: 'bg-[#6890F0] text-white',
  },
  Grass: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/40',
    badge: 'bg-[#78C850] text-white',
  },
  Electric: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    border: 'border-yellow-500/40',
    badge: 'bg-[#F8D030] text-slate-950 font-semibold',
  },
  Ice: {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-300',
    border: 'border-cyan-500/40',
    badge: 'bg-[#98D8D8] text-slate-950 font-semibold',
  },
  Fighting: {
    bg: 'bg-red-700/20',
    text: 'text-red-400',
    border: 'border-red-700/40',
    badge: 'bg-[#C03028] text-white',
  },
  Poison: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    border: 'border-purple-500/40',
    badge: 'bg-[#A040A0] text-white',
  },
  Ground: {
    bg: 'bg-amber-700/20',
    text: 'text-amber-300',
    border: 'border-amber-700/40',
    badge: 'bg-[#E0C068] text-slate-950 font-semibold',
  },
  Flying: {
    bg: 'bg-indigo-400/20',
    text: 'text-indigo-300',
    border: 'border-indigo-400/40',
    badge: 'bg-[#A890F0] text-white',
  },
  Psychic: {
    bg: 'bg-pink-500/20',
    text: 'text-pink-400',
    border: 'border-pink-500/40',
    badge: 'bg-[#F85888] text-white',
  },
  Bug: {
    bg: 'bg-lime-500/20',
    text: 'text-lime-400',
    border: 'border-lime-500/40',
    badge: 'bg-[#A8B820] text-white',
  },
  Rock: {
    bg: 'bg-yellow-800/20',
    text: 'text-yellow-300',
    border: 'border-yellow-800/40',
    badge: 'bg-[#B8A038] text-white',
  },
  Ghost: {
    bg: 'bg-violet-900/20',
    text: 'text-violet-300',
    border: 'border-violet-900/40',
    badge: 'bg-[#705898] text-white',
  },
  Dragon: {
    bg: 'bg-indigo-700/20',
    text: 'text-indigo-400',
    border: 'border-indigo-700/40',
    badge: 'bg-[#7038F8] text-white',
  },
  Steel: {
    bg: 'bg-slate-400/20',
    text: 'text-slate-300',
    border: 'border-slate-400/40',
    badge: 'bg-[#B8B8D0] text-slate-950 font-semibold',
  },
  Dark: {
    bg: 'bg-neutral-800/40',
    text: 'text-neutral-300',
    border: 'border-neutral-700',
    badge: 'bg-[#705848] text-white',
  },
  Fairy: {
    bg: 'bg-rose-400/20',
    text: 'text-rose-300',
    border: 'border-rose-400/40',
    badge: 'bg-[#EE99AC] text-slate-950 font-semibold',
  }
};

export const getTypeStyle = (typeName: string): TypeStyle => {
  const normalized = typeName.charAt(0).toUpperCase() + typeName.slice(1).toLowerCase();
  return typeStyles[normalized] || typeStyles['Normal'];
};
