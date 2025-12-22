import { useRef, useState } from "react";
import ProgramPopup from "./UI/ProgramPopup";
import { programs } from "./programsData";

const SpringAdmission = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const modalRef = useRef(null);

  // 🔹 Group programs by programLevel
  const groupedPrograms = programs.reduce((acc, program) => {
    if (!acc[program.programLevel]) {
      acc[program.programLevel] = [];
    }
    acc[program.programLevel].push(program);
    return acc;
  }, {});

  return (
    <div className="min-h-screen p-6 mb-10 mt-10">
      <div className="max-w-7xl mx-auto">

        {Object.entries(groupedPrograms).map(
          ([programLevel, programList]) => (
            <div key={programLevel} className="mb-10">
              
              {/* 🔹 Program Level Heading */}
              <h1 className="text-3xl font-bold text-blue-900 mb-6">
                {programLevel}
              </h1>

              <div className="space-y-4">
                {programList.map((program, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedProgram(program)}
                    className="border-l-4 border-green-500 bg-white p-4 shadow-md rounded-md cursor-pointer hover:shadow-lg hover:scale-[102%] hover:bg-blue-50 transition-all duration-300"
                  >
                    <p className="text-lg font-semibold text-gray-800">
                      {program.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Campus: {program.campus} | Seats: {program.seats}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {/* 🔹 Popup */}
      {selectedProgram && (
        <ProgramPopup
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </div>
  );
};

export default SpringAdmission;
