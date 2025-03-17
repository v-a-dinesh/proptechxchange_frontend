import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Loader from "./components/Loader";

// Lazy load components for performance
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/BuyerDashboard"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const AboutUs = lazy(() => import("./pages/LandingPage/AboutUs"));
const Features = lazy(() => import("./pages/LandingPage/Features"));
const Demo = lazy(() => import("./pages/LandingPage/Demo"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const SellerDashboard = lazy(() => import("./pages/SellerDashboard"));
const BuyerDashboard = lazy(() => import("./pages/BuyerDashboard"));

// Error Boundary Component
const ErrorDisplay = () => {
  const { error, setError } = useAuth();

  if (!error) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white p-4 text-center flex justify-between items-center">
      <span>{error}</span>
      <button
        onClick={() => setError(null)}
        className="ml-4 underline hover:text-gray-200"
      >
        Dismiss
      </button>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorDisplay />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/features" element={<Features />} />
            <Route path="/demo" element={<Demo />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Role-Specific Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/seller/dashboard"
              element={
                <PrivateRoute allowedRoles={["seller"]}>
                  <SellerDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/buyer/dashboard"
              element={
                <PrivateRoute allowedRoles={["buyer"]}>
                  <BuyerDashboard />
                </PrivateRoute>
              }
            />

            {/* 404 Not Found Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
