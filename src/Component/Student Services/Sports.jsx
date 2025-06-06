import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeadingText from "../Reusable/HeadingText";
import { SPORTS } from "../../constants/SPORTS.JS";
import {
  sports0, sports1, sports2, sports3, sports4, sports5,
  sports6, sports7, sports8, sports9, sports10, sports11, sports12, sports13
} from "../../assets/sports";

const Sport = () => {
  const images = [
    sports0, sports1, sports2, sports3, sports4, sports5,
    sports6, sports7, sports8, sports9, sports10, sports12, sports13,
  ];
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000); 

    return () => clearInterval(interval); 
  }, [total]);

  return (
    <div className="w-full mt-2 flex flex-col items-center justify-center md:my-6 mb-16 md:mb-6 relative">

      <div className="relative md:w-[75%] w-full max-h-[250px] md:rounded-2xl overflow-hidden shadow-lg">
        <img
          src={sports11}
          alt="Sports Banner"
          className="w-full h-full object-cover brightness-75"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-semibold text-center drop-shadow-2xl px-2">
            {SPORTS.title}
          </h1>
        </div>
      </div>

     
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          {SPORTS.content.map((para, index) => (
            <p
              key={index}
              className="text-lg text-gray-600 mt-4 text-justify leading-relaxed"
            >
              {para}
            </p>
          ))}
        </motion.div>
      </div>

      <div className="w-[80%] px-4 py-10 flex flex-col items-center">
      <HeadingText
            heading="Sports Highlights"
            headingCN="text-3xl font-semibold mb-2 text-center"
          />
        <div className="relative mt-5 w-full md:max-w-full overflow-hidden rounded-xl shadow-md">
          <img
            src={images[current]}
            alt={`Sports ${current + 1}`}
            className="w-full md:h-[400px] h-[250px] md:object-cover object-cover transition-all duration-500"
          />

      
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow"
          >
            &#8592;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow"
          >
            &#8594;
          </button>
        </div>


        <div className="flex gap-2 mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 w-2 rounded-full ${current === idx ? "bg-blue-600" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sport;
