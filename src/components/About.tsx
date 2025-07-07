import React from 'react';
import { Award, Heart, Star, Users, Crown, Sparkles, Diamond } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Diamond className="w-8 h-8" />,
      title: 'جودة استثنائية',
      description: 'نختار أرقى الأقمشة والخامات العالمية لضمان الفخامة والراحة المطلقة'
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: 'تصاميم حصرية',
      description: 'إبداعات فنية مميزة تجمع بين الأصالة العربية والموضة العالمية'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'خدمة ملكية',
      description: 'تجربة تسوق فاخرة مع استشارة شخصية لكل عميلة مميزة'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'ثقة العميلات',
      description: 'آلاف السيدات المميزات اخترن مابيلا كوجهتهن للأناقة والتميز'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-gold-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <div className="animate-slide-up">
            <div className="flex items-center mb-8">
              <Crown className="w-12 h-12 text-gold-500 ml-4" />
              <div className="h-px bg-gradient-to-r from-gold-500 to-transparent flex-1"></div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-arabic-serif font-bold text-gray-800 mb-8 leading-tight">
              حكاية <span className="text-gradient">مابيلا</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-12">
              <p className="font-medium">
                مابيلا ليس مجرد بوتيك أزياء، بل هو <span className="text-gold-600 font-semibold">حلم تحقق</span> ليصبح 
                ملاذ كل امرأة تبحث عن الأناقة الحقيقية والتميز الاستثنائي.
              </p>
              
              <p>
                بدأت رحلتنا من <span className="text-rose-600 font-semibold">شغف عميق</span> بعالم الموضة والجمال، 
                ورؤية واضحة لتقديم أزياء نسائية فاخرة تجمع بين عراقة التراث العربي وروعة التصاميم العالمية المعاصرة.
              </p>
              
              <p>
                نؤمن في مابيلا أن كل امرأة تستحق أن تشعر بـ<span className="text-gold-600 font-semibold">الثقة والجمال المطلق</span>، 
                لذلك نحرص على انتقاء كل قطعة بعناية فائقة لتناسب جميع المناسبات وتعكس شخصيتك الفريدة.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group">
                  <div className="flex items-start space-x-4 space-x-reverse p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="text-gold-500 mt-1 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2 text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="group relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg"
                    alt="أزياء مابيلا الفاخرة"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="group relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg"
                    alt="عبايات فاخرة"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="group relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg"
                    alt="بلوزات أنيقة"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="group relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg"
                    alt="تنانير راقية"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
            
            {/* Luxury Floating Elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-gold-200 to-gold-300 rounded-full opacity-30 animate-float blur-sm"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-rose-200 to-rose-300 rounded-full opacity-30 animate-float blur-sm" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 -left-4 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-20 animate-float blur-sm" style={{animationDelay: '4s'}}></div>
            
            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 text-gold-400 opacity-60">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div className="absolute bottom-20 right-20 text-rose-400 opacity-60">
              <Diamond className="w-4 h-4 animate-pulse" style={{animationDelay: '1s'}} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;