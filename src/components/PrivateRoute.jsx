import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

const PrivateRoute = ({
  children,
  allowedRoles = [],
  redirectPath = "/login",
}) => {
  const { userRole, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    switch (userRole) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "seller":
        return <Navigate to="/seller/dashboard" replace />;
      case "buyer":
        return <Navigate to="/buyer/dashboard" replace />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default PrivateRoute;
