import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import dseuPic1 from "../../assets/BannerImg/dseuPic1.jpg";
import banner from "../../assets/DSEULogo/Banner.jpg";
import admissionbanner from "../../assets/BannerImg/admissionBanner.jpg";
import Image6 from "../../assets/DSEULogo/BANNER-DESIGN-1.jpg";
import Banner3 from "../../assets/DSEULogo/BANNER-DESIGN-3.jpg";
import Banner4 from "../../assets/DSEULogo/BANNER-DESIGN-4.jpg";
import Banner5 from "../../assets/DSEULogo/BANNER-DESIGN-5.jpg";
import Banner6 from "../../assets/DSEULogo/BANNER-DESIGN-9.jpg";
import TirangaImage from '../../assets/DSEULogo/BANNER-DESIGN-8.png'
import Image7 from "../../assets/7.png";

const HomeBody = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { image: TirangaImage },
    // { image: Banner6 },
    { image: admissionbanner },
    { image: dseuPic1 },
    { image: banner },
    { image: Image6 },
    { image: Image7 },
    { image: Banner3 },
    { image: Banner4 },
    { image: Banner5 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[20vh] sm:h-[40vh] md:h-[60vh] lg:h-[80vh]">
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${index === currentIndex ? "translate-x-0" : "translate-x-full"
              }`}
            style={{
              transform: `translateX(${100 * (index - currentIndex)}%)`,
            }}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className={`w-full h-full brightness-110 contrast-105 ${slide.image === admissionbanner || slide.image === TirangaImage || slide.image === Banner6
                ? "object-contain"
                : "object-cover"
                }`}
            />
          </div>
        ))}

        <button
          onClick={goToPrevious}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-white/50 p-1 md:p-2 rounded-full hover:bg-white/75 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-white/50 p-1 md:p-2 rounded-full hover:bg-white/75 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${currentIndex === index ? "bg-white" : "bg-white/50"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
