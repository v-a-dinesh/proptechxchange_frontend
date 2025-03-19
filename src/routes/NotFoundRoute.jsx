import React from "react";
import { Route, Navigate } from "react-router-dom";

const NotFoundRoute = () => [
  <Route key="not-found" path="*" element={<Navigate to="/" replace />} />,
];

export default NotFoundRoute;
