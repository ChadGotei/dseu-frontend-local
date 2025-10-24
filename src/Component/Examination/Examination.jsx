import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import HeadingText from "../Reusable/HeadingText";
import ExaminationLoading from "../ShimmerUI/ExaminationLoading";

const Examination = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const rawSection = params.get("section") || "notices";

  // mapping frontend url sections with readable names
  const sectionMap = {
    notices: "exam notices",
    results: "exam results",
    datesheet: "exam datesheet",
    fee: "exam fee",
  };

  const section = sectionMap[rawSection] || "exam notices";
  const [isLoading, setIsLoading] = useState(true);

  const sectionHeadings = {
    "exam notices": "Examination Notices",
    "exam results": "Examination Results",
    "exam datesheet": "Examination Datesheet",
    "exam fee": "Examination Fee Links",
  };

  // Simulate a loading delay for shimmer effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [section]);

  // 🎯 DEMO STATIC DATA
  const demoData = useMemo(() => {
    const today = new Date();
    const pdf =
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

    switch (section) {
      case "exam notices":
        return [
          {
            title: "Notice: Re-evaluation process for Semester II exams (test)",
            fileLink: pdf,
            createdAt: new Date(today.setDate(today.getDate() - 1)),
          },
          {
            title:
              "Important: Internal assessment submission deadline extended (test)",
            fileLink: pdf,
            createdAt: new Date(today.setDate(today.getDate() - 3)),
          },
          {
            title: "Holiday Notice: University closed on 31st October (test)",
            fileLink: pdf,
            createdAt: new Date(today.setDate(today.getDate() - 5)),
          },
        ];

      case "exam results":
        return [
          {
            title: "Result: Diploma in Computer Engineering (Jan–June 2025) (test only)",
            fileLink: pdf,
            createdAt: new Date(today.setDate(today.getDate() - 2)),
          },
          {
            title: "Result: BCA Semester IV (May 2025) (test ony)",
            fileLink: pdf,
            createdAt: new Date(today.setDate(today.getDate() - 4)),
          },
          {
            title: "Result: B.Tech Semester VI (April 2025) (test only)",
            fileLink: pdf,
            createdAt: new Date(today.setDate(today.getDate() - 6)),
          },
        ];

      case "exam datesheet":
        return [
          {
            title: "Datesheet: B.Tech Semester VI (Nov 2025 Exams) (test only)",
            fileLink: pdf,
            createdAt: new Date(today.setDate(today.getDate() - 1)),
          },
          {
            title: "Datesheet: Diploma in ECE (Nov 2025) (test only)",
            fileLink: pdf,
            createdAt: new Date(today.setDate(today.getDate() - 2)),
          },
          {
            title: "Datesheet: BCA Semester V (Nov 2025) (test only)",
            fileLink: pdf,
            createdAt: new Date(today.setDate(today.getDate() - 3)),
          },
        ];

      case "exam fee":
        return []; // per your request, no demo data

      default:
        return [];
    }
  }, [section]);

  const heading = sectionHeadings[section] || "Examination Notices";

  return (
    <div className="py-8 sm:py-10 px-3 sm:px-10 bg-[#f8fafc]">
      <HeadingText heading={heading} headingCN="text-blue-900" />

      {/* Table */}
      <div className="max-w-5xl mx-auto mt-6 sm:mt-8 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="flex justify-between bg-blue-900 text-white text-xs sm:text-sm md:text-base font-semibold px-3 sm:px-6 py-2 sm:py-3">
          <div className="flex-1">Title / Notices</div>
          <div className="w-32 sm:w-40 text-right">Uploading Date</div>
        </div>

        <div className="divide-y divide-gray-200 text-xs sm:text-sm md:text-base">
          {isLoading ? (
            <ExaminationLoading />
          ) : demoData.length > 0 ? (
            demoData.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center px-3 sm:px-6 py-2.5 sm:py-3 hover:bg-blue-50 transition"
              >
                {item.fileLink ? (
                  <a
                    href={item.fileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline flex-1 pr-2"
                  >
                    {item.title}
                  </a>
                ) : (
                  <div>{item.title}</div>
                )}
                <div className="w-32 sm:w-40 text-right text-gray-700">
                  {new Date(item.createdAt).toLocaleDateString("en-IN")}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              No links found for this section.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Examination;
