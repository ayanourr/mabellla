import React from 'react';
import { Filter, X } from 'lucide-react';
import { categories } from '../data/products';

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  showInStockOnly: boolean;
  onInStockChange: (inStock: boolean) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  showInStockOnly,
  onInStockChange,
  isOpen,
  onToggle,
}) => {
  const clearFilters = () => {
    onCategoryChange('');
    onPriceRangeChange([0, 2000]);
    onInStockChange(false);
  };

  return (
    <>
      {/* Filter Toggle Button */}
      <button
        onClick={onToggle}
        className="md:hidden flex items-center space-x-2 space-x-reverse bg-gold-500 text-white px-4 py-2 rounded-lg mb-4"
      >
        <Filter className="w-5 h-5" />
        <span>الفلاتر</span>
      </button>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block bg-white rounded-xl shadow-lg p-6 mb-8`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">تصفية المنتجات</h3>
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              مسح الفلاتر
            </button>
            <button
              onClick={onToggle}
              className="md:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">الفئة</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === ''}
                  onChange={() => onCategoryChange('')}
                  className="ml-2"
                />
                <span className="text-gray-600">جميع الفئات</span>
              </label>
              {categories.map((category) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.name}
                    onChange={() => onCategoryChange(category.name)}
                    className="ml-2"
                  />
                  <span className="text-gray-600">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">نطاق السعر</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="number"
                  placeholder="من"
                  value={priceRange[0]}
                  onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                />
                <span className="text-gray-500">إلى</span>
                <input
                  type="number"
                  placeholder="إلى"
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                />
                <span className="text-gray-500">ر.س</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => onPriceRangeChange([0, 500])}
                  className="block w-full text-right text-sm text-gray-600 hover:text-gold-600 transition-colors"
                >
                  أقل من 500 ر.س
                </button>
                <button
                  onClick={() => onPriceRangeChange([500, 1000])}
                  className="block w-full text-right text-sm text-gray-600 hover:text-gold-600 transition-colors"
                >
                  500 - 1000 ر.س
                </button>
                <button
                  onClick={() => onPriceRangeChange([1000, 2000])}
                  className="block w-full text-right text-sm text-gray-600 hover:text-gold-600 transition-colors"
                >
                  أكثر من 1000 ر.س
                </button>
              </div>
            </div>
          </div>

          {/* Availability Filter */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">التوفر</h4>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showInStockOnly}
                onChange={(e) => onInStockChange(e.target.checked)}
                className="ml-2"
              />
              <span className="text-gray-600">المنتجات المتوفرة فقط</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;