import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, User, Heart, Crown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useCart();
  const { state: wishlistState } = useWishlist();
  const location = useLocation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-gold-100">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <img 
                src="/images/Untitled design.png" 
                alt="مابيلا - بوتيك الأناقة النسائية" 
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -top-1 -right-1">
                <Crown className="w-4 h-4 text-gold-500" />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12 space-x-reverse">
            <Link 
              to="/" 
              className={`font-medium text-lg transition-all duration-300 relative group ${
                isActive('/') 
                  ? 'text-gold-600' 
                  : 'text-gray-700 hover:text-gold-600'
              }`}
            >
              الرئيسية
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/products" 
              className={`font-medium text-lg transition-all duration-300 relative group ${
                isActive('/products') 
                  ? 'text-gold-600' 
                  : 'text-gray-700 hover:text-gold-600'
              }`}
            >
              مجموعاتنا الفاخرة
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <a href="/#categories" className="text-gray-700 hover:text-gold-600 font-medium text-lg transition-all duration-300 relative group">
              عالم الموضة
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/#about" className="text-gray-700 hover:text-gold-600 font-medium text-lg transition-all duration-300 relative group">
              قصتنا
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/#location" className="text-gray-700 hover:text-gold-600 font-medium text-lg transition-all duration-300 relative group">
              بوتيكنا
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-500 to-rose-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Luxury Search Bar */}
          <div className="hidden md:flex items-center bg-gradient-to-r from-gray-50 to-gold-50 rounded-full px-6 py-3 w-96 border border-gold-200 shadow-lg">
            <Search className="w-5 h-5 text-gold-500 ml-3" />
            <input
              type="text"
              placeholder="ابحثي عن قطعتك المثالية..."
              className="bg-transparent flex-1 outline-none text-right placeholder-gray-500 font-medium"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Luxury Action Icons */}
          <div className="flex items-center space-x-6 space-x-reverse">
            <Link 
              to="/wishlist"
              className="relative p-3 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 rounded-full transition-all duration-300 group"
            >
              <Heart className="w-6 h-6 text-gray-600 group-hover:text-rose-500 transition-colors" />
              {wishlistState.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {wishlistState.items.length}
                </span>
              )}
            </Link>
            
            <button className="p-3 hover:bg-gradient-to-r hover:from-gold-50 hover:to-yellow-50 rounded-full transition-all duration-300 group">
              <User className="w-6 h-6 text-gray-600 group-hover:text-gold-600 transition-colors" />
            </button>
            
            <Link 
              to="/bag"
              className="relative p-3 hover:bg-gradient-to-r hover:from-gold-50 hover:to-yellow-50 rounded-full transition-all duration-300 group"
            >
              <ShoppingBag className="w-6 h-6 text-gray-600 group-hover:text-gold-600 transition-colors" />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gold-500 to-yellow-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {state.items.length}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-3 hover:bg-gray-100 rounded-full transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gold-100 bg-gradient-to-b from-white to-gold-50">
            <div className="flex items-center bg-gradient-to-r from-gray-50 to-gold-50 rounded-full px-6 py-3 mb-6 border border-gold-200">
              <Search className="w-5 h-5 text-gold-500 ml-3" />
              <input
                type="text"
                placeholder="ابحثي عن قطعتك المثالية..."
                className="bg-transparent flex-1 outline-none text-right placeholder-gray-500"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <nav className="flex flex-col space-y-6">
              <Link 
                to="/" 
                className={`font-medium text-lg ${
                  isActive('/') 
                    ? 'text-gold-600' 
                    : 'text-gray-700 hover:text-gold-600'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link 
                to="/products" 
                className={`font-medium text-lg ${
                  isActive('/products') 
                    ? 'text-gold-600' 
                    : 'text-gray-700 hover:text-gold-600'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                مجموعاتنا الفاخرة
              </Link>
              <Link 
                to="/wishlist" 
                className={`font-medium text-lg ${
                  isActive('/wishlist') 
                    ? 'text-gold-600' 
                    : 'text-gray-700 hover:text-gold-600'
                } transition-colors flex items-center justify-between`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>مفضلاتي ({wishlistState.items.length})</span>
                <Heart className="w-5 h-5" />
              </Link>
              <Link 
                to="/bag" 
                className={`font-medium text-lg ${
                  isActive('/bag') 
                    ? 'text-gold-600' 
                    : 'text-gray-700 hover:text-gold-600'
                } transition-colors flex items-center justify-between`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>حقيبة التسوق ({state.items.length})</span>
                <ShoppingBag className="w-5 h-5" />
              </Link>
              <a href="/#categories" className="text-gray-700 hover:text-gold-600 font-medium text-lg transition-colors">عالم الموضة</a>
              <a href="/#about" className="text-gray-700 hover:text-gold-600 font-medium text-lg transition-colors">قصتنا</a>
              <a href="/#location" className="text-gray-700 hover:text-gold-600 font-medium text-lg transition-colors">بوتيكنا</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;