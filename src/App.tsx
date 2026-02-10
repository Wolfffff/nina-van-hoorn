import React from 'react';
import { AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { SectionNav } from './components/SectionNav';
import { About } from './components/About';
import { Timeline } from './components/Timeline';
import { ProjectDetail } from './components/ProjectDetail';
import { Footer } from './components/Footer';
import { useRoute, navigate } from './lib/router';
import { allProjects } from './lib/content';


export default function App() {
  const route = useRoute();
  const [bw, setBw] = React.useState(true);

  // Remember the last non-project page so the modal overlays the correct background
  const backgroundPage = React.useRef<string>('home');
  if (route.page !== 'project') {
    backgroundPage.current = route.page;
  }
  const activePage = route.page === 'project' ? backgroundPage.current : route.page;

  // Scroll to hash target on initial load (e.g. /#photography)
  React.useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView();
    }
  }, []);


  const selectedProject = route.page === 'project' && route.slug
    ? allProjects.find(p => p.slug === route.slug) || null
    : null;

  // Track whether we have in-app history to go back to
  const hasHistory = React.useRef(false);
  React.useEffect(() => {
    const onNav = () => { hasHistory.current = true; };
    window.addEventListener('route-change', onNav);
    return () => window.removeEventListener('route-change', onNav);
  }, []);
  React.useEffect(() => {
    const onPop = () => { hasHistory.current = true; };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const handleCloseProject = () => {
    if (hasHistory.current) {
      window.history.back();
    } else {
      navigate('/');
    }
  };

  return (
    <div className={`min-h-screen bg-white bw-root${bw ? ' bw-mode' : ''}`}>
      <Navigation currentPage={activePage === 'about' ? 'about' : activePage === 'timeline' ? 'timeline' : 'home'} bw={bw} onToggleBw={() => setBw(v => !v)} />

      {activePage === 'about' ? (
        <About />
      ) : activePage === 'timeline' ? (
        <Timeline />
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
