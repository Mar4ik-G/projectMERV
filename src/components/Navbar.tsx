// src/components/organisms/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isAuthenticated: boolean;
  onSignOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onSignOut }) => {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <ul className="flex space-x-6">
          {isAuthenticated && (
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-gray-300">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
        {isAuthenticated && (
          <button
            onClick={onSignOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
