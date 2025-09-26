import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { useNoticesBySection } from "../../hooks/useNoticesBySection";
import { jobPortalTabs as tabs } from "../../constants/JOBPORTAL.JS";
import UploadModal from "../../features/admin/UploadModal";;
import { Link } from "react-router-dom";

const JobListings = () => {
  const [activeTab, setActiveTab] = useState("academic positions");
  const [entriesCount, setEntriesCount] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [noticeData, setNoticeData] = useState([]);

  const { data, isLoading } = useNoticesBySection(activeTab, false, 1000, 1);

  const currentRole = sessionStorage.getItem("currentRole");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (currentRole === "Admin" && token) {
      setIsAdmin(true);
    }

    if (data?.data?.notices && data.data.notices.length > 0) {
      setNoticeData(data.data.notices);
    } else {
      setNoticeData([]);
    }
  }, [currentRole, token, data, activeTab]);

  const getActiveData = () => {
    if (!noticeData || noticeData.length === 0) return [];

    return [...noticeData].sort(
      (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
    );
  };

  return (
    <div className="flex pb bg-gray-50 rounded-md flex-col md:flex-row">
      {/* Side Panel */}
      <div className="xl:w-64 w-48 bg-white shadow-lg mt-6 rounded-3xl hidden md:block text-sm xl:text-[1rem] whitespace-nowrap max-h-fit pb-10">
        <div className="p-4 bg-blue-700 text-white font-bold text-lg">
          Job Categories
        </div>
        <div className="flex flex-col">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 text-left transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-100 text-black"
                  : "hover:bg-blue-100 text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <MobileBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-3 md:p-4 lg:p-6 overflow-scroll md:overflow-hidden">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <select
                value={entriesCount}
                onChange={(e) => setEntriesCount(Number(e.target.value))}
                className="border rounded p-1"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="text-center p-4">Loading...</div>
            ) : getActiveData().length > 0 ? (
              <>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-700 text-white text-sm md:text-md">
                      <th className="p-2 text-left border whitespace-nowrap">
                        S. No.
                      </th>
                      <th className="p-2 text-left border">Title</th>
                      <th className="p-2 text-left border">Notification</th>
                      <th className="p-2 text-left border">No of Vacancies</th>
                      <th className="p-2 text-left border whitespace-nowrap">
                        Starting Date
                      </th>
                      <th className="p-2 text-left border">Last Date</th>
                      <th className="p-2 text-left border">Apply</th>
                    </tr>
                  </thead>
                  <tbody className="text-[0.8rem] md:text-sm">
                    {getActiveData().map((item, index) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="p-2 border">{index + 1}</td>
                        <td className="p-2 border">{item.fileName}</td>
                        <td className="p-2 border">
                          <a
                            href={item.fileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            Notice{" "}
                            <FileText className="text-red-500" size={16} />
                          </a>
                        </td>
                        <td className="p-2 border">
                          {item.vacancies ? item.vacancies : "-"}
                        </td>
                        <td className="p-2 border">
                          {item.uploadedAt
                            ? new Date(item.uploadedAt).toLocaleDateString(
                                "en-GB"
                              )
                            : "-"}
                        </td>
                        <td className="p-2 border">
                          {item.endDate
                            ? new Date(item.endDate).toLocaleDateString("en-GB")
                            : "-"}
                        </td>
                        <td className="p-2 border">
                          <a
                            href={item?.apply}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {item?.apply ? "Apply" : "-"}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Archive Button */}
                <div className="mt-4 text-right">
                  <Link
                    to={`/recruitment/archive/${encodeURIComponent(activeTab)}`}
                    className="inline-block bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Archived
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center p-4">
                {tabs.find((tab) => tab.id === activeTab)?.empty ||
                  "No data available."}
                <div className="mt-4 text-center">
                  <Link
                    to={`/recruitment/archive/${encodeURIComponent(activeTab)}`}
                    className="inline-block bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Archived
                  </Link>
                </div>
              </div>
            )}

            {/* Upload Button for Admin */}
            {isAdmin && (
              <div className="flex justify-end mt-4">
                <button
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-full text-sm md:text-base hover:bg-blue-700 transition-colors duration-300 shadow-md"
                  onClick={() => setShowModal(true)}
                >
                  + Upload PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          setShowModal={setShowModal}
          showModal={showModal}
          section={activeTab}
          isEndDate
          isApplyLink
          title={activeTab.toLocaleUpperCase()}
          veryLargeModal={true}
          isVacancy
        />
      )}
    </div>
  );
};

const MobileBar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-2 overflow-x-auto my-4 mx-2 md:hidden py-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`p-1 flex-1 text-center text-sm font-medium transition-colors duration-200 rounded-lg shadow-sm ${
            activeTab === tab.id
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default JobListings;
