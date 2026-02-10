import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import type { Project } from '../lib/content';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

/**
 * Parse markdown content into an array of blocks (paragraphs and images)
 * that can be rendered with interleaved text and images.
 */
function parseMarkdownBlocks(content: string): Array<
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string }
> {
  const lines = content.split('\n');
  const blocks: Array<
    | { type: 'heading'; text: string }
    | { type: 'paragraph'; text: string }
    | { type: 'image'; src: string; alt: string }
  > = [];

  let currentParagraph = '';

  const flushParagraph = () => {
    const trimmed = currentParagraph.trim();
    if (trimmed) {
      blocks.push({ type: 'paragraph', text: trimmed });
    }
    currentParagraph = '';
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip the main heading (# Title) — we already show it in the header
    if (trimmed.startsWith('# ')) {
      flushParagraph();
      continue;
    }

    // Image: ![alt](url)
    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      flushParagraph();
      blocks.push({ type: 'image', alt: imageMatch[1], src: imageMatch[2] });
      continue;
    }

    // Empty line — flush current paragraph
    if (!trimmed) {
      flushParagraph();
      continue;
    }

    // Otherwise, accumulate text into a paragraph
    currentParagraph += (currentParagraph ? ' ' : '') + trimmed;
  }

  flushParagraph();
  return blocks;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const allBlocks = project.content ? parseMarkdownBlocks(project.content) : [];
  // Filter out the thumbnail image from body to avoid showing it twice
  const blocks = allBlocks.filter(
    (b) => !(b.type === 'image' && b.src === project.thumbnail)
  );

  // Separate first paragraph (lede/intro) from the rest
  const firstParaIndex = blocks.findIndex((b) => b.type === 'paragraph');
  const lede = firstParaIndex >= 0 ? blocks[firstParaIndex] : null;
  const bodyBlocks = lede
    ? [...blocks.slice(0, firstParaIndex), ...blocks.slice(firstParaIndex + 1)]
    : blocks;

  let imageCounter = 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
    >
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={onClose}
        className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer"
      >
        <X className="w-5 h-5" />
      </motion.button>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-5 mb-8">
            <div className="w-8 h-px bg-[var(--color-accent-red)]" />
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
              {project.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6" style={{ fontWeight: 900 }}>
            {project.title}
          </h1>

          <span className="text-neutral-400 text-sm tracking-[0.2em] uppercase">
            {project.date || project.year}
          </span>
        </motion.div>

        {/* Thumbnail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 md:mb-20"
        >
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Lede paragraph — larger, set apart */}
        {lede && lede.type === 'paragraph' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mb-16 md:mb-24"
          >
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              {lede.text}
            </p>
          </motion.div>
        )}

        {/* Editorial body — images and text interleaved */}
        <div className="space-y-12 md:space-y-16">
          {bodyBlocks.map((block, index) => {
            if (block.type === 'image') {
              const imgIndex = imageCounter++;
              return (
                <motion.div
                  key={`img-${index}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + imgIndex * 0.12 }}
                >
                  <img
                    src={block.src}
                    alt={block.alt}
                    className="w-full h-auto"
                  />
                </motion.div>
              );
            }

            if (block.type === 'paragraph') {
              return (
                <motion.div
                  key={`p-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="max-w-2xl"
                >
                  <p className="text-base md:text-lg text-neutral-500 leading-relaxed">
                    {block.text}
                  </p>
                </motion.div>
              );
            }

            return null;
          })}
        </div>

        {/* Minimal bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 md:mt-24 pt-8 border-t border-neutral-100 flex items-center justify-center"
        >
          <button
            onClick={onClose}
            className="group flex items-center gap-4 text-neutral-400 hover:text-neutral-800 transition-colors duration-300 cursor-pointer"
          >
            <div className="w-8 h-px bg-[var(--color-accent-red)] group-hover:w-12 transition-all duration-300" />
            <span className="text-xs uppercase tracking-[0.3em]">
              Close
            </span>
            <div className="w-8 h-px bg-[var(--color-accent-red)] group-hover:w-12 transition-all duration-300" />
          </button>
        </motion.div>

        <div className="h-16" />
      </div>
    </motion.div>
  );
}
