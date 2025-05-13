import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import ProgramsByDepartmentLoading from "../ShimmerUI/ProgramsByDepartmentLoading";
import { getProgramByDepartment } from "../../utils/apiservice";

import { QUERY_KEYS } from "../../utils/queryKeys";

const categories = ["Diploma", "UG", "PG"];

const ProgramsByDepartment = ({ deptId }) => {
  const [activeCategory, setActiveCategory] = useState("Diploma");
  const navigate = useNavigate();

  // programs by department
  const {
    data: programData,
    isLoading: isProgramLoading,
    error,
  } = useQuery({
    queryFn: () => getProgramByDepartment(deptId, activeCategory),
    queryKey: [QUERY_KEYS.GET_PROGRAM_BY_DEPARTMENT, deptId, activeCategory],
    enabled: !!deptId && !!activeCategory,
  });

  const handleNavigate = (program) => {
    if (program.years && typeof program.years === "object") {
      navigate(`/programs/${program._id}`);
      return;
    }
    return null;
  };

  if (isProgramLoading) {
    return <ProgramsByDepartmentLoading />;
  }

  return (
    <div className="md:px-6 py-4 w-full flex flex-col">
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 p-1 rounded-full flex space-x-2 shadow-md">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-7 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "bg-transparent text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 flex flex-col gap-2 mt-4 md:mt-2">
        {programData && programData.length > 0 ? (
          programData.map((program, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-500 bg-white p-4 shadow-md rounded-md cursor-pointer hover:shadow-lg hover:scale-105 hover:bg-blue-50 transition-all duration-300"
              onClick={() => handleNavigate(program)}
            >
              <p className="text-lg font-semibold text-gray-800">
                {program.name}
              </p>
              <p className="text-sm text-gray-500">
                Duration: {program.duration}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-6">
            No programs as of now
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgramsByDepartment;
