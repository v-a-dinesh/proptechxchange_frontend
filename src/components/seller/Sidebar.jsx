// src/components/Seller/Sidebar.jsx

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-200" : "";
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="w-64 bg-gray-100 h-screen fixed top-0 left-0 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Seller Dashboard</h2>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600">
            Welcome, {user.displayName}
          </p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <nav>
          <ul>
            <li className={`mb-2 ${isActive("/seller/dashboard")}`}>
              <Link
                to="/seller/dashboard"
                className="block p-2 rounded hover:bg-gray-200"
              >
                Home
              </Link>
            </li>
            <li className={`mb-2 ${isActive("/seller/dashboard/properties")}`}>
              <Link
                to="/seller/dashboard/properties"
                className="block p-2 rounded hover:bg-gray-200"
              >
                My Properties
              </Link>
            </li>
            <li className={`mb-2 ${isActive("/seller/dashboard/auctions")}`}>
              <Link
                to="/seller/dashboard/auctions"
                className="block p-2 rounded hover:bg-gray-200"
              >
                My Auctions
              </Link>
            </li>
            <li
              className={`mb-2 ${isActive(
                "/seller/dashboard/auction-history"
              )}`}
            >
              <Link
                to="/seller/dashboard/auction-history"
                className="block p-2 rounded hover:bg-gray-200"
              >
                Auction History
              </Link>
            </li>
            <li className={`mb-2 ${isActive("/seller/dashboard/profile")}`}>
              <Link
                to="/seller/dashboard/profile"
                className="block p-2 rounded hover:bg-gray-200"
              >
                Profile
              </Link>
            </li>
            <li className="mb-2">
              <button
                onClick={handleLogout}
                className="w-full text-left p-2 rounded hover:bg-gray-200"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
