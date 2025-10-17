import { useState } from 'react';

const Notices = () => {
  const notices = [
    {
      id: 1,
      title: "Ph.D. Admission 2025-26: Online Application Open",
      date: "2025-01-15",
      category: "Admission",
      description: "Applications are invited for Ph.D. programs in various disciplines. Last date for submission: March 31, 2025.",
      attachment: "/research/demo_research_tab.pdf",
      important: true,
    },
    {
      id: 2,
      title: "Revised Research Ordinance - 2025",
      date: "2025-01-10",
      category: "Regulation",
      description: "The university has revised the research ordinance. All Ph.D. scholars are advised to go through the updated regulations.",
      attachment: "/research/demo_research_tab.pdf",
      important: true,
    },
    {
      id: 3,
      title: "DRC Meeting Scheduled - February 2025",
      date: "2025-01-08",
      category: "Meeting",
      description: "The Doctoral Research Committee meeting will be held on February 5, 2025 at 2:00 PM in Conference Hall.",
      attachment: null,
      important: false,
    },
    {
      id: 4,
      title: "Research Methodology Workshop - Registration Open",
      date: "2025-01-05",
      category: "Workshop",
      description: "A 3-day workshop on Research Methodology will be conducted from January 25-27, 2025. Limited seats available.",
      attachment: "/research/demo_research_tab.pdf",
      important: false,
    },
    {
      id: 5,
      title: "Submission Deadline Extended for Progress Reports",
      date: "2024-12-28",
      category: "Academic",
      description: "The deadline for submission of annual progress reports has been extended to January 15, 2025.",
      attachment: null,
      important: false,
    },
    {
      id: 6,
      title: "Call for Research Proposals - DST Funding",
      date: "2024-12-20",
      category: "Funding",
      description: "Faculty members are invited to submit research proposals for DST funding. Last date: February 28, 2025.",
      attachment: "/research/demo_research_tab.pdf",
      important: true,
    },
    {
      id: 7,
      title: "Thesis Submission Guidelines - Updated",
      date: "2024-12-15",
      category: "Academic",
      description: "Updated guidelines for thesis submission and plagiarism check. All candidates must follow the new format.",
      attachment: "/research/demo_research_tab.pdf",
      important: false,
    },
    {
      id: 8,
      title: "Holiday List - Research Office",
      date: "2024-12-10",
      category: "General",
      description: "Research office will remain closed on the following dates. Plan your visits accordingly.",
      attachment: "/research/demo_research_tab.pdf",
      important: false,
    },
  ];

  const categories = ["All", "Admission", "Regulation", "Meeting", "Workshop", "Academic", "Funding", "General"];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNotices = selectedCategory === "All"
    ? notices
    : notices.filter(notice => notice.category === selectedCategory);

  return (
    <div className="w-full px-6 md:px-10 py-10 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-10 text-center">
        Research Notices & Orders
      </h1>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition ${selectedCategory === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-300"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Notices List */}
      <div className="space-y-6">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-l-4 ${notice.important ? "border-red-500" : "border-blue-500"
              }`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg md:text-xl font-bold text-blue-900">
                    {notice.title}
                  </h3>
                  {notice.important && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                      Important
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(notice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {notice.category}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{notice.description}</p>
              </div>
            </div>
            {notice.attachment && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a
                  href={notice.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Notice
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredNotices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No notices found in this category.</p>
        </div>
      )}

      {/* Archive Notice */}
      <div className="mt-10 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Looking for older notices?</h3>
            <p className="text-gray-600 text-sm">Check our archive for notices from previous years.</p>
          </div>
          <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition font-medium">
            View Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notices;