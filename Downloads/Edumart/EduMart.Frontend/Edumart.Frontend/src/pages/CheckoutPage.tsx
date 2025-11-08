import React from 'react';
import { useApp } from '../context/AppContext';

const CheckoutPage: React.FC = () => {
  const { placeOrder, cartTotal } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="border p-3 rounded-lg" />
            <input type="text" placeholder="Last Name" className="border p-3 rounded-lg" />
            <input type="email" placeholder="Email" className="border p-3 rounded-lg col-span-2" />
            <input type="text" placeholder="Address" className="border p-3 rounded-lg col-span-2" />
            <input type="text" placeholder="City" className="border p-3 rounded-lg" />
            <input type="text" placeholder="ZIP Code" className="border p-3 rounded-lg" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Payment Information</h2>
          <p className="text-gray-600 mb-4">Demo: Payment details are simulated</p>
          <input type="text" placeholder="Card Number" className="border p-3 rounded-lg w-full mb-2" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="MM/YY" className="border p-3 rounded-lg" />
            <input type="text" placeholder="CVV" className="border p-3 rounded-lg" />
          </div>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between text-2xl font-bold mb-4">
            <span>Total:</span>
            <span>ريال {cartTotal.toFixed(2)}</span>
          </div>
          <button onClick={placeOrder} className="w-full bg-primary hover:bg-primary-600 text-white py-3 rounded-lg font-semibold transition-colors">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
