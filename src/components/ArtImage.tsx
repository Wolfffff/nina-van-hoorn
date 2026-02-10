import React, { useState } from 'react';

/**
 * Image component with graceful fallback for missing local images.
 *
 * When the image hasn't been added yet (e.g. /images/projects/slug/01.jpg
 * doesn't exist), it renders a clean neutral placeholder that maintains
 * the parent's aspect ratio.
 *
 * Usage:
 *   <ArtImage src="/images/projects/coastal/01.jpg" alt="Coastal print" className="w-full h-full object-cover" />
 */

interface ArtImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function ArtImage({ src, alt, className = '', style, ...props }: ArtImageProps) {
  const [hasError, setHasError] = useState(false);

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
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setHasError(true)}
      loading="lazy"
      {...props}
    />
  );
}
