import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductImage } from '../components/LazyImage';
import { ProductDetailsSkeleton } from '../components/LoadingSkeleton';

const ProductDetailsPage: React.FC = () => {
  const { selectedProduct, addToCart, addToWishlist, setCurrentPage } = useApp();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);

  if (!selectedProduct) {
    setCurrentPage('home');
    return null;
  }

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <ProductImage
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full rounded-lg shadow-lg"
            enableZoom={true}
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{selectedProduct.name}</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600">({selectedProduct.reviews} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-primary">ريال {selectedProduct.price.toFixed(2)}</p>
          
          <p className="text-gray-700 leading-relaxed">{selectedProduct.description}</p>

          <div className="border-t border-b py-4 space-y-2">
            <p><span className="font-semibold">Category:</span> {selectedProduct.category}</p>
            <p><span className="font-semibold">Vendor:</span> {selectedProduct.vendor}</p>
            <p><span className="font-semibold">Status:</span> 
              <span className={`ml-2 ${selectedProduct.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <label className="font-semibold">Quantity:</label>
            <div className="flex items-center border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-gray-100">-</button>
              <span className="px-6 py-2 border-x">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-gray-100">+</button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) addToCart(selectedProduct);
              }}
              disabled={!selectedProduct.inStock}
              className="flex-1 bg-primary hover:bg-primary-600 disabled:bg-gray-300 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={() => addToWishlist(selectedProduct)}
              className="bg-white border-2 border-primary text-primary hover:bg-primary-50 py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
