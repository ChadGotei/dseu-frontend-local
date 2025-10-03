import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import OrangeLoader from "../PageLoader/OrangeLoader";
import NoticeScroller from "../Reusable/NoticeScrollbar";
import { apiBase } from "../Body/InformationBulletin";

import { fetchSectionNotices } from '../../utils/apiservice'
import {
  examinationCards as cardsTemplate,
  examinationSectionKeys as sectionKeys
} from "../../constants/EXAMINATION.JS";

const Examination = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["examination-bulletin"],
    queryFn: () => fetchSectionNotices(sectionKeys, apiBase, 5),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Clone the template cards to inject data
  const cards = cardsTemplate.map((card) => ({ ...card }));

  // Inject fetched notices into cards
  if (data) {
    data.forEach((section) => {
      const notices = section.content.map((notice) => ({
        name: notice.fileName,
        link: notice.fileLink,
      }));
      cards[section.index].content = notices;
    });
  }

  if (isLoading) {
    return <OrangeLoader />;
  }

  return (
    <div className="lg:px-10 md:px-5 sm:px-3 px-10 mx-auto py-4 mb-20">
      <div className="relative mb-8 mt-10 md:mb-10">
        <h2 className="text-4xl font-extrabold text-center text-blue-900 font-sans">
          Examination Bulletin
          <div className="mt-2 mx-auto w-20 h-1 bg-blue-600 rounded"></div>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 sm:mx-10 lg:mx-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-blue-50 rounded-lg shadow-lg overflow-hidden flex flex-col"
            style={{ height: "400px" }}
          >
            {/* Card Title */}
            <h3 className="text-xl font-semibold px-3 py-2 text-blue-800 border-b border-blue-200 text-center">
              <Link
                to={`/examination?section=${encodeURIComponent(
                  sectionKeys[index]?.key || ""
                )}`}
                className="hover:underline focus:underline outline-none"
              >
                {card.title}
              </Link>
            </h3>

            {/* Notices Scrollable Area */}
            <div className="relative flex-grow overflow-hidden group p-4">
              <NoticeScroller
                items={card.content}
                isLoading={isLoading}
                error={error}
              />
            </div>

            {/* Footer Button */}
            {/* <div className="mt-auto">
              <Link
                to={card.link}
                className="block text-center w-full py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium text-sm transition rounded-b-lg"
              >
                {card.buttonText}
              </Link>
            </div> */}
          </div>
        ))}
      </div>

      {/* Scroll animation */}
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

export default Examination;
