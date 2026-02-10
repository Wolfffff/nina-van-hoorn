import { assetUrl, thumbUrl } from './assets';

export interface CategoryInfo {
  name: string;
  slug: string;
  image: string;
}

export const categories: CategoryInfo[] = [
  {
    name: 'Printmaking',
    slug: 'printmaking',
    image: assetUrl(thumbUrl('/images/projects/coastal-linocuts/coastal-warm.jpg')),
  },
  {
    name: 'Drawing',
    slug: 'drawing',
    image: assetUrl(thumbUrl('/images/projects/sketchbook/full-spread.jpg')),
  },
  {
    name: 'Mixed Media',
    slug: 'mixed-media',
    image: assetUrl(thumbUrl('/images/projects/paper-botanicals/lilypad-front.jpg')),
  },
  {
    name: 'Photography',
    slug: 'photography',
    image: assetUrl(thumbUrl('/images/projects/architecture-photography/arc-de-triomphe.jpg')),
  },
];

export const categoryOrder = categories.map((c) => c.name);
