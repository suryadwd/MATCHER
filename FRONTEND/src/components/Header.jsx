import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Flame, User, LogOut, Menu } from "lucide-react";

const Header = () => {
  const { authUser, logout } = useAuthStore();
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setdropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-green-400 via-green-600 to-green-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center py-4 ">
          <div className="flex items-center ">
            <Link to={"/"} className="flex items-center">
              <Flame size={40} color="white" />
              <span className="text-2xl font-bold text-white hidden sm:inline">
                MATCHERS
              </span>
            </Link>
          </div>

          <div className="hidden  md:flex  items-center space-x-4">
            {authUser ? (
              <div className="relative hover:cursor-pointer" ref={dropdownRef}>
                <button
                  className="flex items-center space-x-2 text-white "
                  onClick={() => setdropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={authUser.image || "./avatar.png"}
                    alt=""
                    className="w-8 h-8 rounded-full border-4 border-white"
                  />
                  <span className="text-white font-medium">
                    {authUser.name}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setdropdownOpen(false)}
                    >
                      <div className="flex  items-center">
                        <User className="mr-2" size={16} color="black" />
                        Profile
                      </div>
                    </Link>
                    <button
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={logout}
                    >
                      {" "}
                      <div className="flex items-center">
                        <LogOut className="mr-2" size={16} color="black" />
                        Logout
                      </div>{" "}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="text-white font-medium   hover:text-pink-500 transition-colors duration-300 ease-in-out  "
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="text-white font-medium   hover:text-pink-500 transition-colors duration-300 ease-in-out  "
                >
                  signup
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              className="text-white"
              onClick={() => setmobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={40} color="white" />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-pink-600">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {authUser ? (
              <>
                <Link
                  to="/auth"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700"
                  onClick={() => setmobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setmobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700"
                  onClick={() => setmobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700"
                  onClick={() => setmobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

