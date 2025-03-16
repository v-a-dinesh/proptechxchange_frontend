// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-blue-500">
            PropTechXchange
          </h3>
          <p className="text-gray-400">
            Revolutionizing real estate transactions through transparent,
            secure, and efficient online auctions.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/login" className="hover:text-blue-500">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-blue-500">
                Register
              </Link>
            </li>
            <li>
              <a href="#features" className="hover:text-blue-500">
                Features
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <p>Email: support@proptechxchange.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-800 pt-4">
        <p>&copy; 2023 PropTechXchange. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
