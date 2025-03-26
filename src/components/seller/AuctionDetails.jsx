import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleAuction } from "../../utils/api";

const AuctionDetails = () => {
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getSingleAuction(auctionId);
        if (response.success && response.auction) {
          setAuction(response.auction);
        } else {
          setError("Auction not found or error fetching details.");
        }
      } catch (error) {
        console.error("Error fetching auction details:", error.message);
        setError("Error fetching auction details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuctionDetails();
  }, [auctionId]);

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
          <button
            onClick={() => navigate(-1)}
            className="absolute top-0 right-0 px-4 py-3"
          >
            <svg
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  if (!auction) {
    return null;
  }

  const { propertyDetails } = auction;
  const firstImage = propertyDetails?.images?.[0];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {propertyDetails?.title || "Auction Details"}
      </h1>

      <div className="mb-6">
        {firstImage && (
          <img
            src={firstImage.url}
            alt={propertyDetails?.title || "Property Image"}
            className="w-full h-96 object-cover rounded-lg mb-4"
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Property Details</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-700 mb-2">
              <strong>Property Type:</strong>{" "}
              {propertyDetails?.propertyType || "N/A"}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Size:</strong> {propertyDetails?.size?.value || "N/A"}{" "}
              {propertyDetails?.size?.unit || ""}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Address:</strong>{" "}
              {propertyDetails?.address?.address || "N/A"},{" "}
              {propertyDetails?.address?.city || "N/A"},{" "}
              {propertyDetails?.address?.state || "N/A"},{" "}
              {propertyDetails?.address?.country || "N/A"}{" "}
              {propertyDetails?.zipCode || ""}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Auction Details</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-700 mb-2">
              <strong>Status:</strong>{" "}
              {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Start Time:</strong>{" "}
              {new Date(auction.startTime).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>End Time:</strong>{" "}
              {new Date(auction.endTime).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Base Price:</strong> ${auction.basePrice.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Current Highest Bid:</strong> $
              {auction.currentHighestBid.amount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AuctionDetails;
