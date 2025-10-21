import ReactPaginate from "react-paginate";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next"
      previousLabel="Prev"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      containerClassName="flex justify-center gap-2 my-8 items-center select-none"
      pageClassName="rounded-xl md:rounded-full"
      pageLinkClassName="block px-3 md:py-1 py-2 rounded-xl cursor-pointer bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white transition"
      activeLinkClassName="bg-orange-500 text-white"
      previousClassName="rounded-full"
      previousLinkClassName={`block px-3 py-1 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white transition ${
        currentPage === 1 ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
      }`}
      nextClassName="rounded-full"
      nextLinkClassName={`block px-3 py-1 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white transition ${
        currentPage === totalPages ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
      }`}
      breakClassName="px-3 py-1 text-gray-600"
    />
  );
};
