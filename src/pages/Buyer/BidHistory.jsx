// src/pages/Buyer/BidHistory.jsx

import React, { useState, useEffect } from "react";
import BidHistoryItem from "../../components/buyer/BidHistoryItem";
import { getBidHistory } from "../../utils/buyerApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";

const BidHistory = () => {
  const [bidHistory, setBidHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBidHistory();
  }, []);

  const fetchBidHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBidHistory();
      setBidHistory(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bid History</h1>
      {bidHistory.length > 0 ? (
        bidHistory.map((bid) => <BidHistoryItem key={bid.bidId} bid={bid} />)
      ) : (
        <p className="text-gray-600">You haven't placed any bids yet.</p>
      )}
    </div>
  );
};

export default BidHistory;
