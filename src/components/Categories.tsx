import React from 'react';
import { categories } from '../data/products';
import { Crown, Sparkles } from 'lucide-react';

interface CategoriesProps {
  onCategorySelect: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  return (
    <section id="categories" className="py-24 bg-gradient-to-b from-gold-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent to-gold-500 w-24"></div>
            <Crown className="w-10 h-10 text-gold-500 mx-6" />
            <div className="h-px bg-gradient-to-l from-transparent to-gold-500 w-24"></div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-arabic-serif font-bold text-gray-800 mb-6">
            عالم <span className="text-gradient">الأناقة</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            اكتشفي مجموعاتنا الحصرية من الأزياء النسائية الفاخرة المصممة خصيصاً للمرأة العصرية المتميزة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => onCategorySelect(category.name)}
              className="group cursor-pointer relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="relative h-96 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Luxury Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gold-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating Sparkles */}
                <div className="absolute top-6 right-6 text-gold-400 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-gold-300 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <div className="w-16 h-1 bg-gradient-to-r from-gold-500 to-rose-500 group-hover:w-32 transition-all duration-500 mb-4"></div>
                  
                  <p className="text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    اكتشفي أحدث التصاميم الفاخرة
                  </p>
                </div>
                
                {/* Luxury Button */}
                <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 transform translate-y-4 group-hover:translate-y-0">
                  <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-gray-800 transition-all duration-300">
                    تصفحي المجموعة
                  </button>
                </div>
              </div>
              
              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-gold-400/20 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;