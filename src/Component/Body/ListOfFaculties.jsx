import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity } from "@fortawesome/free-solid-svg-icons";
import ListOfFacultiesLoading from "../ShimmerUI/ListOfFacultiesLoading";
import { getSchools } from "../../utils/apiservice";
import { QUERY_KEYS } from "../../utils/queryKeys";
import Disclaimer from "../Home/Disclaimer";

export default function ListOfFaculties() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getSchools,
    queryKey: [QUERY_KEYS.GET_SCHOOLS],
    staleTime: 5 * 60 * 1000,
  });

  const handleClick = () => window.scrollTo(0, 0);

  if (isLoading) return <ListOfFacultiesLoading />;
  if (isError)
    return (
      <p className="text-center text-red-500">
        {error?.message || "Failed to fetch data"}
      </p>
    );

  return (
    <div className="bg-white px-4 sm:px-8 md:px-16 lg:px-24 pt-5 pb-16">
      <div className="mx-auto max-w-7xl">
      <Disclaimer />
        <h2 className="text-3xl font-bold text-center tracking-tight text-gray-900 mb-10">
          List of Faculties
        </h2>

        {Array.isArray(data) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((department) => (
              <div
                key={department._id}
                className="group relative bg-slate-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between h-full"
              >
                <div className="flex justify-center mb-4">
                  <FontAwesomeIcon
                    icon={faUniversity}
                    className="h-16 w-16 text-blue-500"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {department.name}
                  </h3>
                </div>

                <Link to={`/dept/${department._id}`}>
                  <button
                    onClick={handleClick}
                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  >
                    View Department
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
