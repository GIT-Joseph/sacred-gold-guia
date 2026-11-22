import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { PokedexPage } from './pages/PokedexPage';
import { PokemonDetailPage } from './pages/PokemonDetailPage';
import { GymsPage } from './pages/GymsPage';
import { LocationsPage } from './pages/LocationsPage';
import { EvolutionsPage } from './pages/EvolutionsPage';
import { ItemsPage } from './pages/ItemsPage';
import { EventsPage } from './pages/EventsPage';
import { ActionReplayPage } from './pages/ActionReplayPage';

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="pokedex" element={<PokedexPage />} />
          <Route path="pokedex/:id" element={<PokemonDetailPage />} />
          <Route path="gyms" element={<GymsPage />} />
          <Route path="locations" element={<LocationsPage />} />
          <Route path="evolutions" element={<EvolutionsPage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="action-replay" element={<ActionReplayPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
