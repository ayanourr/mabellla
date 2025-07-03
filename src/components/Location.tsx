import React from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const Location: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-arabic-serif font-bold text-gray-800 mb-4">
            زوري متجرنا
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نرحب بزيارتك لمتجرنا لتجربة منتجاتنا الفاخرة بنفسك
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Store Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">معلومات المتجر</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-gold-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">العنوان</h4>
                    <p className="text-gray-600">
                      شارع التحلية، حي الملز<br />
                      الرياض، المملكة العربية السعودية
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-gold-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">الهاتف</h4>
                    <p className="text-gray-600" dir="ltr">+966 50 000 0000</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-gold-100 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">ساعات العمل</h4>
                    <div className="text-gray-600 space-y-1">
                      <p>السبت - الخميس: 10:00 ص - 10:00 م</p>
                      <p>الجمعة: 2:00 م - 10:00 م</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="bg-gold-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">البريد الإلكتروني</h4>
                    <p className="text-gray-600">info@mabella.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full btn-primary">
                  احصلي على الاتجاهات
                </button>
              </div>
            </div>
          </div>

          {/* Store Video/Map */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://player.vimeo.com/video/371433846?autoplay=1&loop=1&muted=1"
                  className="w-full h-96 object-cover"
                  title="موقع متجر مابيلا"
                  allow="autoplay; fullscreen"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  جولة افتراضية في متجرنا
                </h3>
                <p className="text-gray-600">
                  شاهدي متجرنا الأنيق وتصميمه الفاخر قبل زيارتك
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-gold-200 to-gold-300 rounded-full opacity-20 animate-float"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-rose-200 to-rose-300 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;