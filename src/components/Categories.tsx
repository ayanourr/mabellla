import React from 'react';
import { categories } from '../data/products';

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-arabic-serif font-bold text-gray-800 mb-4">
            تسوقي حسب الفئة
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اكتشفي مجموعتنا المتنوعة من الأزياء النسائية الفاخرة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onCategorySelect(category.name)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="aspect-w-4 aspect-h-5">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
                  {category.name}
                </h3>
                <div className="w-12 h-1 bg-gold-500 group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;