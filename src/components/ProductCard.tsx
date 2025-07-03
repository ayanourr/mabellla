import React from 'react';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { dispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const navigate = useNavigate();

  const isInWishlist = wishlistState.items.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_ITEM', payload: product.id });
    } else {
      wishlistDispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="card-luxury overflow-hidden group product-card cursor-pointer" onClick={handleCardClick}>
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover product-image"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            خصم {product.discount}%
          </div>
        )}

        {/* Bestseller Badge */}
        {product.bestseller && (
          <div className="absolute top-4 left-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            الأكثر مبيعاً
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-4 space-x-reverse">
            <button
              onClick={handleAddToCart}
              className="bg-white text-gray-800 p-3 rounded-full hover:bg-gold-500 hover:text-white transition-colors duration-300"
              title="أضف للسلة"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button 
              onClick={handleWishlistToggle}
              className={`p-3 rounded-full transition-colors duration-300 ${
                isInWishlist 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white text-gray-800 hover:bg-rose-500 hover:text-white'
              }`}
              title={isInWishlist ? 'إزالة من المفضلة' : 'أضف للمفضلة'}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
            {onQuickView && (
              <button
                onClick={handleQuickView}
                className="bg-white text-gray-800 p-3 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300"
                title="عرض سريع"
              >
                <Eye className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 space-x-reverse">
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

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
            product.inStock
              ? 'btn-primary'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.inStock ? 'أضف للسلة' : 'غير متوفر'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;