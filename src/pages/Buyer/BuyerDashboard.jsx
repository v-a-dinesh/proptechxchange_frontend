import React, { useState } from "react";
import {
  FaHome,
  FaGavel,
  FaChartLine,
  FaUser,
  FaBell,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Mock data - replace with actual data from your backend
  const propertyListings = [
    {
      id: 1,
      title: "Luxury Apartment in Downtown",
      location: "New York, NY",
      basePrice: "$500,000",
      status: "Active Auction",
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Spacious Suburban Home",
      location: "San Francisco, CA",
      basePrice: "$750,000",
      status: "Upcoming Auction",
      imageUrl: "https://via.placeholder.com/300x200",
    },
  ];

  const recentBids = [
    {
      id: 1,
      property: "Luxury Apartment in Downtown",
      bidAmount: "$525,000",
      date: "2023-07-15",
    },
    {
      id: 2,
      property: "Spacious Suburban Home",
      bidAmount: "$760,000",
      date: "2023-07-14",
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Active Auctions
              </h3>
              {propertyListings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex items-center mb-4 p-4 border rounded-lg hover:shadow-sm transition"
                >
                  <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {listing.title}
                    </h4>
                    <p className="text-sm text-gray-600">{listing.location}</p>
                    <span className="text-sm font-medium text-green-600">
                      {listing.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Recent Bids
              </h3>
              {recentBids.map((bid) => (
                <div
                  key={bid.id}
                  className="flex justify-between items-center mb-4 p-4 border rounded-lg hover:shadow-sm transition"
                >
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {bid.property}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Bid Amount: {bid.bidAmount}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">{bid.date}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "auctions":
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">My Auctions</h3>
              <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <FaPlus className="mr-2" /> Create New Auction
              </button>
            </div>
            <div className="space-y-4">
              {propertyListings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex justify-between items-center p-4 border rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold">{listing.title}</h4>
                    <p className="text-sm text-gray-600">{listing.location}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-green-600">
                      {listing.status}
                    </span>
                    <button className="text-blue-600 hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Profile Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <p>
                  <strong>Name:</strong> {user?.displayName || "Not Provided"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>User ID:</strong> {user?.uid}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Account Type</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-800">Buyer Account</p>
                  <p className="text-sm text-gray-600">Standard Membership</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-600">PropTechXchange</h2>
          <p className="text-sm text-gray-500">Real Estate Auction Platform</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {[
              {
                icon: FaHome,
                label: "Overview",
                section: "overview",
              },
              {
                icon: FaGavel,
                label: "My Auctions",
                section: "auctions",
              },
              {
                icon: FaChartLine,
                label: "Market Insights",
                section: "insights",
              },
              {
                icon: FaUser,
                label: "Profile",
                section: "profile",
              },
            ].map((item) => (
              <li
                key={item.section}
                className={`flex items-center p-2 rounded-lg cursor-pointer ${
                  activeSection === item.section
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection(item.section)}
              >
                <item.icon className="mr-3" />
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user?.displayName || user?.email}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaBell className="text-gray-600 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </div>
            <div className="relative">
              <FaSearch className="text-gray-600" />
            </div>
          </div>
        </div>

        {renderSection()}
      </div>
    </div>
  );
};

export default Dashboard;
