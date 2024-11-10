import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import { ListPropertyModal } from './ListPropertyModal';

export function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showListingModal, setShowListingModal] = useState(false);
  const [showListingAfterAuth, setShowListingAfterAuth] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAcademyDropdown, setShowAcademyDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const academyDropdownRef = useRef<HTMLDivElement>(null);
  const academyTimeoutRef = useRef<NodeJS.Timeout>();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (academyDropdownRef.current && !academyDropdownRef.current.contains(event.target as Node)) {
        setShowAcademyDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAcademyMouseEnter = () => {
    if (academyTimeoutRef.current) {
      clearTimeout(academyTimeoutRef.current);
    }
    setShowAcademyDropdown(true);
  };

  const handleAcademyMouseLeave = () => {
    academyTimeoutRef.current = setTimeout(() => {
      setShowAcademyDropdown(false);
    }, 500); // Increased delay to 500ms for better UX
  };

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setShowListingAfterAuth(false);
  };

  const handleListPropertyClick = () => {
    if (!user) {
      setAuthMode('signup');
      setShowAuthModal(true);
      setShowListingAfterAuth(true);
    } else {
      setShowListingModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (showListingAfterAuth) {
      setShowListingModal(true);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-3xl font-serif tracking-wide font-bold text-gray-900">IVERSTON</h1>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link 
              to="/properties" 
              className={`font-semibold ${isActive('/properties') ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Properties
            </Link>
            <Link 
              to="/market-research" 
              className={`font-semibold ${isActive('/market-research') ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Market Research
            </Link>
            <Link 
              to="/investment-tools" 
              className={`font-semibold ${isActive('/investment-tools') ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Investment Tools
            </Link>
            <div 
              className="relative"
              ref={academyDropdownRef}
              onMouseEnter={handleAcademyMouseEnter}
              onMouseLeave={handleAcademyMouseLeave}
            >
              <button 
                className={`flex items-center gap-1 font-semibold ${
                  isActive('/academy') || isActive('/instructors') 
                    ? 'text-indigo-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Academy
                <ChevronDown className="w-4 h-4" />
              </button>
              {showAcademyDropdown && (
                <div 
                  className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                  onMouseEnter={handleAcademyMouseEnter}
                  onMouseLeave={handleAcademyMouseLeave}
                >
                  <Link 
                    to="/academy" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Courses
                  </Link>
                  <Link 
                    to="/instructors" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Instructors
                  </Link>
                </div>
              )}
            </div>
            <Link 
              to="/contact" 
              className={`font-semibold ${isActive('/contact') ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="relative" ref={dropdownRef}>
                  <button 
                    className={`flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-full ${showUserDropdown ? 'bg-gray-100' : ''}`}
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                  >
                    <User className="w-5 h-5" />
                  </button>
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                      <div className="px-4 py-2 border-b">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/saved-properties" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Saved Properties
                      </Link>
                      <Link 
                        to="/my-courses" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        My Courses
                      </Link>
                      <Link 
                        to="/settings" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Settings
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setShowUserDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex gap-4">
                <button 
                  onClick={() => handleAuthClick('signin')}
                  className="text-gray-600 hover:text-gray-900 font-semibold"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => handleAuthClick('signup')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
            <button 
              onClick={handleListPropertyClick}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              List Property
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
        onSuccess={handleAuthSuccess}
      />

      {user && (
        <ListPropertyModal
          isOpen={showListingModal}
          onClose={() => setShowListingModal(false)}
        />
      )}
    </header>
  );
}