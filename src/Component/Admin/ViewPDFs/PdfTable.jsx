import { Archive, ArchiveRestore, Edit, Trash } from "lucide-react";
import { getSectionName } from "../adminConstant";
import { useState } from "react";
import EditModal from "./EditModal";
import ArchiveConfirmationModal from "./ArchiveConfirmationModal";

const PdfTable = ({
  notices,
  currentPage,
  limit,
  setDeleteId,
  setShowModal,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPdfData, setSelectedPdfData] = useState(null);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  const handleEditClick = (pdfData) => {
    setSelectedPdfData(pdfData);
    setShowEditModal(true);
  };

  const handleArchiveClick = (pdfData) => {
    setSelectedPdfData(pdfData);
    setShowArchiveModal(true);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full text-sm border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-3 px-4 border border-gray-300 text-left">S.No</th>
            <th className="py-3 px-4 border border-gray-300 text-left">
              File Name
            </th>
            <th className="py-3 px-4 border border-gray-300 text-left">
              Section
            </th>
            <th>Uploaded By</th>
            <th className="py-3 px-4 border border-gray-300 text-left">
              Uploaded At
            </th>
            <th className="py-3 px-4 border border-gray-300 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {notices.length > 0 ? (
            notices.map((notice, index) => (
              <tr
                key={notice._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  {(currentPage - 1) * limit + index + 1}
                </td>
                <td className="py-3 px-4">{notice.fileName}</td>
                <td className="py-3 px-4 capitalize">
                  {getSectionName(notice.section)}
                </td>
                <td className="text-blue-500 hover:text-blue-600 hover:underline">
                  {notice.uploadedBy}
                </td>
                <td className="py-3 px-4">
                  {new Date(notice.uploadedAt).toLocaleDateString("en-GB")}
                </td>
                <td className="py-3 px-4 flex items-center gap-4">
                  <a
                    href={notice.fileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View PDF
                  </a>

                  {/* Buttons: edit,delete and archive */}
                  <div className="flex flex-row gap-2">
                    {notice.driveFileId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(notice._id);
                          setShowModal(true);
                        }}
                        className="text-red-600 hover:text-red-800 text-lg transition-colors pl-2"
                        title="Delete"
                      >
                        <Trash className="min-h-4 min-w-4 hover:scale-105 text-red-400 hover:text-red-500" />
                      </button>
                    )}

                    <button onClick={() => handleEditClick(notice)}>
                      <Edit className="min-h-4 min-w-4 hover:scale-105 text-blue-400 hover:text-blue-500" />
                    </button>

                    {notice.archive ? (
                      <button
                        title="Restore"
                        onClick={() => handleArchiveClick(notice)}
                      >
                        <ArchiveRestore className="min-h-4 min-w-4 hover:scale-105 text-gray-400 hover:text-gray-500" />
                      </button>
                    ) : (
                      <button
                        title="Archive"
                        onClick={() => handleArchiveClick(notice)}
                      >
                        <Archive className="min-h-4 min-w-4 hover:scale-105 text-green-400 hover:text-green-500" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="my-10">
              <td
                colSpan="6"
                className="md:py-8 sm:py-6 py-5 px-4 text-center "
              >
                No PDFs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showEditModal && selectedPdfData && (
        <EditModal
          onClose={() => setShowEditModal(false)}
          setShowModal={setShowEditModal}
          data={selectedPdfData}
        />
      )}

      {showArchiveModal && selectedPdfData && (
        <ArchiveConfirmationModal
          state={selectedPdfData.archive}
          pdfData={selectedPdfData}
          setShowModal={setShowArchiveModal}
        />
      )}
    </div>
  );
};

export default PdfTable;
