import { useState, useEffect } from 'react';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, ''); // e.g. '/nina-van-hoorn' or ''

interface RouteMatch {
  page: 'home' | 'about' | 'timeline' | 'project';
  slug?: string;
}

function stripBase(pathname: string): string {
  return BASE && pathname.startsWith(BASE)
    ? pathname.slice(BASE.length) || '/'
    : pathname;
}

export function parseRoute(pathname: string): RouteMatch {
  const path = stripBase(pathname);
  if (path === '/about') return { page: 'about' };
  if (path === '/timeline') return { page: 'timeline' };
  const projectMatch = path.match(/^\/project\/([^/]+)$/);
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

/** Prepend the deploy base path to an app-relative path. */
export function withBase(path: string): string {
  return BASE + path;
}

export function navigate(path: string) {
  window.history.pushState(null, '', BASE + path);
  window.dispatchEvent(new Event('route-change'));
  // Don't scroll to top for project modals — they overlay the current page
  if (!path.startsWith('/project/')) {
    window.scrollTo(0, 0);
  }
}
