import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getInformationBulletinOptions } from "../../features/admin/adminConstant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import UploadModal from "../../features/admin/UploadModal";
import OrangeLoader from "../PageLoader/OrangeLoader";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiBase =
  baseUrl && baseUrl.endsWith("/") ? baseUrl : `${baseUrl || ""}/`;

const sectionKeys = [
  { key: "admission", index: 0 },
  { key: "students", index: 1 },
  { key: "important links", index: 2 },
  { key: "alerts and circulars", index: 3 },
];

const fetchSectionNotices = async () => {
  const results = await Promise.all(
    sectionKeys.map(async (section) => {
      try {
        const res = await axios.get(
          `${apiBase}notice?section=${encodeURIComponent(
            section.key
          )}&limit=50&page=1`
        );
        return {
          index: section.index,
          content: res.data?.data?.notices || [],
        };
      } catch (error) {
        console.error(
          `Failed to fetch notices for section "${section.key}":`,
          error.message || error
        );
        return {
          index: section.index,
          content: [],
        };
      }
    })
  );
  return results;
};

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
    queryFn: fetchSectionNotices,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const cards = [
    { title: "Admission", content: [], buttonText: "Apply Online" },
    { title: "Students", content: [], buttonText: "Online Fee Services" },
    { title: "Important Links", content: [], buttonText: "Online Portal" },
    { title: "Notices", content: [], buttonText: "View Notices" },
  ];

  // Documents to inject manually
  const admissionManuals = [
    {
      name: "Refund form 2025 admissions",
      link: "https://drive.google.com/file/d/1AQC5LFPX3j4B0hX7Ut1avU6n1qughj3z/view",
    },
    {
      name: "Guidelines of Diploma Admission through Multiple Entry Multiple Exit (Against Vacant Seats)",
      link: "/diploma_lateral_entry.pdf"
    },
    {
      name: "B.Tech Spot Admissions 2025-26: Multi-Entry Route for Diploma Passed Students",
      link: "https://drive.google.com/file/d/1hnO-QUNHQDuttY6EOMDaMP13eIW47Vuz/view"
    },
    {
      link: "Walk-in Admissions for Diploma programs are open till 30th September 2025 (AY 2025-26)"
    },
    // {
    //   name: "Guidelines for Spot Admissions on 16th September - Diploma programs 2025-26",
    //   link: "https://drive.google.com/file/d/1uwKQm9D6AKpIKgbJoQBChuEelwduV3-w/view"
    // },
    {
      name: "Guidelines for Walk-In Admissions – UG, PG & B.Tech programs (15–30 September)",
      link: "https://drive.google.com/file/d/1Zvh62-LBf9XaLOw0-844tvTHgeQGrOA8/view"
    },
    {
      name: "Diploma waiting list for 15th September",
      link: "https://drive.google.com/file/d/1aq8iR0kMsgmGVOj3h_O8fcsFct-1A10p/view"
    },
    {
      name: "Diploma waiting list students may get admission opportunity as per availability of seats."
    },
    {
      name: "Admission Offer for Waitlisted Candidates - Diploma Programs (FY 2025-26)",
      link: "https://drive.google.com/file/d/1bBQ4aLtFtTM3Nc7Uq6GjkYObb3UB14FX/view"
    },
    // {
    //   name: "Diploma waiting list for 11th September",
    //   link: "https://drive.google.com/file/d/1KTudgnNbT7ju78RXZPyCWRrA0gbQks1p/view"
    // },
    // {
    //   name: "Diploma waiting list - 10th September",
    //   link: "https://drive.google.com/file/d/1Wt_McSdHA4YMt4ldFkCtsGTfxTcKB_mS/view"
    // },
    {
      name: "UG Sliding Allocation result is now live.",
      link: "/UG_SLIDING_ALLOCATION.pdf",
    },
    {
      name: "Btech Internal Sliding Allocation result",
      link: "/BTECH_SLIDING_ALLOCATION.pdf",
    },
    {
      name: "Information Bulletin 2025",
      link: "https://drive.google.com/file/d/16mO1wuwK40lwRe4uAz5_iDT5aqtqBFsY/view",
    },
    {
      name: "Registrations are now open for B.S. Optometry and B.Des Jewellery Design programs until 3rd September",
      link: "https://dseuadm.samarth.edu.in/ug/",
    },
    {
      name: "Seat Confirmation Process - PG",
      link: "/seat-confirmation-pg.pdf",
    },
    {
      name: "Commencement of Classes for New Batch - Academic Session 2025-26",
      link: "https://drive.google.com/file/d/1vc-p-RJUSlpxtyCs5d-QglEr6nxwoXsN/view",
    },
    {
      name: "All candidates who have already paid the fees in Round 1 do not need to pay again, even after upgradation.",
    },
    {
      name: "Postgraduate results are now available!",
      link: "https://dseu.ac.in/admission/result/pg",
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
        // Admission section
        cards[section.index].content = [...admissionManuals, ...notices];
      } else if (section.index === 2) {
        // Important Links section
        cards[section.index].content = [admissionManuals[0], ...notices];
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
              {isLoading ? (
                <div className="text-center text-gray-500 italic">
                  Loading...
                </div>
              ) : error ? (
                <div className="text-center text-red-500">
                  Error loading notices
                </div>
              ) : card.content.length === 0 ? (
                <div className="my-auto p-2 text-center text-gray-500 italic">
                  No Notices available for now.
                </div>
              ) : (
                <div className="animate-scroll group-hover:paused-scroll">
                  <ul className="space-y-2">
                    {card.content.map((item, idx) => (
                      <li
                        key={idx}
                        className="hover:bg-blue-100 rounded py-1 px-2 transition-colors duration-200"
                      >
                        <a
                          href={item.link}
                          target={item.samePage ? "_self" : "_blank"}
                          rel={
                            item.samePage ? undefined : "noopener noreferrer"
                          }
                          className="text-gray-700 hover:text-blue-900 flex items-center w-full"
                        >
                          {item.name}
                          <span className="ml-2 animated-label">NEW</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

      <style>{`
        @keyframes scroll {
          0% { transform: translateY(20%); }
          100% { transform: translateY(-100%); }
        }

        .animate-scroll {
          animation: scroll linear 30s infinite;
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
