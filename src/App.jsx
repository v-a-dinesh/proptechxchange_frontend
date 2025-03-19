import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import {
  PublicRoutes,
  ProtectedRoutes,
  RoleSpecificRoutes,
  NotFoundRoute,
} from "./routes";
import ErrorDisplay from "./components/ErrorDisplay";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorDisplay />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {PublicRoutes()}
            {ProtectedRoutes()}
            {RoleSpecificRoutes()}
            {NotFoundRoute()}
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
