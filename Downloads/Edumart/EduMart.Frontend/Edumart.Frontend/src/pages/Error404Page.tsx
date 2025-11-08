import React from 'react';
import { useApp } from '../context/AppContext';

export const Error404Page: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Illustration */}
        <div className="mb-8">
          <svg
            className="w-full max-w-md mx-auto"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 404 Text with shadow */}
            <text
              x="200"
              y="150"
              fontSize="120"
              fontWeight="bold"
              textAnchor="middle"
              fill="#e5e7eb"
            >
              404
            </text>
            <text
              x="200"
              y="150"
              fontSize="120"
              fontWeight="bold"
              textAnchor="middle"
              fill="#3b82f6"
              opacity="0.8"
              transform="translate(-2, -2)"
            >
              404
            </text>
            
            {/* Magnifying glass */}
            <circle cx="280" cy="180" r="35" fill="white" stroke="#3b82f6" strokeWidth="4" />
            <path
              d="M305 205 L330 230"
              stroke="#3b82f6"
              strokeWidth="6"
              strokeLinecap="round"
            />
            
            {/* Question marks floating */}
            <text x="100" y="80" fontSize="30" fill="#93c5fd" opacity="0.6">?</text>
            <text x="320" y="70" fontSize="24" fill="#93c5fd" opacity="0.4">?</text>
            <text x="80" y="220" fontSize="28" fill="#93c5fd" opacity="0.5">?</text>
          </svg>
        </div>

        {/* Content */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-primary hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => window.history.back()}
            className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors duration-200 border border-gray-300 w-full sm:w-auto"
          >
            Go Back
          </button>
        </div>

        {/* Helpful links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Here are some helpful links instead:</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-primary hover:text-primary-600 hover:underline"
            >
              Shop All Products
            </button>
            <button
              onClick={() => setCurrentPage('orders')}
              className="text-primary hover:text-primary-600 hover:underline"
            >
              Track Your Order
            </button>
            <button
              onClick={() => setCurrentPage('profile')}
              className="text-primary hover:text-primary-600 hover:underline"
            >
              My Account
            </button>
            <a
              href="#contact"
              className="text-primary hover:text-primary-600 hover:underline"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404Page;
