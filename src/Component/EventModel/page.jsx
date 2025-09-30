import { useEffect, useState } from "react";
import { FiInfo, FiExternalLink } from "react-icons/fi";

const Page = () => {
  const [showWalkin, setShowWalkin] = useState(true);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setShowWalkin(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!showWalkin) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 p-3 sm:p-4 overflow-y-auto flex items-center justify-center"
      aria-label="Admissions Modal"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white rounded-xl shadow-2xl p-6 sm:p-7 w-fit max-w-3xl border border-orange-200 max-h-[86vh] overflow-y-auto">
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
          <h2 className="font-semibold text-orange-800">
            Walk-in Admissions (UG, PG & Diploma) — AY 2025-26
          </h2>
        </div>

        <p className="text-base font-medium mb-4">📢 Dear Applicant,</p>

        <div className="text-gray-800 text-sm sm:text-base leading-relaxed space-y-8">
          {/* Diploma Walk-in */}
          <div className="space-y-2">
            <h3 className="text-orange-800 font-medium text-base sm:text-lg">
              Walk-in Admissions for Diploma Programs
            </h3>

            <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base">
              <li>📍 <strong>Venue:</strong> DSEU Wazirpur Campus</li>
              <li>📅 <strong>Dates:</strong> till 30th September 2025</li>
            </ul>

            <p className="text-gray-700 text-sm sm:text-base">
              Admissions are open against the <strong>remaining vacant seats</strong>.
            </p>

            <a
              href="/diploma_vacant_seats.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg shadow-md transition"
            >
              <FiExternalLink className="w-4 h-4" aria-hidden="true" />
              View Vacant Diploma Seats (PDF)
            </a>
          </div>

          {/* UG, PG Walk-in */}
          <div className="space-y-2">
            <a
              href="https://drive.google.com/file/d/1Zvh62-LBf9XaLOw0-844tvTHgeQGrOA8/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 font-medium text-sm sm:text-base"
            >
              <FiExternalLink className="shrink-0" aria-hidden="true" />
              <span>
                Guidelines for Walk-in Admission to{" "}
                <strong>UG, B.Tech, and PG Programs</strong>
              </span>
            </a>

            <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base">
              <li>📍 <strong>Location:</strong> DSEU Dwarka HQ</li>
              <li>📅 <strong>Dates:</strong> 15 – 30 September 2025</li>
            </ul>

            <a
              href="https://drive.google.com/file/d/1Zvh62-LBf9XaLOw0-844tvTHgeQGrOA8/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg shadow-md transition"
            >
              <FiExternalLink className="w-4 h-4" aria-hidden="true" />
              View UG/PG Walk-in Guidelines (PDF)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
