// src/pages/Seller/SellerDashboard.jsx

import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/seller/Sidebar";
import { getAuth } from "firebase/auth";
import { getSellerProperties } from "../../utils/api";

const SellerDashboard = () => {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchSellerProperties(currentUser.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchSellerProperties = async (sellerId) => {
    try {
      const response = await getSellerProperties(sellerId);
      setProperties(response.properties);
    } catch (error) {
      console.error("Error fetching properties:", error.message);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar user={user} />
      <div className="flex-1 p-6 ml-64">
        <Outlet context={{ user, properties }} />
      </div>
    </div>
  );
};

export default SellerDashboard;
