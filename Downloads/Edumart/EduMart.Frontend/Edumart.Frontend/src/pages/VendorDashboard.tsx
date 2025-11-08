import React from 'react';

const VendorDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Vendor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-2">Total Sales</p>
          <p className="text-3xl font-bold text-primary">$12,345</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-2">Products</p>
          <p className="text-3xl font-bold text-green-600">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-2">Orders</p>
          <p className="text-3xl font-bold text-purple-600">156</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <p className="text-gray-600">Vendor dashboard features coming soon...</p>
      </div>
    </div>
  );
};

export default VendorDashboard;
