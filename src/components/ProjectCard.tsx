import React from 'react';
import { motion } from 'motion/react';
import { assetUrl, thumbUrl, mediumUrl, preloadImage } from '../lib/assets';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  color: string;
  thumbnail: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group cursor-pointer"
      onClick={onClick}
      onPointerEnter={() => preloadImage(mediumUrl(project.thumbnail))}
      onPointerDown={() => preloadImage(mediumUrl(project.thumbnail))}
      style={{ height: '100%' }}
    >
      <div className="relative overflow-hidden bg-neutral-50" style={{ height: '100%' }}>
        <img
          src={assetUrl(thumbUrl(project.thumbnail))}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 ease-out flex items-end justify-start p-6 md:p-8">
          <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <p className="text-white/70 text-xs uppercase tracking-[0.2em] mb-1">
              {project.year}
            </p>
            <h3 className="text-white text-lg md:text-xl tracking-tight">
              {project.title}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
