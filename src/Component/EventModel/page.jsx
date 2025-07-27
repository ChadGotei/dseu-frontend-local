import { useEffect, useRef, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

const Page = () => {
  const [showModal, setShowModal] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide border border-gray-300"
      >
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
            <FiInfo className="text-xl" />
          </div>
          <h2 className="text-sm sm:text-xl font-semibold text-blue-700">
            Admission Notifications – B.Tech & Diploma
          </h2>
        </div>

        <div className="text-gray-800 text-sm md:text-base leading-relaxed space-y-6">

          {/* B.Tech Section */}
          <div className="space-y-2">
            <p><strong>📢 Dear Applicant,</strong></p>
            <p>
              The <strong>seat allocation result</strong> for <strong>B.Tech Round 1</strong> is now live{" "}
              <strong>(except B.Tech 5 Years Integrated Program and B. Tech. Tool Engineering (Executive))</strong>.
            </p>
            <p>Students can check their result by clicking the button below:</p>
            <Link
              to="/admission/result"
              className="inline-block mt-1 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              View My B.Tech Result
            </Link>
          </div>

          <hr className="my-4 border-gray-300" />

          {/* Diploma Section */}
          <div className="space-y-2">
            <p>
              The <strong>seat allocation result</strong> for <strong>Diploma Round 1</strong> of the current admission year is now live{" "}
              <strong>(except Diploma in Pharmacy)</strong>.
            </p>
            <p>The result for <strong>PWD</strong> and <strong>Defence</strong> category students is also live.</p>
            <p>Students can check their result by clicking the button below:</p>
            <Link
              to="/admission/result"
              className="inline-block mt-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              View My Diploma Result
            </Link>
            <p className="font-medium text-blue-700">
              📩 A payment link has been sent to your <strong>registered mobile number</strong>.
            </p>
            <p className="font-medium text-red-600">
              ⏳ Last date to complete payment: <strong>29th July, 11:59 PM</strong>.
            </p>
          </div>

          <p className="mt-4 font-medium text-gray-600">– Admission Cell, DSEU</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
