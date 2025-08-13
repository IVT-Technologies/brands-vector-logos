import { useState, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import CustomButton from "./CustomeButton";
import { nav, navMobile } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useClickOutside } from "../hooks/useClickOutside";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isScrolled = useScrollPosition(10);
  const navigate = useNavigate();

  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Close drawer when clicking outside
  useClickOutside(drawerRef, closeDrawer, isDrawerOpen, [menuButtonRef]);

  
  if (typeof document !== "undefined") {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "unset";
  }

  function toggleMenu() {
    isDrawerOpen ? closeDrawer() : openDrawer();
  }

  function openDrawer() {
    setIsDrawerOpen(true);
    setIsMenuOpen(true);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
    setTimeout(() => setIsMenuOpen(false), 300);
  }

  function handleNavClick(item) {
    if (item.type === "scroll") {
      const section = document.getElementById(item.link);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const target = document.getElementById(item.link);
          if (target) target.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else {
      navigate(item.link);
    }
    closeDrawer();
  }

  return (
    <>
      <div
        className={`fixed top-0 w-full z-50 transition-colors duration-300 bg-blue-600 ${
          isScrolled ? "bg-blue-200 shadow-md" : "border-blue-600"
        }`}
      >
        <div className="mx-auto px-4 md:px-8 lg:px-20 pt-1">
          <div
            className={`flex justify-between items-center h-16 border-b ${
              isScrolled ? "border-none" : "border-blue-700"
            }`}
          >
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-200">
                <Link to="/">Brands Vector Logos</Link>
              </span>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                ref={menuButtonRef}
                onClick={toggleMenu}
                className="text-gray-200 hover:text-blue-600 focus:outline-none transition-colors duration-200 p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </button>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {nav.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item)}
                  className="text-gray-100 md:text-sm xl:text-lg hover:text-white hover:border-b hover:border-blue-600 transition-colors duration-200 font-medium bg-transparent border-none cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div
          ref={drawerRef}
          className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out border-l border-gray-200 ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button
              onClick={closeDrawer}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2"
              aria-label="Close menu"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex flex-col p-6 space-y-6">
            {navMobile.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item)}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-lg py-3 border-b border-gray-100 hover:border-blue-200"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col w-60 mx-auto space-y-3 mt-4 pt-4 ">
            <button className="bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 font-medium mt-4 py-2 px-4 rounded-lg shadow-sm transition-all duration-200">
              Log In
            </button>
            <CustomButton className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-200">
              Sign Up
            </CustomButton>
          </div>

          {/* Drawer Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-center text-sm text-gray-500">VectorLogo © 2024</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
