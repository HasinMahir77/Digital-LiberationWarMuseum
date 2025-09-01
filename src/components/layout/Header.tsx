import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-green-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">LW</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Liberation War Archive</h1>
              <p className="text-xs text-gray-600">Digital Heritage Collection</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-green-700' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`text-sm font-medium transition-colors ${
                isActive('/search') ? 'text-green-700' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Browse Collection
            </Link>
            <Link 
              to="/timeline" 
              className={`text-sm font-medium transition-colors ${
                isActive('/timeline') ? 'text-green-700' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Timeline
            </Link>
            <Link 
              to="/exhibitions" 
              className={`text-sm font-medium transition-colors ${
                isActive('/exhibitions') ? 'text-green-700' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Exhibitions
            </Link>
            <Link 
              to="/virtual-tour" 
              className={`text-sm font-medium transition-colors ${
                isActive('/virtual-tour') ? 'text-green-700' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              Virtual Tour
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artifacts, collections..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </form>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline text-sm font-medium">{user.name}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
                      </div>
                      {(user.role === 'super_admin' || user.role === 'archivist' || user.role === 'curator') && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-green-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <form onSubmit={handleSearch} className="lg:hidden">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search artifacts..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </form>
              
              <nav className="space-y-2">
                <Link 
                  to="/" 
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/search" 
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse Collection
                </Link>
                <Link 
                  to="/timeline" 
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Timeline
                </Link>
                <Link 
                  to="/exhibitions" 
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Exhibitions
                </Link>
                <Link 
                  to="/virtual-tour" 
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Virtual Tour
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;