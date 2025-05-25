import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getCampusByZone } from "../../utils/apiservice";
import { QUERY_KEYS } from "../../utils/queryKeys";
import { generateSlug } from "../../utils/helper";
import OrangeLoader from "../PageLoader/OrangeLoader";
import { useEffect, useState } from "react";
import { aryabhatt, pusa1, pusa2, jaffarpur, siri, rajokri, dheerpur, gbpant, okhla1, okhlacamps, wazirpur,kasturba } from "./campusimages";

const CampusByZone = () => {
  const { zone } = useParams();
  const navigate = useNavigate();
  const [campusData, setCampusData] = useState([]);

  const { data, isLoading } = useQuery({
    queryFn: () => getCampusByZone(zone),
    queryKey: [QUERY_KEYS.GET_CAMPUS_BY_ZONE, zone],
    enabled: !!zone,
  });

  useEffect(() => {
    if (data?.data?.campuses) {
      setCampusData(data.data.campuses);
    }
  }, [data]);

  const getCampusImage = (name, backendPhoto) => {
    const lowerName = name.toLowerCase();

    if (lowerName.includes("pusa ii")) return pusa2;
    if (lowerName.includes("pusa i")) return pusa1;
    if (lowerName.includes("rajokri")) return rajokri;
    if (lowerName.includes("siri fort")) return siri;
    if (lowerName.includes("aryabhatt")) return aryabhatt;
    if (lowerName.includes("dheerpur")) return dheerpur;
    if (lowerName.includes("wazirpur")) return wazirpur;
    if (lowerName.includes("kasturba")) return kasturba;
    if (lowerName.includes("champs")) return okhlacamps;
    if (lowerName.includes("okhla")) return okhla1;
    if (lowerName.includes("gb pant")) return gbpant;

    // fallback to backend photo or default image
    return backendPhoto || "/default-campus.jpg";
  };

  const campuses = [...(campusData || [])].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (isLoading) return <OrangeLoader />;

  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-[50vh]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col items-center mb-10 text-center">
          <h1 className="relative inline-block text-2xl sm:text-3xl md:text-4xl font-bold text-[#333] tracking-tight after:content-[''] after:block after:h-1 after:bg-orange-400 after:rounded-full after:mt-2 after:w-full hover:text-[#111]">
            DSEU{" "}
            {zone
              ?.split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}{" "}
            Campuses
          </h1>
        </div>

        <div className="flex flex-col space-y-8 mx-3 sm:mx-2 md:mx-0">
          {campuses.map((campus) => (
            <div
              key={campus._id}
              className="flex flex-col md:flex-row bg-white rounded-2xl border border-gray-200 w-full overflow-hidden duration-200 hover:bg-blue-50 hover:cursor-pointer hover:shadow-md hover:shadow-blue-200 transition-all hover:scale-[1.02]"
              onClick={() => navigate(`/campus/${generateSlug(campus.name)}`)}
            >
              <div className="w-full md:w-2/5">
                <img
                  src={getCampusImage(campus.name, campus.campus_photo)}
                  alt={campus.name}
                  className="w-full h-52 sm:h-64 md:h-full object-cover"
                />
              </div>

              <div className="w-full md:w-3/5 p-5 sm:p-6 bg-white">
                <div className="flex flex-col justify-center h-[90%] space-y-3 sm:space-y-4 text-left">
                  <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 text-center md:text-left hover:text-[#333]">
                    {campus.name}
                  </h2>

                  <div>
                    <h3 className="font-medium text-orange-400">Director:</h3>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {campus.campus_director}
                    </p>
                  </div>

                  {campus.campus_director_email !== "test@example.com" && (
                    <div>
                      <h3 className="font-medium text-orange-400">
                        Director's email:
                      </h3>
                      <p className="text-blue-600 text-sm sm:text-base break-words hover:underline">
                        {campus.campus_director_email}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium text-orange-400">Address:</h3>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {campus.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampusByZone;
