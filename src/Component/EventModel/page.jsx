import { useEffect, useRef, useState } from "react";
import { FiInfo, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";

const Page = () => {
  const [showModal, setShowModal] = useState(true);
  const modalRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto"
      aria-labelledby="admission-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-2xl p-6 sm:p-7 w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide border border-gray-200"
      >
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-blue-100 text-blue-700 p-2.5 rounded-full">
            <FiInfo className="text-xl" />
          </div>
          <h2 id="admission-modal-title" className="text-base sm:text-xl font-semibold text-blue-800">
            Admission Notifications
          </h2>
        </div>

        <div className="text-gray-800 text-sm md:text-base leading-relaxed space-y-4">
          {/* Greeting + Key notices */}
          <div className="space-y-3">
            <p>
              <strong>📢 Dear Applicant,</strong>
            </p>

            <p>
              The <strong>Undergraduate Round 2</strong> and{" "}
              <strong>B.Tech Round 2</strong> seat allocation results are now live.
            </p>


            <p className="font-medium text-green-700">
              ✅ All candidates who have already paid the fees in Round 1 do not need to pay again, even after upgradation.
            </p>

            {/* Uniform line for document verification (no card/box) */}
            <p className="flex items-start gap-2">
              <FiCalendar className="mt-0.5 shrink-0 text-gray-600" />
              <span>
                <span className="font-medium">Document verification at campus:</span>{" "}
                <strong>18th, 19th and 20th Aug, 2025</strong>.
              </span>
            </p>

            {/* CTAs */}
            <div className="flex md:flex-row md:gap-4 flex-col gap-2 pt-1">
              <Link
                to="/admission/result/pg"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2 rounded-lg transition-colors text-center"
              >
                View PG Result
              </Link>
              <Link
                to="/admission/result/ug/round2"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-center"
              >
                View UG Round 2 Result
              </Link>
              <Link
                to="/admission/result/btech/round2"
                className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-center"
              >
                View B.Tech Round 2
              </Link>
            </div>
          </div>

          <hr className="my-3 border-gray-200" />

          <a
            href="https://dseuadm.samarth.edu.in/ug/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="font-medium mt-4 hover:text-gray-600">
              🎓 Registrations are now open for B.S. Optometry and B.Des Jewellery Design programs until <strong>3rd September</strong>.
            </p>
          </a>


          {/* Payment info */}
          <div>
            <p className="font-medium text-blue-700">
              📩 A payment link has been sent to your <strong>registered mobile number</strong>.
            </p>
          </div>

          <p className="pt-1 font-medium text-gray-600">– Admission Cell, DSEU</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
