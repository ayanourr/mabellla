import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'video',
      src: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761',
      title: 'مجموعة الخريف الجديدة',
      subtitle: 'اكتشفي أحدث صيحات الموضة',
    },
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg',
      title: 'فساتين السهرة الفاخرة',
      subtitle: 'تألقي في كل مناسبة',
    },
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
      title: 'عبايات راقية وأنيقة',
      subtitle: 'الأناقة تلتقي بالأصالة',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
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
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
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
              <div className="absolute inset-0 video-overlay"></div>
            </div>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.src})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-arabic-serif font-bold mb-6 hero-text">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 hero-text">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary">
                  تسوقي الآن
                </button>
                <button className="btn-secondary bg-white bg-opacity-20 border-white text-white hover:bg-white hover:text-gray-800">
                  اكتشفي المجموعة
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;