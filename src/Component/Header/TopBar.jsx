import { useState, useEffect } from "react";
import { X, UserCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const facultyLoginSamarth = "https://dseu.samarth.ac.in/index.php/site/login";
const studentLoginSamarth = "https://dseu.samarth.edu.in/index.php/site/login";

const menuItems = [
  // { label: "Examination", type: "link", to: "/examination" },
  { label: "Tenders", type: "link", to: "/tenders" },
  { label: "Admin Login", type: "link", to: "/admin-login" },
  { label: "Faculty Login", type: "modal" }, // special modal
  { label: "Student Login", type: "external", href: studentLoginSamarth },
  {
    label: "Grievance form",
    type: "link",
    to: "/grievance-form",
    extra: <span className="hidden md:inline">&nbsp;& RTI</span>,
  },
  { label: "Alumni", type: "link", to: "/alumni" },
];

const TopBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Top bar menu */}
      <div className="flex flex-row justify-center md:justify-end md:mr-16 items-center text-[0.55rem] md:text-md space-x-0.5 md:space-x-1 px-2 md:px-0 bg-white rounded-b-xl flex-wrap gap-y-2 mt-1 sm:mt-0">
        {menuItems.map((item, idx) => {
          const commonClasses =
            "relative px-0.5 md:px-1 py-1 text-[0.55rem] sm:text-[0.85rem] md:text-[1rem] text-[#005CB9] font-normal transition-transform duration-300 group whitespace-nowrap";

          const spanClasses =
            "bg-[#E4F7F5] px-1 md:px-3 py-1.5 rounded-b-xl group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-md transition-all duration-300";

          if (item.type === "link") {
            return (
              <Link key={idx} to={item.to} className={commonClasses}>
                <span className={spanClasses}>
                  {item.label} {item.extra}
                </span>
              </Link>
            );
          }

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

          if (item.type === "modal") {
            return (
              <div
                key={idx}
                onClick={openModal}
                className={`${commonClasses} cursor-pointer`}
              >
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
