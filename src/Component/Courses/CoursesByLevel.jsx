//? Includes the Programs by level

import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import OrangeLoader from "../PageLoader/OrangeLoader";

import { getProgramsByLevel } from "../../utils/apiservice";
import { QUERY_KEYS } from "../../utils/queryKeys";

const validLevels = ["ug", "pg", "diploma"];

const CoursesByLevel = () => {
  const { programLevel } = useParams();
  const navigate = useNavigate();

  const isValidLevel = validLevels.includes(programLevel?.toLowerCase());

  const { data: programs, isLoading: isProgramLoading } = useQuery({
    queryFn: () => getProgramsByLevel(programLevel),
    queryKey: [QUERY_KEYS.GET_PROGRAMS_BY_LEVEL, programLevel],
    enabled: isValidLevel,
  });

  const handleClick = (data) => {
    if (data.years && typeof data.years === "object") {
      navigate(`/programs/${data._id}`);
    }
  };

  if (!isValidLevel) {
    return (
      <div className="min-h-[70vh] md:min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Invalid Program Level
        </h1>
        <p className="text-gray-700 mb-6">
          Please enter a valid program level: UG, PG, or Diploma.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-900 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-800 transition-colors duration-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (isProgramLoading) {
    return <OrangeLoader />;
  }

  return (
    <div className="min-h-screen p-6 mb-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          {programs[0]?.programLevel || "Programs"}
        </h1>

        <div className="space-y-4">
          {programs.map((program, index) => (
            <div
              key={index}
              className="border-l-4 border-yellow-500 bg-white p-4 shadow-md rounded-md cursor-pointer hover:shadow-lg hover:scale-105 hover:bg-blue-50 transition-all duration-300"
              onClick={() => handleClick(program)}
            >
              <p className="text-lg font-semibold text-gray-800">
                {program.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesByLevel;
