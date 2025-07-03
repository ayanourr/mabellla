import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import ProductFilters from './components/ProductFilters';
import Categories from './components/Categories';
import About from './components/About';
import Location from './components/Location';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProductsPage from './components/ProductsPage';
import ProductDetailPage from './components/ProductDetailPage';
import WishlistPage from './components/WishlistPage';
import ShoppingBagPage from './components/ShoppingBagPage';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { products } from './data/products';
import { Product } from './types';

// Home Page Component
const HomePage: React.FC<{
  onCategorySelect: (category: string) => void;
  searchQuery: string;
}> = ({ onCategorySelect, searchQuery }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Get featured and bestseller products
  const featuredProducts = products.filter(product => product.featured);
  const bestsellerProducts = products.filter(product => product.bestseller);

  return (
    <>
      <Hero />
      
      <Categories onCategorySelect={onCategorySelect} />

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-arabic-serif font-bold text-gray-800 mb-4">
                المنتجات المميزة
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                اكتشفي أحدث وأجمل قطعنا المختارة بعناية خاصة لك
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bestsellers Section */}
      {bestsellerProducts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-arabic-serif font-bold text-gray-800 mb-4">
                الأكثر مبيعاً
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                القطع التي أحبتها عميلاتنا أكثر من غيرها
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bestsellerProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <About />
      <Location />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategorySelect = (category: string) => {
    // Navigate to products page with category filter
    window.location.href = `/products?category=${encodeURIComponent(category)}`;
  };

  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header 
              onCartClick={() => setIsCartOpen(true)}
              onSearchChange={setSearchQuery}
            />
            
            <Routes>
              <Route 
                path="/" 
                element={
                  <HomePage 
                    onCategorySelect={handleCategorySelect}
                    searchQuery={searchQuery}
                  />
                } 
              />
              <Route 
                path="/products" 
                element={
                  <ProductsPage 
                    searchQuery={searchQuery}
                  />
                } 
              />
              <Route 
                path="/product/:id" 
                element={<ProductDetailPage />} 
              />
              <Route 
                path="/wishlist" 
                element={<WishlistPage />} 
              />
              <Route 
                path="/bag" 
                element={<ShoppingBagPage />} 
              />
            </Routes>

            <Footer />

            {/* Cart Modal */}
            <Cart
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            />
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;