// src/components/Seller/PropertyCard.jsx

import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <img
        src={property.images[0]?.url || "placeholder.jpg"}
        alt={property.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
      <p className="text-gray-600 mb-2">
        {property.description.slice(0, 100)}...
      </p>
      <p className="text-gray-500 mb-2">
        {property.size.value} {property.size.unit} - {property.propertyType}
      </p>
      <div className="flex justify-between items-center">
        <Link
          to={`/seller/dashboard/properties/${property._id}`}
          className="text-blue-500 hover:underline"
        >
          View Details
        </Link>
        <button
          onClick={() => {
            // Implement start auction functionality here
            console.log("Start Auction clicked for", property._id);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Start Auction
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
