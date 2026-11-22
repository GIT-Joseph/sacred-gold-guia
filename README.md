# 🏆 Wiki Interactiva de Pokémon Sacred Gold

> Base de conocimiento interactiva, moderna y completa dedicada exclusivamente al Hack ROM **Pokémon Sacred Gold** (y Storm Silver) creado por **Drayano**.

---

## 🌟 Características Principales

- **🎮 Gimnasios, Liga Pokémon y Level Caps Oficiales**:
  - Los 8 Líderes de Johto con sus Level Caps destacados y medallas correspondientes.
  - Alto Mando y Campeón Lance (Cap Nv. 60).
  - Los 8 Líderes de Kanto y el combate legendario contra Rojo en el Monte Plateado (Cap Nv. 94).
  - Equipos completos de 182 combatientes con niveles, objetos equipados y movesets de 4 ataques.
  - Variantes de combates contra el Rival (Subterráneo Trigal y Calle Victoria), Protón del Team Rocket, Lyra, Ethan y Eusine.

- **📖 Pokédex Completa con Cambios de Sacred Gold**:
  - 433 Pokémon con modificaciones mecánicas documentadas.
  - Comparativa de tipos originales vs. nuevos tipos en Sacred Gold (ej. *Venomoth* Bicho/Psíquico, *Farfetch'd* Lucha/Volador, *Masquerain* Bicho/Agua, *Volbeat* Bicho/Eléctrico).
  - Rebalanceo de estadísticas base (ej. *Farfetch'd* 450 BST, *Masquerain* 484 BST, *Butterfree/Beedrill* 435 BST, *Flareon* 110 HP / 95 Speed).
  - Habilidades añadidas y ampliaciones de movimientos por nivel.
  - Integración híbrida con **PokéAPI** (artwork oficial y sprites animados) con caché local y soporte offline.

- **🗺️ Ubicaciones y Hábitats Salvajes**:
  - 127 áreas y subzonas cartografiadas en Johto y Kanto.
  - Rangos de niveles salvajes de cada ruta y mazmorra.
  - Encuentros filtrados por horario (*Mañana/Día*, *Noche*, *Todo el día*), *Surf*, *Caña Vieja/Buena/Súper*, *Golpe Roca* y emisiones de radio de Hoenn (*Meridian Sound*) y Sinnoh (*Pastoral Sound*).
  - Capturas auténticas de Nintendo DS para cada zona.
  - Enlaces bidireccionales entre Pokémon y ubicaciones.

- **🧬 Cambios Evolutivos sin Intercambio**:
  - Supresión total de la necesidad de intercambio para completar la Pokédex.
  - Uso directo de objetos evolutivos (*Escamadragón*, *Revestimiento Metálico*, *Roca del Rey*, *Protector*, *Magmatizador*, *Electrizador*, etc.).
  - Introducción del **Orbe Unión** para evoluciones directas (Alakazam, Machamp, Golem, Gengar).
  - **Mineral Voltaico** para evolucionar a Magnezone y Probopass sin Monte Corona.
  - Línea evolutiva completa de Eevee (*Orbe Albor*, *Orbe Ocaso*, *Mineral Forestal*, *Mineral Helado* y piedras tradicionales).

- **🎒 Objetos Importantes, MTs y Fósiles**:
  - Reubicación de las 47 Máquinas Técnicas (MTs).
  - Objetos evolutivos y piedras disponibles antes de la Liga Pokémon.
  - Sprites genuinos de mochila de 24x24 píxeles para los objetos exclusivos del hack.
  - Obtención de todos los fósiles gratis en el Centro Arqueológico de Ciudad Trigal.

- **🔥 Legendarios, Eventos y Desafío Arceus**:
  - Guía detallada para 37 eventos únicos y Pokémon de regalo (iniciales de Kanto, Johto, Hoenn, Sinnoh; Eevee, Riolu, Dragonair con Velocidad Extrema).
  - Guía de captura para los 493 Pokémon.
  - Localización precisa de las 16 Tablas Elementales y requisitos para enfrentarse a Arceus en el Estrado Mistrío.

- **⚡ Códigos Action Replay de Calidad de Vida**:
  - 8 códigos recomendados por Drayano (textos instantáneos, curación rápida en Centro Pokémon, saltar animaciones de MOs, revanchas infinitas con botón R).
  - Botón de copiado en un clic con verificación visual.
  - Notas técnicas y prevención de congelamientos en emuladores como DeSmuME y No$GBA.

- **🔍 Buscador Global Omnibox (`Ctrl + K`)**:
  - Búsqueda instantánea en tiempo real en todas las secciones simultáneamente.

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Empaquetador**: [Vite 5](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) (Tema oscuro de videojuegos inspirado en Sacred Gold)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Enrutamiento**: [React Router DOM v6](https://reactrouter.com/) con `HashRouter` (100% compatible con GitHub Pages)
- **Datos**: JSON locales estructurados generados a partir de los documentos oficiales del hack ROM.
- **Imágenes**: PokéAPI oficial con caché local en `localStorage` y assets DS originales extraídos directamente de los PDFs.

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- `npm` o `pnpm`

### Pasos
1. Clona el repositorio o abre la carpeta del proyecto en tu terminal:
   ```bash
   git clone https://github.com/tu-usuario/pokemon-sacred-gold-wiki.git
   cd pokemon-sacred-gold-wiki
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la wiki en funcionamiento.

4. Compila el proyecto para producción:
   ```bash
   npm run build
   ```
   Los archivos estáticos optimizados y listos para publicar se generarán en la carpeta `dist/`.

---

## 🌐 Despliegue en GitHub Pages

El proyecto incluye un pipeline automatizado de GitHub Actions configurado en `.github/workflows/deploy.yml`.

### Para activarlo en tu repositorio:
1. Sube tu código a GitHub en la rama `main`:
   ```bash
   git add .
   git commit -m "feat: Wiki Interactiva de Pokémon Sacred Gold completa"
   git push origin main
   ```
2. En GitHub, ve a **Settings** > **Pages** de tu repositorio.
3. En **Build and deployment** > **Source**, selecciona **GitHub Actions**.
4. Cada vez que hagas `push` a la rama `main`, la wiki se compilará y publicará automáticamente en tu URL de GitHub Pages (`https://<tu-usuario>.github.io/<tu-repo>/`).

---

## 🔒 Privacidad y Fuentes de Datos
En cumplimiento con las directrices del proyecto:
- Los archivos fuente originales (`.pdf` y `.docx`) están excluidos en `.gitignore` y **no se publican en el repositorio público ni en el bundle estático**.
- Toda la base de conocimiento se compila de forma determinista y estructurada en archivos JSON locales optimizados dentro de `src/data/`.
