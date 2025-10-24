import { useState, useEffect } from "react";
import { allImages } from "../../constants/STUDENTEVENTS.JS";
import { videoData } from "../../constants/STUDENTEVENTS.JS";
import { priorityVideo } from "../../constants/STUDENTEVENTS.JS";

const getRandomImages = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const StudentEvents = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselImages, setCarouselImages] = useState([]);
  const [randomVideos, setRandomVideos] = useState([]);

  // Load images and videos once
  useEffect(() => {
    setCarouselImages(allImages);

    const otherVideos = getRandomImages(videoData, 3).filter(
      (v) => v.link !== priorityVideo.link
    );
    setRandomVideos([priorityVideo, ...otherVideos.slice(0, 3)]);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [carouselImages]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Carousel Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-800 border-l-4 border-blue-800 pl-3">
            STUDENT EVENTS & ACTIVITIES
          </h2>

          <div className="relative overflow-hidden rounded-lg h-[400px]">
            {/* Slides */}
            {carouselImages.map((img, index) => (
              <div
                key={index}
                className="absolute w-full h-full transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(${(index - currentSlide) * 100}%)`,
                }}
              >
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Prev Button */}
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? carouselImages.length - 1 : prev - 1
                )
              }
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white text-2xl p-2 rounded-full hover:bg-black/60 transition"
            >
              ❮
            </button>

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === carouselImages.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white text-2xl p-2 rounded-full hover:bg-black/60 transition"
            >
              ❯
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentSlide ? "bg-white" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Video Grid Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-800 border-l-4 border-blue-800 pl-3">
            VOICE OF DSEU
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {randomVideos.map((video, index) => (
              <button
                key={index}
                className="relative overflow-hidden rounded-lg group h-[190px]"
                onClick={() => window.open(video.link, "_blank")}
              >
                <img
                  src={video.thumbnail}
                  alt={`Video ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="text-white">
                    <h3 className="font-semibold text-lg">{video.title}</h3>
                    <p className="text-sm">{video.subheading}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEvents;
