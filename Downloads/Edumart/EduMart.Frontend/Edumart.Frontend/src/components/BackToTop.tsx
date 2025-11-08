import React, { useState, useEffect } from 'react';

interface BackToTopProps {
  showAt?: number;
  smooth?: boolean;
  className?: string;
}

export const BackToTop: React.FC<BackToTopProps> = ({
  showAt = 300,
  smooth = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAt) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [showAt]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-8 right-8 z-50
            bg-primary hover:bg-primary-600
            text-white p-3 rounded-full shadow-lg
            transition-all duration-300
            hover:scale-110 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${className}
          `}
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

// Alternative circular progress variant
export const BackToTopWithProgress: React.FC<BackToTopProps> = ({
  showAt = 300,
  smooth = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      
      const totalScroll = documentHeight - windowHeight;
      const progress = (scrollTop / totalScroll) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > showAt);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAt]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-8 right-8 z-50
            bg-white hover:bg-gray-50
            text-primary p-2 rounded-full shadow-lg
            transition-all duration-300
            hover:scale-110 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${className}
          `}
          aria-label="Back to top"
        >
          <svg className="w-12 h-12" viewBox="0 0 50 50">
            {/* Background circle */}
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="4"
            />
            {/* Progress circle */}
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 25 25)"
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
            {/* Arrow icon */}
            <path
              d="M25 15 L25 35 M17 23 L25 15 L33 23"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      )}
    </>
  );
};

// Minimal variant
export const BackToTopMinimal: React.FC<BackToTopProps> = ({
  showAt = 300,
  smooth = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAt) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAt]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-8 right-8 z-50
            bg-gray-900 bg-opacity-50 hover:bg-opacity-70
            text-white px-4 py-2 rounded-md shadow-lg
            transition-all duration-300
            hover:translate-y-[-4px]
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
            text-sm font-medium
            ${className}
          `}
          aria-label="Back to top"
        >
          ↑ Top
        </button>
      )}
    </>
  );
};

export default BackToTop;
