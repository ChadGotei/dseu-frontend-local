import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePdf, getAllPdfs } from "../../../utils/apiservice";
import { QUERY_KEYS } from "../../../utils/queryKeys";

import withAuthProtection from "../withAuthProtection";
import DeleteConfirmModal from "../DeleteConfirmModal";
import { Pagination } from "../../Reusable/Pagination";
import FilterSection from "./FilterSection";
import PdfTable from "./PdfTable";

const ViewPdfs = () => {
  const [selectedTab, setSelectedTab] = useState("non-archived");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const limit = 10;
  const isArchived = selectedTab === "archived";
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      QUERY_KEYS.GET_NOTICES,
      isArchived,
      currentPage,
      searchInput,
      startDate,
      endDate,
    ],
    queryFn: () =>
      getAllPdfs(
        isArchived,
        limit,
        currentPage,
        searchInput,
        startDate,
        endDate
      ),
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePdf,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NOTICES, isArchived, currentPage],
      });
      toast.success("PDF deleted successfully!");
    },
  });

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleClearFilters = () => {
    setEndDate("");
    setStartDate("");
    setSearchInput("");
  };

  const notices = data?.data?.notices || [];
  const totalPages = data?.metadata?.totalPages || 1;

  return (
    <div className="bg-white min-h-screen py-6 px-4 sm:px-8 lg:px-20">
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => handleTabChange("non-archived")}
          className={`px-6 py-3 rounded-2xl font-semibold transition-colors duration-300 shadow ${
            selectedTab === "non-archived"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-blue-100"
          }`}
        >
          Non-Archived
        </button>
        <button
          onClick={() => handleTabChange("archived")}
          className={`px-6 py-3 rounded-2xl font-semibold transition-colors duration-300 shadow ${
            selectedTab === "archived"
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
