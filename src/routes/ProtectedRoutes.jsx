import React from "react";
import { Route } from "react-router-dom";
import { lazy } from "react";
import PrivateRoute from "../components/PrivateRoute";

const Dashboard = lazy(() => import("../pages/Buyer/BuyerDashboard"));

const ProtectedRoutes = () => [
  <Route
    key="dashboard"
    path="/dashboard"
    element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    }
  />,
];

export default ProtectedRoutes;
