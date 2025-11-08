import React from 'react';

interface EmptyStateProps {
  type: 'cart' | 'wishlist' | 'orders' | 'search' | 'products' | 'notifications';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  const states = {
    cart: {
      title: title || 'Your cart is empty',
      description: description || 'Add items to your cart to get started with your purchase.',
      actionLabel: actionLabel || 'Continue Shopping',
      illustration: (
        <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" fill="#f3f4f6" />
          <path d="M60 70 L140 70 L135 120 L65 120 Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />
          <circle cx="80" cy="135" r="8" fill="#9ca3af" />
          <circle cx="120" cy="135" r="8" fill="#9ca3af" />
          <path d="M75 85 L85 105 L95 75" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        </svg>
      )
    },
    wishlist: {
      title: title || 'Your wishlist is empty',
      description: description || 'Save items you love to your wishlist for later.',
      actionLabel: actionLabel || 'Browse Products',
      illustration: (
        <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" fill="#fef3f2" />
          <path d="M100 140 C100 140, 70 110, 70 90 C70 75, 80 65, 90 65 C95 65, 100 68, 100 68 C100 68, 105 65, 110 65 C120 65, 130 75, 130 90 C130 110, 100 140, 100 140 Z" fill="#fecaca" stroke="#f87171" strokeWidth="2" />
          <path d="M85 85 L95 95 M115 85 L105 95" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      )
    },
    orders: {
      title: title || 'No orders yet',
      description: description || 'You haven\'t placed any orders. Start shopping to see your orders here.',
      actionLabel: actionLabel || 'Start Shopping',
      illustration: (
        <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" fill="#f0fdf4" />
          <rect x="70" y="60" width="60" height="70" rx="4" fill="#d1fae5" stroke="#4ade80" strokeWidth="2" />
          <path d="M80 80 L120 80 M80 95 L120 95 M80 110 L105 110" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <circle cx="115" cy="45" r="12" fill="#4ade80" />
          <path d="M110 45 L113 48 L120 41" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    search: {
      title: title || 'No results found',
      description: description || 'Try adjusting your search or filters to find what you\'re looking for.',
      actionLabel: actionLabel || 'Clear Filters',
      illustration: (
        <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" fill="#f3f4f6" />
          <circle cx="90" cy="90" r="30" fill="white" stroke="#9ca3af" strokeWidth="3" />
          <path d="M112 112 L135 135" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
          <path d="M80 90 L100 90 M90 80 L90 100" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      )
    },
    products: {
      title: title || 'No products available',
      description: description || 'There are no products to display at the moment.',
      actionLabel: actionLabel || 'Refresh',
      illustration: (
        <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" fill="#fef3c7" />
          <rect x="70" y="70" width="60" height="60" rx="4" fill="#fde68a" stroke="#f59e0b" strokeWidth="2" />
          <path d="M85 100 L95 110 L115 85" stroke="#f59e0b" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        </svg>
      )
    },
    notifications: {
      title: title || 'No notifications',
      description: description || 'You\'re all caught up! Check back later for updates.',
      actionLabel: actionLabel || 'Go to Dashboard',
      illustration: (
        <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" fill="#ede9fe" />
          <path d="M100 60 C85 60, 75 70, 75 85 L75 105 L65 115 L135 115 L125 105 L125 85 C125 70, 115 60, 100 60 Z M90 120 C90 125, 95 130, 100 130 C105 130, 110 125, 110 120" fill="#c4b5fd" stroke="#8b5cf6" strokeWidth="2" />
          <circle cx="120" cy="70" r="8" fill="#ef4444" />
        </svg>
      )
    }
  };

  const state = states[type];

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="mb-6">
        {state.illustration}
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
        {state.title}
      </h3>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        {state.description}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          {state.actionLabel}
        </button>
      )}
    </div>
  );
};

// Compact empty state for smaller sections
export const CompactEmptyState: React.FC<{
  icon?: React.ReactNode;
  message: string;
  className?: string;
}> = ({ icon, message, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-8 px-4 ${className}`}>
      {icon && <div className="mb-3 text-gray-400">{icon}</div>}
      <p className="text-gray-500 text-sm text-center">{message}</p>
    </div>
  );
};

// Empty state with custom illustration
export const CustomEmptyState: React.FC<{
  illustration: React.ReactNode;
  title: string;
  description: string;
  actions?: React.ReactNode;
  className?: string;
}> = ({ illustration, title, description, actions, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="mb-6">
        {illustration}
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
        {title}
      </h3>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        {description}
      </p>
      {actions && (
        <div className="flex flex-wrap gap-3 justify-center">
          {actions}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
