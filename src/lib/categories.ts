import { assetUrl } from './assets';

export interface CategoryInfo {
  name: string;
  slug: string;
  image: string;
}

export const categories: CategoryInfo[] = [
  {
    name: 'Printmaking',
    slug: 'printmaking',
    image: assetUrl('/images/projects/coastal-linocuts/coastal-warm.jpg'),
  },
  {
    name: 'Drawing',
    slug: 'drawing',
    image: assetUrl('/images/projects/sketchbook/full-spread.png'),
  },
  {
    name: 'Mixed Media',
    slug: 'mixed-media',
    image: assetUrl('/images/projects/paper-botanicals/lilypad-front.jpg'),
  },
  {
    name: 'Photography',
    slug: 'photography',
    image: assetUrl('/images/projects/architecture-photography/arc-de-triomphe.jpg'),
  },
];

export const categoryOrder = categories.map((c) => c.name);
