import { FilterX, Search, X } from "lucide-react";
import Tooltip from "../../../Component/Reusable/Tooltip";
import { getSectionOptions } from "../adminConstant";

const FilterSection = ({
  searchInput,
  setSearchInput,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleClearFilters,
  setCurrentPage,
  onSearch,
  section,
  setSection,
}) => (
  <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6 items-start md:items-center">
    <input
      type="text"
      value={searchInput}
      autoFocus={true}
      onChange={(e) => {
        setSearchInput(e.target.value);
        setCurrentPage(1);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSearch();
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

    <div className="flex gap-3 items-center">
      {/* Mobile buttons */}
      <div className="flex gap-3 md:hidden items-center justify-center">
        <button
          onClick={onSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
        <button
          onClick={handleClearFilters}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition-colors whitespace-nowrap"
        >
          Clear Filters
        </button>
      </div>

      <select
        value={section ?? ""}
        onChange={(e) => {
          setSection(e.target.value);
          setCurrentPage(1);
        }}
        className="px-4 py-2 rounded-md border border-gray-300 shadow-sm hover:cursor-pointer w-full"
      >
        <option value={""} >Select Section</option>
        {getSectionOptions().map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {/* Desktop icons */}
      <div className="hidden md:flex gap-3 items-center">
        <Tooltip text={"Search"} bg="blue-600" textColor="white">
          <Search
            className="min-h-5 min-w-5 text-blue-500 hover:text-blue-600 cursor-pointer"
            onClick={onSearch}
          />
        </Tooltip>

        <Tooltip
          text={"Clear Filter"}
          bg="red-500"
          textColor="gray-100"
          hiddenForMobile
        >
          <FilterX
            onClick={handleClearFilters}
            className="min-h-5 min-w-5 text-red-600 hover:text-red-500 transition-colors hover:scale-[1.02] hover:cursor-pointer"
          />
        </Tooltip>
      </div>
    </div>
  </div>
);

export default FilterSection;
