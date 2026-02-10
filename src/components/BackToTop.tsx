import { ChevronUp } from 'lucide-react';

export function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="flex items-center justify-center mx-auto hover:text-neutral-400 transition-colors duration-300 cursor-pointer"
      style={{ color: 'var(--color-accent-red)' }}
      aria-label="Back to top"
    >
      <ChevronUp size={36} strokeWidth={2.5} />
    </button>
  );
}
