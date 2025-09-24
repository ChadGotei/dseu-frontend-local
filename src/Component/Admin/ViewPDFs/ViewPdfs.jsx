import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "../../../utils/queryKeys";
import { getAllPdfs } from "../../../utils/apiservice";
import { useArchivedParams } from "../../../hooks/useArchivedParams";
import { useDeletePdfOptimistic } from "../../../react-query/hooks/useDeletePdfOptimistic";

import withAuthProtection from "../withAuthProtection";
import DeleteConfirmModal from "../DeleteConfirmModal";
import { Pagination } from "../../Reusable/Pagination";
import FilterSection from "./FilterSection";
import PdfTable from "./PdfTable";

const ViewPdfs = () => {
  const limit = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const section = searchParams.get("section");
  const sectionParam = new URLSearchParams(searchParams);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notices, setNotices] = useState([]);

  const [filters, setFilters] = useState({
    searchInput: "",
    startDate: "",
    endDate: "",
    // section: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { isArchived, selectedTab, setArchived } = useArchivedParams();

  const setSection = (sec) => {
    if (sec) sectionParam.set("section", sec);
    setSearchParams(sectionParam, { replace: true });
  }

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      QUERY_KEYS.GET_NOTICES,
      isArchived,
      currentPage,
      filters.searchInput,
      filters.startDate,
      filters.endDate,
      section
    ],
    queryFn: () =>
      getAllPdfs(
        isArchived,
        limit,
        currentPage,
        filters.searchInput,
        filters.startDate,
        filters.endDate,
        // filters.section
        section
      ),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  // const deleteMutation = useMutation({
  //   mutationFn: deletePdf,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: [QUERY_KEYS.GET_NOTICES, isArchived, currentPage],
  //     });
  //     toast.success("PDF deleted successfully!");
  //   },
  // });

  const deleteMutation = useDeletePdfOptimistic({
    isArchived,
    currentPage,
    filters,
    section,
  });

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setStartDate("");
    setEndDate("");
    setSection("");
    setSearchParams()
    setFilters({ searchInput: "", startDate: "", endDate: "" });
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setFilters({ searchInput, startDate, endDate, section });
    setCurrentPage(1);
  };

  useEffect(() => {
    if (data?.data?.notices) {
      setNotices(data.data.notices);
    }
  }, [data]);

  const totalPages = data?.metadata?.totalPages || 1;

  return (
    <div className="bg-white min-h-screen py-6 px-4 sm:px-8 lg:px-20">
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => {
            setArchived(false)
            setCurrentPage(1)
          }}
          className={`px-6 py-3 rounded-2xl font-semibold transition-colors duration-300 shadow ${selectedTab === "non-archived"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-blue-100"
            }`}
        >
          Non-Archived
        </button>
        <button
          onClick={() => {
            setArchived(true)
            setCurrentPage(1)
          }}
          className={`px-6 py-3 rounded-2xl font-semibold transition-colors duration-300 shadow ${selectedTab === "archived"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-blue-100"
            }`}
        >
          Archived
        </button>
      </div>

      <FilterSection
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleClearFilters={handleClearFilters}
        setCurrentPage={setCurrentPage}
        onSearch={handleSearch}
        section={section}
        setSection={setSection}
      />

      {isLoading ? (
        <p className="text-center text-gray-600 text-lg">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500 text-lg">
          Failed to load notices.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow">
            <PdfTable
              notices={notices}
              currentPage={currentPage}
              limit={limit}
              setDeleteId={setDeleteId}
              setShowModal={setShowModal}
            />
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageClick}
          />

          {showModal && (
            <DeleteConfirmModal
              onClose={() => setShowModal(false)}
              onConfirm={() => {
                handleDelete(deleteId);
                setShowModal(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default withAuthProtection(ViewPdfs);
