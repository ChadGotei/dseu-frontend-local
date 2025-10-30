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
      aria-label="Finance Controller Modal"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white rounded-xl shadow-2xl p-6 sm:p-7 w-fit max-w-lg border border-orange-200 max-h-[86vh] overflow-y-auto">
        <button
          onClick={() => setShowWalkin(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-orange-500 text-2xl font-bold leading-none"
          aria-label="Close Modal"
          type="button"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-100 text-orange-700 p-2.5 rounded-full">
            <FiInfo className="text-lg sm:text-xl" aria-hidden="true" />
          </div>
          <h2 className="font-semibold text-orange-800 text-lg sm:text-xl">
            Advertisement For Non-Teaching Post
          </h2>
        </div>

        <div className="text-gray-800 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            Applications are invited for the post of{" "}
            <strong>Controller of Finance</strong>.
          </p>

          <p>
            <strong>Last date to apply📅:</strong> 15<sup>th</sup> November 2025
          </p>

          <a
            href="https://dseunt.samarth.edu.in/index.php/site/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg shadow-md transition"
          >
            <FiExternalLink className="w-4 h-4" aria-hidden="true" />
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
