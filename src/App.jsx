import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/LandingPage/AboutUs";
import Features from "./pages/LandingPage/Features";
import Demo from "./pages/LandingPage/Demo";
// Error Boundary Component
const ErrorDisplay = () => {
  const { error, setError } = useAuth();

  if (!error) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4 text-center">
      {error}
      <button onClick={() => setError(null)} className="ml-4 underline">
        Dismiss
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorDisplay />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/features" element={<Features />} />
          <Route path="/demo" element={<Demo />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
