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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg relative">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-bold text-blue-900">
            {program.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-gray-700">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Info label="Program Level" value={program.programLevel} />
            <Info label="Campus" value={program.campus} />
            <Info label="Duration" value={program.duration} />
            <Info label="Fees" value={program.fees} />

          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Eligibility
            </h3>
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {program.eligibility || "Not specified"}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Apply Now
          </button>
        </div>

      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value || "—"}</p>
  </div>
);

export default ProgramPopup;
