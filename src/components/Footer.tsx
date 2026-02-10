import { BackToTop } from './BackToTop';


export function Footer() {
  return (
    <footer className="px-6 pt-8 pb-20 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <BackToTop />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-6">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
