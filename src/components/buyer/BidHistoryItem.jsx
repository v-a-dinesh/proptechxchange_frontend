// src/components/buyer/BidHistoryItem.jsx

import React from "react";
import { Link } from "react-router-dom";

const BidHistoryItem = ({ bid }) => {
  const {
    auctionId,
    propertyTitle,
    propertyType,
    propertyAddress,
    propertyImage,
    bidAmount,
    bidTimestamp,
    isAutoBid,
    auctionStatus,
  } = bid;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start">
        <img
          src={propertyImage}
          alt={propertyTitle}
          className="w-24 h-24 object-cover rounded-md mr-4"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">
            <Link
              to={`/buyer/dashboard/auctions/${auctionId}`}
              className="text-indigo-600 hover:text-indigo-800"
            >
              {propertyTitle}
            </Link>
          </h3>
          <p className="text-gray-600 mb-1">{propertyType}</p>
          <p className="text-gray-600 mb-2">
            {propertyAddress.address}, {propertyAddress.city},{" "}
            {propertyAddress.state}
          </p>
          <p className="text-green-600 font-bold mb-2">
            Bid Amount: ${bidAmount.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-1">
            Bid Time: {new Date(bidTimestamp).toLocaleString()}
          </p>
          <p className="text-gray-700 mb-1">
            Auction Status:{" "}
            <span
              className={`font-semibold ${
                auctionStatus === "active" ? "text-green-600" : "text-gray-500"
              }`}
            >
              {auctionStatus}
            </span>
          </p>
          <p className="text-gray-700">Auto Bid: {isAutoBid ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
};

export default BidHistoryItem;
