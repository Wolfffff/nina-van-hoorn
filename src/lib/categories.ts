export interface CategoryInfo {
  name: string;
  slug: string;
  image: string;
}

export const categories: CategoryInfo[] = [
  {
    name: 'Printmaking',
    slug: 'printmaking',
    image: '/images/projects/coastal-linocuts/coastal-warm.jpg',
  },
  {
    name: 'Drawing',
    slug: 'drawing',
    image: '/images/projects/sketchbook/full-spread.png',
  },
  {
    name: 'Mixed Media',
    slug: 'mixed-media',
    image: '/images/projects/paper-botanicals/lilypad-front.jpg',
  },
  {
    name: 'Photography',
    slug: 'photography',
    image: '/images/projects/architecture-photography/arc-de-triomphe.jpg',
  },
];

export const categoryOrder = categories.map((c) => c.name);
