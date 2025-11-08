import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppProvider, useApp } from './context/AppContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';
import VendorDashboard from './pages/VendorDashboard';
import Error404Page from './pages/Error404Page';
import Error500Page from './pages/Error500Page';
import Breadcrumbs from './components/Breadcrumbs';
import { BackToTop } from './components/BackToTop';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LocalizationProvider } from './context/LocalizationContext';

// 👇 This is the component that *uses* the context
const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'login':
        return <LoginPage />;
      case 'product':
        return <ProductDetailsPage />;
      case 'cart':
        return <ShoppingCartPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'confirmation':
        return <OrderConfirmationPage />;
      case 'orders':
        return <OrderHistoryPage />;
      case 'profile':
        return <ProfilePage />;
      case 'vendor':
        return <VendorDashboard />;
      case '404':
        return <Error404Page />;
      case '500':
        return <Error500Page />;
      default:
        return <Error404Page />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      {!['home', '404', '500', 'login'].includes(currentPage) && <Breadcrumbs />}
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
      {!['404', '500'].includes(currentPage) && (
        <BackToTop showAt={300} smooth={true} />
      )}
    </div>
  );
};

// 👇 This is the top-level component that *provides* the context
const App: React.FC = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <LocalizationProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </LocalizationProvider>
    </Provider>
  </ErrorBoundary>
);

export default App;