import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNoticesBySection } from "../../hooks/useNoticesBySection";
import StatutoryBodiesLoading from "../ShimmerUI/StatutoryBodiesLoading";
import UploadModal from "../Admin/UploadModal";

const StatutoryBodiesComponent = () => {
  const [activeMainTab, setActiveMainTab] = useState("university court");
  const [activeSectionTab, setActiveSectionTab] = useState("members");
  const [pdfs, setPdfs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const currentRole = sessionStorage.getItem("currentRole");
  const token = sessionStorage.getItem("token");

  const sectionToFetch =
    activeSectionTab === "members" ? `member ${activeMainTab}` : activeMainTab;

  const mainTabs = {
    "university court": "University Court",
    "board of management": "Board of Management",
    "academic council": "Academic Council",
    "finance comittee": "Finance Committee",
  };

  useEffect(() => {
    if (currentRole === "Admin" && token) {
      setIsAdmin(true);
    }
  }, [currentRole, token]);

  const { data, isLoading, error } = useNoticesBySection(
    sectionToFetch,
    false,
    1000,
    1
  );

  useEffect(() => {
    if (data?.data?.notices) {
      setPdfs(data.data.notices);
    } else {
      setPdfs([]);
    }
  }, [data]);

  if (isLoading) {
    return <StatutoryBodiesLoading />;
  }

  if (error)
    return (
      <div className="p-6 text-red-600">
        Error loading notices: {error.message}
      </div>
    );

  return (
    <div className="max-w-6xl mx-[-10px] md:mx-0 p-6 bg-white rounded-lg shadow-md mb-16 md:mb-10 mt-3">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        STATUTORY BODIES
      </h1>

      {/* MAIN TABS */}
      <div className="overflow-x-auto mb-6">
        <div className="flex flex-col md:flex-row flex-nowrap bg-gray-100 md:p-2 rounded-lg gap-2 min-w-max justify-center">
          {Object.keys(mainTabs).map((key) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-lg transition-all duration-200 ${
                activeMainTab === key
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveMainTab(key)}
            >
              {mainTabs[key]}
            </button>
          ))}
        </div>
      </div>

      {/* SUB TABS: Members | Minutes */}
      <div className="md:relative mb-6 border-b text-lg flex flex-col">
        <div className="flex justify-center">
          <button
            className={`px-6 py-3 font-medium ${
              activeSectionTab === "members"
                ? "border-b-2 border-blue-700 text-blue-900"
                : "text-gray-500"
            }`}
            onClick={() => setActiveSectionTab("members")}
          >
            Members
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeSectionTab === "minutes"
                ? "border-b-2 border-blue-700 text-blue-900"
                : "text-gray-500"
            }`}
            onClick={() => setActiveSectionTab("minutes")}
          >
            Minutes of Meeting
          </button>
        </div>

        {isAdmin && (
          <div
            onClick={() => setShowModal(true)}
            className="md:absolute right-0 top-[-10%] my-3 mx-auto
          "
          >
            <button className="flex flex-row items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Upload <Plus size={18} />
            </button>
          </div>
        )}
      </div>

      {/* PDF LISTING */}
      <div className="bg-white rounded-lg shadow-sm mt-2 max-h-[400px] overflow-y-auto">
        {pdfs.length > 0 ? (
          <div className="space-y-4">
            {pdfs.map((file) => (
              <div
                key={file._id}
                className="p-4 border rounded-lg hover:bg-blue-50 transition duration-200"
              >
                <a
                  href={file.fileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 font-medium hover:underline flex items-center"
                >
                  <span className="mr-2">📄</span>
                  {file.fileName}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 border rounded-lg shadow-md bg-white text-gray-600">
            <h3 className="text-xl font-semibold mb-2">
              {mainTabs[activeMainTab]} —{" "}
              {activeSectionTab === "members" ? "Members" : "Minutes"}
            </h3>
            <p className="text-red-600">No PDFs available for this section.</p>
          </div>
        )}
      </div>

      {showModal && (
        <UploadModal
          title={sectionToFetch.toLocaleUpperCase()}
          onClose={() => setShowModal(false)}
          section={sectionToFetch}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default StatutoryBodiesComponent;
