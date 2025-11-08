import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholderSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%239ca3af"%3ELoading...%3C/text%3E%3C/svg%3E',
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholderSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    
    if (imgRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = new Image();
              img.src = src;
              
              img.onload = () => {
                setImageSrc(src);
                setIsLoading(false);
                onLoad?.();
              };
              
              img.onerror = () => {
                setHasError(true);
                setIsLoading(false);
                onError?.();
              };
              
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.01
        }
      );
      
      observer.observe(imgRef.current);
    }
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src, onLoad, onError]);

  const errorPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Cpath d="M150 100 L250 100 L250 200 L150 200 Z M175 130 L225 180 M225 130 L175 180" stroke="%239ca3af" stroke-width="4" fill="none"/%3E%3Ctext x="50%25" y="85%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%236b7280"%3EImage not available%3C/text%3E%3C/svg%3E';

  return (
    <img
      ref={imgRef}
      src={hasError ? errorPlaceholder : imageSrc}
      alt={alt}
      className={`${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300`}
      loading="lazy"
    />
  );
};

// Product Image Component with Zoom
interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  enableZoom?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  enableZoom = true
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <LazyImage
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-300 ${
          enableZoom && isZoomed ? 'scale-150' : 'scale-100'
        }`}
      />
      {enableZoom && (
        <div
          className="absolute inset-0 cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        />
      )}
    </div>
  );
};

export default LazyImage;
