import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { allProjects } from '../lib/content';
import { categories } from '../lib/categories';
import { ArtImage } from './ArtImage';
import { thumbUrl } from '../lib/assets';
import { navigate } from '../lib/router';
import { ChevronDown } from 'lucide-react';

const ASPECTS = ['4/3', '1/1', '3/4'];

export function Timeline() {
  const [filter, setFilter] = useState<string>('all');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const filtered = filter === 'all'
    ? allProjects
    : allProjects.filter((p) => p.category === filter);

  // Group projects by year, sorted descending
  const byYear = filtered.reduce<Record<string, typeof allProjects>>((acc, p) => {
    const year = p.year || 'Unknown';
    if (!acc[year]) acc[year] = [];
    acc[year].push(p);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));

  const selectedLabel = filter === 'all' ? 'All Media' : filter;

  function select(value: string) {
    setFilter(value);
    setOpen(false);
  }

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="py-16 md:py-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-5">
              <div className="w-8 h-px bg-[var(--color-accent-red)]" />
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                {filter === 'all' ? 'All Work' : filter}
              </span>
            </div>

            {/* Category filter dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-neutral-400 hover:text-neutral-600 transition-colors py-1"
              >
                {selectedLabel}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
              </button>
              {open && (
                <div className="absolute top-full mt-2 right-0 bg-white shadow-lg border border-neutral-100 py-2 min-w-[180px] z-50">
                  <button
                    onClick={() => select('all')}
                    className={`block w-full text-left px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                      filter === 'all'
                        ? 'text-[var(--color-accent-red)]'
                        : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    All Media
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => select(c.name)}
                      className={`block w-full text-left px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                        filter === c.name
                          ? 'text-[var(--color-accent-red)]'
                          : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <h1
            className="text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9]"
            style={{ fontWeight: 900 }}
          >
            Timeline
          </h1>
        </div>

        {/* Timeline */}
        <div className="timeline-timeline">
          <div className="timeline-timeline-line" />

          {years.map((year) => (
            <div key={year} className="timeline-year-group">
              {/* Year dot + label */}
              <div style={{ position: 'relative' }}>
                <div className="timeline-year-dot" />
                <motion.div
                  className="timeline-year-label"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {year}
                </motion.div>
              </div>

              {/* Project cards */}
              <div className="timeline-projects-grid">
                {byYear[year].map((project, i) => (
                  <motion.a
                    key={project.slug}
                    href={`/project/${project.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/project/${project.slug}`);
                    }}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <div
                      className="overflow-hidden bg-neutral-50"
                      style={{ aspectRatio: ASPECTS[i % ASPECTS.length] }}
                    >
                      <ArtImage
                        src={thumbUrl(project.thumbnail)}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500"
                      />
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                        {project.category}
                      </p>
                      <p className="text-sm tracking-tight leading-tight text-neutral-700">
                        {project.title}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {years.length === 0 && (
          <p className="text-neutral-400 text-sm uppercase tracking-[0.2em]">
            No projects found.
          </p>
        )}
      </div>
    </div>
  );
}
