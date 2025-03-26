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
    return <div>Loading auction history...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Sort auctions by end time in descending order
  const sortedAuctions = auctions.sort(
    (a, b) => new Date(b.endTime) - new Date(a.endTime)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Auction History</h1>
      {sortedAuctions.length === 0 ? (
        <p>No auctions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedAuctions.map((auction) => (
            <AuctionHistoryItem key={auction._id} auction={auction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuctionHistory;
