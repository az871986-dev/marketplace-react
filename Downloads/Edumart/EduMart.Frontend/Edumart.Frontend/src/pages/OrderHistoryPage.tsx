import React from 'react';
import { useApp } from '../context/AppContext';
import { EmptyState } from '../components/EmptyState';

const OrderHistoryPage: React.FC = () => {
  const { orders, setCurrentPage } = useApp();

  if (orders.length === 0) {
    return <EmptyState type="orders" onAction={() => setCurrentPage('home')} />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-primary bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600">Order #{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="border-t pt-4">
              {order.items.map(item => (
                <div key={item.product.id} className="flex justify-between py-2">
                  <span>{item.product.name} x {item.quantity}</span>
                  <span className="font-semibold">ريال {(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>ريال {order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
