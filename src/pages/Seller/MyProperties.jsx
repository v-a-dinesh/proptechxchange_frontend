// src/pages/Seller/MyProperties.jsx

import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import PropertyCard from "../../components/seller/PropertyCard";
import CreatePropertyForm from "../../components/seller/CreatePropertyForm";
import { addProperty } from "../../utils/api";

const MyProperties = () => {
  const { properties } = useOutletContext();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateProperty = async (propertyData) => {
    try {
      const response = await addProperty(propertyData);
      console.log("Property created:", response);
      // Refresh the properties list after creating a new property
      // You might want to implement this using the SellerDashboard component
    } catch (error) {
      console.error("Error creating property:", error.message);
    }
    setShowCreateForm(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Properties</h1>
      <button
        onClick={() => setShowCreateForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Create New Property
      </button>
      {showCreateForm && (
        <CreatePropertyForm
          onClose={() => setShowCreateForm(false)}
          onCreate={handleCreateProperty}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default MyProperties;
