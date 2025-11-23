'use client';

import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackSrc?: string;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className = "", 
  style = {},
  fallbackSrc = "https://via.placeholder.com/400x300/1f2937/6b7280?text=Project+Image"
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const correctedStyle: React.CSSProperties = {
    ...style,
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100%',
    height: '100%',
    transition: 'all 0.3s ease',
    ...(!imageLoaded && { opacity: 0 }),
    ...(imageLoaded && { opacity: 1 })
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Main image */}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} image-correction`}
        style={correctedStyle}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
      
      {/* Error overlay for broken images */}
      {hasError && imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/90 to-gray-900/90 flex flex-col items-center justify-center text-gray-400">
          <div className="text-2xl mb-2">🖼️</div>
          <div className="text-xs text-center px-2">Image unavailable</div>
        </div>
      )}
      
      {/* CSS for image correction */}
      <style jsx>{`
        .image-correction {
          /* Ensure proper aspect ratio */
          aspect-ratio: 16 / 10;
          
          /* Better image rendering */
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          
          /* Prevent image dragging */
          -webkit-user-drag: none;
          user-select: none;
          
          /* Smooth transitions */
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        
        .image-correction:hover {
          transform: scale(1.05);
        }
        
        /* Fix for AVIF and modern formats */
        .image-correction[src$=".avif"],
        .image-correction[src$=".webp"] {
          image-rendering: auto;
          image-rendering: smooth;
        }
      `}</style>
    </div>
  );
}
