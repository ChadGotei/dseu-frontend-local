import axios from "axios";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { baseUrl } from "../../constants/LOCALES.JS";

const SearchModal = ({ isOpen, onClose, navItems }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [facultyData, setFacultyData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();

  const defaultSuggestions = [
    { name: "Undergraduate courses", path: "/Courses/ug" },
    { name: "Postgraduate courses", path: "/Courses/pg" },
    { name: "Diploma courses", path: "/Courses/Diploma" },
  ];

  const flattenNavItems = () => {
    const flatItems = [];
    navItems?.forEach((item) => {
      if (item.path) {
        flatItems.push({ name: item.name, path: item.path });
      }
      if (item.dropdownItems) {
        item.dropdownItems.forEach((subItem) => {
          flatItems.push({ name: subItem.name, path: subItem.path });
        });
      }
    });
    return flatItems;
  };

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`${baseUrl}faculty?limit=500`)
        .then((res) => setFacultyData(res.data.data.faculty))
        .catch((err) => console.error("Error fetching faculty data:", err));
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSuggestions([]);
      setActiveIndex(-1);
      return;
    }

    if (searchQuery.trim() === "") {
      setSuggestions(defaultSuggestions);
      setActiveIndex(-1);
    } else {
      const navResults = flattenNavItems().filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const facultyResults = facultyData
        .filter((f) => {
          const fullName =
            `${f.salutation} ${f.firstname} ${f.surname}`.toLowerCase();
          return fullName.includes(searchQuery.toLowerCase());
        })
        .map((f) => ({
          name: `${f.salutation} ${f.firstname} ${f.surname}`.trim(),
          path: `/faculty/${f._id}`,
        }));

      setSuggestions([...navResults, ...facultyResults]);
      setActiveIndex(-1);
    }
  }, [searchQuery, isOpen, facultyData]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (suggestions.length > 0 && activeIndex >= 0) {
        navigate(suggestions[activeIndex].path);
        resetModal();
      }
    }
  };

  const handleSuggestionClick = (path) => {
    navigate(path);
    resetModal();
  };

  const resetModal = () => {
    setSearchQuery("");
    setSuggestions([]);
    setActiveIndex(-1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-white/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl mx-auto mt-20">
        <div className="bg-white rounded-2xl shadow-2xl">
          <div className="flex items-center p-4 border-b">
            <Search className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for anything..."
              className="flex-1 px-4 py-2 text-lg focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          {suggestions.length > 0 && (
            <div className="max-h-60 overflow-y-auto bg-white">
              <div className="px-6 pt-2 text-xs text-gray-500 uppercase">
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`px-6 py-3 cursor-pointer text-gray-700 ${
                    index === activeIndex
                      ? "bg-blue-100 font-medium"
                      : "hover:bg-blue-50"
                  }`}
                  onClick={() => handleSuggestionClick(suggestion.path)}
                >
                  {suggestion.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
