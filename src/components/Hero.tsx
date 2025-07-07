import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Crown } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'video',
      src: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761',
      title: 'مجموعة الخريف الاستثنائية',
      subtitle: 'اكتشفي عالماً من الأناقة والرقي',
      description: 'قطع مصممة خصيصاً للمرأة العصرية التي تقدر الجمال والتميز',
    },
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg',
      title: 'فساتين السهرة الملكية',
      subtitle: 'تألقي كالملكات في كل مناسبة',
      description: 'تصاميم حصرية تجمع بين الفخامة والأناقة المعاصرة',
    },
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
      title: 'عبايات الأناقة الخالدة',
      subtitle: 'حيث تلتقي الأصالة بالعصرية',
      description: 'قطع فنية تعكس جمال المرأة العربية وثقافتها الراقية',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          {slide.type === 'video' ? (
            <div className="relative w-full h-full">
              <video
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              >
                <source src={slide.src} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.src})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6 max-w-4xl animate-fade-in">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-gold-400 mx-2 animate-pulse" />
                <Crown className="w-10 h-10 text-gold-400" />
                <Sparkles className="w-8 h-8 text-gold-400 mx-2 animate-pulse" />
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-arabic-serif font-bold mb-6 hero-text leading-tight">
                {slide.title}
              </h1>
              
              <p className="text-2xl md:text-3xl mb-4 hero-text font-light">
                {slide.subtitle}
              </p>
              
              <p className="text-lg md:text-xl mb-10 hero-text opacity-90 max-w-2xl mx-auto leading-relaxed">
                {slide.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative overflow-hidden bg-gradient-to-r from-gold-500 to-gold-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:from-gold-600 hover:to-gold-700 hover:shadow-2xl transform hover:-translate-y-1">
                  <span className="relative z-10">اكتشفي المجموعة</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button className="group bg-white/20 backdrop-blur-md border-2 border-white/50 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:-translate-y-1">
                  <span className="flex items-center justify-center">
                    <Crown className="w-5 h-5 ml-2" />
                    تسوقي الآن
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Luxury Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 border border-white/30 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 border border-white/30 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Elegant Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4 space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide 
                ? 'w-12 h-3 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full' 
                : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-gold-400 rounded-full opacity-60 animate-float"></div>
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-rose-400 rounded-full opacity-40 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full opacity-80 animate-float" style={{animationDelay: '4s'}}></div>
    </section>
  );
};

export default Hero;