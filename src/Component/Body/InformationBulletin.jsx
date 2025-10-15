import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getInformationBulletinOptions } from "../../features/admin/adminConstant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import UploadModal from "../../features/admin/UploadModal";
import OrangeLoader from "../PageLoader/OrangeLoader";
import NoticeScroller from "../Reusable/NoticeScrollbar";
import { fetchSectionNotices } from "../../utils/apiservice";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const apiBase =
  baseUrl && baseUrl.endsWith("/") ? baseUrl : `${baseUrl || ""}/`;

const sectionKeys = [
  { key: "admission", index: 0 },
  { key: "students", index: 1 },
  { key: "important links", index: 2 },
  { key: "alerts and circulars", index: 3 },
];


const InformationBulletin = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const token = sessionStorage.getItem("token");
  const currentRole = sessionStorage.getItem("currentRole");

  useEffect(() => {
    if (currentRole === "Admin" && token) {
      setIsAdmin(true);
    }
  }, [currentRole, token]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["information-bulletin"],
    queryFn: () => fetchSectionNotices(sectionKeys, apiBase),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const cards = [
    { title: "Admission", content: [], buttonText: "Apply Online" },
    { title: "Students", content: [], buttonText: "Online Fee Services" },
    { title: "Important Links", content: [], buttonText: "Online Portal" },
    { title: "Notices", content: [], buttonText: "View Notices" },
  ];

  // Documents to inject manually (Admission section extras)
  const admissionManuals = [
    {
      name: "Refund form 2025 admissions",
      link: "https://drive.google.com/file/d/1AQC5LFPX3j4B0hX7Ut1avU6n1qughj3z/view",
    },
    {
      name: "Information Bulletin 2025",
      link: "https://drive.google.com/file/d/16mO1wuwK40lwRe4uAz5_iDT5aqtqBFsY/view",
    },
    {
      name: "Commencement of Classes for New Batch - Academic Session 2025-26",
      link: "https://drive.google.com/file/d/1vc-p-RJUSlpxtyCs5d-QglEr6nxwoXsN/view",
    },
    {
      name: "How to Pay Your Admission Fees Online (Step-by-Step Guide)",
      link: "https://drive.google.com/file/d/1dV-ujr-aZGG4uNb20h229NpBM8McyC-F/view",
    },
  ];

  if (data) {
    data.forEach((section) => {
      const notices = section.content.map((notice) => ({
        name: notice.fileName,
        link: notice.fileLink,
      }));

      if (section.index === 0) {
        // Admission section = manuals + fetched notices
        cards[section.index].content = [...admissionManuals, ...notices];
      } else {
        cards[section.index].content = notices;
      }
    });
  }

  if (isLoading) {
    return <OrangeLoader />;
  }

  return (
    <div className="lg:px-10 md:px-5 sm:px-3 px-10 mx-auto py-4">
      <div className="relative mb-8 mt-10 md:mb-10">
        <h2 className="text-4xl font-extrabold text-center text-blue-900 font-sans">
          Information Bulletin
          <div className="mt-2 mx-auto w-20 h-1 bg-blue-600 rounded"></div>
        </h2>

        {isAdmin && (
          <>
            <button
              onClick={() => setShowModal(true)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-3 rounded-full text-sm hidden md:block md:mr-10 shadow-sm shadow-blue-400 transition-all duration-200 ease-in-out hover:shadow-md hover:shadow-blue-600 group hover:bg-blue-500"
            >
              <div className="flex flex-row items-center justify-center">
                <div className="relative w-6 h-6 flex items-center justify-center mr-2">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="absolute group-hover:scale-0 text-base transition-scale duration-300 ease-in-out"
                  />
                  <FontAwesomeIcon
                    icon={faFileCirclePlus}
                    className="absolute scale-0 group-hover:scale-105 text-base transition-scale duration-300 ease-in-out"
                  />
                </div>
                <span>Upload</span>
              </div>
            </button>

            <div className="mt-4 md:hidden flex justify-center">
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
              >
                Upload
              </button>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-blue-50 rounded-lg shadow-lg overflow-hidden flex flex-col"
            style={{ height: "400px" }}
          >
            <h3 className="text-xl font-semibold px-3 py-2 text-blue-800 border-b border-blue-200 text-center">
              <Link
                to={`/informationbulletin?section=${encodeURIComponent(
                  sectionKeys[index]?.key || ""
                )}`}
                className="hover:underline focus:underline outline-none"
              >
                {card.title}
              </Link>
            </h3>

            <div className="relative flex-grow overflow-hidden group p-4">
              <NoticeScroller
                items={card.content}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          setShowModal={setShowModal}
          showModal={showModal}
          title={"Information Bulletin Uploads"}
          sectionArray={getInformationBulletinOptions}
        />
      )}

      {/* Scroll + Gradient Label Styles */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateY(20%); }
          100% { transform: translateY(-100%); }
        }

        .animate-scroll {
          animation: scroll linear infinite;
          will-change: transform;
          display: inline-block;
        }

        .group-hover\\:paused-scroll:hover {
          animation-play-state: paused;
        }

        .animated-label {
          font-size: 12px;
          font-weight: bold;
          background: linear-gradient(90deg, red, green, blue, magenta);
          background-size: 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s infinite linear;
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default InformationBulletin;
