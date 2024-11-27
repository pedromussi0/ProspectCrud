import React from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../services/api';

export default function Navbar() {
  const handleLogout = async () => {
    try {
      await authApi.logout();
      // Redirect to login page or update app state
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Lead Management
        </Link>
        <div>
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

