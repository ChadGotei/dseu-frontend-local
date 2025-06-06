import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { newsItems } from '../../constants/NEWSITEM.JS';

const News = () => {
  const navigate = useNavigate();

  const CustomArrow = ({ direction, onClick }) => (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-20 ${
        direction === 'prev' ? 'left-2' : 'right-2'
      } w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 group`}
    >
      {direction === 'prev' ? (
        <ChevronLeft className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
      ) : (
        <ChevronRight className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
      )}
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    dotsClass: 'slick-dots !bottom-[-2rem]',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-5">
      <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-16">
        Latest News
        <div className="mt-2 mx-auto w-20 h-1 bg-blue-600 rounded"></div>
      </h2>
      <div className="relative pb-12">
        <Slider {...settings}>
          {newsItems.map((item) => (
            <div key={item.id} className="px-3 pb-4">
              <div
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-[400px]" 
              >
                <div className="relative h-1/2 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 h-1/2 flex flex-col justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Read more
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default News;
