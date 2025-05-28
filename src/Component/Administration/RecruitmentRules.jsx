import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useNoticesBySection } from "../../hooks/useNoticesBySection";
import HeadingText from "../Reusable/HeadingText";
import ArchiveButton from "../Reusable/ArchiveButton";
import UploadModal from "../Admin/UploadModal";
import SearchAndUpload from "../Reusable/SearchAndUpload";

const RecruitmentRules = () => {
  const [archived, setArchived] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [rules, setRules] = useState([]);

  const { data, isLoading, error } = useNoticesBySection(
    "recruitment rules",
    archived,
    1000,
    1,
    searchInput
  );

  useEffect(() => {
    if (data) {
      setRules(data.data.notices);
    }
    console.log(data);
  }, [data]);

  const currentRole = sessionStorage.getItem("currentRole");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (currentRole === "Admin" && token) {
      setIsAdmin(true);
    }
  }, [currentRole, token]);

  const handleArchivedButton = (e) => {
    e.preventDefault();
    setArchived((prev) => !prev);
  };

  const sectionTitle = archived
    ? "Archived Recruitment Rules"
    : "Recruitment Rules";

  if (error) {
    return (
      <div className="text-center py-6 text-red-500 text-base">
        Something went wrong. Please try again later.
      </div>
    );
  }

  return (
    <div className="mb-10 md:mt-10">
      <HeadingText
        heading={sectionTitle}
        headingCN="text-3xl md:text-5xl font-bold mt-5 mb-1 text-center"
      />

      <SearchAndUpload
        handleShowModal={() => setShowModal(true)}
        isAdmin={isAdmin}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        includeUpload
        containerClass="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 md:px-[10rem] mt-4 px-10"
      />

      {isLoading ? (
        <div className="text-center py-6 text-gray-500 text-base">
          <div className="animate-spin w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full mx-auto mb-2"></div>
          Loading recruitment rules...
        </div>
      ) : !rules || rules.length === 0 ? (
        <>
          <div className="mt-8 text-center text-slate-600">
            No rules available.
          </div>
          <ArchiveButton
            handleArchivedButton={handleArchivedButton}
            archived={archived}
          />
        </>
      ) : (
        <>
          <div className="flex items-center justify-center">
            <ul className="lg:w-[80%] w-[90%] space-y-4 max-h-[60vh] mt-7 overflow-y-auto custom-scroll pr-1">
              {rules.map((rule, index) => (
                <li
                  key={index}
                  className="bg-white border border-gray-200 rounded-md shadow-sm p-3 flex flex-row items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 text-lg">»</span>
                    <a
                      href={rule.fileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-900 underline hover:text-blue-700 break-words max-w-full text-sm md:text-[15px]"
                    >
                      {rule.fileName}
                    </a>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:ml-4 flex justify-end">
                    <FaFilePdf className="text-red-600 text-[18px] sm:text-xl ml-1 sm:ml-2" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ArchiveButton
            handleArchivedButton={handleArchivedButton}
            archived={archived}
          />
        </>
      )}

      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          setShowModal={setShowModal}
          section={"recruitment rules"}
          mannualArchive={archived}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default RecruitmentRules;
