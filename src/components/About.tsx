import React from 'react';
import { Award, Heart, Star, Users } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'جودة عالية',
      description: 'نختار أجود الأقمشة والخامات لضمان الراحة والأناقة'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'تصاميم مميزة',
      description: 'تصاميم حصرية تجمع بين الأصالة والعصرية'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'خدمة متميزة',
      description: 'نقدم أفضل خدمة عملاء لضمان رضاكم التام'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'ثقة العملاء',
      description: 'آلاف العميلات الراضيات عن منتجاتنا وخدماتنا'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-arabic-serif font-bold text-gray-800 mb-6">
              قصة <span className="text-gradient">مابيلا</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              مابيلا هو أكثر من مجرد متجر أزياء، إنه حلم تحقق ليصبح وجهة كل امرأة تبحث عن الأناقة والتميز. 
              بدأت رحلتنا من شغف عميق بالموضة والجمال، ورؤية واضحة لتقديم أزياء نسائية فاخرة تجمع بين 
              الأصالة العربية والتصاميم العصرية المعاصرة.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              نؤمن في مابيلا أن كل امرأة تستحق أن تشعر بالثقة والجمال، لذلك نحرص على انتقاء كل قطعة 
              بعناية فائقة لتناسب جميع المناسبات وتعكس شخصيتك المتميزة.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 space-x-reverse">
                  <div className="text-gold-500 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg"
                  alt="أزياء مابيلا"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
                <img
                  src="https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg"
                  alt="عبايات فاخرة"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg"
                  alt="بلوزات أنيقة"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
                <img
                  src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg"
                  alt="تنانير راقية"
                  className="w-full h-48 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold-200 rounded-full opacity-20 animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-rose-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;