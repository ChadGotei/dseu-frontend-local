// reusable component for uploading button and search bar div

import { FilterX, Search } from "lucide-react";
import Tooltip from "./Tooltip";

const SearchAndUpload = ({
  inputField,
  setInputField,
  isAdmin,
  handleShowModal,
  includeUpload,
  containerClass = false,
  handleSearch,
  handleClearFilter
}) => {
  return (
    <div
      className={`${
        containerClass ||
        "flex flex-row items-center justify-center w-full gap-4 my-4"
      }`}
    >
      <div className="flex flex-row w-full items-center gap-5 md:gap-2 justify-center md:justify-normal">
        <input
          type="text"
          value={inputField}
          onChange={(e) => setInputField(e.target.value)}
          placeholder="Search by file name..."
          className="w-[70%] px-4 py-2 rounded-xl border-2 border-blue-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300 shadow-sm"
        />
        <Search
          className="text-blue-500 w-7 h-7 hover:cursor-pointer"
          onClick={handleSearch}
        />

        <Tooltip text={"Reset"}>
          <FilterX className="text-red-500 cursor-pointer w-7 h-7" onClick={handleClearFilter} />
        </Tooltip>
      </div>

      {includeUpload && isAdmin && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm md:text-base hover:bg-blue-700 transition-colors duration-300 shadow-md"
          onClick={handleShowModal}
        >
          + Upload <span className="hidden md:inline-block">PDF</span>
        </button>
      )}
    </div>
  );
};

export default SearchAndUpload;
