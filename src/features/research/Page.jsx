import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMapSigns } from "@fortawesome/free-solid-svg-icons";
import Heading from "../../Component/Reusable/HeadingText";
import { researchLinks } from "./constant";

export default function Research() {
  const handleClick = () => window.scrollTo(0, 0);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 px-4 sm:px-8 md:px-16 lg:px-24 pt-16 pb-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <Heading
            heading="Research"
            headingCN="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchLinks.map((item, index) => (
            <div
              key={item.path}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white shadow-xl hover:shadow-lg transition-all duration-500 transform flex flex-col justify-between p-8 overflow-hidden h-full">
                {/* Animated Gradient Border Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/0 via-indigo-400/0 to-purple-400/0 transition-all duration-500"></div>

                {/* Content Container */}
                <div className="relative z-10">
                  {/* Icon with Enhanced Styling */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-indigo-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

                      <div className="relative h-24 w-24 rounded-2xl bg-gradient-to-tr from-blue-50 via-white to-indigo-50 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-500 group-hover:scale-105 border border-blue-100/50">
                        <FontAwesomeIcon
                          icon={item.icon}
                          className={`h-12 w-12 ${item.color} group-hover:scale-105 transition-transform duration-500`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text transition-all duration-300">
                      {item.name}
                    </h3>
                    <div className="h-1 w-0 group-hover:w-16 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full transition-all duration-500"></div>
                  </div>
                </div>

                {/* Button with Enhanced Interactivity */}
                <Link to={item.path} className="relative z-10">
                  <button
                    onClick={handleClick}
                    aria-label={`View ${item.name}`}
                    className="relative w-full bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white py-3.5 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 overflow-hidden group/button"
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-1000"></div>

                    {/* Button Content */}
                    <span className="relative flex items-center justify-center gap-2">
                      <span>View</span>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-sm group-hover/button:translate-x-1 transition-transform duration-300"
                      />
                    </span>
                  </button>
                </Link>

                {/* Hover Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
