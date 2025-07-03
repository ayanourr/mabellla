import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Plus, Minus, Star, ArrowLeft, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct || null);
      setIsLoading(false);
      
      // Set default selections
      if (foundProduct?.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
      if (foundProduct?.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">المنتج غير موجود</h2>
          <button onClick={() => navigate('/products')} className="btn-primary">
            العودة للمنتجات
          </button>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlistState.items.some(item => item.id === product.id);
  const images = product.images || [product.image];

  const handleAddToCart = () => {
    const productWithOptions = {
      ...product,
      selectedSize,
      selectedColor,
    };
    
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: productWithOptions });
    }
    
    // Show success message (you can implement a toast notification)
    alert('تم إضافة المنتج إلى السلة بنجاح!');
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_ITEM', payload: product.id });
    } else {
      wishlistDispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط المنتج!');
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-gold-600">الرئيسية</button>
            <span>/</span>
            <button onClick={() => navigate('/products')} className="hover:text-gold-600">المنتجات</button>
            <span>/</span>
            <span className="text-gray-800">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 right-4 space-y-2">
                {product.discount && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    خصم {product.discount}%
                  </div>
                )}
                {product.bestseller && (
                  <div className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    الأكثر مبيعاً
                  </div>
                )}
                {product.featured && (
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    مميز
                  </div>
                )}
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="absolute top-4 left-4 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2 space-x-reverse overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === index 
                        ? 'border-gold-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-arabic-serif font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < (product.rating || 4) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  ({product.reviewCount || 24} تقييم)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <span className="text-4xl font-bold text-gold-600">
                  {product.price} ر.س
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    {product.originalPrice} ر.س
                  </span>
                )}
                {product.discount && (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    وفري {product.originalPrice! - product.price} ر.س
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`text-sm font-medium ${
                  product.inStock ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.inStock 
                    ? `متوفر (${product.quantity} قطعة متبقية)` 
                    : 'غير متوفر حالياً'
                  }
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">وصف المنتج</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">اللون</h3>
                <div className="flex items-center space-x-3 space-x-reverse">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-4 transition-all ${
                        selectedColor === color 
                          ? 'border-gold-500 scale-110' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">اللون المختار: {selectedColor}</p>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">المقاس</h3>
                <div className="flex items-center space-x-3 space-x-reverse">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'border-gold-500 bg-gold-50 text-gold-700'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">الكمية</h3>
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.quantity}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-600">
                  المجموع: <span className="font-bold text-gold-600">{product.price * quantity} ر.س</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4 space-x-reverse">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    product.inStock
                      ? 'btn-primary'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-6 h-6" />
                  <span>{product.inStock ? 'أضف للسلة' : 'غير متوفر'}</span>
                </button>
                
                <button
                  onClick={handleWishlistToggle}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    isInWishlist
                      ? 'border-rose-500 bg-rose-50 text-rose-600'
                      : 'border-gray-300 text-gray-600 hover:border-rose-500 hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                disabled={!product.inStock}
                className="w-full py-4 px-6 bg-gray-800 text-white rounded-xl font-semibold text-lg hover:bg-gray-900 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                اشتري الآن
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-green-100 p-2 rounded-full">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">توصيل مجاني</p>
                  <p className="text-sm text-gray-600">للطلبات أكثر من 500 ر.س</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">ضمان الجودة</p>
                  <p className="text-sm text-gray-600">منتجات أصلية 100%</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-orange-100 p-2 rounded-full">
                  <RotateCcw className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">إرجاع مجاني</p>
                  <p className="text-sm text-gray-600">خلال 14 يوم</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-arabic-serif font-bold text-gray-800 mb-8 text-center">
            منتجات مشابهة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gold-600">
                        {relatedProduct.price} ر.س
                      </span>
                      <span className={`text-sm ${relatedProduct.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {relatedProduct.inStock ? 'متوفر' : 'غير متوفر'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;