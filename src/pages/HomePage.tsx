import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BookOpen, 
  MapPin, 
  Swords, 
  GitFork, 
  Package, 
  Flame, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Info
} from 'lucide-react';
import trainersData from '../data/trainers_levelcaps.json';
import pokemonData from '../data/pokemon_changes.json';
import locationsData from '../data/locations.json';
import itemsData from '../data/items.json';

export const HomePage: React.FC = () => {
  const quickLinks = [
    {
      to: '/gyms',
      title: 'Gimnasios & Level Caps',
      description: 'Líderes de Johto y Kanto, Alto Mando, Lance y Rojo con sus equipos, ataques y límites de nivel oficiales.',
      icon: Swords,
      stat: '32 Combates',
      color: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/30',
      iconColor: 'text-amber-400'
    },
    {
      to: '/pokedex',
      title: 'Pokédex & Cambios',
      description: '433 Pokémon con cambios de estadísticas, nuevos tipos elementales, habilidades ocultas y movimientos ampliados.',
      icon: BookOpen,
      stat: '433 Modificados',
      color: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30',
      iconColor: 'text-blue-400'
    },
    {
      to: '/locations',
      title: 'Ubicaciones & Hábitats',
      description: 'Guía de encuentros salvajes en 127 áreas de Johto y Kanto con probabilidades exactas y horarios.',
      icon: MapPin,
      stat: '127 Zonas',
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400'
    },
    {
      to: '/evolutions',
      title: 'Cambios Evolutivos',
      description: 'Eliminación de intercambios. Nuevos objetos como el Orbe Unión, Mineral Voltaico y piedras para Eevee.',
      icon: GitFork,
      stat: 'Sin Intercambio',
      color: 'from-purple-500/20 to-indigo-500/20',
      border: 'border-purple-500/30',
      iconColor: 'text-purple-400'
    },
    {
      to: '/items',
      title: 'Objetos & MTs',
      description: 'Ubicación de las 47 MTs relocalizadas, objetos de evolución disponibles antes de la Liga y fósiles gratuitos.',
      icon: Package,
      stat: '49 MTs / 29 Objetos',
      color: 'from-pink-500/20 to-rose-500/20',
      border: 'border-pink-500/30',
      iconColor: 'text-pink-400'
    },
    {
      to: '/events',
      title: 'Legendarios & Eventos',
      description: '37 eventos especiales, Pokémon regalados, captura de los 493 Pokémon y las 16 Tablas de Arceus.',
      icon: Flame,
      stat: '37 Eventos',
      color: 'from-yellow-500/20 to-amber-500/20',
      border: 'border-yellow-500/30',
      iconColor: 'text-yellow-400'
    },
    {
      to: '/action-replay',
      title: 'Códigos Action Replay',
      description: 'Códigos recomendados por Drayano para acelerar textos, curación en centros y transiciones de pantalla.',
      icon: Terminal,
      stat: '8 Códigos',
      color: 'from-slate-500/20 to-zinc-500/20',
      border: 'border-slate-600/40',
      iconColor: 'text-slate-300'
    }
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950 border border-slate-800 p-6 sm:p-10 lg:p-12">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Hack ROM de Drayano • Base HeartGold
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Guía Interactiva Oficial de <br />
            <span className="gold-gradient-text">Pokémon Sacred Gold</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Base de conocimiento completa para consultar durante tu partida. Consulta estadísticas modificadas,
            ubicaciones de encuentro con porcentajes exactos, equipos de líderes con sus <strong>Level Caps</strong>,
            métodos de evolución sin intercambio y eventos especiales.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <NavLink
              to="/gyms"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <Swords className="w-4 h-4" />
              <span>Ver Level Caps & Gimnasios</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </NavLink>

            <NavLink
              to="/pokedex"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explorar Pokédex ({pokemonData.length})</span>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Critical Battle Mechanics Box */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-200">Rebalanceo de MOs</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              <strong>Corte:</strong> Potencia 60 (Planta).<br />
              <strong>Fuerza:</strong> Potencia 60 (Roca).<br />
              <strong>Golpe Roca:</strong> Potencia 60 (Lucha) con 30% prob. bajar defensa.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-200">Recordador de Movimientos</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              El Recuerda-Movimientos y el Quita-Movimientos se han trasladado a la <strong>casa superior izquierda de Ciudad Orquídea</strong> (Cianwood City).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-200">493 Pokémon Disponibles</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Todos los Pokémon de las 4 primeras generaciones son capturables en una sola partida sin intercambios externos ni trucos de trampa.
            </p>
          </div>
        </div>
      </section>

      {/* Main Sections Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Secciones Principales de la Guía</h2>
          <span className="text-xs text-slate-500 font-mono">7 Categorías</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`group p-5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/90 border ${link.border} transition-all duration-200 flex flex-col justify-between hover:scale-[1.01] hover:shadow-xl`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${link.color} ${link.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700/60">
                      {link.stat}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-100 group-hover:text-amber-400 transition-colors mb-1.5">
                    {link.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {link.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-amber-500/80 group-hover:text-amber-400 mt-4 transition-colors">
                  <span>Consultar</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </NavLink>
            );
          })}
        </div>
      </section>
    </div>
  );
};
