import React from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { navigate } from '../lib/router';

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
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="/"
          onClick={(e) => handleClick(e, '/')}
          className="text-xl md:text-2xl uppercase tracking-tight hover:opacity-70 transition-opacity"
        >
          Nina van Hoorn
        </a>

        <div className="flex gap-6 md:gap-8">
          <a
            href="/"
            onClick={(e) => handleClick(e, '/')}
            className="text-sm md:text-base uppercase tracking-wide transition-colors"
            style={{ color: currentPage === 'home' ? 'var(--color-accent-red)' : '#a3a3a3' }}
          >
            Work
          </a>
          <a
            href="/about"
            onClick={(e) => handleClick(e, '/about')}
            className="text-sm md:text-base uppercase tracking-wide transition-colors"
            style={{ color: currentPage === 'about' ? 'var(--color-accent-red)' : '#a3a3a3' }}
          >
            About
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
