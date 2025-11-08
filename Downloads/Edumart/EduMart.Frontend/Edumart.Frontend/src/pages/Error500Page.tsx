import React from 'react';
import { useApp } from '../context/AppContext';

export const Error500Page: React.FC = () => {
  const { setCurrentPage } = useApp();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Illustration */}
        <div className="mb-8">
          <svg
            className="w-full max-w-md mx-auto"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 500 Text with shadow */}
            <text
              x="200"
              y="150"
              fontSize="120"
              fontWeight="bold"
              textAnchor="middle"
              fill="#fee2e2"
            >
              500
            </text>
            <text
              x="200"
              y="150"
              fontSize="120"
              fontWeight="bold"
              textAnchor="middle"
              fill="#ef4444"
              opacity="0.8"
              transform="translate(-2, -2)"
            >
              500
            </text>
            
            {/* Server/Computer icon */}
            <g transform="translate(160, 180)">
              <rect x="0" y="0" width="80" height="60" rx="4" fill="white" stroke="#ef4444" strokeWidth="3" />
              <rect x="10" y="10" width="60" height="8" rx="2" fill="#fca5a5" />
              <rect x="10" y="24" width="60" height="8" rx="2" fill="#fca5a5" />
              <rect x="10" y="38" width="40" height="8" rx="2" fill="#fca5a5" />
              <circle cx="65" cy="50" r="3" fill="#ef4444" />
            </g>
            
            {/* Warning signs */}
            <g transform="translate(100, 60)">
              <polygon points="12,2 22,18 2,18" fill="#fbbf24" opacity="0.6" />
              <text x="12" y="15" fontSize="12" fontWeight="bold" textAnchor="middle" fill="white">!</text>
            </g>
            <g transform="translate(280, 70)">
              <polygon points="12,2 22,18 2,18" fill="#fbbf24" opacity="0.5" />
              <text x="12" y="15" fontSize="12" fontWeight="bold" textAnchor="middle" fill="white">!</text>
            </g>
          </svg>
        </div>

        {/* Content */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Internal Server Error
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          Something went wrong on our end. We're working to fix the issue. Please try again in a few moments.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleRefresh}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md w-full sm:w-auto flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Page
          </button>
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors duration-200 border border-gray-300 w-full sm:w-auto"
          >
            Go to Homepage
          </button>
        </div>

        {/* Error details (for development) */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <details className="text-left bg-gray-50 rounded-lg p-4 max-w-lg mx-auto">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
              Technical Details
            </summary>
            <div className="mt-3 text-xs text-gray-600 font-mono bg-white p-3 rounded border border-gray-200 overflow-x-auto">
              <p>Error Code: 500</p>
              <p>Type: Internal Server Error</p>
              <p>Timestamp: {new Date().toISOString()}</p>
              <p className="mt-2 text-gray-500">
                If this problem persists, please contact our support team with the above information.
              </p>
            </div>
          </details>
        </div>

        {/* Support contact */}
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-2">Need immediate help?</p>
          <a
            href="#contact"
            className="text-primary hover:text-primary-600 hover:underline font-medium"
          >
            Contact Support Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error500Page;
