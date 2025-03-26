// AuctionHistoryItem.js

import React from "react";
import { Link } from "react-router-dom";

const AuctionHistoryItem = ({ auction }) => {
  const statusColor = {
    upcoming: "text-yellow-500",
    active: "text-green-500",
    extended: "text-blue-500",
    completed: "text-gray-500",
    cancelled: "text-red-500",
  };

  // Extract property details from the auction object
  const { propertyDetails } = auction;
  const firstImage = propertyDetails?.images?.[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      {firstImage && (
        <img
          src={firstImage.url}
          alt={propertyDetails?.title || "Property Image"}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h3 className="text-lg font-semibold mb-2">
        {propertyDetails?.title || "Unknown Property"}
      </h3>
      <p className={`mb-2 ${statusColor[auction.status]}`}>
        Status:{" "}
        {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
      </p>
      <p className="text-gray-600 mb-2">
        Property Type: {propertyDetails?.propertyType || "N/A"}
      </p>
      <p className="text-gray-600 mb-2">
        Size: {propertyDetails?.size?.value || "N/A"}{" "}
        {propertyDetails?.size?.unit || ""}
      </p>
      <p className="text-gray-600 mb-2">
        Address: {propertyDetails?.address?.address || "N/A"},{" "}
        {propertyDetails?.address?.city || "N/A"}
      </p>
      <p className="text-gray-600 mb-2">
        Start Time: {new Date(auction.startTime).toLocaleString()}
      </p>
      <p className="text-gray-600 mb-2">
        End Time: {new Date(auction.endTime).toLocaleString()}
      </p>
      <p className="text-gray-600 mb-2">
        Final Price: ${auction.currentHighestBid.amount.toFixed(2)}
      </p>
      <p className="text-gray-600 mb-2">
        Winner: {auction.currentHighestBid.bidder || "N/A"}
      </p>
      <div className="flex justify-center mt-4">
        <Link
          to={`/seller/dashboard/auctions/${auction._id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AuctionHistoryItem;
