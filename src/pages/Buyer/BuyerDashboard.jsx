// src/pages/Buyer/BuyerDashboard.jsx

import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/buyer/Sidebar";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";

const BuyerDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { loading } = useAuth();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex">
      <Sidebar user={user} />
      <div className="flex-1 p-6 ml-64">
        <Outlet context={{ user }} />
      </div>
    </div>
  );
};

export default BuyerDashboard;
