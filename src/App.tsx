import React from 'react';
import { AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { SectionNav } from './components/SectionNav';
import { About } from './components/About';
import { ProjectDetail } from './components/ProjectDetail';
import { Footer } from './components/Footer';
import { useRoute } from './lib/router';
import { allProjects } from './lib/content';

export default function App() {
  const route = useRoute();

  const selectedProject = route.page === 'project' && route.slug
    ? allProjects.find(p => p.slug === route.slug) || null
    : null;

  const handleCloseProject = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={route.page === 'about' ? 'about' : 'home'} />

      {route.page === 'about' ? (
        <About />
      ) : (
        <>
          <Hero />
          <SectionNav />
          <ProjectGrid />
        </>
      )}

      <Footer />

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={handleCloseProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
