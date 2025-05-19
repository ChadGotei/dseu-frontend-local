import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMemo } from "react";

const PlacementCarousel = ({ images = [], heading }) => {
  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
    >
      <ChevronLeft className="h-6 w-6 text-blue-600" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
    >
      <ChevronRight className="h-6 w-6 text-blue-600" />
    </button>
  );

  const renderedSlides = useMemo(() => {
    {
      return images.map((item, index) => (
        <div key={index} className="px-2">
          <div className="bg-white rounded-lg shadow-md p-4 h-48 flex flex-col items-center justify-center transition-transform hover:scale-105 hover:shadow-xl">
            <img
              src={item.src || "/fallback-image.png"}
              alt={item.id || `Image ${index + 1}`}
              className="h-24 object-contain"
            />
            {item.data && (
              <p className="text-center text-gray-700 font-semibold mt-2">
                {item.data}
              </p>
            )}
          </div>
        </div>
      ));
    }
  }, [images]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full py-8 pt-5">
      <div className="relative px-4 md:px-8">
        {images.length > 0 ? (
          <Slider {...settings}>{renderedSlides}</Slider>
        ) : (
          <p className="text-center text-gray-500">
            No placement data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default PlacementCarousel;
