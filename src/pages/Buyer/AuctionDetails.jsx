// src/pages/Buyer/AuctionDetails.jsx

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BidForm from "../../components/buyer/BidForm";
import {
  getSingleAuctionDetails,
  placeBid,
  updateBid,
  deleteBid,
  getBidHistory,
} from "../../utils/buyerApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";

const AuctionDetails = () => {
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userBid, setUserBid] = useState(null);

  const fetchAuctionDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSingleAuctionDetails(auctionId);
      setAuction(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [auctionId]);

  const fetchUserBid = useCallback(async () => {
    try {
      const response = await getBidHistory();
      const userBidForAuction = response.data.find(
        (bid) => bid.auctionId === auctionId
      );
      setUserBid(userBidForAuction);
    } catch (err) {
      console.error("Error fetching user bid:", err);
    }
  }, [auctionId]);

  useEffect(() => {
    fetchAuctionDetails();
    fetchUserBid();
  }, [fetchAuctionDetails, fetchUserBid]);

  const handlePlaceBid = useCallback(
    async (amount) => {
      try {
        await placeBid(auctionId, amount);
        console.log("Bid placed successfully");
        await fetchAuctionDetails();
        await fetchUserBid();
      } catch (err) {
        console.error("Error placing bid:", err);
        setError(err.message);
      }
    },
    [auctionId, fetchAuctionDetails, fetchUserBid]
  );

  const handleUpdateBid = useCallback(
    async (bidId, amount) => {
      try {
        await updateBid(bidId, amount);
        console.log("Bid updated successfully");
        await fetchAuctionDetails();
        await fetchUserBid();
      } catch (err) {
        console.error("Error updating bid:", err);
        setError(err.message);
      }
    },
    [fetchAuctionDetails, fetchUserBid]
  );

  const handleDeleteBid = useCallback(
    async (bidId) => {
      try {
        await deleteBid(bidId);
        console.log("Bid deleted successfully");
        await fetchAuctionDetails();
        await fetchUserBid();
      } catch (err) {
        console.error("Error deleting bid:", err);
        setError(err.message);
      }
    },
    [fetchAuctionDetails, fetchUserBid]
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!auction) return <div>Auction not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{auction.propertyId.title}</h1>
      <div className="mb-4">
        <img
          src={auction.propertyId.images[0]?.url || "placeholder.jpg"}
          alt={auction.propertyId.title}
          className="w-full h-64 object-cover rounded-md"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Property Details</h2>
        <p className="mb-1">Type: {auction.propertyId.propertyType}</p>
        <p className="mb-1">
          Address: {auction.propertyId.address.address},{" "}
          {auction.propertyId.address.city}, {auction.propertyId.address.state}
        </p>
        <p className="mb-1">
          Size: {auction.propertyId.size.value} {auction.propertyId.size.unit}
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Auction Details</h2>
        <p className="mb-1">
          Status:{" "}
          <span
            className={`font-semibold ${
              auction.status === "active" ? "text-green-600" : "text-gray-500"
            }`}
          >
            {auction.status}
          </span>
        </p>
        <p className="mb-1">
          Current Highest Bid: ${auction.currentHighestBid.amount.toFixed(2)}
        </p>
        <p>Ends: {new Date(auction.endDate).toLocaleString()}</p>
      </div>
      {auction.status === "active" && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Bid Actions</h2>
          {userBid ? (
            <>
              <BidForm
                currentHighestBid={auction.currentHighestBid}
                onBidUpdated={(bidId, amount) => handleUpdateBid(bidId, amount)}
                existingBid={userBid}
              />
              <button
                onClick={() => handleDeleteBid(userBid._id)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete Bid
              </button>
            </>
          ) : (
            <BidForm
              currentHighestBid={auction.currentHighestBid}
              onBidPlaced={handlePlaceBid}
            />
          )}
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

export default AuctionDetails;
