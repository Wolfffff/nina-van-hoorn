import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { categories } from '../lib/categories';
import { withBase } from '../lib/router';

export function SectionNav() {
  const [activeSection, setActiveSection] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const scrollTargetRef = useRef<string | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasUserScrolled = useRef(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;
    setIsVisible(scrollY > heroHeight * 0.7);

    // Track whether the user has scrolled at least once
    if (scrollY > 10) hasUserScrolled.current = true;

    // If we're programmatically scrolling, keep the target locked
    if (scrollTargetRef.current) return;

    const offset = 300;
    let current = '';
    for (const cat of categories) {
      const el = document.getElementById(cat.slug);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset) {
          current = cat.slug;
        }
      }
    }
    setActiveSection(current);

    // Update URL hash as user scrolls (only after user has actually scrolled)
    if (!hasUserScrolled.current) return;
    const homePath = withBase('/');
    if (current && window.location.pathname === homePath) {
      const currentHash = window.location.hash.replace('#', '');
      if (currentHash !== current) {
        window.history.replaceState(null, '', `${homePath}#${current}`);
      }
    } else if (!current && window.location.hash && scrollY < 10) {
      // Only strip the hash when user is truly back at the top
      window.history.replaceState(null, '', homePath);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      // Lock active section to the target during scroll
      scrollTargetRef.current = slug;
      setActiveSection(slug);

      // Update URL hash
      window.history.replaceState(null, '', `${withBase('/')}#${slug}`);

      // Clear any previous timeout
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      const y = el.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: y, behavior: 'smooth' });

      // Release the lock after scroll completes
      scrollTimeoutRef.current = setTimeout(() => {
        scrollTargetRef.current = null;
      }, 800);
    }
  };

  return (
    <>
      {/* Desktop: Vertical side nav with art thumbnails + labels */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-6"
          >
            {categories.map((cat, index) => {
              const isActive = activeSection === cat.slug;
              const isHovered = hoveredIndex === index;

              return (
                <motion.button
                  key={cat.slug}
                  onClick={() => scrollToSection(cat.slug)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative flex flex-col items-center cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Thumbnail */}
                  <div
                    className="relative overflow-hidden transition-all duration-400 ease-out"
                    style={{
                      width: '56px',
                      height: '56px',
                      border: '3px solid white',
                      boxShadow: isActive
                        ? '0 0 0 1.5px var(--color-accent-red)'
                        : isHovered
                        ? '0 0 0 1px rgba(0,0,0,0.2)'
                        : '0 0 0 1px rgba(0,0,0,0.08)',
                    }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Desaturated overlay for inactive */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.45)',
                        opacity: isActive || isHovered ? 0 : 1,
                      }}
                    />
                  </div>

                  {/* Label — always visible */}
                  <span
                    className="mt-1.5 text-[9px] uppercase tracking-[0.18em] transition-colors duration-300 whitespace-nowrap"
                    style={{
                      color: isActive ? 'var(--color-accent-red)' : isHovered ? '#525252' : '#a3a3a3',
                    }}
                  >
                    {cat.name}
                  </span>

                  {/* Active dot indicator */}
                  <motion.div
                    className="w-1 h-1 rounded-full bg-[var(--color-accent-red)] mt-1"
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: Minimal horizontal bar */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-sm border-t border-neutral-100"
          >
            <div className="flex items-center justify-center gap-1 px-3 py-2">
              {categories.map((cat) => {
                const isActive = activeSection === cat.slug;

                return (
                  <button
                    key={cat.slug}
                    onClick={() => scrollToSection(cat.slug)}
                    className="flex flex-col items-center gap-1 px-3 py-2 transition-all duration-300 cursor-pointer"
                  >
                    <div
                      className="w-7 h-7 overflow-hidden flex-shrink-0 transition-all duration-300"
                      style={{
                        borderRadius: '1px',
                        border: '2px solid white',
                        opacity: isActive ? 1 : 0.5,
                        boxShadow: isActive ? '0 0 0 1px var(--color-accent-red)' : 'none',
                      }}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span
                      className="text-[8px] uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-300"
                      style={{
                        color: isActive ? 'var(--color-accent-red)' : '#a3a3a3',
                      }}
                    >
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}