import { useState, type ImgHTMLAttributes } from 'react';
import { assetUrl } from '../lib/assets';

/**
 * Image component with graceful fallback for missing local images.
 */

interface ArtImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function ArtImage({ src, alt, className = '', style, ...props }: ArtImageProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const resolvedSrc = assetUrl(src);

  if (hasError || !src) {
    return (
      <div
        className={`bg-neutral-100 flex items-center justify-center ${className}`}
        style={style}
        role="img"
        aria-label={alt}
      >
        <div className="text-center px-3">
          <div className="text-neutral-300 text-[10px] uppercase tracking-[0.2em]">
            {alt}
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in',
      }}
      onLoad={() => setLoaded(true)}
      onError={() => setHasError(true)}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}
