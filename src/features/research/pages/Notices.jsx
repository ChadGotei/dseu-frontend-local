import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNoticesBySection } from "../../../hooks/useNoticesBySection";
import { Pagination } from "../../../Component/Reusable/Pagination";
import SearchAndUpload from "../../../Component/Reusable/SearchAndUpload";
import NoticeShimmer from "../../../Component/ShimmerUI/ResearchNoticesLoading";
import UploadModal from "../../admin/UploadModal";

const Notices = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [notices, setNotices] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [inputField, setInputField] = useState("");
  const [query, setQuery] = useState("");

  const token = sessionStorage.getItem("token");
  const currentRole = sessionStorage.getItem("currentRole");

  useEffect(() => {
    if (currentRole === "Admin" && token) {
      setIsAdmin(true);
    }
  }, [currentRole, token]);

  const { data, isLoading } = useNoticesBySection(
    "research",
    false,
    limit,
    page,
    query
  );

  useEffect(() => {
    if (data && data.data) {
      setNotices(data.data.notices || []);
      setTotalPages(data.metadata.totalPages || 1);
    }
  }, [data]);

  const handleSearch = () => {
    setQuery(inputField.trim());
    setPage(1);
  };

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    setPage(newPage);
  };

  const handleClearFilter = () => {
    setQuery("");
    setInputField("");
    setPage(1);
  };

  return (
    <div className="w-full px-6 md:px-10 py-10 text-gray-800">
      {/* Page Header */}
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
            handleSearch={handleSearch}
            handleClearFilter={handleClearFilter}
            containerClass="flex flex-row justify-between md:gap-3 gap-2"
          />
        </div>
      </div>

      {isLoading ? (
        <NoticeShimmer count={3} />
      ) : notices && notices.length > 0 ? (
        <>
          <div className="overflow-x-auto w-full px-2">
            <table className="min-w-[700px] lg:min-w-[80%] border border-gray-200 bg-white rounded-xl shadow-md mx-auto">
              <thead className="bg-blue-600 text-white text-sm md:text-base">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">File Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Order Number</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Order Dated</th>
                  <th className="px-4 py-3 text-center font-semibold">View</th>
                </tr>
              </thead>

              <tbody className="text-xs md:text-sm">
                {notices.map((notice, index) => (
                  <tr
                    key={notice._id || index}
                    className="border-t hover:bg-blue-50 transition"
                  >
                    {/* File Name */}
                    <td className="px-4 py-3 text-gray-800">
                      {notice.fileName || "-"}
                    </td>

                    {/* Order Number */}
                    <td className="px-4 py-3 text-gray-700">
                      {notice.orderNumber || "-"}
                    </td>

                    {/* Order Dated */}
                    <td className="px-4 py-3 text-gray-700">
                      {notice.orderDate || "-"}
                    </td>

                    {/* View Link */}
                    <td className="px-4 py-3 text-center">
                      {notice.fileLink ? (
                        <a
                          href={notice.fileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition text-sm"
                        >
                          <FaEye className="w-4 h-4" /> View
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-12 text-gray-600 text-sm sm:text-base">
          No research notices found.
        </div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          setShowModal={setShowModal}
          section="research"
          title="Upload Research Notice"
          showModal={showModal}
          mannualArchive={false}
          isOrderDate={true}
        />
      )}
    </div>
  );
};

export default Notices;
