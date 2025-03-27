// src/pages/Buyer/MyAuctions.jsx

import React, { useState, useEffect, useCallback } from "react";
import AuctionCard from "../../components/buyer/AuctionCard";
import BidForm from "../../components/buyer/BidForm";
import {
  getAllActiveAuctions,
  placeBid,
  updateBid,
  deleteBid,
  getBidHistory,
} from "../../utils/buyerApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";

const MyAuctions = () => {
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userBids, setUserBids] = useState({});

  const fetchActiveAuctions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllActiveAuctions();
      setActiveAuctions(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserBids = useCallback(async () => {
    try {
      const response = await getBidHistory();
      const bidsByAuction = {};
      response.data.forEach((bid) => {
        bidsByAuction[bid.auctionId] = bid;
      });
      setUserBids(bidsByAuction);
    } catch (err) {
      console.error("Error fetching user bids:", err);
    }
  }, []);

  useEffect(() => {
    fetchActiveAuctions();
    fetchUserBids();
  }, [fetchActiveAuctions, fetchUserBids]);

  const handlePlaceBid = useCallback(
    async (amount) => {
      try {
        await placeBid(selectedAuction._id, amount);
        console.log("Bid placed successfully");
        await fetchActiveAuctions();
        await fetchUserBids();
      } catch (err) {
        console.error("Error placing bid:", err);
        setError(err.message);
      }
    },
    [selectedAuction, fetchActiveAuctions, fetchUserBids]
  );

  const handleUpdateBid = useCallback(
    async (bidId, amount) => {
      try {
        await updateBid(bidId, amount);
        console.log("Bid updated successfully");
        await fetchActiveAuctions();
        await fetchUserBids();
      } catch (err) {
        console.error("Error updating bid:", err);
        setError(err.message);
      }
    },
    [fetchActiveAuctions, fetchUserBids]
  );

  const handleDeleteBid = useCallback(
    async (bidId) => {
      try {
        await deleteBid(bidId);
        console.log("Bid deleted successfully");
        await fetchActiveAuctions();
        await fetchUserBids();
      } catch (err) {
        console.error("Error deleting bid:", err);
        setError(err.message);
      }
    },
    [fetchActiveAuctions, fetchUserBids]
  );

  const handleAuctionSelect = useCallback((auction) => {
    setSelectedAuction(auction);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Active Auctions</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {activeAuctions.map((auction) => (
          <AuctionCard
            key={auction._id}
            auction={auction}
            onSelect={() => handleAuctionSelect(auction)}
          />
        ))}
      </div>

      {selectedAuction && (
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Selected Auction Details
          </h2>
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-1">
              {selectedAuction.propertyId.title}
            </h3>
            <p className="mb-1">
              Type: {selectedAuction.propertyId.propertyType}
            </p>
            <p className="mb-1">
              Address: {selectedAuction.propertyId.address.address},{" "}
              {selectedAuction.propertyId.address.city},{" "}
              {selectedAuction.propertyId.address.state}
            </p>
            <p className="mb-1">
              Size: {selectedAuction.propertyId.size.value}{" "}
              {selectedAuction.propertyId.size.unit}
            </p>
            <p className="mb-1">
              Status:{" "}
              <span
                className={`font-semibold ${
                  selectedAuction.status === "active"
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {selectedAuction.status}
              </span>
            </p>
            <p className="mb-1">
              Current Highest Bid: $
              {selectedAuction.currentHighestBid.amount.toFixed(2)}
            </p>
            <p className="mb-1">
              Base Price: ${selectedAuction.basePrice.toFixed(2)}
            </p>
            <p>Ends: {new Date(selectedAuction.endDate).toLocaleString()}</p>
          </div>

          {selectedAuction.status === "active" && (
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Bid Actions</h3>
              {userBids[selectedAuction._id] ? (
                <>
                  <BidForm
                    currentHighestBid={selectedAuction.currentHighestBid}
                    onBidUpdated={(bidId, amount) =>
                      handleUpdateBid(bidId, amount)
                    }
                    existingBid={userBids[selectedAuction._id]}
                  />
                  <button
                    onClick={() =>
                      handleDeleteBid(userBids[selectedAuction._id]._id)
                    }
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete Bid
                  </button>
                </>
              ) : (
                <BidForm
                  currentHighestBid={selectedAuction.currentHighestBid}
                  onBidPlaced={handlePlaceBid}
                />
              )}
            </div>
          )}

          <button
            onClick={() => setSelectedAuction(null)}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAuctions;
