import { useEffect, useRef, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const [isVisible, setIsVisible] = useState(true); // Show modal by default in dev mode
  const modalRef = useRef(null);
  const navigate = useNavigate();

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
        className="relative bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-lg mx-auto border border-yellow-300"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-orange-500 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <FiAlertCircle className="text-xl" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-blue-500">
            Diploma Admission Result Declared
          </h2>
        </div>

        {/* Message Content */}
        <div className="text-gray-700 text-base leading-relaxed space-y-4">
          <p>
            The results for <span className="font-medium">Diploma Admissions</span> are now available. You can now check the{" "}
            <span className="font-semibold text-green-700">seat allocated</span> to you.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => navigate("/admission/result")}
            className="bg-blue-600 hover:bg-green-500 text-white font-medium px-5 py-2 rounded-lg shadow transition duration-300"
          >
            Check Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
