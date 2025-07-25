import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProgramsByLevel } from "../../utils/apiservice";
import study from "/src/assets/achievements/study.jpg";
import { carouselItems } from "../../constants/STUDENTPROGRAM";
import { QUERY_KEYS } from "../../utils/queryKeys";

const getRandomPrograms = (programs, count = 6) => {
  const shuffled = [...programs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const StudyProgramsSection = () => {
  const [selectedProgram, setSelectedProgram] = useState("DIPLOMA");
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const navigate = useNavigate();

  // Auto-cycle carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCarouselIndex((prev) =>
        prev === carouselItems.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const {
    data: fetchedPrograms = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_PROGRAMS_BY_LEVEL, selectedProgram.toLowerCase()],
    queryFn: () => getProgramsByLevel(selectedProgram),
    staleTime: 7 * 60 * 1000,
  });

  // ✅ Memoized random selection (stable until selectedProgram changes)
  const displayPrograms = useMemo(() => {
    if (!fetchedPrograms.length) return [];
    return getRandomPrograms(fetchedPrograms, 6);
  }, [fetchedPrograms, selectedProgram]);

  const programLevels = ["DIPLOMA", "UG", "PG"];

  const handleNavigate = (data) => {
    if (data.years && typeof data.years === "object") {
      navigate(`/programs/${data._id}`);
    }

    return null;
  };

  return (
    <div className="w-full bg-blue-50 p-8 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* Left: Carousel */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">
              Recent Achievements
            </h2>
            <div className="h-[300px] sm:h-[400px] bg-gray-100 rounded-lg overflow-hidden shadow-md relative">
              <img
                src={carouselItems[currentCarouselIndex].image}
                alt="Achievement"
                className="w-full h-full object-cover absolute inset-0"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentCarouselIndex
                        ? "bg-blue-600"
                        : "bg-white"
                    }`}
                    onClick={() => setCurrentCarouselIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Programs */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">
                Study@DSEU
              </h2>
              <Link to="/Courses">
                <button className="mt-4 sm:mt-0 text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
                  VIEW ALL PROGRAMMES
                </button>
              </Link>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                {programLevels.map((program) => (
                  <button
                    key={program}
                    onClick={() => setSelectedProgram(program)}
                    className={`pb-2 lg:px-4 text-xs lg:text-sm font-medium transition-colors duration-300 ${
                      selectedProgram === program
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {program}
                  </button>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-gray-700">
                Available {selectedProgram.toLowerCase()} courses:
              </h3>

              {isLoading ? (
                <p>Loading programs...</p>
              ) : isError ? (
                <p className="text-red-500">Failed to load programs.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {displayPrograms.map((program, index) => (
                    <div
                      key={index}
                      className={`relative bg-cover bg-center rounded-lg shadow-sm p-8 hover:shadow-lg duration-300 h-28 hover:scale-[1.02] transition-all ${
                        program.years && typeof program.years === "object"
                          ? "cursor-pointer"
                          : "cursor-default"
                      }`}
                      style={{
                        backgroundImage: `url(${study})`,
                      }}
                      onClick={() => handleNavigate(program)}
                    >
                      <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-2">
                        <h3 className="text-xl font-extrabold text-white drop-shadow-md tracking-wide uppercase">
                          {program.code}
                        </h3>
                        <p className="mt-1 text-sm text-white drop-shadow-sm line-clamp-2">
                          {program.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyProgramsSection;
