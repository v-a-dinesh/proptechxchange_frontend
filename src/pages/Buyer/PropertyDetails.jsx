// src/pages/Buyer/PropertyDetails.jsx

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllActiveAuctions } from "../../utils/buyerApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPropertyAndAuctions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const auctionsResponse = await getAllActiveAuctions();
      const propertyAuction = auctionsResponse.data.find(
        (auction) => auction.propertyId._id === propertyId
      );

      if (propertyAuction) {
        setProperty(propertyAuction.propertyId);
        setActiveAuctions(auctionsResponse.data);
      } else {
        setProperty(null); // For now, set to null if no active auction
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    fetchPropertyAndAuctions();
  }, [fetchPropertyAndAuctions]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!property)
    return <div>Property not found or not in an active auction</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
      <div className="mb-4">
        <img
          src={property.images[0]?.url || "placeholder.jpg"}
          alt={property.title}
          className="w-full h-64 object-cover rounded-md"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Property Details</h2>
        <p className="mb-1">Type: {property.propertyType}</p>
        <p className="mb-1">
          Address: {property.address.address}, {property.address.city},{" "}
          {property.address.state}
        </p>
        <p className="mb-1">
          Size: {property.size.value} {property.size.unit}
        </p>
        <p>Status: {property.status}</p>
      </div>
      {activeAuctions.some(
        (auction) => auction.propertyId._id === propertyId
      ) && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">
            Active Auctions for this Property
          </h2>
          <ul className="list-disc pl-5">
            {activeAuctions
              .filter((auction) => auction.propertyId._id === propertyId)
              .map((auction) => (
                <li key={auction._id}>
                  <a
                    href={`/buyer/dashboard/auctions/${auction._id}`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Auction ID: {auction._id}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Go Back
      </button>
    </div>
  );
};

export default PropertyDetails;
