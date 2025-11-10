import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLocalization } from '../context/LocalizationContext';
import { LanguageSwitcher, MobileLanguageSwitcher } from './LanguageSwitcher';
import { UserMenu } from './UserMenu';
import logo from '../assets/logo.png';


const Navigation: React.FC = () => {
  const { user, logout, cart, wishlist, setCurrentPage, searchQuery, setSearchQuery } = useApp();
  const { t } = useLocalization();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage('home')}
                className="flex items-center hover:opacity-80 transition-opacity">
                <img 
                  src={logo}
                  alt="EduMarket - سوق التعليم" 
                  className="h-10 md:h-12"
                />
            </button>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t('nav.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            <button onClick={() => setCurrentPage('wishlist')} className="relative p-2 text-gray-700 hover:text-primary transition-colors" aria-label={t('nav.wishlist')}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlist.length}</span>}
            </button>

            <button onClick={() => setCurrentPage('cart')} className="relative p-2 text-gray-700 hover:text-primary transition-colors" aria-label={t('nav.cart')}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.length}</span>}
            </button>

            {user ? (
              <UserMenu />
            ) : (
              <button onClick={() => setCurrentPage('login')} className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">{t('nav.login')}</button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <input type="text" placeholder={t('nav.search')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            <div className="py-2 border-b"><MobileLanguageSwitcher /></div>
            <button onClick={() => { setCurrentPage('wishlist'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center justify-between">
              <span>{t('nav.wishlist')}</span>
              {wishlist.length > 0 && <span className="bg-secondary text-white text-xs rounded-full px-2 py-1">{wishlist.length}</span>}
            </button>
            <button onClick={() => { setCurrentPage('cart'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center justify-between">
              <span>{t('nav.cart')}</span>
              {cart.length > 0 && <span className="bg-primary text-white text-xs rounded-full px-2 py-1">{cart.length}</span>}
            </button>
            {user ? (
              <>
                <button onClick={() => { setCurrentPage('profile'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">{t('nav.profile')}</button>
                <button onClick={() => { setCurrentPage('orders'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">{t('nav.orders')}</button>
                {user.role === 'vendor' && <button onClick={() => { setCurrentPage('vendor'); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">{t('nav.vendor')}</button>}
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-lg">{t('nav.logout')}</button>
              </>
            ) : (
              <button onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false); }} className="w-full bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium">{t('nav.login')}</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
