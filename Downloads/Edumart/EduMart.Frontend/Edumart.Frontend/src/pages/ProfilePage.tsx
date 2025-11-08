import React from 'react';
import { useApp } from '../context/AppContext';

const ProfilePage: React.FC = () => {
  const { user, setCurrentPage } = useApp();

  if (!user) {
    setCurrentPage('login');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-8">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {user.role}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button onClick={() => setCurrentPage('orders')} className="bg-gray-100 hover:bg-gray-200 p-6 rounded-lg transition-colors text-left">
            <h3 className="font-bold text-lg mb-2">Orders</h3>
            <p className="text-gray-600">View your order history</p>
          </button>
          <button onClick={() => setCurrentPage('wishlist')} className="bg-gray-100 hover:bg-gray-200 p-6 rounded-lg transition-colors text-left">
            <h3 className="font-bold text-lg mb-2">Wishlist</h3>
            <p className="text-gray-600">Manage your wishlist</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
