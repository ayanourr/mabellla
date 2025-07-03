import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
    onClose();
  };

  const increaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 md:h-full object-cover rounded-xl"
              />
              {product.discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  خصم {product.discount}%
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h2>

                <div className="flex items-center space-x-4 space-x-reverse mb-6">
                  <span className="text-3xl font-bold text-gold-600">
                    {product.price} ر.س
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      {product.originalPrice} ر.س
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <span className="text-sm text-gray-600">الفئة: </span>
                  <span className="text-sm font-semibold text-gold-600">
                    {product.category}
                  </span>
                </div>

                <div className="mb-6">
                  <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? `متوفر (${product.quantity} قطعة)` : 'غير متوفر'}
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Quantity Selector */}
                {product.inStock && (
                  <div className="flex items-center space-x-4 space-x-reverse mb-8">
                    <span className="text-gray-700 font-medium">الكمية:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={decreaseQuantity}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-semibold">{quantity}</span>
                      <button
                        onClick={increaseQuantity}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    product.inStock
                      ? 'btn-primary'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{product.inStock ? 'أضف للسلة' : 'غير متوفر'}</span>
                </button>
                <button className="flex items-center justify-center space-x-2 space-x-reverse py-3 px-6 border-2 border-rose-500 text-rose-600 rounded-lg font-semibold hover:bg-rose-500 hover:text-white transition-all duration-300">
                  <Heart className="w-5 h-5" />
                  <span>أضف للمفضلة</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;