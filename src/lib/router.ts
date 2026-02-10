import { useState, useEffect } from 'react';

interface RouteMatch {
  page: 'home' | 'about' | 'project';
  slug?: string;
}

export function parseRoute(pathname: string): RouteMatch {
  if (pathname === '/about') return { page: 'about' };
  const projectMatch = pathname.match(/^\/project\/([^/]+)$/);
  if (projectMatch) return { page: 'project', slug: projectMatch[1] };
  return { page: 'home' };
}

export function useRoute(): RouteMatch {
  const [route, setRoute] = useState(() => parseRoute(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Listen for custom navigation events
  useEffect(() => {
    const onNav = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('route-change', onNav);
    return () => window.removeEventListener('route-change', onNav);
  }, []);

  return route;
}

export function navigate(path: string) {
  window.history.pushState(null, '', path);
  window.dispatchEvent(new Event('route-change'));
  // Don't scroll to top for project modals — they overlay the current page
  if (!path.startsWith('/project/')) {
    window.scrollTo(0, 0);
  }
}
