import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import imageToDispaly from "../../assets/DSEULogo/BANNER-DESIGN-7.jpg";

const location = 'https://www.google.com/maps/place/DSEU+Wazirpur-I+Campus+%26+DSEU+Okhla-II+Campus/@28.7007126,77.165031,270m/data=!3m1!1e3!4m6!3m5!1s0x390d022484bf6f49:0xe9aeece4d5bbbbc8!8m2!3d28.700841!4d77.1649905!16s%2Fm%2F0115kn0c?entry=ttu&g_ep=EgoyMDI1MDYxNy4wIKXMDSoASAFQAw%3D%3D';

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
          className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-2xl font-bold z-50"
        >
          &times;
        </button>

        {/* Image wrapper to position icon over it */}
        <div className="relative inline-block">
          <img
            src={imageToDispaly}
            alt="Event"
            className="rounded w-[280px] sm:w-[340px] md:w-[420px] lg:w-[500px]"
          />

          {/* Location icon overlay (bottom-right corner) */}
          <a
            href={location}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-1"
            title="View Location on Map"
          >
            <MapPin className="text-red-600 w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
