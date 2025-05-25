import { useState } from "react";
import { ncc1 } from "../../assets/student-services/student-services.js";

const Ncc = () => {
  const [activeTab, setActiveTab] = useState("About");

  const tabContent = {
    About: (
      <div>
        <h2 className="font-semibold text-xl mb-4">About NCC</h2>
        <p className=" text-justify">
          The National Cadet Corps (NCC) is a youth development movement in
          India. It aims to groom the youth into disciplined and patriotic
          citizens, providing leadership opportunities, fostering community
          service, and making the youth socially responsible citizens.
        </p>
        <p className="mt-4 text-justify">
          At our university, NCC is an integral part of campus life, offering
          cadets a unique opportunity to serve the nation while enhancing their
          personal development. We are proud to host the NCC across various DSEU
          campuses, where cadets actively engage in a variety of activities that
          promote teamwork, leadership, and a sense of social responsibility.
        </p>
      </div>
    ),
    Notices: (
      <div>
        <h2 className="font-semibold text-xl mb-4">Recent Notices</h2>
        <ul>
          <li className="text-slate-600">Notices will be uploaded soon.</li>
        </ul>
      </div>
    ),
    Coordinator: (
      <div className="flex items-center justify-center space-x-4 flex-col md:flex-row md:gap-10 gap-3">
        <h2 className="font-semibold text-xl mb-4 md:hidden block">
          Coordinator Details
        </h2>
        <img
          src="https://placehold.co/600x400"
          alt="Coordinator"
          className="md:w-44 md:h-44 w-40 h-40 rounded-full object-cover mb-10"
        />
        <div className="text-left">
          <h2 className="font-semibold text-xl mb-4 hidden md:block">
            Coordinator Details
          </h2>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">
              Name: <span className="font-normal">Demo Name</span>
            </p>
            <p className="font-semibold">
              Position: <span className="font-normal">Demo Designation</span>
            </p>
            <p className="font-semibold">
              Contact: <span className="font-normal">+91 1234567890</span>
            </p>
            <p className="font-semibold">
              Email: <span className="font-normal">demo@ncc.com</span>
            </p>
          </div>
          <p className="mt-4 text-justify">
            Demo Name is an experienced officer leading the NCC activities at
            our university. With years of service in the NCC, Demo Name is
            dedicated to fostering leadership, discipline, and a spirit of
            community service among cadets. For any queries, feel free to reach
            out to them.
          </p>
        </div>
      </div>
    ),
  };

  const tabs = ["About", "Notices"];

  return (
    <div className="relative md:p-6 sm:p-2 p-0 flex flex-col items-center justify-center my-10 mb-16 md:mb-12">
      <img
        src={ncc1}
        className="w-[80%] object-cover max-h-[200px] rounded-xl"
      />
      <div className="absolute w-[80%] max-h-[200px] top-6 bottom-6 rounded-xl flex items-center justify-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold">NCC</h1>
      </div>

      <div className="mt-8 w-[80%]">
        <div className="flex justify-center gap-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-blue-500 text-white scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="rounded-xl p-6 text-center text-gray-800 font-medium">
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default Ncc;
