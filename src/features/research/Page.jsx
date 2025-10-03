import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Heading from "../../Component/Reusable/HeadingText";
import { researchLinks } from "./constant";

export default function Research() {
  const handleClick = () => window.scrollTo(0, 0);

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 px-4 sm:px-8 md:px-16 lg:px-24 pt-12 pb-24">
      <div className="mx-auto max-w-7xl">
        <Heading
          heading="Research"
          headingCN="text-3xl md:text-5xl font-bold text-gray-900 text-center"
        />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
          {researchLinks.map((item) => (
            <div
              key={item.path}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] flex flex-col justify-between p-8 overflow-hidden"
            >
              {/* Decorative Gradient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-indigo-100/30 opacity-0 group-hover:opacity-100 blur-2xl transition duration-500"></div>

              {/* Icon */}
              <div className="flex justify-center mb-6 relative z-10">
                <div className="h-20 w-20 rounded-xl bg-gradient-to-tr from-blue-50 to-indigo-50 flex items-center justify-center shadow-inner group-hover:shadow-md transition-transform duration-300 group-hover:scale-105">
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`h-10 w-10 ${item.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
              </div>

              {/* Title */}
              <div className="text-center flex-grow relative z-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
              </div>

              {/* Button */}
              <Link to={item.path}>
                <button
                  onClick={handleClick}
                  aria-label={`View ${item.name}`}
                  className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all relative z-10"
                >
                  View
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
