import React from "react";
import { Route } from "react-router-dom";
import { lazy } from "react";
import PrivateRoute from "../components/PrivateRoute";

const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const SellerDashboard = lazy(() => import("../pages/Seller/SellerDashboard"));
const BuyerDashboard = lazy(() => import("../pages/Buyer/BuyerDashboard"));

const RoleSpecificRoutes = () => [
  <Route
    key="admin-dashboard"
    path="/admin/dashboard"
    element={
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </PrivateRoute>
    }
  />,
  <Route
    key="seller-dashboard"
    path="/seller/dashboard"
    element={
      <PrivateRoute allowedRoles={["seller"]}>
        <SellerDashboard />
      </PrivateRoute>
    }
  />,
  <Route
    key="buyer-dashboard"
    path="/buyer/dashboard"
    element={
      <PrivateRoute allowedRoles={["buyer"]}>
        <BuyerDashboard />
      </PrivateRoute>
    }
  />,
];

export default RoleSpecificRoutes;
