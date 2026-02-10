const base = import.meta.env.BASE_URL;

export function assetUrl(path: string): string {
  if (path.startsWith('/') && base !== '/' && !path.startsWith(base)) {
    return base + path.slice(1);
  }
  return path;
}

/** Return the -thumb variant of an image path (600px wide). */
export function thumbUrl(path: string): string {
  return path.replace(/(\.\w+)$/, '-thumb$1');
}

