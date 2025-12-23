import React from "react";

const ProgramPopup = ({ program, onClose }) => {
  if (!program) return null;

  const handleApply = () => {
    if (program.link && program.link.trim() !== "") {
      window.open(program.link, "_blank");
    } else {
      alert("Application link will be available soon.");
    }
  };

  return (
    /* Overlay – click to close */
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
    >
      {/* Popup Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="border-b px-6 py-5 flex justify-between items-start bg-gradient-to-r from-blue-50 to-white">
          <div className="space-y-2">
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-700 text-white">
              {program.programLevel}
            </span>

            <h2 className="text-2xl font-bold text-blue-900 leading-snug">
              {program.name}
            </h2>

            <p className="text-sm text-gray-600">{program.campus}</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-500 hover:text-red-600 text-3xl leading-none font-light transition"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8 overflow-y-auto max-h-[65vh]">
          {/* Key Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Info label="Program Level" value={program.programLevel} />
            <Info label="Duration" value={program.duration} />
            <Info label="Fees" value={program.fees} />
            <Info label="Campus" value={program.campus} />
          </div>

          {/* Overview */}
          <Section title="Program Overview">
            <p className="text-sm leading-relaxed text-gray-700">
              {program.description || "Program details will be updated soon."}
            </p>
          </Section>

          {/* Eligibility */}
          <Section title="Eligibility Criteria">
            <p className="text-sm leading-relaxed whitespace-pre-line text-gray-700">
              {program.eligibility || "Eligibility details not specified."}
            </p>
          </Section>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            For complete details, please proceed with the application.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              Close
            </button>

            <button
              onClick={handleApply}
              className="px-7 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold shadow-md transition"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= Reusable Components ================= */

const Info = ({ label, value }) => (
  <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow transition">
    <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
    <p className="font-semibold text-gray-900 mt-1">{value || "—"}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 mb-3 border-l-4 border-blue-700 pl-3">
      {title}
    </h3>
    {children}
  </div>
);

export default ProgramPopup;
