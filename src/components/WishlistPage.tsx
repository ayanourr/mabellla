import React from 'react';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const WishlistPage: React.FC = () => {
  const { state, dispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();
  const navigate = useNavigate();

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const addToCart = (product: any) => {
    cartDispatch({ type: 'ADD_ITEM', payload: product });
    // Show success message
    alert('تم إضافة المنتج إلى السلة!');
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">قائمة الأمنيات فارغة</h2>
            <p className="text-gray-600 mb-8">
              لم تقومي بإضافة أي منتجات إلى قائمة الأمنيات بعد. ابدئي بتصفح منتجاتنا الرائعة!
            </p>
            <button
              onClick={() => navigate('/products')}
              className="btn-primary"
            >
              تصفح المنتجات
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-arabic-serif font-bold text-gray-800 mb-2">
              قائمة الأمنيات
            </h1>
            <p className="text-gray-600">
              لديك {state.items.length} منتج في قائمة الأمنيات
            </p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            مسح الكل
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.items.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>

                {/* Badges */}
                <div className="absolute top-3 left-3 space-y-1">
                  {product.discount && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      خصم {product.discount}%
                    </div>
                  )}
                  {product.bestseller && (
                    <div className="bg-gold-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      الأكثر مبيعاً
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4">
                <h3 
                  className="font-semibold text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-gold-600"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-lg font-bold text-gold-600">
                      {product.price} ر.س
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {product.originalPrice} ر.س
                      </span>
                    )}
                  </div>
                  <span className={`text-xs ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'متوفر' : 'غير متوفر'}
                  </span>
                </div>

                <div className="flex space-x-2 space-x-reverse">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center space-x-1 space-x-reverse py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      product.inStock
                        ? 'bg-gold-500 text-white hover:bg-gold-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>أضف للسلة</span>
                  </button>
                  
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gold-500 hover:text-gold-600 transition-all text-sm"
                  >
                    عرض
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;