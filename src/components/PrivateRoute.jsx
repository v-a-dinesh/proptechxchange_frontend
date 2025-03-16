import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader"; // Ensure this component exists

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("PrivateRoute - User:", user);
  console.log("PrivateRoute - Loading:", loading);

  if (loading) {
    return <Loader />;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
