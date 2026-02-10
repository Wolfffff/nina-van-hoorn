import React from 'react';
import { allProjects } from '../lib/content';
import { ArtImage } from './ArtImage';
import { thumbUrl } from '../lib/assets';
import { navigate } from '../lib/router';

export function Archive() {
  // Group projects by year, sorted descending
  const byYear = allProjects.reduce<Record<string, typeof allProjects>>((acc, p) => {
    const year = p.year || 'Unknown';
    if (!acc[year]) acc[year] = [];
    acc[year].push(p);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="py-16 md:py-24">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-8 h-px bg-[var(--color-accent-red)]" />
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              All Work
            </span>
          </div>
          <h1
            className="text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9]"
            style={{ fontWeight: 900 }}
          >
            Archive
          </h1>
        </div>

        {/* Year groups */}
        {years.map((year) => (
          <div key={year} className="mb-12 md:mb-16">
            <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4 md:mb-6">
              {year}
            </h2>
            <div
              className="grid gap-3 md:gap-4"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
            >
              {byYear[year].map((project) => (
                <a
                  key={project.slug}
                  href={`/project/${project.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/project/${project.slug}`);
                  }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden bg-neutral-50" style={{ aspectRatio: '1' }}>
                    <ArtImage
                      src={thumbUrl(project.thumbnail)}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3">
                      <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-white/60 text-[10px] uppercase tracking-[0.15em] mb-0.5">
                          {project.category}
                        </p>
                        <p className="text-white text-sm tracking-tight leading-tight">
                          {project.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
