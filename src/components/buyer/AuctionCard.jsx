// src/components/buyer/AuctionCard.jsx

import React from "react";
import { Link } from "react-router-dom";

const AuctionCard = ({ auction, onSelect }) => {
  const { _id, propertyId, currentHighestBid, status, endDate, basePrice } =
    auction;

  // Function to safely format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
  };

  const formattedEndDate = formatDate(endDate);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/buyer/dashboard/auctions/${_id}`}>
        <img
          src={propertyId.images[0]?.url || "placeholder.jpg"}
          alt={propertyId.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{propertyId.title}</h3>
        <p className="text-gray-600 mb-2">
          {propertyId.address.address}, {propertyId.address.city},{" "}
          {propertyId.address.state}
        </p>
        <p className="text-green-600 font-bold mb-2">
          Current Bid: ${currentHighestBid.amount.toFixed(2)}
        </p>
        <p className="text-gray-700 mb-2">
          Base Price: ${basePrice.toFixed(2)}
        </p>
        <p className="text-gray-700 mb-2">
          Status:{" "}
          <span
            className={`font-semibold ${
              status === "active" ? "text-green-600" : "text-gray-500"
            }`}
          >
            {status}
          </span>
        </p>
        <p className="text-gray-700 mb-2">Ends: {formattedEndDate}</p>
        <button
          onClick={onSelect}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
        >
          View Auction
        </button>
        <Link
          to={`/buyer/dashboard/auctions/${_id}`}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          View Property
        </Link>
      </div>
    </div>
  );
};

export default AuctionCard;
