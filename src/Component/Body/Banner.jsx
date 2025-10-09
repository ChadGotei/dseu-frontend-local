import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import dseuPic1 from "../../assets/BannerImg/dseuPic1.jpg";
import banner from "../../assets/DSEULogo/Banner.jpg";
import Image6 from "../../assets/DSEULogo/BANNER-DESIGN-1.jpg";
import Banner3 from "../../assets/DSEULogo/BANNER-DESIGN-3.jpg";
import Banner4 from "../../assets/DSEULogo/BANNER-DESIGN-4.jpg";
import Banner5 from "../../assets/DSEULogo/BANNER-DESIGN-5.jpg";
import Image7 from "../../assets/7.png";
import fd1 from "../../assets/BannerImg/foundationday2.jpg";
import fd2 from "../../assets/BannerImg/foundationday3.jpg";
import fd3 from "../../assets/BannerImg/foundationday4.jpg";
import fd4 from "../../assets/BannerImg/foundationday5.jpg";

const HomeBody = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { image: fd2, size: "cover" },
    { image: fd4, size: "cover" },
    { image: fd1, size: "cover" },
    { image: fd3, size: "cover" },
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
      setCurrentIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  // Dynamically decide the mobile height based on slide.size
  const currentSlide = slides[currentIndex];
  const mobileHeightClass =
    currentSlide?.size === "cover" ? "h-[40vh]" : "h-[20vh]";

  return (
    <div
      className={`relative w-full ${mobileHeightClass} sm:h-[40vh] md:h-[60vh] lg:h-[80vh] transition-all duration-500`}
    >
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute w-full h-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${100 * (index - currentIndex)}%)`,
            }}
          >
            {/* background blur layer for 'cover' */}
            {slide.size === "cover" && (
              <div
                className="absolute inset-0 bg-center bg-cover blur-xl scale-105 brightness-75"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            )}

            {/* main image */}
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className={`relative z-10 w-full h-full ${
                slide.size === "cover" ? "object-contain" : "object-cover"
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
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                currentIndex === index ? "bg-white" : "bg-white/50"
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
