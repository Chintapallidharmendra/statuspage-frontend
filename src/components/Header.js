// src/components/Header.js
import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-green-400">
          <Link to="/">STATUS TRACKER</Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-green-400">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-400">
            About
          </Link>
          <Link to="/privacy-policy" className="hover:text-green-400">
            Privacy Policy
          </Link>
          {user && (
            <Link to="/dashboard" className="hover:text-green-400">
              Dashboard
            </Link>
          )}
        </nav>

        {/* User Info / Login-Logout Button */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span>Welcome, {`${user.first_name} ${user.last_name}`}</span>
              <button
                onClick={logout}
                className="px-4 py-1 bg-red-500 hover:bg-red-600 rounded-md text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1 bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu (conditionally shown) */}
      {isMobileMenuOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-2">
          <Link
            to="/"
            className="hover:text-green-400 px-4 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-green-400 px-4 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/privacy-policy"
            className="hover:text-green-400 px-4 py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Privacy Policy
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-green-400 px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <span className="px-4 py-2">Welcome, {user.name}</span>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white mx-4"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md mx-4 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
