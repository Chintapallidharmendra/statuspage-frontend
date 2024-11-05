// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <footer className="py-10 text-center text-gray-600 border-t">
      <p>&copy; {new Date().getFullYear()} StatusPage. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-4">
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
