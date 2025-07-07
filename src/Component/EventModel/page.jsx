import { useEffect, useRef, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

const Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);

  // Show modal once per session
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenCorrectionAndPGModal");
    if (!hasSeenModal) {
      setIsVisible(true);
      sessionStorage.setItem("hasSeenCorrectionAndPGModal", "true");
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  // Close modal on outside click
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
          <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
            <FiAlertCircle className="text-xl" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-yellow-800">
            Admission Update: UG/Diploma & PG Deadlines
          </h2>
        </div>

        {/* Message Content */}
        <div className="text-gray-700 text-base leading-relaxed space-y-4">
          <div>
            <p>
              The <span className="font-semibold text-yellow-700">correction window</span> for the{" "}
              <span className="font-medium">UG and Diploma</span> DSEU online admission forms is open from{" "}
              <span className="font-semibold">8th July 2025</span> to{" "}
              <span className="font-semibold">10th July 2025</span>.
            </p>
            <p className="text-red-600 font-medium">
              No corrections will be allowed after the window closes.
            </p>
          </div>

          <div>
            <p>
              For <span className="font-medium">PG applicants</span>, the last date to submit the admission form has been{" "}
              <span className="font-semibold text-green-700">extended to 30th July 2025</span>.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-6">
          <button
            onClick={handleClose}
            className="bg-yellow-600 hover:bg-orange-500 text-white font-medium px-5 py-2 rounded-lg shadow transition duration-300"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
