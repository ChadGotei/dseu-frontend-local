import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { members } from "../../constants/TEAMDSEU.JS";

const TeamDseu = () => {
  const location = useLocation();
  const deanRef = useRef(null);

  const priorityOrder = [
    "Chancellor",
    "Vice Chancellor",
    "Registrar",
    "University Officers",
    "Deans",
    "Director Academics",
    "Joint Director",
    "Campus Directors",
    "Officers",
    "Accounts Officers",
    "Training and Placement Officers",
  ];

  const categories = priorityOrder.filter((cat) =>
    members.some((member) => member.category === cat)
  );

  useEffect(() => {
    if (location.state?.focus === "Deans" && deanRef.current) {
      deanRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.state]);

  return (
    <div className="px-4 md:px-12 py-10 bg-gray-50">
      <div className="flex flex-col gap-24">
        {categories.map((category) => {
          const filteredMembers = members.filter(
            (member) => member.category === category
          );

          const isRegistrar = category.toLowerCase() === "registrar";

          const sectionRef = category === "Deans" ? deanRef : null;

          return (
            <div key={category} ref={sectionRef} className="space-y-10">
              <h3
                className={`text-3xl md:text-4xl font-bold text-center text-gray-800 border-b-4 border-orange-400 pb-4 shadow-sm w-fit mx-auto ${
                  isRegistrar ? "uppercase" : ""
                }`}
              >
                {category}
              </h3>

              <div
                className={`gap-8 ${
                  filteredMembers.length === 1
                    ? "flex justify-center"
                    : "grid sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="w-full max-w-xs bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform hover:scale-105 duration-300"
                  >
                    <img
                      src={member.src || "/placeholder.jpg"}
                      alt={member.name}
                      className="w-32 h-32 object-cover rounded-full shadow-sm mb-4"
                    />
                    <h4 className="text-lg md:text-xl font-semibold text-gray-800">
                      {member.name}
                    </h4>
                    {member.designation && (
                      <div className="text-xs md:text-sm text-blue-500 font-medium mt-1">
                        {member.designation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamDseu;
