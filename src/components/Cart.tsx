import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Phone, MapPin, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart();
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
    
    // Clear cart and close
    dispatch({ type: 'CLEAR_CART' });
    setShowCheckout(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">سلة التسوق</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {!showCheckout ? (
          <>
            {/* Cart Items */}
            <div className="flex-1 p-6">
              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">سلة التسوق فارغة</p>
                  <p className="text-gray-400 text-sm mt-2">أضف بعض المنتجات لتبدأ التسوق</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4 space-x-reverse bg-gray-50 rounded-lg p-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {item.product.name}
                        </h3>
                        <p className="text-gold-600 font-bold">
                          {item.product.price} ر.س
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1 hover:bg-red-100 text-red-500 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {state.items.length > 0 && (
              <div className="border-t p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-800">المجموع:</span>
                  <span className="text-2xl font-bold text-gold-600">
                    {state.total} ر.س
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary"
                >
                  إتمام الطلب
                </button>
                <p className="text-center text-sm text-gray-500 mt-2">
                  الدفع عند الاستلام
                </p>
              </div>
            )}
          </>
        ) : (
          /* Checkout Form */
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">معلومات التوصيل</h3>
            <form onSubmit={handleOrderSubmit} className="space-y-4">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
                <select
                  required
                  value={customerInfo.city}
                  onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="">اختر المدينة</option>
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                  <option value="الدمام">الدمام</option>
                  <option value="مكة">مكة</option>
                  <option value="المدينة">المدينة</option>
                </select>
              </div>

              <div className="border-t pt-4 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-800">المجموع:</span>
                  <span className="text-xl font-bold text-gold-600">
                    {state.total} ر.س
                  </span>
                </div>
                <div className="flex space-x-4 space-x-reverse">
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 btn-secondary"
                  >
                    رجوع
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    تأكيد الطلب
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;