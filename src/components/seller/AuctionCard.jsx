import React from "react";
import { Link } from "react-router-dom";

const AuctionCard = ({ auction, onClose }) => {
  const statusColor = {
    upcoming: "text-yellow-500",
    active: "text-green-500",
    extended: "text-blue-500",
    completed: "text-gray-500",
    cancelled: "text-red-500",
  };

  const handleCloseAuction = () => {
    if (onClose && auction.status === "active") {
      onClose(auction._id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">
        {auction.propertyId ? auction.propertyId.title : "Unknown Property"}
      </h3>
      <p className={`mb-2 ${statusColor[auction.status]}`}>
        Status:{" "}
        {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
      </p>
      <p className="text-gray-600 mb-2">
        Start Time: {new Date(auction.startTime).toLocaleString()}
      </p>
      <p className="text-gray-600 mb-2">
        End Time: {new Date(auction.endTime).toLocaleString()}
      </p>
      <p className="text-gray-600 mb-2">
        Current Highest Bid: ${auction.currentHighestBid.amount.toFixed(2)}
      </p>
      <div className="flex justify-between items-center">
        <Link
          to={`/seller/auctions/${auction._id}`}
          className="text-blue-500 hover:underline"
        >
          View Details
        </Link>
        {auction.status === "active" && (
          <button
            onClick={handleCloseAuction}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Close Auction
          </button>
        )}
      </div>
    </div>
  );
};

export default AuctionCard;
