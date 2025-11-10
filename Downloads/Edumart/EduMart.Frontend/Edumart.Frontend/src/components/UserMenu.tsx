import React from 'react';
import { useApp } from '../context/AppContext';
import { useLocalization } from '../context/LocalizationContext';

export const UserMenu: React.FC = () => {
  const { user, logout, setCurrentPage } = useApp();
  const { t } = useLocalization();

  if (!user) return null;

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-700">{user.name}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <button 
          onClick={() => setCurrentPage('profile')} 
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
        >
          {t('nav.profile')}
        </button>
        <button 
          onClick={() => setCurrentPage('orders')} 
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {t('nav.orders')}
        </button>
        {user.role === 'vendor' && (
          <button 
            onClick={() => setCurrentPage('vendor')} 
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {t('nav.vendor')}
          </button>
        )}
        <hr className="my-1" />
        <button 
          onClick={logout} 
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg"
        >
          {t('nav.logout')}
        </button>
      </div>
    </div>
  );
};
