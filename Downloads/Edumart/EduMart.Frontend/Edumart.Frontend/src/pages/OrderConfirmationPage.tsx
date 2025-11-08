import React from 'react';
import { useApp } from '../context/AppContext';

const OrderConfirmationPage: React.FC = () => {
  const { setCurrentPage, orders } = useApp();
  const latestOrder = orders[0];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Thank you for your purchase</p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <p className="text-gray-700 mb-2">Order Number</p>
        <p className="text-2xl font-bold text-primary mb-4">{latestOrder?.id}</p>
        <p className="text-gray-600">We've sent a confirmation email with order details</p>
      </div>

      <div className="space-x-4">
        <button onClick={() => setCurrentPage('orders')} className="bg-primary hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          View Orders
        </button>
        <button onClick={() => setCurrentPage('home')} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
