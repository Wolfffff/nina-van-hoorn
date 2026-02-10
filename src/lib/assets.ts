const base = import.meta.env.BASE_URL;

export function assetUrl(path: string): string {
  if (path.startsWith('/') && base !== '/' && !path.startsWith(base)) {
    return base + path.slice(1);
  }
  return path;
}
