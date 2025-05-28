import { useEffect, useState } from "react";
import { DownloadIcon } from "lucide-react";

import { useNoticesBySection } from "../../hooks/useNoticesBySection";

import UploadModal from "../Admin/UploadModal";
import ToggleButton from "../Reusable/ArchiveButton";
import SearchAndUpload from "../Reusable/SearchAndUpload";

const Circulars = () => {
  const [archived, setArchived] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [circulars, setCirculars] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [inputSearch, setInputSearch] = useState("");

  const token = sessionStorage.getItem("token");
  const currentRole = sessionStorage.getItem("currentRole");

  const { data, isLoading } = useNoticesBySection(
    "ad circulars",
    archived,
    1000,
    1,
    searchInput
  );

  useEffect(() => {
    if (currentRole === "Admin" && token) {
      setIsAdmin(true);
    }

    if (data) {
      setCirculars(data.data.notices);
    }
  }, [currentRole, token, data]);

  const handleArchivedButton = (e) => {
    e.preventDefault();
    setArchived((prev) => !prev);
  };

  const handleSearch = () => {
    if(!inputSearch) return;
    setSearchInput(inputSearch);
  }

  const handleClearFilter = () => {
    setSearchInput("");
    setInputSearch("");
  }

  const sectionTitle = archived ? "Archived Circulars" : "Latest Circulars";

  return (
    <div className="mb-10 md:px-0">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-10 md:mb-3">
        <h2 className="text-2xl font-semibold mb-2 md:mb-0 text-center md:text-left text-[#333]">
          {sectionTitle}
        </h2>

        <SearchAndUpload
          handleClearFilter={handleClearFilter}
          handleSearch={handleSearch}
          inputField={inputSearch}
          setInputField={setInputSearch}
          isAdmin={isAdmin}
          handleShowModal={() => setShowModal(true)}
          includeUpload={true}
          containerClass={"flex flex-row w-full md:w-[70%] gap-2"}
        />
      </div>

      <hr className="mb-6 border-gray-300 hidden md:block" />

      {isLoading ? (
        <div className="text-center py-6 text-gray-500 text-base">
          Loading circulars...
        </div>
      ) : circulars && circulars.length > 0 ? (
        <ul className="space-y-4 max-h-[60vh] overflow-y-auto custom-scroll pr-1">
          {circulars.map((circular, index) => (
            <li
              key={index}
              className="bg-white border border-gray-200 rounded-md shadow-sm p-3 flex sm:items-center justify-between flex-row"
            >
              <div className="flex items-center gap-2">
                <a
                  href={circular.fileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900 underline hover:text-blue-700 text-sm break-words max-w-full"
                >
                  {circular.fileName}
                </a>
              </div>
              <div className="mt-2 sm:mt-0 sm:ml-4 flex justify-end">
                <DownloadIcon className="text-blue-600 text-[18px] sm:text-xl ml-1 sm:ml-2" />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 text-center text-slate-600">
          No circulars available.
        </div>
      )}

      <div className="flex justify-center md:justify-start mt-10">
        <ToggleButton
          handleArchivedButton={handleArchivedButton}
          archived={archived}
          text="See Archived Circulars"
          archivedText="See latest Circulars"
        />
      </div>

      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          setShowModal={setShowModal}
          section={"ad circulars"}
          title={"Circulars PDF"}
          showModal={showModal}
          mannualArchive={archived}
        />
      )}
    </div>
  );
};

export default Circulars;
