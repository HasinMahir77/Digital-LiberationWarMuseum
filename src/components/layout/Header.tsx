import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHistoryDropdownOpen, setIsHistoryDropdownOpen] = useState(false); // New state for History dropdown
  const [isProgramDropdownOpen, setIsProgramDropdownOpen] = useState(false); // New state for Program dropdown
  const [historyDropdownTimeout, setHistoryDropdownTimeout] = useState<number | null>(null);
  const [programDropdownTimeout, setProgramDropdownTimeout] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-green-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">LW</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Liberation War </h1>
              <p className="text-xs text-gray-600">Digital Collection</p>
            </div>
          </Link>

          {/* Centered Navigation and Search */}
          <div className="flex-1 flex items-center justify-center space-x-8 mx-8">
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
              {/* History Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => {
                  if (historyDropdownTimeout) clearTimeout(historyDropdownTimeout);
                  setIsHistoryDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  setHistoryDropdownTimeout(setTimeout(() => {
                    setIsHistoryDropdownOpen(false);
                  }, 200));
                }}
              >
                <button
                  className={`text-sm font-medium transition-colors flex items-center group-hover:text-green-700 ${
                    isActive('/search') || isActive('/timeline') || isActive('/exhibitions')
                      ? 'text-green-700'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  History
                  <svg
                    className={`ml-1 w-4 h-4 transform transition-transform group-hover:rotate-180 ${
                      isHistoryDropdownOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <AnimatePresence>
                  {isHistoryDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                    >
                      <div className="py-1">
                        <Link
                          to="/search"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsHistoryDropdownOpen(false)}
                        >
                          Artifacts
                        </Link>
                        <Link
                          to="/timeline"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsHistoryDropdownOpen(false)}
                        >
                          Timeline
                        </Link>
                        <Link
                          to="/exhibitions"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsHistoryDropdownOpen(false)}
                        >
                          Exhibitions
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link 
                to="/virtual-tour" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/virtual-tour') ? 'text-green-700' : 'text-gray-700 hover:text-green-600'
                }`}
              >
                Virtual Tour
              </Link>
              <Link 
                to="/news" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/news') ? 'text-green-700' : 'text-gray-700 hover:text-green-600'
                }`}
              >
                News
              </Link>

              {/* Program Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => {
                  if (programDropdownTimeout) clearTimeout(programDropdownTimeout);
                  setIsProgramDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  setProgramDropdownTimeout(setTimeout(() => {
                    setIsProgramDropdownOpen(false);
                  }, 200));
                }}
              >
                <button
                  className={`text-sm font-medium transition-colors flex items-center group-hover:text-green-700 ${
                    isActive('/events') || isActive('/competitions')
                      ? 'text-green-700'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  Program
                  <svg
                    className={`ml-1 w-4 h-4 transform transition-transform group-hover:rotate-180 ${
                      isProgramDropdownOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <AnimatePresence>
                  {isProgramDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                    >
                      <div className="py-1">
                        <Link
                          to="/events"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProgramDropdownOpen(false)}
                        >
                          Events
                        </Link>
                        <Link
                          to="/competitions"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProgramDropdownOpen(false)}
                        >
                          Competitions
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Removed Search Bar */}
          </div>

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
              {/* Removed Search Bar from Mobile */}
              
              <nav className="space-y-2">
                <Link 
                  to="/" 
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                {/* History Dropdown for Mobile */}
                <div>
                  <button
                    onClick={() => setIsHistoryDropdownOpen(!isHistoryDropdownOpen)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-green-600 transition-colors ${
                      isActive('/search') || isActive('/timeline') || isActive('/exhibitions')
                        ? 'text-green-700'
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    History
                    <svg
                      className={`ml-1 w-4 h-4 transform transition-transform ${isHistoryDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {isHistoryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 pr-3 py-2 space-y-2 bg-gray-50 rounded-md mt-1"
                      >
                        <Link
                          to="/search"
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setIsHistoryDropdownOpen(false);
                          }}
                        >
                          Artifacts
                        </Link>
                        <Link
                          to="/timeline"
                          className="block px-3 py-2 text-sm text-700 hover:bg-gray-100"
                          onClick={() => {
                            setIsHistoryDropdownOpen(false);
                          }}
                        >
                          Timeline
                        </Link>
                        <Link
                          to="/exhibitions"
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setIsHistoryDropdownOpen(false);
                          }}
                        >
                          Exhibitions
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link 
                  to="/virtual-tour" 
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Virtual Tour
                </Link>
                <Link 
                  to="/news" 
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  News
                </Link>
                {/* Program Dropdown for Mobile */}
                <div>
                  <button
                    onClick={() => setIsProgramDropdownOpen(!isProgramDropdownOpen)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-green-600 transition-colors ${
                      isActive('/events') || isActive('/competitions')
                        ? 'text-green-700'
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    Program
                    <svg
                      className={`ml-1 w-4 h-4 transform transition-transform ${isProgramDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {isProgramDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 pr-3 py-2 space-y-2 bg-gray-50 rounded-md mt-1"
                      >
                        <Link
                          to="/events"
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setIsProgramDropdownOpen(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          Events
                        </Link>
                        <Link
                          to="/competitions"
                          className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setIsProgramDropdownOpen(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          Competitions
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;