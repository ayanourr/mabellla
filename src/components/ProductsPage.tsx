import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import ProductFilters from './ProductFilters';
import { products } from '../data/products';
import { Product } from '../types';

interface ProductsPageProps {
  searchQuery?: string;
  selectedCategory?: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ 
  searchQuery = '', 
  selectedCategory = '' 
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'newest'>('newest');

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(localSearchQuery.toLowerCase());
      const matchesCategory = !localSelectedCategory || product.category === localSelectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStock = !showInStockOnly || product.inStock;

      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });

    // Sort products
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        // Keep original order for newest
        break;
    }

    return filtered;
  }, [localSearchQuery, localSelectedCategory, priceRange, showInStockOnly, sortBy]);

  const clearFilters = () => {
    setLocalSearchQuery('');
    setLocalSelectedCategory('');
    setPriceRange([0, 2000]);
    setShowInStockOnly(false);
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-arabic-serif font-bold text-gray-800 mb-4">
            جميع المنتجات
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اكتشفي مجموعتنا الكاملة من الأزياء النسائية الفاخرة المصممة خصيصاً لك
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن المنتجات..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-gold-500 focus:border-transparent shadow-lg"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Filter className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              selectedCategory={localSelectedCategory}
              onCategoryChange={setLocalSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              showInStockOnly={showInStockOnly}
              onInStockChange={setShowInStockOnly}
              isOpen={isFiltersOpen}
              onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
            />
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Results Count */}
                <div className="flex items-center space-x-4 space-x-reverse">
                  <p className="text-gray-600">
                    عرض {filteredAndSortedProducts.length} من {products.length} منتج
                  </p>
                  {(localSearchQuery || localSelectedCategory || showInStockOnly || 
                    priceRange[0] > 0 || priceRange[1] < 2000) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gold-600 hover:text-gold-700 font-medium"
                    >
                      مسح جميع الفلاتر
                    </button>
                  )}
                </div>

                {/* View Controls */}
                <div className="flex items-center space-x-4 space-x-reverse">
                  {/* Sort Dropdown */}
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <ArrowUpDown className="w-5 h-5 text-gray-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    >
                      <option value="newest">الأحدث</option>
                      <option value="name">الاسم</option>
                      <option value="price-low">السعر: من الأقل للأعلى</option>
                      <option value="price-high">السعر: من الأعلى للأقل</option>
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-white text-gold-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-white text-gold-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="md:hidden flex items-center space-x-2 space-x-reverse bg-gold-500 text-white px-4 py-2 rounded-lg"
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                    <span>فلاتر</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }>
                {filteredAndSortedProducts.map((product) => (
                  <div key={product.id} className={viewMode === 'list' ? 'bg-white rounded-xl shadow-lg overflow-hidden' : ''}>
                    {viewMode === 'list' ? (
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 md:h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {product.name}
                              </h3>
                              <p className="text-gray-600 mb-4">
                                {product.description}
                              </p>
                            </div>
                            <div className="text-left">
                              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                                <span className="text-2xl font-bold text-gold-600">
                                  {product.price} ر.س
                                </span>
                                {product.originalPrice && (
                                  <span className="text-lg text-gray-400 line-through">
                                    {product.originalPrice} ر.س
                                  </span>
                                )}
                              </div>
                              <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                {product.inStock ? 'متوفر' : 'غير متوفر'}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              الفئة: {product.category}
                            </span>
                            <button
                              onClick={() => setSelectedProduct(product)}
                              className="btn-primary"
                            >
                              عرض التفاصيل
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <ProductCard
                        product={product}
                        onQuickView={setSelectedProduct}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-lg">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Filter className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    لم يتم العثور على منتجات
                  </h3>
                  <p className="text-gray-600 mb-6">
                    لم نجد أي منتجات تطابق معايير البحث الحالية. جرب تعديل الفلاتر أو البحث عن شيء آخر.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-primary"
                  >
                    مسح جميع الفلاتر
                  </button>
                </div>
              </div>
            )}

            {/* Load More Button (for future pagination) */}
            {filteredAndSortedProducts.length > 0 && filteredAndSortedProducts.length >= 12 && (
              <div className="text-center mt-12">
                <button className="btn-secondary">
                  عرض المزيد من المنتجات
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default ProductsPage;