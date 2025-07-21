import { useEffect, useRef, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

const Page = () => {
  const [isVisible, setIsVisible] = useState(false); // default: hidden
  const modalRef = useRef(null);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("admissionModalShown");
    if (!hasShown) {
      setIsVisible(true);
      sessionStorage.setItem("admissionModalShown", "true");
    }
  }, []);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-2xl p-6 w-[90%] max-w-xl mx-auto border border-blue-200"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <FiInfo className="text-xl" />
          </div>
          <h2 className="text-sm sm:text-xl font-semibold text-blue-700">
            <Link to="/admission">
              Important Update for AY 2025 Admissions
            </Link>
          </h2>
        </div>

        {/* Official Content */}
        <div className="text-gray-800 text-sm md:text-base leading-relaxed space-y-4">
          <p>Dear Students,</p>
          <p>
            We are pleased to announce that the <strong>first merit list</strong> for{" "}
            <strong>Diploma and Bachelor's programs</strong> will be released this week.
            The admission process will be conducted <strong>online</strong>. To stay updated, please check our website regularly.
          </p>
          <p className="mt-4 font-medium text-gray-600">Admission Team</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
