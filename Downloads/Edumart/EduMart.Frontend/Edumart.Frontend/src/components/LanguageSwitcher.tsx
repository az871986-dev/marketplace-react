import React, { useState } from 'react';
import { useLocalization } from '../context/LocalizationContext';

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-medium text-gray-700">{lang === 'en' ? 'En' : 'ع'}</span>
        <svg className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
            <button
              onClick={() => { setLang('en'); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between ${lang === 'en' ? 'bg-primary-50 text-primary' : 'text-gray-700'}`}
            >
              <span>En</span>
              {lang === 'en' && <span>✓</span>}
            </button>
            <button
              onClick={() => { setLang('ar'); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between ${lang === 'ar' ? 'bg-primary-50 text-primary' : 'text-gray-700'}`}
            >
              <span>ع</span>
              {lang === 'ar' && <span>✓</span>}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export const MobileLanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLocalization();

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => setLang('en')}
        className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          lang === 'en' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'
        }`}
      >
        En
      </button>
      <button
        onClick={() => setLang('ar')}
        className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          lang === 'ar' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'
        }`}
      >
        ع
      </button>
    </div>
  );
};
