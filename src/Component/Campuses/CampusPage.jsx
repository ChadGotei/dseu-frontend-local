import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { unslugify } from "../../utils/helper";
import { getCampusByName } from "../../utils/apiservice";
import { QUERY_KEYS } from "../../utils/queryKeys";

import OrangeLoader from "../PageLoader/OrangeLoader";
import CampusDescription from "./CampusDescription";
import CampusCourses from "./CampusCourses";
import CampusLabs from "./CampusLabs";
import CampusActivities from "./CampusActivities";

import {
  aryabhatt,
  pusa1,
  pusa2,
  jaffarpur,
  siri,
  rajokri,
  dheerpur,
  gbpant,
  okhla1,
  okhlacamps,
  wazirpur,
  kasturba,
} from "./campusimages";

const getCampusImage = (name, backendPhoto) => {
  const lower = name.toLowerCase();
  if (lower.includes("pusa ii")) return pusa2;
  if (lower.includes("pusa i")) return pusa1;
  if (lower.includes("rajokri")) return rajokri;
  if (lower.includes("siri fort")) return siri;
  if (lower.includes("aryabhatt")) return aryabhatt;
  if (lower.includes("dheerpur")) return dheerpur;
  if (lower.includes("wazirpur")) return wazirpur;
  if (lower.includes("kasturba")) return kasturba;
  if (lower.includes("champs")) return okhlacamps;
  if (lower.includes("okhla")) return okhla1;
  if (lower.includes("gb pant")) return gbpant;
  return backendPhoto || "/default-campus.jpg";
};

const CampusPage = () => {
  const { name } = useParams();
  const lowercasedName = unslugify(name).toLowerCase();
  const [activeTab, setActiveTab] = useState("about");

  const { data, isLoading } = useQuery({
    queryFn: () => getCampusByName(lowercasedName),
    queryKey: [QUERY_KEYS.GET_CAMPUS_BY_NAME, lowercasedName],
    enabled: !!lowercasedName,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <OrangeLoader />;

  if (!data) {
    return (
      <div className="w-full h-[60vh] md:h-[40vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Campus Not Found</h2>
        <p className="text-gray-600 text-base md:text-lg mb-2">
          We couldn’t find any campus by that name. Please check the spelling or try searching for a different zone.
        </p>
        <p className="text-sm text-gray-400">
          If you think this is a mistake, contact support or the admin team.
        </p>
      </div>
    );
  }

  const content = {
    about: {
      title: "About Campus",
      content: <CampusDescription {...data} />,
    },
    campus_message: {
      title: "Message of Campus Director",
      content: (
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Message of Campus Director
          </h2>
          <p className="text-base leading-7">{data.campus_message}</p>
        </div>
      ),
    },
    courses: {
      title: "Programs Offered",
      content: <CampusCourses {...data} />,
    },
    labs: {
      title: "Labs",
      content: <CampusLabs {...data} />,
    },
    activities: {
      title: "Activities",
      content: <CampusActivities {...data} />,
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* top image */}
      <div
        className="w-full h-56 sm:h-64 rounded-lg mb-6 relative overflow-hidden shadow-lg md:pb-10 pb-3"
        style={{
          backgroundImage: `url(${getCampusImage(data.name, data.campus_photo)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-lg" />
        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-6 px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase">
            {data.name}
          </h1>
          <p className="text-sm sm:text-base text-white/80 font-medium mt-1">
            {data.location}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="w-full lg:w-64 shrink-0 lg:sticky top-24 self-start">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {Object.entries(content).map(([key, { title }]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full text-left px-5 py-3 font-medium text-sm md:text-base tracking-wide transition-colors duration-200 ${
                  activeTab === key
                    ? "bg-blue-600 text-white"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1">
          <div className="p-6 text-gray-700 leading-relaxed text-justify">
            {content[activeTab].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusPage;
