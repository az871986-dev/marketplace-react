import React from 'react';
import { useApp } from '../context/AppContext';
import { LazyImage } from '../components/LazyImage';
import { EmptyState } from '../components/EmptyState';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart, setCurrentPage, setSelectedProduct } = useApp();

  if (wishlist.length === 0) {
    return <EmptyState type="wishlist" onAction={() => setCurrentPage('home')} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48 cursor-pointer" onClick={() => { setSelectedProduct(product); setCurrentPage('product'); }}>
              <LazyImage src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-primary mb-4">ريال {product.price.toFixed(2)}</p>
              <div className="space-y-2">
                <button onClick={() => addToCart(product)} className="w-full bg-primary hover:bg-primary-600 text-white py-2 rounded-lg transition-colors">
                  Add to Cart
                </button>
                <button onClick={() => removeFromWishlist(product.id)} className="w-full bg-white border border-red-600 text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
