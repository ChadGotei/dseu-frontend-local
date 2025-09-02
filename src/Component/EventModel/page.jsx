import { useEffect, useRef, useState } from "react";
import { FiInfo, FiExternalLink } from "react-icons/fi";

const slidingPdf = "/BTECH_SLIDING_ALLOCATION.pdf";
const UGslidingPdf = "/UG_SLIDING_ALLOCATION.pdf";

// New Spot Round UG PDF
const spotUgPdf = {
  fileName: "Guidelines for Spot Round of Counselling for UG",
  fileLink:
    "https://drive.google.com/file/d/1f9dcVegIzesWC0LA0UHlh_JIHikM69k7/view",
};

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

  // existing (unused) vars kept as-is
  const spotPdf =
    "https://drive.google.com/file/d/1vUDsxNlKox8Zrf2-VeW59vho2EqrNWRa/view";

  const diplomaRound3 = "http://dseu.ac.in/admission/result/diploma/round3";

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
            <FiInfo className="text-lg sm:text-xl" aria-hidden="true" />
          </div>
          <h2
            id="admission-modal-title"
            className="text-lg sm:text-2xl font-semibold text-blue-800"
          >
            Admission Notifications
          </h2>
        </div>

        {/* Body */}
        <div className="text-gray-800 text-sm sm:text-base leading-relaxed space-y-5">
          <div className="space-y-3">
            <p className="text-base font-medium">📢 Dear Applicant,</p>

            {/* Diploma Round 3 (new) */}
            {/* <div className="flex flex-col gap-2">
              <p>
                The <strong>Diploma Round 3</strong> seat allocation has been{" "}
                <strong>closed</strong>.
              </p>
            </div> */}

            <a
              href={
                "https://drive.google.com/file/d/1lJrvGXRGLu-PIfz3tubGkjsMjmLNPK-b/view"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium text-sm sm:text-base mt-4"
            >
              <FiExternalLink className="shrink-0" aria-hidden="true" />
              <span>
                Guidelines for Walk-in Admission to <strong>UG, B.Tech, and PG Programs</strong> for AY 2025–26
              </span>
            </a>

            <div className="text-gray-600 text-sm sm:text-base">
              <p>
                📅 Dates:
                <span>
                  <strong> Starting from 03.09.2025</strong>
                </span>
              </p>
            </div>

            <div className="mt-2">
              <a
                href={
                  "https://drive.google.com/file/d/1lJrvGXRGLu-PIfz3tubGkjsMjmLNPK-b/view"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg shadow-md transition"
              >
                View Walk-in Guidelines PDF
              </a>
            </div>

            <a
              href={
                "https://drive.google.com/file/d/198p0Bx9ymTbhWNy0uj6X4q7N2JpEOJG2/view"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium text-sm sm:text-base"
            >
              <FiExternalLink className="shrink-0" aria-hidden="true" />
              <span>
                Guidelines for <strong>SPOT round for PG</strong> (Postgraduate)
              </span>
            </a>

            <div className="text-gray-600 text-sm sm:text-base">
              <p>
                📅 Dates:
                <span>
                  <strong> 01.09.2025 - 03.09.2025</strong>
                </span>
              </p>
            </div>

            <div className="mt-2">
              <a
                href={
                  "https://drive.google.com/file/d/198p0Bx9ymTbhWNy0uj6X4q7N2JpEOJG2/view"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg shadow-md transition"
              >
                View PG PDF
              </a>
            </div>

            {/* Divider */}
            <hr className="my-4 border-gray-300" />
          </div>

          {/* Registrations notice */}
          <a
            href="https://dseuadm.samarth.edu.in/ug/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-gray-700 block text-xs sm:text-base"
          >
            🎓 Registrations are now open for B.S. Optometry and B.Des Jewellery
            Design programs until <strong>3rd September</strong>.
          </a>

          {/* Signature */}
          <p className="font-medium text-gray-700 text-sm sm:text-base">
            – Admission Cell, DSEU
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
