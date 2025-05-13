import { X } from "lucide-react";

const FilterSection = ({
  searchInput,
  setSearchInput,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleClearFilters,
  setCurrentPage,
}) => (
  <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6 items-start md:items-center">
    <input
      type="text"
      value={searchInput}
      onChange={(e) => {
        setSearchInput(e.target.value);
        setCurrentPage(1);
      }}
      placeholder="Search by file name..."
      className="flex-1 px-4 py-2 rounded-xl border-2 border-blue-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300 shadow-sm w-full"
    />

    <div className="flex flex-row gap-2">
      <div className="flex items-center gap-2">
        <label htmlFor="start-date" className="text-sm text-gray-600">
          Start Date:
        </label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded-md text-sm shadow-sm"
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="end-date" className="text-sm text-gray-600">
          End Date:
        </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded-md text-sm shadow-sm"
          min={startDate}
        />
      </div>
    </div>

    <button
      onClick={handleClearFilters}
      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 w-full justify-center md:w-fit"
    >
      <X size={16} /> Clear Filters
    </button>
  </div>
);

export default FilterSection;
