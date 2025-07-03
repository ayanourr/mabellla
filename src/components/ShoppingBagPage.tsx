import React, { useState } from 'react';
import { Plus, Minus, X, ShoppingBag, Heart, ArrowLeft, Truck, Shield, RotateCcw, Phone, MapPin, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ShoppingBagPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleCheckout = () => {
    if (state.items.length === 0) return;
    setShowCheckout(true);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const orderDetails = state.items.map(item => 
      `${item.product.name} - الكمية: ${item.quantity} - السعر: ${item.product.price * item.quantity} ر.س`
    ).join('\n');
    
    const message = `طلب جديد من مابيلا:
    
الاسم: ${customerInfo.name}
الهاتف: ${customerInfo.phone}
العنوان: ${customerInfo.address}
المدينة: ${customerInfo.city}

تفاصيل الطلب:
${orderDetails}

المجموع الكلي: ${state.total} ر.س

طريقة الدفع: الدفع عند الاستلام`;

    const whatsappUrl = `https://wa.me/966500000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and redirect
    dispatch({ type: 'CLEAR_CART' });
    setShowCheckout(false);
    navigate('/');
  };

  const increaseQuantity = (id: string, currentQuantity: number, maxQuantity: number) => {
    if (currentQuantity < maxQuantity) {
      updateQuantity(id, currentQuantity + 1);
    }
  };

  const decreaseQuantity = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Checkout Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => setShowCheckout(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-4"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-arabic-serif font-bold text-gray-800">
              إتمام الطلب
            </h1>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">ملخص الطلب</h2>
            <div className="space-y-3">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-gray-500">الكمية: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-gold-600">
                    {item.product.price * item.quantity} ر.س
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between text-xl font-bold">
                <span className="text-gray-800">المجموع الكلي:</span>
                <span className="text-gold-600">{state.total} ر.س</span>
              </div>
            </div>
          </div>

          {/* Customer Information Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">معلومات التوصيل</h2>
            <form onSubmit={handleOrderSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline ml-1" />
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline ml-1" />
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                  placeholder="05xxxxxxxx"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline ml-1" />
                  العنوان التفصيلي
                </label>
                <textarea
                  required
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                  rows={3}
                  placeholder="أدخل عنوانك التفصيلي"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
                <select
                  required
                  value={customerInfo.city}
                  onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                >
                  <option value="">اختر المدينة</option>
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                  <option value="الدمام">الدمام</option>
                  <option value="مكة">مكة</option>
                  <option value="المدينة">المدينة</option>
                  <option value="الطائف">الطائف</option>
                  <option value="تبوك">تبوك</option>
                  <option value="بريدة">بريدة</option>
                  <option value="خميس مشيط">خميس مشيط</option>
                  <option value="حائل">حائل</option>
                </select>
              </div>

              <div className="bg-gold-50 border border-gold-200 rounded-xl p-4">
                <h3 className="font-semibold text-gold-800 mb-2">طريقة الدفع</h3>
                <p className="text-gold-700 text-sm">الدفع عند الاستلام - ادفع نقداً عند وصول طلبك</p>
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-4 text-lg"
              >
                تأكيد الطلب وإرسال عبر واتساب
              </button>
            </form>
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
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-4xl font-arabic-serif font-bold text-gray-800">
                سلة التسوق
              </h1>
              <p className="text-gray-600 mt-1">
                {state.items.length > 0 
                  ? `لديك ${state.items.length} منتج في السلة`
                  : 'سلة التسوق فارغة'
                }
              </p>
            </div>
          </div>
          
          {state.items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              مسح الكل
            </button>
          )}
        </div>

        {state.items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">سلة التسوق فارغة</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              لم تقومي بإضافة أي منتجات إلى سلة التسوق بعد. ابدئي بتصفح منتجاتنا الرائعة واختاري ما يناسبك!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/products')}
                className="btn-primary"
              >
                تصفح المنتجات
              </button>
              <button
                onClick={() => navigate('/wishlist')}
                className="btn-secondary flex items-center justify-center space-x-2 space-x-reverse"
              >
                <Heart className="w-5 h-5" />
                <span>عرض المفضلة</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {state.items.map((item) => (
                <div key={item.product.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-6 space-x-reverse">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => navigate(`/product/${item.product.id}`)}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 
                            className="text-lg lg:text-xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-gold-600 transition-colors"
                            onClick={() => navigate(`/product/${item.product.id}`)}
                          >
                            {item.product.name}
                          </h3>
                          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600 mb-2">
                            {item.product.selectedColor && (
                              <span>اللون: {item.product.selectedColor}</span>
                            )}
                            {item.product.selectedSize && (
                              <span>المقاس: {item.product.selectedSize}</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <span className="text-2xl font-bold text-gold-600">
                              {item.product.price} ر.س
                            </span>
                            {item.product.originalPrice && (
                              <span className="text-lg text-gray-400 line-through">
                                {item.product.originalPrice} ر.س
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 hover:bg-red-100 text-red-500 rounded-full transition-colors"
                          title="إزالة من السلة"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <span className="text-gray-700 font-medium">الكمية:</span>
                          <div className="flex items-center border-2 border-gray-300 rounded-lg">
                            <button
                              onClick={() => decreaseQuantity(item.product.id, item.quantity)}
                              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-bold text-lg min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item.product.id, item.quantity, item.product.quantity)}
                              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity >= item.product.quantity}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-left">
                          <p className="text-sm text-gray-500">المجموع الفرعي</p>
                          <p className="text-xl font-bold text-gray-800">
                            {item.product.price * item.quantity} ر.س
                          </p>
                        </div>
                      </div>

                      {/* Stock Warning */}
                      {item.quantity >= item.product.quantity && (
                        <div className="mt-3 p-2 bg-orange-100 border border-orange-200 rounded-lg">
                          <p className="text-orange-700 text-sm">
                            وصلت للحد الأقصى المتاح ({item.product.quantity} قطع)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">ملخص الطلب</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">المجموع الفرعي:</span>
                    <span className="font-semibold">{state.total} ر.س</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">الشحن:</span>
                    <span className="font-semibold text-green-600">مجاني</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-xl font-bold">
                      <span className="text-gray-800">المجموع الكلي:</span>
                      <span className="text-gold-600">{state.total} ر.س</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary py-4 text-lg mb-4"
                >
                  إتمام الطلب
                </button>

                <button
                  onClick={() => navigate('/products')}
                  className="w-full btn-secondary py-3"
                >
                  متابعة التسوق
                </button>

                {/* Features */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Truck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">شحن مجاني</p>
                      <p className="text-sm text-gray-600">لجميع الطلبات</p>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingBagPage;