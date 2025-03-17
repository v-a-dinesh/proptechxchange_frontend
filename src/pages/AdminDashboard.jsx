import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUsers,
  FaChartBar,
  FaClipboardList,
  FaCog,
  FaBell,
  FaSearch,
  FaUserShield,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

const AdminDashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const auth = useAuth();
  const navigate = useNavigate();
  
  const [activeSection, setActiveSection] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalTransactions: 0,
    recentUsers: [],
    recentTransactions: [],
  });

 const [chartData, setChartData] = useState({
   series: [
     {
       name: "Users",
       data: [45, 52, 38, 24, 33, 26, 21],
     },
     {
       name: "Properties",
       data: [35, 41, 36, 26, 45, 48, 52],
     },
   ],
   options: {
     chart: {
       type: "bar",
       height: 350,
     },
     plotOptions: {
       bar: {
         horizontal: false,
         columnWidth: "55%",
       },
     },
     xaxis: {
       categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
     },
     colors: ["#3182ce", "#48bb78"],
   },
 });

 // Comprehensive chart data management
 const updateChartData = (updates) => {
   setChartData((prevData) => {
     const newData = { ...prevData };

     if (updates.series) {
       newData.series = updates.series;
     }

     if (updates.options) {
       newData.options = {
         ...newData.options,
         ...updates.options,
       };
     }

     return newData;
   });
 };

 // Example usage in useEffect or event handler
 useEffect(() => {
   // Example of dynamically updating chart
   updateChartData({
     series: [
       {
         name: "Updated Users",
         data: [50, 55, 40, 30, 35, 28, 25],
       },
       {
         name: "Updated Properties",
         data: [40, 45, 38, 32, 47, 50, 55],
       },
     ],
     options: {
       colors: ["#4299e1", "#48bb78"],
     },
   });
 }, []);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Mock Data Fetching
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const mockData = {
          totalUsers: 1245,
          totalProperties: 456,
          totalTransactions: 789,
          recentUsers: [
            {
              id: 1,
              name: "John Doe",
              email: "john@example.com",
              role: "Buyer",
              joinDate: "2023-07-15",
            },
            {
              id: 2,
              name: "Jane Smith",
              email: "jane@example.com",
              role: "Seller",
              joinDate: "2023-07-14",
            },
          ],
          recentTransactions: [
            {
              id: 1,
              property: "Luxury Apartment",
              amount: "$750,000",
              buyer: "John Doe",
              date: "2023-07-15",
            },
            {
              id: 2,
              property: "Commercial Space",
              amount: "$1,200,000",
              buyer: "Corporate Investor",
              date: "2023-07-14",
            },
          ],
        };

        setDashboardData(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Render Sections
  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Key Metrics */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center justify-between">
                <FaUsers className="text-4xl text-blue-600" />
                <div>
                  <h4 className="text-sm text-gray-600">Total Users</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {dashboardData.totalUsers}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center justify-between">
                <FaHome className="text-4xl text-green-600" />
                <div>
                  <h4 className="text-sm text-gray-600">Total Properties</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {dashboardData.totalProperties}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center justify-between">
                <FaMoneyBillWave className="text-4xl text-purple-600" />
                <div>
                  <h4 className="text-sm text-gray-600">Total Transactions</h4>
                  <p className="text-2xl font-bold text-purple-600">
                    {dashboardData.totalTransactions}
                  </p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="md:col-span-3 bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Platform Growth
              </h3>
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={350}
              />
            </div>
          </div>
        );

      case "users":
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                User Management
              </h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add New User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Join Date</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentUsers.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <span
                          className={`
                          px-2 py-1 rounded-full text-xs 
                          ${
                            user.role === "Buyer"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }
                        `}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3">{user.joinDate}</td>
                      <td className="p-3 flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <FaEdit />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "transactions":
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Recent Transactions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Property</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Buyer</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="p-3">{transaction.property}</td>
                      <td className="p-3">{transaction.amount}</td>
                      <td className="p-3">{transaction.buyer}</td>
                      <td className="p-3">{transaction.date}</td>
                      <td className="p-3">
                        <button className="text-blue-600 hover:text-blue-800">
                          <FaSearch />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6 text-gray-800">
              Platform Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Notification Preferences
                </label>
                <div className="flex items-center space-x-4">
                  <input 
                    type="checkbox" 
                    id="emailNotifications" 
                    className="form-checkbox"
                  />
                  <label htmlFor="emailNotifications">
                    Enable Email Notifications
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Security Settings
                </label>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Reset All Passwords
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-red-600">Admin Dashboard</h2>
          <p className="text-sm text-gray-500">Platform Management</p>
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
                icon: FaUsers,
                label: "User Management",
                section: "users",
              },
              {
                icon: FaClipboardList,
                label: "Transactions",
                section: "transactions",
              },
              {
                icon: FaCog,
                label: "Settings",
                section: "settings",
              },
            ].map((item) => (
              <li
                key={item.section}
                className={`flex items-center p-2 rounded-lg cursor-pointer ${
                  activeSection === item.section
                    ? "bg-red-100 text-red-600"
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
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaBell className="text-gray-600 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                5
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

export default AdminDashboard;