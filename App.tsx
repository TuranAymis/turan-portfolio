import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import GameProviderWrapper from './components/GameProviderWrapper';
import LoadingScreen from './components/ui/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy Load Pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const SkillsPage = React.lazy(() => import('./pages/SkillsPage'));
const ExperiencePage = React.lazy(() => import('./pages/ExperiencePage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

// --- OUTER APP ---
const App: React.FC = () => {
  return (
    <HashRouter>
      <ErrorBoundary>
        <GameProviderWrapper>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="overview" element={<Navigate to="/" replace />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="skills" element={<SkillsPage />} />
                <Route path="experience" element={<ExperiencePage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </GameProviderWrapper>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default App;
