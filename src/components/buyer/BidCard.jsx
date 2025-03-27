// src/components/buyer/BidCard.jsx

import React, { useState } from "react";

const BidCard = ({ bid, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newAmount, setNewAmount] = useState(bid.amount);

  const handleUpdate = () => {
    onUpdate(newAmount);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <p className="text-gray-700 mb-2">Bid Amount: ${bid.amount.toFixed(2)}</p>
      <p className="text-gray-700 mb-2">
        Bid Time: {new Date(bid.timestamp).toLocaleString()}
      </p>
      <p className="text-gray-700 mb-2">Bidder: {bid.bidderId}</p>
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BidCard;
