import { useEffect, useRef, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

const Page = () => {
  const [showDiplomaModal, setShowDiplomaModal] = useState(true);
  const [showBtechModal, setShowBtechModal] = useState(true);

  const diplomaRef = useRef(null);
  const btechRef = useRef(null);

  // Close handlers
  const handleDiplomaClose = () => setShowDiplomaModal(false);
  const handleBtechClose = () => setShowBtechModal(false);

  // Click outside logic for both modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (diplomaRef.current && !diplomaRef.current.contains(event.target)) {
        setShowDiplomaModal(false);
      }
      if (btechRef.current && !btechRef.current.contains(event.target)) {
        setShowBtechModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Nothing to show
  if (!showDiplomaModal && !showBtechModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-fade-in overflow-auto">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* B.Tech Modal */}
        {showBtechModal && (
          <div
            ref={btechRef}
            className="relative bg-white rounded-lg shadow-2xl p-6 w-full max-w-xl border border-green-200"
          >
            <button
              onClick={handleBtechClose}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 text-green-600 p-2 rounded-full">
                <FiInfo className="text-xl" />
              </div>
              <h2 className="text-sm sm:text-xl font-semibold text-green-700">
                B.Tech Round 1 Results Are Live!
              </h2>
            </div>

            <div className="text-gray-800 text-sm md:text-base leading-relaxed space-y-4">
              <p><strong>📢 Dear Applicant,</strong></p>
              <p>
                The <strong>seat allocation result</strong> for <strong>B.Tech Round 1</strong> is now live <strong>(except B.Tech 5 Years Integrated Program and B. Tech. Tool Engineering (Executive))</strong>.
              </p>
              <p>
                Students can check their result by clicking the button below:
              </p>
              <p>
                <Link
                  to="/admission/result"
                  className="inline-block mt-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  View My Result
                </Link>
              </p>
              <p className="mt-4 font-medium text-gray-600">– Admission Cell, DSEU</p>
            </div>
          </div>
        )}


        {/* Diploma Modal */}
        {showDiplomaModal && (
          <div
            ref={diplomaRef}
            className="relative bg-white rounded-lg shadow-2xl p-6 w-[full] max-w-xl border border-blue-200"
          >
            <button
              onClick={handleDiplomaClose}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <FiInfo className="text-xl" />
              </div>
              <h2 className="text-sm sm:text-xl font-semibold text-blue-700">
                Diploma Round 1 Results Are Live!
              </h2>
            </div>

            <div className="text-gray-800 text-sm md:text-base leading-relaxed space-y-4">
              <p><strong>📢 Dear Applicant,</strong></p>
              <p>
                The <strong>seat allocation result</strong> for <strong>Diploma Round 1</strong> of the current admission year is now live <strong>(except Diploma in Pharmacy)</strong>.
              </p>
              <p>
                Students can check their result by clicking the button below:
              </p>
              <p>
                <Link
                  to="/admission/result"
                  className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  View My Result
                </Link>
              </p>
              <p className="mt-4 font-medium text-gray-600">– Admission Cell, DSEU</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );

};

export default Page;
