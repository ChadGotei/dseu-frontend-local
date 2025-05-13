import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArchiveBanner from "../../assets/ArchiveBanner.jpg";
import { jobPortalTabs as categoryTabs } from "../../constants/JOBPORTAL.JS";
import { useNoticesBySection } from "../../hooks/useNoticesBySection";
import { FileText, FilterX } from "lucide-react";
import UploadModal from "../Admin/UploadModal";
import ReactPaginate from "react-paginate";
import { Pagination } from "../Reusable/Pagination";
import Tooltip from "../Reusable/Tooltip";

const ArchivedJobPortal = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [noticeData, setNoticeData] = useState([]);
  const [page, setPage] = useState(1); // for the page number
  const [totalPages, setTotalPages] = useState(3);
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useNoticesBySection(
    category,
    true,
    10,
    page,
    searchInput
  );

  const currentRole = sessionStorage.getItem("currentRole");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const isValidCategory = categoryTabs.some(
      (tab) => tab.id.toLowerCase() === category.toLowerCase()
    );
    if (!isValidCategory) {
      navigate("/recruitment");
    }

    if (currentRole === "Admin" && token) {
      setIsAdmin(true);
    }
  }, [category, currentRole, token, navigate]);

  // for data and pagination
  useEffect(() => {
    if (data?.data?.notices) {
      setNoticeData(data.data.notices);
    }

    if (data) {
      setTotalPages(data.metadata.totalPages);
    }
  }, [data]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setPage(1);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative md:w-full max-h-[250px] overflow-hidden">
        <img
          src={ArchiveBanner}
          alt="Archive Banner"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-2xl sm:text-4xl md:text-[2.5rem] font-bold text-center drop-shadow-2xl px-2 uppercase">
            {category} - Archived
          </h1>
        </div>
      </div>

      <main className="w-full max-w-6xl p-4">
        <div className="flex flex-row w-full items-center justify-center gap-6 mt-5">
          <label
            htmlFor={searchInput}
            className="whitespace-nowrap text-lg font-semibold hidden md:block"
          >
            Enter PDF name:{" "}
          </label>

          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder="Search by file name..."
            className="w-full px-4 py-2 rounded-xl border-2 border-blue-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300 shadow-sm"
          />

          <Tooltip text={"Clear Filter"} bg="red-500" textColor="gray-100">
            <FilterX
              onClick={() => setSearchInput("")}
              className="min-h-5 min-w-5 text-red-600 hover:text-red-500 transition-colors hover:scale-[1.02] hover:cursor-pointer"
            />
          </Tooltip>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          {isLoading ? (
            <div className="text-center p-4">Loading...</div>
          ) : noticeData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-700 text-white text-sm md:text-md">
                    <th className="p-2 text-left border whitespace-nowrap">
                      S. No.
                    </th>
                    <th className="p-2 text-left border">Title</th>
                    <th className="p-2 text-left border">Notification</th>

                    {category !== "results" &&
                      category != "recruitments and notice" && (
                        <th className="p-2 text-left border">
                          No of Vacancies
                        </th>
                      )}
                    {category === "results" ? (
                      <th className="p-2 text-left border">Publish Date</th>
                    ) : (
                      <th className="p-2 text-left border">Last Date</th>
                    )}

                    {category !== "results" && (
                      <th className="p-2 text-left border">Apply</th>
                    )}
                  </tr>
                </thead>
                <tbody className="text-[0.8rem] md:text-sm">
                  {noticeData.map((item, index) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      {page ? (
                        <td className="p-2 border">
                          {(page - 1) * 10 + index + 1}
                        </td>
                      ) : (
                        <td className="p-2 border">{index + 1}</td>
                      )}
                      <td className="p-2 border">{item.fileName}</td>
                      <td className="p-2 border">
                        <a
                          href={item.fileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          Notice <FileText className="text-red-500" size={16} />
                        </a>
                      </td>
                      {category !== "results" &&
                        category != "recruitments and notice" && (
                          <td className="p-2 border">
                            {item.vacancies ? item.vacancies : "-"}
                          </td>
                        )}
                      <td className="p-2 border">
                        {item.endDate
                          ? new Date(item.endDate).toLocaleDateString("en-GB")
                          : "-"}
                      </td>
                      {category !== "results" && (
                        <td className="p-2 border">
                          {item.apply ? (
                            <a
                              href={item.apply}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Apply
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-4">No archived notices found.</div>
          )}
        </div>

        {noticeData.length > 0 && totalPages && totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={({ selected }) => setPage(selected + 1)}
          />
        )}
      </main>

      {isAdmin && (
        <div className="flex justify-end mb-10">
          <button
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-full text-sm md:text-base hover:bg-blue-700 transition-colors duration-300 shadow-md"
            onClick={() => setShowModal(true)}
          >
            + Upload PDF
          </button>
        </div>
      )}

      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          setShowModal={setShowModal}
          section={category}
          isEndDate
          isApplyLink
          title={category.toLocaleUpperCase()}
          mannualArchive={true}
          veryLargeModal={true}
          isVacancy
        />
      )}
    </div>
  );
};

export default ArchivedJobPortal;
