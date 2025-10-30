import { useState, useEffect, useRef } from "react";
import { X, UserCheck, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const facultyLoginSamarth = "https://dseu.samarth.ac.in/index.php/site/login";
const studentLoginSamarth = "https://dseu.samarth.edu.in/index.php/site/login";

const menuItems = [
  {
    label: "Examination",
    type: "link",
    to: "/examination"
  },
  { label: "Tenders", type: "link", to: "/tenders" },
  { label: "Admin Login", type: "link", to: "/admin-login" },
  { label: "Faculty Login", type: "modal" },
  { label: "Student Login", type: "external", href: studentLoginSamarth },
  { label: "Alumni", type: "link", to: "/alumni" },
  {
    label: "Grievance form",
    type: "link",
    to: "/grievance-form",
    extra: <span className="hidden md:inline">&nbsp;& RTI</span>,
  },
];

const TopBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {/* Top bar menu */}
      <div className="flex flex-row justify-center md:justify-end md:mr-8 items-center text-[0.55rem] md:text-md space-x-0.5 md:space-x-1 px-2 md:px-0 bg-white rounded-b-xl flex-wrap  relative z-[50]">
        {menuItems.map((item, idx) => {
          const commonClasses =
            "relative px-0.5 md:px-1 py-1 text-[0.55rem] sm:text-[0.85rem] md:text-[0.85rem] text-[#005CB9] font-normal transition-transform duration-300 group whitespace-nowrap";

          const spanClasses =
            "bg-[#E4F7F5] px-1 md:px-3 py-1.5 rounded-b-xl group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-md transition-all duration-300 flex items-center";

          // 🔹 Dropdown Menu
          if (item.type === "dropdown") {
            const isOpen = openDropdown === item.label;
            return (
              <div key={idx} ref={dropdownRef} className={`${commonClasses} cursor-pointer`}>
                <div
                  onClick={() => toggleDropdown(item.label)}
                  className={`${spanClasses} ${isOpen ? "bg-blue-500 text-white shadow-md" : ""}`}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`ml-1 mt-[2px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </div>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-1 w-28 sm:w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-[10000] animate-fadeIn">
                    {item.items.map((subItem, subIdx) => {

                      // dealing with external links
                      const handleClick = () => {
                        setOpenDropdown(null);
                        if (subItem.seperatePage) {
                          if (subItem.to.startsWith("http")) {
                            window.open(subItem.to, "_blank");
                          } else {
                            window.location.href = subItem.to;
                          }
                        }
                      };

                      return (
                        <Link
                          key={subIdx}
                          to={subItem.to}
                          className="block px-3 md:px-4 py-2 text-[0.6rem] md:text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
                          onClick={(e) => {
                            if (subItem.seperatePage) {
                              e.preventDefault(); // Prevent react-router navigation
                              handleClick();
                            } else {
                              setOpenDropdown(null);
                            }
                          }}
                        >
                          {subItem.label}
                        </Link>
                      );
                    })}
                  </div>
                )}

              </div>
            );
          }

          if (item.type === "link") {
            return (
              <Link key={idx} to={item.to} className={commonClasses}>
                <span className={spanClasses}>
                  {item.label} {item.extra}
                </span>
              </Link>
            );
          }

          // 🔹 External link
          if (item.type === "external") {
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={commonClasses}
              >
                <span className={spanClasses}>{item.label}</span>
              </a>
            );
          }

          // 🔹 Modal trigger
          if (item.type === "modal") {
            return (
              <div key={idx} onClick={openModal} className={`${commonClasses} cursor-pointer`}>
                <span className={spanClasses}>{item.label}</span>
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* ------------------- */}
      {/* Faculty Login Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className="relative bg-white/90 backdrop-blur-md shadow-xl w-[90%] sm:w-[420px] rounded-2xl p-6 animate-fadeIn flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center mt-2">
              <UserCheck size={50} className="text-blue-600 mb-2" />
              <h2 className="text-2xl font-bold text-[#0073e6]">
                Welcome, Faculty!
              </h2>
              <p className="text-gray-600 text-center mt-1">
                Please select your login portal.
              </p>
            </div>

            <div className="w-full mt-6 space-y-3">
              <button
                onClick={() => {
                  closeModal();
                  navigate("/logindseu");
                }}
                className="block w-full text-center py-3 bg-gradient-to-r from-[#0073e6] to-[#005bb5] text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                DSEU Login
              </button>

              <a
                href={facultyLoginSamarth}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-gradient-to-r from-[#0073e6] to-[#005bb5] text-white rounded-lg font-semibold hover:opacity-90 transition"
                onClick={closeModal}
              >
                Samarth Login
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;
