import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

const navItems = [
  {
    name: "Home",
    path: "/",
    isHome: true,
  },
  {
    name: "About Us",
    dropdownItems: [
      { name: "About the University", path: "/about-us/About-the-University" },
      { name: "Vision and Mission", path: "/about-us/Vision-and-Mission" },
      { name: "History of DSEU", path: "/about-us/history" },
      {
        name: "Annual Report",
        path: "/about-us/annualReport",
      },
    ],
  },
  {
    name: "Academics",
    dropdownItems: [
      { name: "Faculties & Department", path: "/academics/faculty" },
      {
        name: "Academic Administration",
        path: "/academics/academicAdministration",
      },
      { name: "Academic Regulations", path: "/academics/regulations" },
      { name: "Academic Calendar", path: "/academics/academic-calendar" },
      { name: "Academic Collaboration", path: "/academics/collaboration" },
      {
        name: "Internal Quality Assurance Cell (IQAC)",
        path: "/academics/IQAC",
      },
      { name: "Library", path: "/amenities/Library" },
    ],
  },
  {
    name: "Campuses",
    dropdownItems: [
      { name: "Central", path: "/campus/zone/central zone" },
      { name: "North", path: "/campus/zone/north zone" },
      { name: "South", path: "/campus/zone/south zone" },
      { name: "East", path: "/campus/zone/east zone" },
      { name: "West", path: "/campus/zone/west zone" },
    ],
  },
  {
    name: "Admission",
    dropdownItems: [
      {
        name: "Admission Portal",
        path: "/",
      },
      {
        name: "Information Bulletin",
        path: "",
      },
      {
        name: "Process and guidelines",
        path: "/admission/process-and-guidelines",
      },
      {
        name: "Fee Refund Policy",
        path: "/admission/refund-policy",
      },
    ],
  },
  {
    name: "Administration",
    dropdownItems: [
      {
        name: "Administrative Offices",
        path: "/administration/administrative",
      },
      { name: "Chancellor", path: "/administration/chancellor" },
      { name: "Vice Chancellor", path: "/administration/vice-chancellor" },
      { name: "Registrar", path: "/registrar" },
      { name: "Controller of Finance", path: "/administration/cof" },
      { name: "Controller of Examination", path: "/administration/coe" },
    ],
  },
  {
    name: "Student Life",
    dropdownItems: [
      { name: "NCC/NSS", path: "/ncc" },
      { name: "Sports", path: "/amenities/Sports" },
      { name: "Scholarship", path: "/amenities/Scholarship" },
      { name: "Internal Complaint Committee", path: "/amenities/ICC" },
      { name: "Anti-Ragging Cell", path: "amenities/Anti-Ragging" },
      { name: "Equal Opportunity Cell", path: "/amenities/Equal-Opportunity" },
    ],
  },
  {
    name: "T & P Cell",
    path: "/placement",
  },
  {
    name: "Work with us",
    dropdownItems: [
      { name: "Job Portal", path: "/recruitment" },
      { name: "Recruitment Rules", path: "/recruitment-rules" },
    ],
  },
  {
    name: "Entrepreneurship",
    path: "/Entrepreneurship",
  },
];

const DesktopNavBar = ({ setIsSearchOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openNestedDropdown, setOpenNestedDropdown] = useState(null);

  const handleItemHover = (itemName) => {
    setOpenDropdown(itemName);
    if (itemName === null) {
      setOpenNestedDropdown(null);
    }
  };

  const handleNestedHover = (itemName) => {
    setOpenNestedDropdown(itemName);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      height: 0,
      transition: { duration: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="hidden md:block bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg shadow-blue-500/30 rounded-3xl w-[96%] mx-auto my-4 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-5">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => handleItemHover(item.name)}
                onMouseLeave={() => handleItemHover(null)}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    to={item.path || "#"}
                    className="group inline-flex items-center text-base font-medium text-[#005CB9] hover:text-blue-800 whitespace-nowrap relative lg:px-1 py-1"
                  >
                    {item.name}
                    {item.dropdownItems && (
                      <ChevronDown
                        className={`ml-0.5 h-3 w-3 transition-transform duration-300 ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>

                <AnimatePresence>
                  {item.dropdownItems && openDropdown === item.name && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl min-w-[240px] z-50 overflow-hidden backdrop-blur-sm bg-white/90"
                    >
                      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-t-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600 opacity-20">
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundImage:
                                "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                              backgroundSize: "15px 15px",
                            }}
                          ></div>
                        </div>
                        <h3 className="text-center font-semibold relative z-10">
                          {item.name}
                        </h3>
                      </div>

                      <div className="p-2">
                        {item.dropdownItems.map((subItem, idx) => (
                          <motion.div
                            key={subItem.name}
                            variants={itemVariants}
                            className="relative group/item"
                            onMouseEnter={() => handleNestedHover(subItem.name)}
                            onMouseLeave={() =>
                              subItem.dropdownItems
                                ? null
                                : handleNestedHover(null)
                            }
                          >
                            <Link
                              to={subItem.path || "#"}
                              className="block px-4 py-3 my-1 text-gray-700 hover:text-blue-700 rounded-md transition-all duration-200 hover:bg-blue-50 relative overflow-hidden group-hover/item:pl-6"
                            >
                              <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-200"></span>
                              <span className="flex items-center justify-between">
                                <span>{subItem.name}</span>
                                {subItem.dropdownItems && (
                                  <ChevronDown
                                    className={`inline-block ml-2 h-4 w-4 transition-transform duration-300 ${
                                      openNestedDropdown === subItem.name
                                        ? "rotate-180"
                                        : "rotate-270"
                                    }`}
                                  />
                                )}
                              </span>
                            </Link>

                            <AnimatePresence>
                              {subItem.dropdownItems &&
                                openNestedDropdown === subItem.name && (
                                  <motion.div
                                    initial={{ opacity: 0, x: 20, width: 0 }}
                                    animate={{
                                      opacity: 1,
                                      x: 0,
                                      width: "auto",
                                    }}
                                    exit={{ opacity: 0, x: 20, width: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-full top-0 mt-0 bg-white/95 backdrop-blur-sm shadow-lg rounded-lg min-w-[220px] overflow-hidden"
                                    style={{
                                      boxShadow:
                                        "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                                      transform: "translateX(0)",
                                      left: "100%",
                                      zIndex: 60,
                                    }}
                                  >
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-2 rounded-t-lg">
                                      <h4 className="text-center font-medium text-sm">
                                        {subItem.name}
                                      </h4>
                                    </div>

                                    <div className="p-2">
                                      {subItem.dropdownItems.map(
                                        (nestedItem, idx) => (
                                          <motion.div
                                            key={nestedItem.name}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                          >
                                            <Link
                                              to={nestedItem.path}
                                              className="block px-4 py-2 text-gray-700 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-all duration-200 my-1 border-l-2 border-transparent hover:border-blue-400"
                                            >
                                              {nestedItem.name}
                                            </Link>
                                          </motion.div>
                                        )
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSearchOpen(true)}
            className="text-[#005CB9] hover:text-blue-900 rounded-full hover:bg-blue-100 transition-colors duration-300 lg:pl-10"
          >
            <Search className="h-5 w-5" />
          </motion.button>
        </div>
      </nav>
    </div>
  );
};

export default DesktopNavBar;
