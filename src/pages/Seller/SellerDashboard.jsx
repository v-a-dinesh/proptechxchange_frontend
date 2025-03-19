import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaGavel,
  FaChartLine,
  FaUser,
  FaBell,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaLock,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellerDashboard = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rolePermissions, setRolePermissions] = useState({
    canCreateProperty: false,
    canEditProperty: false,
    canDeleteProperty: false,
  });

  // Update permissions based on user role
  useEffect(() => {
    const updatePermissions = () => {
      switch (userRole) {
        case "admin":
          setRolePermissions({
            canCreateProperty: true,
            canEditProperty: true,
            canDeleteProperty: true,
          });
          break;
        case "seller":
          setRolePermissions({
            canCreateProperty: true,
            canEditProperty: true,
            canDeleteProperty: false,
          });
          break;
        case "viewer":
          setRolePermissions({
            canCreateProperty: false,
            canEditProperty: false,
            canDeleteProperty: false,
          });
          break;
        default:
          setRolePermissions({
            canCreateProperty: false,
            canEditProperty: false,
            canDeleteProperty: false,
          });
      }
    };

    updatePermissions();
  }, [userRole]);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout failed", error);
    }
  };

  // Mock data - replace with actual backend calls
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const mockProperties = [
          {
            id: 1,
            title: "Modern Loft in Tech District",
            location: "San Francisco, CA",
            price: "$850,000",
            status: "Active",
            type: "Residential",
            listingDate: "2023-07-15",
          },
          {
            id: 2,
            title: "Waterfront Commercial Space",
            location: "Seattle, WA",
            price: "$1,200,000",
            status: "Pending",
            type: "Commercial",
            listingDate: "2023-07-10",
          },
        ];
        setProperties(mockProperties);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch properties");
        console.error("Failed to fetch properties", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Property Management Handlers
  const handleCreateProperty = () => {
    if (rolePermissions.canCreateProperty) {
      navigate("/seller/create-property");
    } else {
      toast.warning("You do not have permission to create properties", {
        icon: <FaLock />,
      });
    }
  };

  const handleEditProperty = (propertyId) => {
    if (rolePermissions.canEditProperty) {
      navigate(`/seller/edit-property/${propertyId}`);
    } else {
      toast.warning("You do not have permission to edit properties", {
        icon: <FaLock />,
      });
    }
  };

  const handleDeleteProperty = (propertyId) => {
    if (rolePermissions.canDeleteProperty) {
      setProperties(properties.filter((prop) => prop.id !== propertyId));
      toast.success("Property deleted successfully");
    } else {
      toast.warning("You do not have permission to delete properties", {
        icon: <FaLock />,
      });
    }
  };

  // Render Sections with Role-Based Access
  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Property Performance
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-600">Total Properties</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {properties.length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-sm text-gray-600">Active Listings</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {properties.filter((p) => p.status === "Active").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Recent Activity
              </h3>
              {properties.slice(0, 2).map((property) => (
                <div
                  key={property.id}
                  className="flex justify-between items-center mb-4 p-4 border rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold">{property.title}</h4>
                    <p className="text-sm text-gray-600">{property.status}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {property.listingDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "properties":
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">My Properties</h3>
              {rolePermissions.canCreateProperty && (
                <button
                  onClick={handleCreateProperty}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <FaPlus className="mr-2" /> Add New Property
                </button>
              )}
            </div>

            {loading ? (
              <div className="text-center py-6">Loading properties...</div>
            ) : (
              <div className="space-y-4">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className="flex justify-between items-center p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold">{property.title}</h4>
                      <p className="text-sm text-gray-600">
                        {property.location} | {property.type}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`text-sm font-medium ${
                          property.status === "Active"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {property.status}
                      </span>
                      {rolePermissions.canEditProperty && (
                        <button
                          onClick={() => handleEditProperty(property.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                      )}
                      {rolePermissions.canDeleteProperty && (
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "profile":
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Seller Profile
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
                  <strong>User Role:</strong> {userRole || "Not Assigned"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Seller Account</h4>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-medium text-green-800">
                    {userRole === "seller" || userRole === "admin"
                      ? "Verified Seller"
                      : "Limited Access"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Properties Listed: {properties.length}
                  </p>
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
          <h2 className="text-2xl font-bold text-green-600">
            Seller Dashboard
          </h2>
          <p className="text-sm text-gray-500">
            {userRole ? `${userRole} Panel` : "Property Listing Platform"}
          </p>
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
                label: "My Properties",
                section: "properties",
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
                    ? "bg-green-100 text-green-600"
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
            {userRole
              ? `${
                  userRole.charAt(0).toUpperCase() + userRole.slice(1)
                } Dashboard`
              : "Dashboard"}
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

      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SellerDashboard;
