import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, User, Heart } from 'lucide-react';
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
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/images/Untitled design.png" 
              alt="مابيلا" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-gold-600' 
                  : 'text-gray-700 hover:text-gold-600'
              }`}
            >
              الرئيسية
            </Link>
            <Link 
              to="/products" 
              className={`font-medium transition-colors ${
                isActive('/products') 
                  ? 'text-gold-600' 
                  : 'text-gray-700 hover:text-gold-600'
              }`}
            >
              المنتجات
            </Link>
            <a href="/#categories" className="text-gray-700 hover:text-gold-600 font-medium transition-colors">الفئات</a>
            <a href="/#about" className="text-gray-700 hover:text-gold-600 font-medium transition-colors">من نحن</a>
            <a href="/#location" className="text-gray-700 hover:text-gold-600 font-medium transition-colors">موقعنا</a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">
            <Search className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              placeholder="ابحث عن المنتجات..."
              className="bg-transparent flex-1 outline-none text-right"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link 
              to="/wishlist"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart className="w-6 h-6 text-gray-600" />
              {wishlistState.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistState.items.length}
                </span>
              )}
            </Link>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-6 h-6 text-gray-600" />
            </button>
            <Link 
              to="/bag"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-gray-600" />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="ابحث عن المنتجات..."
                className="bg-transparent flex-1 outline-none text-right"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium ${
                  isActive('/') 
                    ? 'text-gold-600' 
                    : 'text-gray-700 hover:text-gold-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link 
                to="/products" 
                className={`font-medium ${
                  isActive('/products') 
                    ? 'text-gold-600' 
                    : 'text-gray-700 hover:text-gold-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                المنتجات
              </Link>
              <Link 
                to="/wishlist" 
                className={`font-medium ${
                  isActive('/wishlist') 
                    ? 'text-gold-600' 
                    : 'text-gray-700 hover:text-gold-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                المفضلة ({wishlistState.items.length})
              </Link>
              <Link 
                to="/bag" 
                className={`font-medium ${
                  isActive('/bag') 
                    ? 'text-gold-600' 
                    : 'text-gray-700 hover:text-gold-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                سلة التسوق ({state.items.length})
              </Link>
              <a href="/#categories" className="text-gray-700 hover:text-gold-600 font-medium">الفئات</a>
              <a href="/#about" className="text-gray-700 hover:text-gold-600 font-medium">من نحن</a>
              <a href="/#location" className="text-gray-700 hover:text-gold-600 font-medium">موقعنا</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;