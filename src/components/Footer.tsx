import React from 'react';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
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
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              مابيلا - وجهتك الأولى للأزياء النسائية الفاخرة. نقدم أجمل التصاميم التي تجمع بين الأناقة والراحة، 
              لتكوني دائماً في أبهى حلة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="bg-gold-600 hover:bg-gold-700 p-3 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gold-600 hover:bg-gold-700 p-3 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gold-600 hover:bg-gold-700 p-3 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">روابط سريعة</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-gold-400 transition-colors">الرئيسية</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-gold-400 transition-colors">المنتجات</a></li>
              <li><a href="#categories" className="text-gray-300 hover:text-gold-400 transition-colors">الفئات</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-gold-400 transition-colors">من نحن</a></li>
              <li><a href="#location" className="text-gray-300 hover:text-gold-400 transition-colors">موقعنا</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">تواصلي معنا</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="w-5 h-5 text-gold-400" />
                <span className="text-gray-300" dir="ltr">+966 50 000 0000</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="w-5 h-5 text-gold-400" />
                <span className="text-gray-300">info@mabella.com</span>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <MapPin className="w-5 h-5 text-gold-400 mt-1" />
                <span className="text-gray-300">
                  شارع التحلية، حي الملز<br />
                  الرياض، المملكة العربية السعودية
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 مابيلا. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                شروط الاستخدام
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-400 text-sm transition-colors">
                سياسة الإرجاع
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;