import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useNoticesBySection } from "../../hooks/useNoticesBySection";
import UploadModal from "../Admin/UploadModal";
import ToggleButton from "../Reusable/ArchiveButton";
import SearchAndUpload from "../Reusable/SearchAndUpload";

const OfficeOrders = () => {
  const [archived, setArchived] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const token = sessionStorage.getItem("token");
  const currentRole = sessionStorage.getItem("currentRole");

  const handleArchivedButton = (e) => {
    e.preventDefault();
    setArchived((prev) => !prev);
  };

  const { data, isLoading } = useNoticesBySection(
    "ad office orders",
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
      setOrders(data.data.notices);
    }
  }, [currentRole, token, data]);

  const sectionTitle = archived
    ? "Archived Office Orders"
    : "Latest Office Orders";

  return (
    <div className="mb-10 mt-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-10 md:mb-3">
        <h2 className="text-2xl font-semibold mb-2 md:mb-0 text-center md:text-left text-[#333]">
          {sectionTitle}
        </h2>

        <SearchAndUpload
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          isAdmin={isAdmin}
          handleShowModal={() => setShowModal(true)}
          includeUpload={true}
          containerClass={"flex flex-row w-full md:w-[70%] gap-2"}
        />
      </div>

      <hr className="mb-10 border-gray-300 hidden md:block" />

      {isLoading ? (
        <div className="text-center py-6 text-gray-500 text-base">
          Loading office orders...
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="max-h-80 overflow-y-auto custom-scroll space-y-3">
          <ul className="mb-6 flex flex-col gap-5">
            {orders.map((order, index) => (
              <li
                key={index}
                className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-3 shadow-md hover:bg-gray-100 transition-all duration-200"
              >
                <div className="flex items-center space-x-2">
                  <FaDownload className="text-blue-600 text-xl min-h-3 max-h-4 min-w-3 max-w-4" />
                  <a
                    href={order.fileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline text-sm hover:text-blue-700"
                  >
                    {order.fileName}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-8 text-center text-slate-600">
          No office orders available.
        </div>
      )}

      <div className="flex justify-center md:justify-start mt-10">
        <ToggleButton
          handleArchivedButton={handleArchivedButton}
          archived={archived}
          archivedText="See latest Orders"
          text="Archived Orders"
        />
      </div>

      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          setShowModal={setShowModal}
          section={"ad office orders"}
          title={"Office Orders PDF"}
          showModal={showModal}
          mannualArchive={archived}
        />
      )}
    </div>
  );
};

export default OfficeOrders;
