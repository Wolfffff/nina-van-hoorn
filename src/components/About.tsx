import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArtImage } from './ArtImage';
import { loadProjects, type Project } from '../lib/content';
import { navigate } from '../lib/router';

export function About() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadProjects().then((all) => {
      setProjects(all.filter((p) => p.featured));
    });
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section with Portrait */}
      <section className="relative overflow-hidden">
        {/* Desktop layout */}
        <div className="desktop-only" style={{ minHeight: '100vh', alignItems: 'center' }}>
          <div className="max-w-7xl w-full mx-auto px-6 py-20">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'stretch' }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '32px', justifyContent: 'center' }}
              >
                <h1 className="uppercase tracking-tight" style={{ fontSize: '6rem', lineHeight: '0.9' }}>About</h1>
                <div className="space-y-4 text-lg text-neutral-700 max-w-xl">
                  <p>
                    I'm Nina van Hoorn, a visual artist based in Princeton, New Jersey. My practice spans
                    printmaking, analog photography, and painting — mediums that share a tactile,
                    process-driven approach to image-making.
                  </p>
                  <p>
                    I'm drawn to the physicality of these techniques: the pressure of the printing
                    press, the chemistry of the darkroom, the layering of paint. Each medium offers
                    a different way to explore themes of landscape, memory, and texture.
                  </p>
                  <p>
                    My work often begins with observation — walks along the Jersey Shore, wandering
                    through urban spaces, studying botanical specimens. These experiences are
                    translated through slow, deliberate processes that reveal unexpected textures
                    and forms.
                  </p>
                </div>
                <div className="space-y-2 text-base pt-4">
                  <p className="text-neutral-600"><span className="text-neutral-900">Based in:</span> Princeton, NJ</p>
                  <p className="text-neutral-600"><span className="text-neutral-900">Education:</span> Skidmore College</p>
                  <p className="text-neutral-600"><span className="text-neutral-900">Contact:</span> contact@ninavanhoorn.com</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative overflow-hidden" style={{ height: '100%' }}>
                  <ArtImage src="/images/portrait.jpeg" alt="Nina van Hoorn" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile layout: floated portrait with text wrap */}
        <div className="mobile-only max-w-7xl mx-auto px-6 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-portrait-float">
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <ArtImage src="/images/portrait.jpeg" alt="Nina van Hoorn" className="w-full h-full object-cover" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl uppercase tracking-tight leading-[0.9] mb-4">About</h1>
            <p className="text-base md:text-lg text-neutral-700 mb-3">
              I'm Nina van Hoorn, a visual artist based in Princeton, New Jersey. My practice spans
              printmaking, analog photography, and painting — mediums that share a tactile,
              process-driven approach to image-making.
            </p>
            <p className="text-base md:text-lg text-neutral-700 mb-3">
              I'm drawn to the physicality of these techniques: the pressure of the printing
              press, the chemistry of the darkroom, the layering of paint. Each medium offers
              a different way to explore themes of landscape, memory, and texture.
            </p>
            <p className="text-base md:text-lg text-neutral-700 mb-3">
              My work often begins with observation — walks along the Jersey Shore, wandering
              through urban spaces, studying botanical specimens. These experiences are
              translated through slow, deliberate processes that reveal unexpected textures
              and forms.
            </p>
            <div className="clear-both" />
            <div className="space-y-2 text-sm md:text-base pt-4">
              <p className="text-neutral-600"><span className="text-neutral-900">Based in:</span> Princeton, NJ</p>
              <p className="text-neutral-600"><span className="text-neutral-900">Education:</span> Skidmore College</p>
              <p className="text-neutral-600"><span className="text-neutral-900">Contact:</span> contact@ninavanhoorn.com</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-6 md:pb-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-5"
          >
            <div className="w-8 h-px bg-[var(--color-accent-red)]" />
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              Selected Work
            </span>
          </motion.div>
        </div>

        <div
          className="max-w-[1400px] mx-auto px-6 md:px-12 editorial-row"
          style={{ gridTemplateColumns: '1fr 1fr 1fr' }}
        >
          {projects.map((project, index) => (
            <motion.a
              key={project.slug}
              href={`/project/${project.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/project/${project.slug}`);
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-neutral-50" style={{ height: '100%' }}>
                <ArtImage
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 ease-out flex items-end justify-start p-6 md:p-8">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <p className="text-white/70 text-xs uppercase tracking-[0.2em] mb-1">
                      {project.category}
                    </p>
                    <p className="text-white text-lg md:text-xl tracking-tight">
                      {project.title}
                    </p>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  );
}
