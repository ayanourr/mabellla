import React from 'react';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin, Shield, Truck, RotateCcw } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/images/Untitled design.png" 
                alt="مابيلا" 
                className="h-12 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 leading-relaxed mb-8 max-w-md">
              مابيلا - وجهتك الأولى للأزياء النسائية الفاخرة. نقدم أجمل التصاميم التي تجمع بين الأناقة والراحة، 
              لتكوني دائماً في أبهى حلة.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gold-400 mb-4">اشتركي في النشرة الإخبارية</h3>
              <p className="text-gray-400 text-sm mb-4">احصلي على آخر العروض والمنتجات الجديدة</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="أدخلي بريدك الإلكتروني"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                />
                <button className="btn-primary px-6 py-3 whitespace-nowrap">
                  اشتراك
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-gold-400 mb-6">روابط سريعة</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 inline-block">الرئيسية</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 inline-block">جميع المنتجات</a></li>
              <li><a href="/#categories" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 inline-block">المجموعات</a></li>
              <li><a href="/#about" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 inline-block">من نحن</a></li>
              <li><a href="/wishlist" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 inline-block">المفضلة</a></li>
              <li><a href="/bag" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 inline-block">سلة التسوق</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold text-gold-400 mb-6">خدمة العملاء</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 inline-block">تتبع الطلب</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 inline-block">سياسة الإرجاع</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 inline-block">الشحن والتوصيل</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 inline-block">الأسئلة الشائعة</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 inline-block">اتصل بنا</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 inline-block">سياسة الخصوصية</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact & Social Section */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold text-gold-400 mb-6">تواصلي معنا</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="bg-gold-500 p-2 rounded-full">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium" dir="ltr">+966 50 000 0000</p>
                    <p className="text-gray-400 text-sm">متاح 24/7</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="bg-gold-500 p-2 rounded-full">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">info@mabella.com</p>
                    <p className="text-gray-400 text-sm">للاستفسارات والدعم</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="bg-gold-500 p-2 rounded-full mt-1">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">
                      شارع التحلية، حي الملز<br />
                      الرياض، المملكة العربية السعودية
                    </p>
                    <p className="text-gray-400 text-sm">زوري متجرنا</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center lg:text-right">
              <h3 className="text-xl font-bold text-gold-400 mb-6">تابعينا على</h3>
              <div className="flex justify-center lg:justify-end space-x-4 space-x-reverse mb-6">
                <a href="https://instagram.com/mabella" 
                   className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110 relative overflow-hidden group"
                   target="_blank" 
                   rel="noopener noreferrer">
                  <Instagram className="w-6 h-6 text-white relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a href="https://facebook.com/mabella" 
                   className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 relative overflow-hidden group"
                   target="_blank" 
                   rel="noopener noreferrer">
                  <Facebook className="w-6 h-6 text-white relative z-10" />
                  <div className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a href="https://twitter.com/mabella" 
                   className="bg-black hover:bg-gray-800 p-3 rounded-full transition-all duration-300 transform hover:scale-110 relative overflow-hidden group"
                   target="_blank" 
                   rel="noopener noreferrer">
                  <Twitter className="w-6 h-6 text-white relative z-10" />
                  <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a href="https://tiktok.com/@mabella" 
                   className="bg-black hover:bg-gray-800 p-3 rounded-full transition-all duration-300 transform hover:scale-110 relative overflow-hidden group"
                   target="_blank" 
                   rel="noopener noreferrer">
                  <svg className="w-6 h-6 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                  <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>

                <a href="https://wa.me/966500000000" 
                   className="bg-green-500 hover:bg-green-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110 relative overflow-hidden group"
                   target="_blank" 
                   rel="noopener noreferrer">
                  <svg className="w-6 h-6 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.085"/>
                  </svg>
                  <div className="absolute inset-0 bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
              
              <p className="text-gray-400 text-sm">
                تابعي آخر العروض والمنتجات الجديدة على حساباتنا الرسمية
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges & Payment */}
      <div className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Payment Methods */}
            <div className="text-center md:text-right">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">طرق الدفع المقبولة</h4>
              <div className="flex justify-center md:justify-start space-x-3 space-x-reverse">
                <div className="bg-white p-2 rounded shadow-sm">
                  <span className="text-xs font-bold text-blue-600">VISA</span>
                </div>
                <div className="bg-white p-2 rounded shadow-sm">
                  <span className="text-xs font-bold text-red-600">MASTER</span>
                </div>
                <div className="bg-white p-2 rounded shadow-sm">
                  <span className="text-xs font-bold text-green-600">MADA</span>
                </div>
                <div className="bg-white p-2 rounded shadow-sm">
                  <span className="text-xs font-bold text-purple-600">STC PAY</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="text-center">
              <div className="flex justify-center space-x-6 space-x-reverse">
                <div className="text-center">
                  <div className="bg-green-100 p-3 rounded-full mx-auto mb-2 w-12 h-12 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-400">دفع آمن</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 p-3 rounded-full mx-auto mb-2 w-12 h-12 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-400">شحن سريع</p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 p-3 rounded-full mx-auto mb-2 w-12 h-12 flex items-center justify-center">
                    <RotateCcw className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-xs text-gray-400">إرجاع مجاني</p>
                </div>
              </div>
            </div>

            {/* App Download */}
            <div className="text-center md:text-left">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">حملي التطبيق</h4>
              <div className="flex justify-center md:justify-start space-x-3 space-x-reverse">
                <a href="#" className="bg-black hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <div className="text-left">
                      <p className="text-xs text-gray-400">Download on the</p>
                      <p className="text-sm font-semibold text-white">App Store</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-900 border-t border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 مابيلا. جميع الحقوق محفوظة.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                تطوير وتصميم: <span className="text-gold-400 font-medium">آية التميمي</span>
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 space-x-reverse text-sm">
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">سياسة الخصوصية</a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">شروط الاستخدام</a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">سياسة الإرجاع</a>
              <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">سياسة الشحن</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;