import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import OrangeLoader from "../PageLoader/OrangeLoader";
import { apiBase } from "../Body/InformationBulletin";
import { fetchSectionNotices } from "../../utils/apiservice";
import { formatDate } from "../../utils/helper";

// Sidebar configuration
const sidebarItems = [
    {
        key: "exam notices",
        title: "Notices",
        description: "All examination-related announcements and circulars.",
    },
    {
        key: "exam fee",
        title: "Fee Link",
        description: "Direct link to the examination fee portal.",
    },
    {
        key: "exam datesheet",
        title: "Datesheet",
        description: "Academic schedules and exam timetables.",
    },
    {
        key: "exam results",
        title: "Result",
        description: "Direct link to the results portal.",
    },
];

// Section key mapping for API
const sectionKeys = sidebarItems.map((item, index) => ({
    key: item.key,
    index,
}));

const ExaminationThird = () => {
    const [activeSection, setActiveSection] = useState(sidebarItems[0].key);

    const { data, isLoading, error } = useQuery({
        queryKey: ["examination-third"],
        queryFn: () => fetchSectionNotices(sectionKeys, apiBase, 10),
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });

    // Map fetched data
    const mappedSections = sidebarItems.map((item, index) => ({
        ...item,
        content:
            data && data[index]
                ? data[index].content.map((notice, idx) => ({
                    sno: idx + 1,
                    name: notice.fileName,
                    link: notice.fileLink,
                    date: formatDate(notice.uploadedAt)
                }))
                : [],
    }));

    const activeContent = mappedSections.find((s) => s.key === activeSection);

    if (isLoading) return <OrangeLoader />;

    return (
        <div className="w-full flex flex-col md:flex-row text-gray-800 md:px-12 px-6 py-10 gap-6">
            {/* Left Sidebar */}
            <aside className="w-full md:w-1/4 bg-gray-50 rounded-lg shadow-md border border-gray-200 p-4 md:sticky md:top-24 h-fit">
                <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center md:text-left">
                    Examination Branch
                </h2>
                <nav className="flex md:flex-col gap-2 flex-wrap justify-center">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => setActiveSection(item.key)}
                            className={`w-full text-left px-4 py-2 rounded-md font-medium transition-colors ${activeSection === item.key
                                    ? "bg-blue-600 text-white shadow"
                                    : "bg-white hover:bg-blue-100 text-gray-700 border"
                                }`}
                        >
                            {item.title}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Right Content Area */}
            <main className="flex-1 bg-white rounded-lg shadow-md border border-gray-200 p-6 overflow-x-auto">
                <h2 className="text-3xl font-semibold text-blue-800 mb-2 lg:mb-3 text-center md:text-left">
                    {activeContent?.title}
                </h2>
                <p className="text-gray-600 text-center md:text-left mb-2 text-xs sm:text-sm md:text-base">
                    {activeContent?.description}
                </p>
                <hr className="mb-5 mt-2 border-blue-500" />

                {error ? (
                    <div className="text-center text-red-500">
                        Error loading data. Please try again later.
                    </div>
                ) : activeContent?.content?.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border-collapse border border-gray-300 rounded-lg overflow-hidden">
                            <thead className="bg-blue-100 text-blue-900 font-semibold">
                                <tr>
                                    <th className="border border-gray-300 px-3 py-2 text-left whitespace-nowrap">
                                        S. No.
                                    </th>
                                    <th className="border border-gray-300 px-3 py-2 text-left">
                                        Title
                                    </th>
                                    {/* <th className="border border-gray-300 px-3 py-2 text-left">
                    Uploaded Date
                  </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {activeContent.content.map((notice, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-blue-50 transition-colors duration-150"
                                    >
                                        <td className="border border-gray-300 px-3 py-2 w-16 text-center">
                                            {notice.sno}
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2 text-blue-700 hover:underline">
                                            {notice.link ? (
                                                <a
                                                    href={notice.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {notice.name} <span className="hidden lg:inline-block">
                                                        -
                                                        ( {notice.date} )
                                                    </span>
                                                </a>
                                            ) : (
                                                notice.name
                                            )}
                                        </td>
                                        {/* <td className="border border-gray-300 px-3 py-2">
                      {formatDate(notice.date)}
                    </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 italic text-sm lg:text-base">
                        No information available at the moment.
                    </p>
                )}
            </main>
        </div>
    );
};



export default ExaminationThird;
