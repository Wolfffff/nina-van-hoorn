/**
 * Content management utilities for loading markdown-based content.
 *
 * Projects are auto-discovered from disk via import.meta.glob:
 *   /content/projects/printmaking/coastal-impressions/README.md
 *   /content/projects/photography/urban-textures/README.md
 *   /content/projects/painting/memory-layers/README.md
 *   /content/projects/mixed-media/botanical-studies/README.md
 *
 * The markdown files on disk are the single source of truth.
 *
 * Frontmatter contains metadata + a single `thumbnail` for the gallery card.
 * Images live in the markdown body as ![alt](url) so you can interleave
 * them with text — editorial style.
 *
 * To add a new project:
 *   1. Create a folder: /content/projects/{category}/{slug}/README.md
 *   2. That's it — it will be picked up automatically.
 */

import { assetUrl } from './assets';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  date?: string;
  color: string;
  featured?: boolean;
  order?: number;
  thumbnail: string;
  content?: string;
}

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(markdown: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: markdown };
  }

  const [, frontmatterStr, content] = match;
  const data: Record<string, any> = {};

  const lines = frontmatterStr.split('\n');
  let currentKey = '';
  let inArray = false;
  let inMultiline = false;
  let multilineContent = '';

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) continue;

    if (inMultiline) {
      if (line.startsWith('  ')) {
        multilineContent += line.substring(2) + '\n';
      } else {
        data[currentKey] = multilineContent.trim();
        inMultiline = false;
        multilineContent = '';
      }
    }

    if (inArray && trimmedLine.startsWith('-')) {
      const value = trimmedLine.substring(1).trim().replace(/^["']|["']$/g, '');
      data[currentKey].push(value);
      continue;
    } else if (inArray && !trimmedLine.startsWith('-')) {
      inArray = false;
    }

    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex > 0 && !inMultiline) {
      currentKey = trimmedLine.substring(0, colonIndex).trim();
      const value = trimmedLine.substring(colonIndex + 1).trim();

      if (value === '|') {
        inMultiline = true;
        multilineContent = '';
      } else if (!value) {
        data[currentKey] = [];
        inArray = true;
      } else {
        if (value === 'true') data[currentKey] = true;
        else if (value === 'false') data[currentKey] = false;
        else if (!isNaN(Number(value))) data[currentKey] = Number(value);
        else data[currentKey] = value.replace(/^["']|["']$/g, '');
      }
    }
  }

  if (inMultiline && multilineContent) {
    data[currentKey] = multilineContent.trim();
  }

  return { data, content: content.trim() };
}

// ---------------------------------------------------------------------------
// Auto-discover projects from /content/projects/{category}/{slug}/README.md
// using Vite's import.meta.glob — no manual registry needed.
// ---------------------------------------------------------------------------

const projectModules = import.meta.glob<string>(
  '/src/content/projects/*/*/README.md',
  { query: '?raw', import: 'default', eager: true }
);

/**
 * All projects, parsed and sorted at module load time.
 * Data is available synchronously because import.meta.glob uses eager: true.
 */
export const allProjects: Project[] = Object.entries(projectModules)
  .map(([path, markdown]) => {
    const parts = path.split('/');
    const slug = parts[parts.length - 2];
    const { data, content } = parseFrontmatter(markdown);

    return {
      id: slug,
      slug,
      title: data.title || 'Untitled',
      category: data.category || 'Uncategorized',
      year: data.year || new Date().getFullYear().toString(),
      date: data.date,
      color: data.color || '#000000',
      featured: data.featured,
      order: data.order,
      thumbnail: assetUrl(data.thumbnail || ''),
      content: content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, alt, src) => `![${alt}](${assetUrl(src)})`),
    };
  })
  .sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return a.title.localeCompare(b.title);
  });

/**
 * Load all projects (async wrapper kept for backwards compatibility).
 */
export async function loadProjects(): Promise<Project[]> {
  return allProjects;
}

