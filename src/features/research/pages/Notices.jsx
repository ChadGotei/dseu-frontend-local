import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { CalendarDays } from "lucide-react";
import { useNoticesBySection } from "../../../hooks/useNoticesBySection";
import { Pagination } from "../../../Component/Reusable/Pagination";
import SearchAndUpload from "../../../Component/Reusable/SearchAndUpload";
import NoticeShimmer from "../../../Component/ShimmerUI/ResearchNoticesLoading";
import UploadModal from "../../admin/UploadModal";

const Notices = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [notices, setNotices] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [inputField, setInputField] = useState("");

  const token = sessionStorage.getItem("token");
  const currentRole = sessionStorage.getItem("currentRole");

  useEffect(() => {
    if (currentRole === "Admin" && token) {
      setIsAdmin(true);
    }
  }, [currentRole, token]);

  const { data, isLoading } = useNoticesBySection("research", false, limit, page, inputField);

  useEffect(() => {
    if (data && data.data) {
      setNotices(data.data.notices || []);
      setTotalPages(data.metadata.totalPages || 1);
    }
  }, [data]);

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    setPage(newPage);
  };

  return (
    <div className="w-full px-6 md:px-10 py-10 text-gray-800">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 text-center mb-4">
          Research Notices & Orders
        </h1>
        <div className="w-full md:w-[60%]">
          <SearchAndUpload
            isAdmin={isAdmin}
            inputField={inputField}
            setInputField={setInputField}
            includeUpload={true}
            handleShowModal={() => setShowModal(true)}
            containerClass="flex flex-row justify-between md:gap-3 gap-2"
          />
        </div>
      </div>

      {isLoading ? (
        <NoticeShimmer count={3} />
      ) : notices && notices.length > 0 ? (
        <>
          <div className="flex flex-col justify-center items-center gap-2">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="group border border-gray-200 bg-white rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-[2px] w-full sm:w-[85%] lg:w-[80%]"
              >
                <div className="flex flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {notice.title}
                    </h3>

                    {notice.uploadedAt && (
                      <div className="flex items-center gap-2 mt-1 text-xs md:text-sm text-gray-500">
                        <CalendarDays className="w-4 h-4 text-gray-400" />
                        <span>
                          {new Date(notice.uploadedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}

                    {notice.fileName && (
                      <p className="mt-2 text-sm text-blue-800 truncate">{notice.fileName}</p>
                    )}
                  </div>

                  {notice.fileLink && (
                    <a
                      href={notice.fileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-3 py-1.5 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition"
                    >
                      <FaEye className="w-4 h-4" />
                      View
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-12 text-gray-600 text-sm sm:text-base md:text-lg">
          No research notices found.
        </div>
      )}

      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          setShowModal={setShowModal}
          section="research"
          title="Upload Research Notice"
          showModal={showModal}
          mannualArchive={false}
        />
      )}
    </div>
  );
};

export default Notices;
