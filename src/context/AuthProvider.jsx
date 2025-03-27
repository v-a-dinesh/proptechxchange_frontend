//src\context\AuthProvider.jsx

import React, { useState, useEffect, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserDocument, logoutUser } from "../firebaseConfig";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  // State variables
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Logout method
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setUserRole(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError(err);
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (currentUser) {
          try {
            // Fetch user document from Firestore
            const userDoc = await getUserDocument(currentUser.uid);

            setUser(currentUser);
            setUserRole(userDoc?.role || null);
            setIsAuthenticated(true);
            setError(null);
          } catch (err) {
            console.error("Error fetching user document", err);
            setError(err);
            setUser(null);
            setUserRole(null);
            setIsAuthenticated(false);
          }
        } else {
          // No user is signed in
          setUser(null);
          setUserRole(null);
          setIsAuthenticated(false);
        }

        // Finish loading
        setLoading(false);
      },
      (authError) => {
        console.error("Auth State Error", authError);
        setError(authError);
        setUser(null);
        setUserRole(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Error clearing effect
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      userRole,
      loading,
      error,
      isAuthenticated,
      setError,
      setUser,
      setUserRole,
      logout,
    }),
    [user, userRole, loading, error, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? (
        <div className="loading-overlay">
          <div className="spinner">Loading...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
