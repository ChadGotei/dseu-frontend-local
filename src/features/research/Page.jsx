import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Heading from '../../Component/Reusable/HeadingText';

import { researchLinks } from "./constant";

export default function Research() {
    const handleClick = () => window.scrollTo(0, 0);

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white px-4 sm:px-8 md:px-16 lg:px-24 pt-10 pb-20">
            <div className="mx-auto max-w-7xl">
                <Heading heading={"Research"} headingCN={"text-2xl md:text-4xl"} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {researchLinks.map((item) => (
                        <div
                            key={item.path}
                            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] p-8 flex flex-col justify-between border border-gray-100"
                        >
                            <div className="flex justify-center mb-6">
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className={`h-16 w-16 ${item.color} group-hover:scale-110 transform transition-transform duration-300`}
                                />
                            </div>

                            <div className="text-center flex-grow">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                                    {item.name}
                                </h3>
                            </div>

                            <Link to={item.path}>
                                <button
                                    onClick={handleClick}
                                    className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-md text-sm font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-sm"
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
