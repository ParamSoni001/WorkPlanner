import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NAV_LINKS } from '../../utils/constants';
import Avatar from '../ui/Avatar';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 font-bold text-xl">Work Planner</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {isAuthenticated && (
              <div className="flex items-center space-x-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-base font-medium transition-colors hover:text-blue-600 ${
                      location.pathname === link.path
                        ? 'text-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="flex items-center space-x-2">
                    <Avatar
                      src={user?.avatar}
                      fallback={user?.name}
                      size="sm"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="pt-2 pb-4 space-y-1 px-4">
            {isAuthenticated ? (
              <>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block py-2 text-base font-medium ${
                      location.pathname === link.path
                        ? 'text-blue-600'
                        : 'text-gray-700'
                    }`}
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 pb-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar
                        src={user?.avatar}
                        fallback={user?.name}
                        size="sm"
                      />
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700">
                          {user?.name}
                        </p>
                        <p className="text-sm font-medium text-gray-500">
                          {user?.role === 'manager' ? 'Manager' : 'Team Member'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }}
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-4 flex flex-col space-y-3">
                <Link
                  to="/login"
                  className="block text-base font-medium text-gray-700 hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;