import React from 'react';
import { useApp } from '../context/AppContext';

interface BreadcrumbItem {
  label: string;
  page?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { setCurrentPage, currentPage } = useApp();

  // Default breadcrumbs based on current page
  const defaultBreadcrumbs: Record<string, BreadcrumbItem[]> = {
    home: [{ label: 'Home', page: 'home' }],
    product: [
      { label: 'Home', page: 'home' },
      { label: 'Products', page: 'home' },
      { label: 'Product Details' }
    ],
    cart: [
      { label: 'Home', page: 'home' },
      { label: 'Shopping Cart' }
    ],
    wishlist: [
      { label: 'Home', page: 'home' },
      { label: 'Wishlist' }
    ],
    checkout: [
      { label: 'Home', page: 'home' },
      { label: 'Cart', page: 'cart' },
      { label: 'Checkout' }
    ],
    confirmation: [
      { label: 'Home', page: 'home' },
      { label: 'Order Confirmation' }
    ],
    orders: [
      { label: 'Home', page: 'home' },
      { label: 'Profile', page: 'profile' },
      { label: 'Order History' }
    ],
    profile: [
      { label: 'Home', page: 'home' },
      { label: 'Profile' }
    ],
    vendor: [
      { label: 'Home', page: 'home' },
      { label: 'Vendor Dashboard' }
    ],
    login: [
      { label: 'Home', page: 'home' },
      { label: 'Login' }
    ]
  };

  const breadcrumbItems = items || defaultBreadcrumbs[currentPage] || [{ label: 'Home', page: 'home' }];

  const handleClick = (item: BreadcrumbItem, index: number) => {
    if (index === breadcrumbItems.length - 1) return; // Current page, not clickable
    
    if (item.onClick) {
      item.onClick();
    } else if (item.page) {
      setCurrentPage(item.page as any);
    }
  };

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            
            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 text-gray-400 mx-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {isLast ? (
                  <span className="text-gray-900 font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <button
                    onClick={() => handleClick(item, index)}
                    className="text-primary hover:text-blue-800 hover:underline transition-colors"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

// Compact breadcrumbs for mobile
export const CompactBreadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { setCurrentPage, currentPage } = useApp();

  const defaultBreadcrumbs: Record<string, BreadcrumbItem[]> = {
    home: [{ label: 'Home', page: 'home' }],
    product: [
      { label: 'Home', page: 'home' },
      { label: 'Products', page: 'home' },
      { label: 'Product Details' }
    ],
    cart: [
      { label: 'Home', page: 'home' },
      { label: 'Shopping Cart' }
    ],
    wishlist: [
      { label: 'Home', page: 'home' },
      { label: 'Wishlist' }
    ],
    checkout: [
      { label: 'Home', page: 'home' },
      { label: 'Cart', page: 'cart' },
      { label: 'Checkout' }
    ],
    orders: [
      { label: 'Home', page: 'home' },
      { label: 'Order History' }
    ],
    profile: [
      { label: 'Home', page: 'home' },
      { label: 'Profile' }
    ],
    vendor: [
      { label: 'Home', page: 'home' },
      { label: 'Vendor Dashboard' }
    ]
  };

  const breadcrumbItems = items || defaultBreadcrumbs[currentPage] || [{ label: 'Home', page: 'home' }];

  if (breadcrumbItems.length <= 1) return null;

  const previousPage = breadcrumbItems[breadcrumbItems.length - 2];
  const currentPageItem = breadcrumbItems[breadcrumbItems.length - 1];

  const handleBack = () => {
    if (previousPage.onClick) {
      previousPage.onClick();
    } else if (previousPage.page) {
      setCurrentPage(previousPage.page as any);
    }
  };

  return (
    <div className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <button
          onClick={handleBack}
          className="flex items-center text-sm text-primary hover:text-blue-800 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to {previousPage.label}</span>
        </button>
      </div>
    </div>
  );
};

export default Breadcrumbs;
