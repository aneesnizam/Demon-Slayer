import { useState } from "react";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";

export default function Nav({ active = "/" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Characters", href: "/characters" },
    { name: "Breathing Styles", href: "/breathing" },
    { name: "Demons", href: "/demons" },
  ];

  let themeColor = active === "/demons" ? "red" : "green";

  return (
    <>
      {/* Navigation bar */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 bg-black/50 backdrop-blur-lg py-4 shadow-lg`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center justify-center">
              <div className="text-white font-bold text-2xl mr-2">
                <img className="w-[35px] h-full" src={Logo} alt="" />
              </div>
              {/* Added transition classes to the logo text */}
              <span
                className={`text-transparent font-bold text-2xl tracking-wide bg-gradient-to-r ${
                  active === "/demons"
                    ? "from-red-300 to-red-500"
                    : "from-green-300 to-green-500"
                } bg-clip-text transition-all duration-300`}
              >
                {" "}
                {/* <-- MODIFIED */}
                鬼滅の刃
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  // Added transition classes to the navigation links
                  className={`${
                    active === item.href
                      ? themeColor === "red"
                        ? "text-red-400"
                        : "text-green-400"
                      : "text-gray-300"
                  } ${
                    themeColor === "red"
                      ? "hover:text-red-400"
                      : "hover:text-green-400"
                  } transition-colors duration-300 relative group font-medium`}
                >
                  {item.name}
                  {/* The underline will transition smoothly because its parent has transition properties */}
                  <span
                    className={`
                      ${active === item.href ? "w-full" : "w-0"} 
                      absolute left-0 -bottom-1 h-0.5 
                      bg-${themeColor}-400 
                      transition-all duration-300 group-hover:w-full
                    `}
                  ></span>
                </Link>
              ))}
            </div>

            {/* Search and Action Button */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Added transition class to the search icon for smooth hover */}
              <Link to={"/characters"} className="text-gray-300 hover:text-green-400 transition-colors">
                {" "}
                {/* <-- ADDED */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Link>
              {/* The "Watch Now" button already had transition classes, so it's good! */}
              <a
                href="https://www.crunchyroll.com/series/GY5P48XEY/demon-slayer-kimetsu-no-yaiba?srsltid=AfmBOopLUor55SiOYShXed1HdQg3Eb_aBdYrkpivD5EwMyRzD5pxq1te"
                target="_blank"
                className={`px-4 py-2 bg-gradient-to-r ${
                  active === "/demons"
                    ? "from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
                    : "from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
                } text-white rounded-md transition-all duration-300 transform hover:scale-105 text-sm font-semibold`}
              >
                Watch Now
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              {/* Added transition class for smooth hover */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-green-400 focus:outline-none transition-colors" // <-- ADDED
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  // Use the dynamic themeColor and add transitions for the mobile links
                  className={`block py-2 transition-colors duration-300 font-medium ${
                    active === item.href
                      ? `text-${themeColor}-400`
                      : "text-gray-300"
                  } hover:text-${themeColor}-400`} // <-- MODIFIED
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-700">
                {/* Use the dynamic themeColor for the mobile button as well */}
                <button
                  className={`w-full mt-2 px-4 py-2 bg-gradient-to-r ${
                    active === "/demons"
                      ? "from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
                      : "from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
                  } text-white rounded-md transition-all duration-300 text-sm font-semibold`}
                >
                  {" "}
                  {/* <-- MODIFIED */}
                  Watch Now
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
