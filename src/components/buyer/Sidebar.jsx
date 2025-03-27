// src/components/buyer/Sidebar.jsx

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  HomeIcon,
  BuildingLibraryIcon,
  ClockIcon,
  DocumentTextIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      path: "/buyer/dashboard",
      label: "Home",
      icon: HomeIcon,
    },
    {
      path: "/buyer/dashboard/my-auctions",
      label: "My Auctions",
      icon: BuildingLibraryIcon,
    },
    {
      path: "/buyer/dashboard/bid-history",
      label: "Bid History",
      icon: ClockIcon,
    },
    {
      path: "/buyer/dashboard/profile",
      label: "Profile",
      icon: UserCircleIcon,
    },
  ];

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
      : "text-gray-600 hover:bg-gray-100";
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-64 bg-white shadow-xl h-screen fixed top-0 left-0 overflow-y-auto border-r">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <div className="h-10 w-10 mr-3 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
            PT
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Buyer Portal</h2>
        </div>

        <div className="mb-6 bg-gray-100 rounded-lg p-4 shadow-sm">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full mr-4 bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold">
              {user.displayName ? user.displayName[0].toUpperCase() : "U"}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {user.displayName || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-[150px]">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center p-3 rounded-lg transition-all duration-200 
                      ${isActive(item.path)}
                    `}
                  >
                    <Icon className="w-5 h-5 mr-3 text-current" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}

            <li className="pt-4 mt-4 border-t">
              <button
                onClick={handleLogout}
                className="
                  w-full flex items-center p-3 rounded-lg 
                  text-red-600 hover:bg-red-50 
                  transition-all duration-200
                "
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3 text-current" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
