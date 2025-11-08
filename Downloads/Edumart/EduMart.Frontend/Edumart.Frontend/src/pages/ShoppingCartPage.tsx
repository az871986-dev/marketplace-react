import React from 'react';
import { useApp } from '../context/AppContext';
import { LazyImage } from '../components/LazyImage';
import { EmptyState } from '../components/EmptyState';

const ShoppingCartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, setCurrentPage } = useApp();

  if (cart.length === 0) {
    return <EmptyState type="cart" onAction={() => setCurrentPage('home')} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.product.id} className="flex bg-white p-4 rounded-lg shadow-md">
              <LazyImage src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="ml-4 flex-grow">
                <h3 className="font-semibold text-lg">{item.product.name}</h3>
                <p className="text-gray-600">ريال {item.product.price.toFixed(2)}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)} className="px-3 py-1 border rounded hover:bg-gray-100">-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)} className="px-3 py-1 border rounded hover:bg-gray-100">+</button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">ريال {(item.product.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.product.id)} className="text-red-600 hover:text-red-700 mt-2 text-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>ريال {cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>ريال {cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={() => setCurrentPage('checkout')} className="w-full bg-primary hover:bg-primary-600 text-white py-3 rounded-lg font-semibold transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
