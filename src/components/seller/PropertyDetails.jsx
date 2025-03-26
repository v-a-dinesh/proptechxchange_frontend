// src/components/Seller/PropertyDetails.jsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropertyDetailsCard from "./PropertyDetailsCard";

// Import the getSingleProperty function from the propertyApi module
import { getSingleProperty } from "../../utils/propertyApi";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const loadProperty = async () => {
      try {
        // Use getSingleProperty instead of fetchPropertyDetails
        const propertyDetails = await getSingleProperty(propertyId);
        setProperty(propertyDetails.property); // Access the property object from the response
      } catch (error) {
        console.error("Error fetching property details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [propertyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-4">Property Details</h1>
      <PropertyDetailsCard property={property} />
    </div>
  );
};

export default PropertyDetails;
