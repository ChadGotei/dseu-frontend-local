import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HeadingText from "../Reusable/HeadingText";

const Examination = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const section = params.get("section") || "notices";

  const [selectedYear, setSelectedYear] = useState("2025");

  const sectionHeadings = {
    notices: "Examination Notices",
    results: "Examination Results",
    datesheet: "Examination Datesheet",
    feeLink: "Examination Fee Links",
  };

  // TODO: Would come from backend
  const demoData = {
    notices: [
      {
        title: "Oral Examination/Evaluation of Ph.D. thesis",
        link: "#",
        date: "13-10-2025",
      },
      {
        title:
          "Meeting of the Unfair Means Cases reported during MBBS II Prof. Annual Examination August-September 2025 (Theory) - Intimation to Students concerned",
        link: "#",
        date: "13-10-2025",
      },
      {
        title: "Notification - Student Promotion to the Next Academic Session",
        link: "#",
        date: "08-10-2024",
      },
    ],
    results: [
      {
        title: "Result - B.Tech CSE 6th Semester May 2025",
        link: "#",
        date: "05-10-2025",
      },
      {
        title: "Result - Diploma Mechanical Engineering 4th Semester",
        link: "#",
        date: "28-09-2024",
      },
    ],
    datesheet: [
      {
        title: "Datesheet - End Term Exams December 2025",
        link: "#",
        date: "10-10-2025",
      },
      {
        title: "Re-appear Exam Schedule - October 2024",
        link: "#",
        date: "03-10-2024",
      },
    ],
    feeLink: [],
  };

  const heading = sectionHeadings[section] || "Examination";
  const years = ["2025", "2024", "2023"];

  const filteredData = demoData[section]?.filter((item) =>
    item.date.endsWith(selectedYear)
  );

  return (
    <div className="py-8 sm:py-10 px-3 sm:px-10 bg-[#f8fafc]">
      <HeadingText heading={heading} headingCN="text-blue-900" />

      {/* Year selector aligned to left */}
      <div className="max-w-5xl mx-auto flex justify-start mt-8 sm:mt-10">
        <div className="flex items-center space-x-3">
          <label
            htmlFor="year"
            className="text-blue-900 font-medium text-sm sm:text-base"
          >
            Select Year:
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-blue-900 text-blue-900 rounded-lg px-4 py-2 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-5xl mx-auto mt-6 sm:mt-8 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="flex justify-between bg-blue-900 text-white text-xs sm:text-sm md:text-base font-semibold px-3 sm:px-6 py-2 sm:py-3">
          <div className="flex-1">Title/Notices</div>
          <div className="w-32 sm:w-40 text-right">Uploading Date</div>
        </div>

        <div className="divide-y divide-gray-200 text-xs sm:text-sm md:text-base">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center px-3 sm:px-6 py-2.5 sm:py-3 hover:bg-blue-50 transition"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline flex-1 pr-2"
                >
                  {item.title}
                </a>
                <div className="w-32 sm:w-40 text-right text-gray-700">
                  {item.date}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              No records found for {selectedYear}.
            </div>
          )}
        </div>
      </div>

      <p className="text-center text-gray-600 mt-3 sm:mt-4 text-xs sm:text-sm italic">
        *Click on the title to download the PDF
      </p>
    </div>
  );
};

export default Examination;
