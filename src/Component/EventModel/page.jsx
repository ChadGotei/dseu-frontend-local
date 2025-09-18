import { useEffect, useState } from "react";
import { FiInfo, FiExternalLink } from "react-icons/fi";

const Page = () => {
  const [showDiploma, setShowDiploma] = useState(true);
  const [showWalkin, setShowWalkin] = useState(true);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setShowDiploma(false);
        setShowWalkin(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!showDiploma && !showWalkin) return null;


  const wazirpurMapsUrl = "https://maps.app.goo.gl/qEhaAs5Nd1VZqS4e7";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 p-3 sm:p-4 overflow-y-auto md:flex md:items-center md:justify-center md:h-[100vh]"
      aria-label="Admissions Modals"
      role="dialog"
      aria-modal="true"
    >
      <div className="mx-auto w-full max-w-6xl pb-8">
        {/* Grid fixes mobile → stack, desktop → side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:items-start">

          {/* Diploma Spot Admissions (blue theme) */}
          {showDiploma && (
            <div className="relative bg-white rounded-xl shadow-2xl p-6 sm:p-7 w-full border border-blue-200 max-h-[82vh] sm:max-h-[86vh] overflow-y-auto">
              <button
                onClick={() => setShowDiploma(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold leading-none"
                aria-label="Close Diploma Modal"
                type="button"
              >
                &times;
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 text-blue-700 p-2.5 rounded-full">
                  <FiInfo className="text-lg sm:text-xl" aria-hidden="true" />
                </div>
                <h2 className="text-lg sm:text-2xl font-semibold text-blue-800">
                  Admission Notifications
                </h2>
              </div>

              <p className="text-base font-medium mb-4">📢 Dear Applicant,</p>

              <div className="text-gray-800 text-sm sm:text-base leading-relaxed space-y-6">
                <div className="space-y-4"

                >
                  <h3 className="text-blue-900 font-semibold text-sm sm:text-lg"
                    // onClick={() => window.location.href = "https://drive.google.com/file/d/1uwKQm9D6AKpIKgbJoQBChuEelwduV3-w/view"}
                  >
                    Walk-in Admissions for Diploma programs are open for AY 2025-26
                  </h3>

                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>📍 <strong>Venue:</strong> DSEU Dwarka Campus (Room no. 222) </li>
                    <li>📅 <strong>Date:</strong> till 30th September 2025</li>
                    <li>⏰ <strong>Reporting Time:</strong> 10:00 AM - 04:00 PM</li>
                  </ul>

                  <div>
                    <h4 className="font-semibold text-gray-900 mt-2">Only for these programs (Campus)</h4>
                    <ul className="list-disc list-inside text-gray-700 mt-1 space-y-1 md:text-sm text-xs">
                      <li>Four-Year UG Diploma in Tool &amp; Die Making — DSEU Wazirpur Campus</li>
                      <li>Diploma in Precision Engineering — DSEU Wazirpur Campus</li>
                      <li>Diploma in Petrochemical Engineering — Guru Nanak Dev DSEU Campus</li>
                      <li>Diploma in Polymer Technology — Guru Nanak Dev DSEU Campus</li>
                      <li>Diploma in Printing Technology — DSEU Pusa Campus-I</li>
                      <li>Diploma in Civil Engineering - Kasturba DSEU Campus (Only Girls)</li>
                      <li>Diploma in Architecture — Meerabai DSEU Campus (Only Girls)</li>
                      <li>Diploma in Electronics Engineering — Kasturba DSEU Campus (Only Girls)</li>
                      <li>Diploma in Electronics Engineering — Meerabai DSEU Campus (Only Girls)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <div className="mt-2">
                <a
                  href={"https://drive.google.com/file/d/1uwKQm9D6AKpIKgbJoQBChuEelwduV3-w/view"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg shadow-md transition"
                >
                  View Spot round Guidelines
                </a>
              </div> */}
            </div>
          )}

          {/* Walk-in Guidelines (orange theme) */}
          {showWalkin && (
            <div className="relative bg-white rounded-xl shadow-2xl p-6 sm:p-7 w-full border border-orange-200 max-h-[82vh] sm:max-h-[86vh] overflow-y-auto">
              <button
                onClick={() => setShowWalkin(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-orange-500 text-2xl font-bold leading-none"
                aria-label="Close Walk-in Modal"
                type="button"
              >
                &times;
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-orange-100 text-orange-700 p-2.5 rounded-full">
                  <FiInfo className="text-lg sm:text-xl" aria-hidden="true" />
                </div>
                <h2 className="text-lg sm:text-2xl font-semibold text-orange-800">
                  Admission Notifications
                </h2>
              </div>

              <p className="text-base font-medium mb-4">📢 Dear Applicant,</p>

              <div className="text-gray-800 text-sm sm:text-base leading-relaxed space-y-6">
                <div className="space-y-3">
                  <a
                    href={"https://drive.google.com/file/d/1Zvh62-LBf9XaLOw0-844tvTHgeQGrOA8/view"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 font-medium text-sm sm:text-base"
                  >
                    <FiExternalLink className="shrink-0" aria-hidden="true" />
                    <span>
                      Guidelines for Walk-in Admission to <strong>UG, B.Tech, and PG Programs</strong> for AY 2025–26
                    </span>
                  </a>

                  <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base">
                    <li className="text-left">📍 <strong>Location:</strong> DSEU HQ</li>
                    <li>📅 <strong>Dates:</strong> 15 - 30 September 2025</li>
                  </ul>

                  <div className="mt-2">
                    <a
                      href={"https://drive.google.com/file/d/1Zvh62-LBf9XaLOw0-844tvTHgeQGrOA8/view"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg shadow-md transition"
                    >
                      View Walk-in Guidelines PDF
                    </a>
                  </div>
                </div>

                <p className="font-medium text-gray-700 text-sm sm:text-base">
                  – Admission Cell, DSEU
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Page;
