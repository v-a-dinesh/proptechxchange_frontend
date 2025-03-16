// HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <header
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('src/assets/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">
          Transform Real Estate Auctions
        </h1>
        <p className="text-lg mb-8">
          Revolutionizing property transactions through transparent, real-time
          bidding
        </p>
        <div className="flex space-x-4">
          <Link
            to="/register"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg"
          >
            Create Account
          </Link>
          <a
            href="#features"
            className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg"
          >
            Learn More
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
