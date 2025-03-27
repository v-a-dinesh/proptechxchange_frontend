// src/components/buyer/BidForm.jsx

import React, { useState } from "react";

const BidForm = ({
  currentHighestBid,
  onBidPlaced,
  onBidUpdated,
  existingBid,
}) => {
  const [bidAmount, setBidAmount] = useState(
    existingBid ? existingBid.amount : currentHighestBid.amount + 1
  );
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (bidAmount <= currentHighestBid.amount) {
      setError("Bid must be higher than the current highest bid");
      return;
    }

    if (existingBid) {
      onBidUpdated(existingBid._id, bidAmount);
    } else {
      onBidPlaced(bidAmount);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(Number(e.target.value))}
        min={currentHighestBid.amount + 1}
        step="0.01"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        required
        placeholder="Enter your bid amount"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        {existingBid ? "Update Bid" : "Place Bid"}
      </button>
    </form>
  );
};

export default BidForm;
