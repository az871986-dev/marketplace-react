import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse'
}) => {
  const baseClasses = animation === 'pulse' 
    ? 'animate-pulse bg-gray-300' 
    : 'animate-wave bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
  };

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100%')
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

// Product Card Skeleton
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Skeleton height={200} className="w-full" />
      <div className="p-4 space-y-3">
        <Skeleton height={20} width="80%" />
        <Skeleton height={16} width="60%" />
        <div className="flex justify-between items-center mt-4">
          <Skeleton height={24} width={80} />
          <Skeleton variant="circular" width={40} height={40} />
        </div>
      </div>
    </div>
  );
};

// Product Grid Skeleton
export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Product Details Skeleton
export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <Skeleton height={400} className="w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={100} className="w-full rounded-md" />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <Skeleton height={32} width="70%" />
          <Skeleton height={24} width={120} />
          <div className="space-y-2">
            <Skeleton height={16} width="100%" />
            <Skeleton height={16} width="95%" />
            <Skeleton height={16} width="90%" />
            <Skeleton height={16} width="85%" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={100} />
          </div>
          <div className="space-y-3">
            <Skeleton height={48} width="100%" />
            <Skeleton height={48} width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Item Skeleton
export const CartItemSkeleton: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
      <Skeleton width={80} height={80} className="rounded-md" />
      <div className="flex-grow space-y-2">
        <Skeleton height={20} width="60%" />
        <Skeleton height={16} width="40%" />
      </div>
      <div className="space-y-2">
        <Skeleton height={32} width={100} />
        <Skeleton height={24} width={80} />
      </div>
    </div>
  );
};

// Table Skeleton
export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ 
  rows = 5, 
  cols = 4 
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} height={20} />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="p-4 border-b last:border-b-0">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <Skeleton key={colIndex} height={16} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Profile Skeleton
export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center space-x-6">
        <Skeleton variant="circular" width={100} height={100} />
        <div className="space-y-2 flex-grow">
          <Skeleton height={24} width="40%" />
          <Skeleton height={16} width="30%" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <Skeleton height={20} width="30%" />
        <div className="space-y-3">
          <Skeleton height={40} width="100%" />
          <Skeleton height={40} width="100%" />
          <Skeleton height={40} width="100%" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
