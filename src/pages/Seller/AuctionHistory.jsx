// AuctionHistory.js

import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AuctionHistoryItem from "../../components/seller/AuctionHistoryItem";
import { getSellerAuctions } from "../../utils/api";

const AuctionHistory = () => {
  const { user } = useOutletContext();
  const [auctions, setAuctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerAuctions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getSellerAuctions(user.uid);
        if (response && response.success && response.auctions) {
          setAuctions(response.auctions);
        } else {
          setError("Unexpected response format from the server.");
        }
      } catch (error) {
        console.error("Error fetching auctions:", error.message);
        setError("Error fetching auctions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSellerAuctions();
  }, [user.uid]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  // Sort auctions by end time in descending order
  const sortedAuctions = auctions.sort(
    (a, b) => new Date(b.endTime) - new Date(a.endTime)
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Auction History</h1>
      {sortedAuctions.length === 0 ? (
        <p className="text-center text-gray-600">No auctions found.</p>
      ) : (
        <div className="space-y-4">
          {sortedAuctions.map((auction) => (
            <AuctionHistoryItem key={auction._id} auction={auction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuctionHistory;
