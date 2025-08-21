import { useEffect, useRef, useState } from "react";
import { FiInfo, FiExternalLink } from "react-icons/fi";
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

  const spotPdf =
    "https://drive.google.com/file/d/1Hlan617cy5zftPo_aUK0tOL0mgTc6zdp/view";

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
          type="button"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-blue-100 text-blue-700 p-2.5 rounded-full">
            <FiInfo className="text-xl" aria-hidden="true" />
          </div>
          <h2
            id="admission-modal-title"
            className="text-xl sm:text-2xl font-semibold text-blue-800"
          >
            Admission Notifications
          </h2>
        </div>

        {/* Body */}
        <div className="text-gray-800 text-base sm:text-base leading-relaxed space-y-5">
          {/* Greeting + Key notices */}
          <div className="space-y-4">
            <p className="text-lg font-medium">📢 Dear Applicant,</p>

            {/* SPOT round for BTech: partial bold + dates + view PDF */}
            <div className="space-y-2">
              <a
                href={spotPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium"
              >
                <FiExternalLink className="shrink-0" aria-hidden="true" />
                <span>
                  Guidelines for <strong>SPOT round for Btech</strong>
                </span>
              </a>

              <p className="text-gray-800">
                Dates: <strong>25 August 2025</strong> &amp;{" "}
                <strong>26 August 2025</strong>
              </p>

              <p className="text-gray-600">View PDF for more details.</p>

              <a
                href={spotPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                View PDF
              </a>
            </div>
          </div>

          {/* Registrations notice */}
          <a
            href="https://dseuadm.samarth.edu.in/ug/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-gray-700 block"
          >
            🎓 Registrations are now open for B.S. Optometry and B.Des Jewellery
            Design programs until <strong>3rd September</strong>.
          </a>

          {/* Signature */}
          <p className="font-medium text-gray-700">– Admission Cell, DSEU</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
