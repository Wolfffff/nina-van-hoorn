import React from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { navigate, withBase } from '../lib/router';

interface NavigationProps {
  currentPage: string;
}

export function Navigation({ currentPage }: NavigationProps) {
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;

    if (currentScrollY < 100) {
      setIsVisible(true);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    }

    setLastScrollY(currentScrollY);
  });

  const handleClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href={withBase('/')}
          onClick={(e) => handleClick(e, '/')}
          className="text-sm uppercase tracking-[0.2em] text-neutral-600 hover:text-[var(--color-accent-red)] transition-colors leading-tight mobile-only"
        >
          Nina<br />van Hoorn
        </a>
        <a
          href={withBase('/')}
          onClick={(e) => handleClick(e, '/')}
          className="text-sm uppercase tracking-[0.2em] text-neutral-600 hover:text-[var(--color-accent-red)] transition-colors desktop-only"
        >
          Nina van Hoorn
        </a>

        <div className="flex gap-5">
          <a
            href={withBase('/')}
            onClick={(e) => handleClick(e, '/')}
            className="text-xs uppercase tracking-[0.2em] transition-colors pb-1"
            style={{
              color: '#737373',
              fontWeight: 400,
              borderBottom: currentPage === 'home' ? '2px solid var(--color-accent-red)' : '2px solid transparent',
            }}
          >
            Home
          </a>
          <a
            href={withBase('/timeline')}
            onClick={(e) => handleClick(e, '/timeline')}
            className="text-xs uppercase tracking-[0.2em] transition-colors pb-1"
            style={{
              color: '#737373',
              fontWeight: 400,
              borderBottom: currentPage === 'timeline' ? '2px solid var(--color-accent-red)' : '2px solid transparent',
            }}
          >
            Timeline
          </a>
          <a
            href={withBase('/about')}
            onClick={(e) => handleClick(e, '/about')}
            className="text-xs uppercase tracking-[0.2em] transition-colors pb-1"
            style={{
              color: '#737373',
              fontWeight: 400,
              borderBottom: currentPage === 'about' ? '2px solid var(--color-accent-red)' : '2px solid transparent',
            }}
          >
            About
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
