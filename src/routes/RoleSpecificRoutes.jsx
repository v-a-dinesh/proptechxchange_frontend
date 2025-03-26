// src/routes/RoleSpecificRoutes.js

import React from "react";
import { Route } from "react-router-dom";
import { lazy } from "react";
import PrivateRoute from "../components/PrivateRoute";

const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const SellerDashboard = lazy(() => import("../pages/Seller/SellerDashboard"));
const BuyerDashboard = lazy(() => import("../pages/Buyer/BuyerDashboard"));
const MyProperties = lazy(() => import("../pages/Seller/MyProperties"));
const MyAuctions = lazy(() => import("../pages/Seller/MyAuctions"));
const AuctionHistory = lazy(() => import("../pages/Seller/AuctionHistory"));
const Profile = lazy(() => import("../pages/Seller/Profile"));
import PropertyDetails from "../components/seller/PropertyDetails";

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
  >
    <Route index element={<MyProperties />} />
    <Route path="properties" element={<MyProperties />} />
    <Route
      path="/seller/dashboard/properties/:propertyId"
      element={<PropertyDetails />}
    />
    <Route path="auctions" element={<MyAuctions />} />
    <Route path="auction-history" element={<AuctionHistory />} />
    <Route path="profile" element={<Profile />} />
  </Route>,
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
