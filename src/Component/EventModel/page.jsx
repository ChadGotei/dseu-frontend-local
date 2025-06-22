import { useEffect, useRef, useState } from "react";
import imageToDispaly from "../../assets/DSEULogo/BANNER-DESIGN-7.jpg";

const Page = () => {
  const [isVisible, setIsVisible] = useState(true);
  const modalRef = useRef(null);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto"
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>
        <img
          src={imageToDispaly}
          alt="Event"
          className="rounded w-[350px] sm:w-[340px] md:w-[420px] lg:w-[500px]"
        />
      </div>
    </div>
  );
};

export default Page;
