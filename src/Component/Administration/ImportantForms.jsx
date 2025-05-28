import { useState, useEffect } from "react";
import { FileText } from "lucide-react";

import { useNoticesBySection } from "../../hooks/useNoticesBySection";

import ArchiveButton from "../Reusable/ArchiveButton";
import UploadModal from "../Admin/UploadModal";

const ImportantForms = () => {
  const [archived, setArchived] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [forms, setForms] = useState([]);

  const token = sessionStorage.getItem("token");
  const currentRole = sessionStorage.getItem("currentRole");

  const { data, isLoading } = useNoticesBySection(
    "ad important forms",
    archived,
    1000,
    1
  );

  useEffect(() => {
    if (currentRole === "Admin" && token) {
      setIsAdmin(true);
    }
  }, [currentRole, token]);

  useEffect(() => {
    if (data) {
      setForms(data.data.notices);
    }
  }, [data]);

  const handleArchivedButton = (e) => {
    e.preventDefault();
    setArchived((prev) => !prev);
  };

  const sectionTitle = archived
    ? "Archived Important Forms"
    : "Important Forms for Employees";

  if (isLoading) {
    return (
      <div className="text-center py-6 text-gray-500 text-base">
        Loading important forms...
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg sm:text-xl md:text-2xl md:mt-6 sm:mt-3 font-semibold mb-4 text-center md:text-left text-[#333]">
          {sectionTitle}
        </h2>

        {isAdmin && (
          <div className="flex justify-end mb-4 md:mr-5 sm:mr-3">
            <button
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-full text-sm md:text-base hover:bg-blue-700 transition-colors duration-300 shadow-md"
              onClick={() => setShowModal(true)}
            >
              + Upload PDF
            </button>
          </div>
        )}
      </div>

      <hr className="mb-6 border-gray-300" />

      {!forms || forms.length === 0 ? (
        <>
          <div className="mt-8 text-center text-slate-600">
            No forms available.
          </div>
          <ArchiveButton
            handleArchivedButton={handleArchivedButton}
            archived={archived}
            text="See Archived Forms"
            archivedText="See latest forms"
          />
        </>
      ) : (
        <>
          <ul className="space-y-4 max-h-[60vh] overflow-y-auto custom-scroll pr-1">
            {forms.map((form, index) => (
              <li
                key={index}
                className="bg-white border border-gray-200 rounded-md shadow-sm p-3 flex flex-row items-center justify-between "
              >
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-lg">»</span>
                  <a
                    href={form.fileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-900 underline hover:text-blue-700 text-sm md:text-base break-words max-w-full"
                  >
                    {form.fileName}
                  </a>
                </div>
                <div className="mt-2 sm:mt-0 sm:ml-4 flex justify-end">
                  <FileText className="text-red-600 text-[18px] sm:text-xl ml-1 sm:ml-2 cursor-pointer" />
                </div>
              </li>
            ))}
          </ul>
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
          section={"ad important forms"}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default ImportantForms;
