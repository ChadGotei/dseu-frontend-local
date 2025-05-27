import React from "react";
import { ArrowRight } from "lucide-react";
import DG from "../../assets/DG.jpg";
import VCsir from "../../assets/VCsir.jpg";

const leaders = [
  {
    title: "Hon'ble Chancellor's Desk",
    name: "Shri Vinai Kumar Saxena",
    image: DG,
    message:
      "As you embark on this transformative journey, I encourage you to engage fully, explore new horizons, and harness the resources available to shape your future.",
    link: "https://lg.delhi.gov.in/lg-profile",
    newPage: true,
  },
  {
    title: "Vice Chancellor's Desk",
    name: "Prof. Ashok Kumar Nagawat",
    image: VCsir,
    message:
      " Prof. Ashok Kumar Nagawat is an accomplished academic leader, theoretical physicist, and higher education reformer with 44 years of experience in teaching, research, and university governance.",
    link: "/vice-chancellor",
    newPage: false,
  },
];

const Message = () => {
  return (
    <div className="w-full relative bg-blue-600 bg-opacity-30 font-sans">
      <div
        className="absolute inset-0 z-0 opacity-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bg.png')` }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center md:items-start bg-blue-600 bg-opacity-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all h-full"
            >
              <div className="flex-shrink-0">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>

              <div className="flex flex-col justify-between flex-grow md:ml-6 mt-6 md:mt-0 text-center md:text-left h-full">
                <div>
                  <div className="flex flex-col items-center md:items-start mb-2">
                    <h2 className="text-xl md:text-xl font-bold text-center text-white border-b-4 border-orange-400 pb-3 shadow-sm w-fit mb-1">
                      {leader.title}
                    </h2>
                  </div>

                  <p className="text-white text-sm leading-relaxed mb-4 min-h-[96px] px-2 md:px-0 text-justify">
                    {leader.message}
                  </p>

                  <div className="text-white font-semibold mb-4">
                    ~ {leader.name}
                  </div>
                </div>

                <div>
                  <a
                    target={leader.newPage ? "_blank" : "_self"}
                    href={leader.link}
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-md inline-flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                  >
                    <span>Know More</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Message;
