import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, ChevronDown, X } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import TopBar from "./TopBar";


import SearchModal from "./SearchModal";
import { searchItems } from "./SearchItems";
import Logo from "../Reusable/Logo";

import { navItems, carouselImages } from "../../constants/NAV-DATA.JS";





//? for mobile view
const SidebarNav = ({ isOpen, onClose, navItems }) => {
  // Sidebar component code remains unchanged
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openNestedDropdown, setOpenNestedDropdown] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4 border-b flex justify-between items-center">
              {/* <img src={DSEULOGOTHICK} alt="DSEU Logo" className="h-12" /> */}
              <Logo cn={"h-12"} />
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <nav className="p-4">
              {navItems.map((item) => (
                <div key={item.name} className="mb-2">
                  <div
                    onClick={() => {
                      if (!item.dropdownItems) {
                        onClose();
                      } else {
                        setOpenDropdown(
                          openDropdown === item.name ? null : item.name
                        );
                        setOpenNestedDropdown(null);
                      }
                    }}
                    className="flex justify-between items-center py-3 px-2 rounded-lg hover:bg-blue-50 cursor-pointer"
                  >
                    {item.path ? (
                      <Link
                        to={item.path}
                        className="flex-grow text-[#005CB9] font-medium"
                        onClick={() => !item.dropdownItems && onClose()}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span className="flex-grow text-[#005CB9] font-medium">
                        {item.name}
                      </span>
                    )}
                    {item.dropdownItems && (
                      <ChevronDown
                        className={`ml-2 transition-transform duration-200 ${openDropdown === item.name ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </div>

                  <AnimatePresence>
                    {item.dropdownItems && openDropdown === item.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 py-2 space-y-2">
                          {item.dropdownItems.map((subItem) => (
                            <div key={subItem.name}>
                              <div
                                className="flex justify-between items-center py-2 px-3 text-gray-600 hover:bg-blue-50 rounded-lg text-sm cursor-pointer"
                                onClick={() => {
                                  if (!subItem.dropdownItems) {
                                    onClose();
                                  } else {
                                    setOpenNestedDropdown(
                                      openNestedDropdown === subItem.name
                                        ? null
                                        : subItem.name
                                    );
                                  }
                                }}
                              >
                                {subItem.path ? (
                                  <Link
                                    to={subItem.path}
                                    className="flex-grow"
                                    onClick={() =>
                                      !subItem.dropdownItems && onClose()
                                    }
                                  >
                                    {subItem.name}
                                  </Link>
                                ) : (
                                  <span className="flex-grow">
                                    {subItem.name}
                                  </span>
                                )}
                                {subItem.dropdownItems && (
                                  <ChevronDown
                                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${openNestedDropdown === subItem.name
                                      ? "rotate-180"
                                      : ""
                                      }`}
                                  />
                                )}
                              </div>
                              {subItem.dropdownItems &&
                                openNestedDropdown === subItem.name && (
                                  <div className="pl-4 py-1 space-y-1">
                                    {subItem.dropdownItems.map((nestedItem) => (
                                      <Link
                                        key={nestedItem.name}
                                        to={nestedItem.path}
                                        className="block py-2 px-3 text-gray-500 hover:bg-blue-50 rounded-lg text-xs"
                                        onClick={onClose}
                                      >
                                        {nestedItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

//? desktop view
const ResponsiveHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [openNestedDropdown, setOpenNestedDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isSticky, setIsSticky] = useState(true);

  // takes to the # according to the hash in the url.
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 100); // Show sticky header after 100px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle nested dropdown hover
  const handleItemHover = (itemName) => {
    setOpenDropdown(itemName);
    if (itemName === null) {
      setOpenNestedDropdown(null);
    }
  };

  const handleNestedHover = (itemName) => {
    setOpenNestedDropdown(itemName);
  };

  // Dropdown animation variants
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
    <div className="w-full">
      {/* Desktop Header */}
      <TopBar />
      <div className="hidden md:block bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div
              onClick={() => navigate("/")}
              className="flex-shrink-0 cursor-pointer"
            >
              {/* <img src={DSEULOGOTHICK} alt="DSEU Logo" className="h-28" /> */}
              <Logo cn={"h-28"} />
            </div>
            <div className="relative h-32 w-64 overflow-hidden rounded-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-full w-full"
                >
                  <img
                    src={carouselImages[currentImage].src}
                    alt={carouselImages[currentImage].alt}
                    className="w-full h-full object-contain mt-5"
                    style={{
                      width: "100%",
                      height: "70%",
                      objectFit: "contain",
                      objectPosition: "left",
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            onClick={() =>
              window.open(
                "https://www.google.com/maps/place/Delhi+Skill+and+Entrepreneurship+University/@28.5824457,77.0600919,17z/data=!3m1!4b1!4m6!3m5!1s0x390d1b1939555555:0x5cb3da8201a9355b!8m2!3d28.5824457!4d77.0626668!16s%2Fg%2F11jyk9d7qs?entry=ttu&g_ep=EgoyMDI1MDEwOC4wIKXMDSoJLDEwMjExMjMzSAFQAw%3D%3D",
                "_blank"
              )
            }
          >
            <FaMapMarkerAlt className="text-4xl text-orange-500" />
            <div>
              <div className="font-medium font-inter">
                Delhi Skill and Entrepreneurship University
              </div>
              <div className="text-gray-600">
                Sector-9, Dwarka, New Delhi-110077
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header with Carousel */}
      <div className="md:hidden bg-white shadow-md rounded-b-1xl">
        <div className="px-2 ">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-4">
              {/* <img
                src={DSEULOGOTHICK}
                alt="DSEU Logo"
                className="h-16"
                onClick={() => {
                  navigate("/");
                  window.location.href = "/";
                }}
                style={{ cursor: "pointer" }}
              /> */}
              <Logo
                cn={"h-16"}
                handleClick={() => {
                  navigate("/");
                  window.location.href = "/";
                }}
              />
              <div className="relative h-24 w-32 overflow-hidden rounded-lg">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-full w-full"
                    onClick={() => {
                      navigate("/");
                      window.location.href = "/";
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={carouselImages[currentImage].src}
                      alt={carouselImages[currentImage].alt}
                      className="w-full h-full "
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() =>
                  window.open("https://www.google.com/maps?q=DSEU", "_blank")
                }
                className="text-orange-500"
              >
                <FaMapMarkerAlt className="h-6 w-6" />
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-blue-600"
              >
                <Search className="h-6 w-6" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="text-blue-600"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            navItems={searchItems}
          />
        </div>

        {/* Sidebar Navigation */}
        <SidebarNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navItems={navItems}
        />
      </div>

      {/* Enhanced Desktop Navigation Bar */}

      <div className="hidden md:block bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg shadow-blue-500/30 rounded-3xl mx-auto my-4 sticky top-0 z-50 md:w-[97%] lg:w-[96%] xl:w-[95%]">
        <nav className="max-w-7xl mx-auto"> {/* ml-7 2xl:mx-auto: to be added */}
          <div className="flex justify-between items-center md:h-24 xl:h-16">
            <div className="flex items-center space-x-5 md:flex-wrap xl:flex-nowrap md:ml-5 lg:ml-0">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group flex-wrap"
                  onMouseEnter={() => handleItemHover(item.name)}
                  onMouseLeave={() => handleItemHover(null)}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      to={item.path || "#"}
                      className="group inline-flex items-center md:text-sm lg:text-base font-medium text-[#005CB9] hover:text-blue-800 whitespace-nowrap relative lg:px-1 py-1"
                    >
                      {item.name}
                      {item.dropdownItems && (
                        <ChevronDown
                          className={`ml-0.5 h-3 w-3 transition-transform duration-300 ${openDropdown === item.name ? "rotate-180" : ""
                            }`}
                        />
                      )}

                      {/* Animated underline effect */}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </motion.div>

                  {/* Enhanced Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdownItems && openDropdown === item.name && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl min-w-[240px] z-50 overflow-hidden backdrop-blur-sm bg-white/90"
                      >
                        {/* Fancy Header */}
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

                        {/* Dropdown items with hover effects */}
                        <div className="p-2">
                          {item.dropdownItems.map((subItem, idx) => (
                            <motion.div
                              key={subItem.name}
                              variants={itemVariants}
                              className="relative group/item"
                              onMouseEnter={() =>
                                handleNestedHover(subItem.name)
                              }
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
                                {/* Left side hover indicator */}
                                <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-200"></span>

                                <span className="flex items-center justify-between">
                                  <span>{subItem.name}</span>
                                  {subItem.dropdownItems && (
                                    <ChevronDown
                                      className={`inline-block ml-2 h-4 w-4 transition-transform duration-300 ${openNestedDropdown === subItem.name
                                        ? "rotate-180"
                                        : "rotate-270"
                                        }`}
                                    />
                                  )}
                                </span>
                              </Link>

                              {/* FIXED: Enhanced Nested Dropdown - this is the part with the issue */}
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
                                        // Fix for positioning - ensure the dropdown is visible
                                        transform: "translateX(0)",
                                        left: "100%", // Position to the right of the parent
                                        zIndex: 60, // Higher z-index than the parent dropdown
                                      }}
                                    >
                                      {/* Nested Header with gradient */}
                                      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-2 rounded-t-lg">
                                        <h4 className="text-center font-medium text-sm">
                                          {subItem.name}
                                        </h4>
                                      </div>

                                      {/* Nested Items with hover effects */}
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

            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              navItems={searchItems}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
              className="text-[#005CB9] hover:text-blue-900 rounded-full hover:bg-blue-100 transition-colors duration-300 lg:pl-10"
            >
              <Search className="mr-10 h-5 w-5" />
            </motion.button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveHeader;
