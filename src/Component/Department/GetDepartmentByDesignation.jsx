// get faculty by department

import { useMemo } from "react";
import { Link } from "react-router-dom";

const GetDepartmentByDesignation = ({ faculty, designation, facultyType }) => {
  const filteredFaculty = useMemo(() => {
    return faculty?.filter((person) => {
      const designationValue = person?.designation?.trim() || "Professor";
      const facultyTypeValue = person?.faculty_type?.trim() || "DSEU";

      return (
        designationValue.toLowerCase() === designation.toLowerCase() &&
        facultyTypeValue.toLowerCase() === facultyType.toLowerCase()
      );
    });
  }, [faculty, designation, facultyType]);

  const totalFaculty = filteredFaculty?.length;

  if (!filteredFaculty || totalFaculty === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        {designation} from {facultyType} not avaliable.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredFaculty.map((person) => (
        <Link
          key={person._id}
          to={`/faculty/${person._id}`}
          state={{ faculty: person }} 
          className="bg-gray-50 p-4 py-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:scale-[1.01] hover:cursor-pointer hover:shadow-blue-300 transition duration-300"
        >
          <img
            src={person.photo}
            alt={`${person.firstname} ${person.surname}`}
            className="md:w-60 md:h-60 w-52 sm:w-56 h-52 sm:h-56 object-cover rounded-xl mb-3 mx-auto"
          />
          <div className="flex flex-col justify-center items-center">
            <div className="text-lg md:text-xl hover:text-[#333] font-semibold text-gray-800">
              {person.salutation} {person.firstname} {person.surname}
            </div>
            <div className="md:text-md text-sm text-gray-600">
              {person.designation}
            </div>
            <div className="md:text-md text-sm text-blue-600 break-words hover:text-underline">
              {person.email}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GetDepartmentByDesignation;
