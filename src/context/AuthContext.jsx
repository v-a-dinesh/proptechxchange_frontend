import React, { createContext, useContext } from "react";

// Create the context with default values
export const AuthContext = createContext({
  user: null,
  userRole: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  setError: () => {},
  setUser: () => {},
  setUserRole: () => {},
  logout: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// Utility hooks for role-based access
export const useIsAdmin = () => {
  const { userRole } = useAuth();
  return userRole === "admin";
};

export const useIsSeller = () => {
  const { userRole } = useAuth();
  return userRole === "seller";
};

export const useIsBuyer = () => {
  const { userRole } = useAuth();
  return userRole === "buyer";
};

// Additional permission-based hooks
export const useHasPermission = (requiredRoles) => {
  const { userRole } = useAuth();
  return requiredRoles.includes(userRole);
};
