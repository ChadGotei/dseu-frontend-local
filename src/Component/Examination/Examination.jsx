import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HeadingText from "../Reusable/HeadingText";
import { useExaminations } from "../../react-query/hooks/queryAndMutations";
import ExaminationLoading from "../ShimmerUI/ExaminationLoading";

const Examination = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const rawSection = params.get("section") || "notices";

  // mapping frontend url sections with the backend enum sections
  const sectionMap = {
    notices: "exam notices",
    results: "exam results",
    datesheet: "exam datesheet",
    fee: "exam fee",
  };

  const section = sectionMap[rawSection] || "exam notices";

  const [selectedYear, setSelectedYear] = useState("2025");

  const sectionHeadings = {
    "exam notices": "Examination Notices",
    "exam results": "Examination Results",
    "exam datesheet": "Examination Datesheet",
    "exam fee": "Examination Fee Links",
  };

  const { data, isLoading, isError, error } = useExaminations(section);

  useEffect(() => {
    if (isError && import.meta.env.DEV) {
      console.error("Examination fetch error:", error);
    }
  }, [isError, error]);

  const heading = sectionHeadings[section] || "Examination Notices";

  return (
    <div className="py-8 sm:py-10 px-3 sm:px-10 bg-[#f8fafc]">
      <HeadingText heading={heading} headingCN="text-blue-900" />

      {/* Table */}
      <div className="max-w-5xl mx-auto mt-6 sm:mt-8 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="flex justify-between bg-blue-900 text-white text-xs sm:text-sm md:text-base font-semibold px-3 sm:px-6 py-2 sm:py-3">
          <div className="flex-1">Title/Notices</div>
          <div className="w-32 sm:w-40 text-right">Uploading Date</div>
        </div>

        <div className="divide-y divide-gray-200 text-xs sm:text-sm md:text-base">
          {isLoading ? (
            <ExaminationLoading />
          ) : isError ? (
            <div className="text-center py-6 text-red-500 text-sm">
              Failed to fetch examination data.
            </div>
          ) : data?.length > 0 ? (
            data.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center px-3 sm:px-6 py-2.5 sm:py-3 hover:bg-blue-50 transition"
              >
                {(item.link || item.fileLink) ?
                  <a
                    href={item.fileLink || item.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline flex-1 pr-2"
                  >
                    {item.title}
                  </a>

                  : <div>{item.title}</div>
                }
                <div className="w-32 sm:w-40 text-right text-gray-700">
                  {new Date(item.createdAt).toLocaleDateString("en-IN")}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              No notices found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Examination;
