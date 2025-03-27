// src/components/buyer/PropertyCard.jsx

import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const { _id, title, propertyType, address, images, status } = property;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/buyer/dashboard/properties/${_id}`}>
        <img
          src={images[0]?.url || "placeholder.jpg"}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{propertyType}</p>
        <p className="text-gray-600 mb-2">
          {address.address}, {address.city}, {address.state}
        </p>
        <p className="text-gray-700">
          Status:{" "}
          <span
            className={`font-semibold ${
              status === "available" ? "text-green-600" : "text-gray-500"
            }`}
          >
            {status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
