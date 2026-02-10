import React from 'react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="px-6 py-16 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <p className="text-sm text-neutral-500">
          &copy; 2026 Nina van Hoorn. All rights reserved.
        </p>
        <div className="flex items-center gap-6 md:gap-8">
          <a
            href="https://instagram.com/ninavanhoorn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm uppercase tracking-[0.15em] text-neutral-500 hover:text-[var(--color-accent-red)] transition-colors duration-300"
          >
            Instagram
          </a>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-neutral-500 hover:text-[var(--color-accent-red)] transition-colors duration-300 cursor-pointer"
          >
            <span>Back to top</span>
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
