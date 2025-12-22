import { useRef, useState } from "react"
import ProgramPopup from "./UI/ProgramPopup";

const programs = [
    {
        name: "Test Program 1",
        about: "This program focuses on foundational concepts.",
        duration: "4 Years",
        eligibility: "12th Pass with Science",
        fees: "$4,000 / year",
        programLevel: "Undergraduate Programs",
    },
    {
        name: "Test Program 2",
        about: "Advanced training with practical exposure.",
        duration: "2 Years",
        eligibility: "Bachelor’s Degree",
        fees: "$3,500 / year",
    },
    {
        name: "Test Program 3",
        about: "Skill-oriented diploma program.",
        duration: "1 Year",
        eligibility: "10+2 Pass",
        fees: "$2,000",
    },
]

const SpringAdmission = () => {
    const [selectedProgram, setSelectedProgram] = useState(null);
    const modalRef = useRef(null);

    return (
        <div className="min-h-screen p-6 mb-10 mt-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-900 mb-4">
                    {programs[0]?.programLevel || "Programs"}
                </h1>

                <div className="space-y-4">
                    {programs.map((program, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedProgram(program)}
                            className="border-l-4 border-green-500 bg-white p-4 shadow-md rounded-md cursor-pointer hover:shadow-lg hover:scale-[102%] hover:bg-blue-50 transition-all duration-300"
                        >
                            <p className="text-lg font-semibold text-gray-800">
                                {program.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popup */}
            {selectedProgram && (
                <ProgramPopup
                    program={selectedProgram}
                    onClose={() => setSelectedProgram(null)}
                    // modalRef={modalRef}
                />
            )}
        </div>
    )
}

export default SpringAdmission
