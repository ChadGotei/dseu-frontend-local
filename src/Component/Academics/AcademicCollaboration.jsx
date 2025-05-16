import { useEffect, useState } from "react";
import collaboration from "./collaboration.json";
import HeadingText from "../Reusable/HeadingText";
import ReactPaginate from "react-paginate";

const allDataLength = collaboration.length;
const totalPages = collaboration[allDataLength - 1].page;

const AcademicCollaboration = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(collaboration.filter((coll) => coll.page === currentPage));
  }, [currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800 pt-10 pb-20">
      <HeadingText
        heading={"Academic Collaboration"}
        headingCN="text-3xl sm:text-4xl md:text-5xl font-semibold text-center"
      />

      <div className="overflow-x-auto shadow-lg rounded-2xl mt-10">
        <table
          className={`min-w-full bg-white border border-gray-200 ${
            data.length >= 9 ? "md:min-h-[90vh] min-h-[170vh]" : "h-fit"
          }`}
        >
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-[12px] font-semibold text-blue-700 uppercase tracking-wider border-b whitespace-nowrap">
                S. No.
              </th>
              <th className="px-6 py-3 text-left text-[12px] font-semibold text-blue-700 uppercase tracking-wider border-b">
                Title
              </th>

              <th className="px-6 py-3 text-left text-[12px] font-semibold text-blue-700 uppercase tracking-wider border-b">
                Target Program
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.sno}
                className="border-b hover:bg-emerald-100 cursor-pointer"
              >
                <td className="px-6 py-4 text-sm text-gray-700 w-[100px]">
                  {item.sno}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 font-semibold md:w-[40%]">
                  {item.title}
                </td>
                {/* <td className="px-6 py-4 text-sm text-gray-700">{item.date}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {item.duration || "-"}
                </td> */}
                <td className="px-6 py-4 text-sm text-gray-700 ">
                  {item.domain || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        previousLabel="Prev"
        onPageChange={handlePageChange}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        forcePage={currentPage - 1}
        containerClassName="flex justify-center gap-2 my-8 items-center"
        pageClassName="px-3 md:py-1 py-2 rounded-xl md:rounded-full cursor-pointer bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white transition"
        activeClassName="bg-orange-500 text-white"
        previousClassName="px-3 py-1 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white"
        nextClassName="px-3 py-1 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white"
        breakClassName="px-3 py-1 text-gray-600"
        disabledClassName="opacity-50 cursor-not-allowed"
        nextLinkClassName={
          currentPage === totalPages ? "pointer-events-none" : ""
        }
        previousLinkClassName={currentPage === 1 ? "pointer-events-none" : ""}
      />
    </div>
  );
};

export default AcademicCollaboration;
