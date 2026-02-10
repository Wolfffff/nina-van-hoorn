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
          className="text-sm uppercase tracking-[0.2em] text-neutral-600 hover:text-[var(--color-accent-red)] transition-colors"
        >
          Nina van Hoorn
        </a>

        <div className="flex gap-5">
          <a
            href={withBase('/')}
            onClick={(e) => handleClick(e, '/')}
            className="text-xs uppercase tracking-[0.2em] transition-colors"
            style={{ color: currentPage === 'home' ? 'var(--color-accent-red)' : '#737373', fontWeight: 400 }}
          >
            Work
          </a>
          <a
            href={withBase('/about')}
            onClick={(e) => handleClick(e, '/about')}
            className="text-xs uppercase tracking-[0.2em] transition-colors"
            style={{ color: currentPage === 'about' ? 'var(--color-accent-red)' : '#737373', fontWeight: 400 }}
          >
            About
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
