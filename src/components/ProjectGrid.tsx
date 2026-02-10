import { motion } from 'motion/react';
import { ProjectCard } from './ProjectCard';
import { allProjects, type Project } from '../lib/content';
import { navigate } from '../lib/router';
import { categoryOrder } from '../lib/categories';

type LayoutSlot = {
  fr: number;
  aspect: string;
};

type LayoutRow = LayoutSlot[];

// Each category gets a unique editorial rhythm — column widths only
const layoutPatterns: LayoutRow[][] = [
  [
    [{ fr: 58, aspect: '' }, { fr: 42, aspect: '' }],
    [{ fr: 1, aspect: '' }, { fr: 1, aspect: '' }, { fr: 1, aspect: '' }],
    [{ fr: 42, aspect: '' }, { fr: 58, aspect: '' }],
  ],
  [
    [{ fr: 1, aspect: '' }],
    [{ fr: 1, aspect: '' }, { fr: 1, aspect: '' }],
    [{ fr: 40, aspect: '' }, { fr: 60, aspect: '' }],
  ],
  [
    [{ fr: 35, aspect: '' }, { fr: 65, aspect: '' }],
    [{ fr: 65, aspect: '' }, { fr: 35, aspect: '' }],
    [{ fr: 1, aspect: '' }],
  ],
  [
    [{ fr: 42, aspect: '' }, { fr: 58, aspect: '' }],
    [{ fr: 1, aspect: '' }, { fr: 1, aspect: '' }, { fr: 1, aspect: '' }],
    [{ fr: 58, aspect: '' }, { fr: 42, aspect: '' }],
  ],
];

export function ProjectGrid() {
  const projectsByCategory = allProjects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    acc[project.category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  return (
    <section className="bg-white">
      {categoryOrder.map((category, categoryIndex) => {
        const categoryProjects = projectsByCategory[category];
        if (!categoryProjects || categoryProjects.length === 0) return null;

        const pattern = layoutPatterns[categoryIndex % layoutPatterns.length];

        let projectIdx = 0;
        const rows: Array<Array<LayoutSlot & { project: Project }>> = [];
        for (const row of pattern) {
          if (projectIdx >= categoryProjects.length) break;
          const filledRow: Array<LayoutSlot & { project: Project }> = [];
          for (const slot of row) {
            if (projectIdx >= categoryProjects.length) break;
            filledRow.push({ ...slot, project: categoryProjects[projectIdx] });
            projectIdx++;
          }
          if (filledRow.length > 0) rows.push(filledRow);
        }

        return (
          <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
            {/* Minimal category label with vermillion accent */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:pr-36 pt-16 md:pt-24 pb-6 md:pb-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-5"
              >
                <div className="w-8 h-px bg-[var(--color-accent-red)]" />
                <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                  {category}
                </span>
              </motion.div>
            </div>

            {/* Editorial image grid */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:pr-36 flex flex-col gap-1">
              {rows.map((row, rowIndex) => {
                const colTemplate = row.map(item => `${item.fr}fr`).join(' ');

                return (
                  <div
                    key={rowIndex}
                    className="editorial-row"
                    style={{ gridTemplateColumns: colTemplate }}
                  >
                    {row.map((item, itemIndex) => (
                      <ProjectCard
                        key={`${item.project.id}-${rowIndex}-${itemIndex}`}
                        project={item.project}
                        index={rowIndex * row.length + itemIndex}
                        onClick={() => navigate(`/project/${item.project.slug}`)}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="h-20 md:h-28" />
    </section>
  );
}
