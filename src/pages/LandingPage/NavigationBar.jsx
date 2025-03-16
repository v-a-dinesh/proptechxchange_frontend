// NavigationBar.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="fixed w-full z-20 top-0 left-0 bg-white shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <img src="src/assets/prop.jpg" alt="Logo" className="h-10 mr-3" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-600">
            PropTechXchange
          </span>
        </a>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            About Us
          </Link>
          <Link to="/features" className="text-gray-700 hover:text-blue-600">
            Features
          </Link>
          <Link to="/demo" className="text-gray-700 hover:text-blue-600">
            Demo
          </Link>
        </div>
        <div className="flex space-x-4 md:order-2">
          <Link
            to="/register"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
