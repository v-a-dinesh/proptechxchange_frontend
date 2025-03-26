import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import AuctionCard from "../../components/seller/AuctionCard";
import StartAuctionForm from "../../components/seller/StartAuctionForm";
import { getSellerAuctions, startAuction, closeAuction } from "../../utils/api";

const MyAuctions = () => {
  const { user, properties } = useOutletContext();
  const [auctions, setAuctions] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerAuctions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getSellerAuctions(user.uid);
        setAuctions(response.auctions);
      } catch (error) {
        setError("Error fetching auctions. Please try again.");
        console.error("Error fetching auctions:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSellerAuctions();
  }, [user.uid]);

  const handleStartAuction = async (auctionData) => {
    try {
      const response = await startAuction(auctionData);
      console.log("Auction started:", response);
      setSelectedProperty(null);

      const updatedAuctions = await getSellerAuctions(user.uid);
      setAuctions(updatedAuctions.auctions);
    } catch (error) {
      setError("Error starting auction. Please try again.");
      console.error("Error starting auction:", error.message);
    }
  };

  const handleCloseAuction = async (auctionId) => {
    try {
      await closeAuction(auctionId);
      const updatedAuctions = await getSellerAuctions(user.uid);
      setAuctions(updatedAuctions.auctions);
    } catch (error) {
      setError("Error closing auction. Please try again.");
      console.error("Error closing auction:", error.message);
    }
  };

  if (isLoading) {
    return <div>Loading auctions...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Auctions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {properties.map((property) => (
          <div key={property._id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
            <button
              onClick={() => setSelectedProperty(property)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Start Auction
            </button>
          </div>
        ))}
      </div>
      {selectedProperty && (
        <StartAuctionForm
          property={selectedProperty}
          sellerId={user.uid}
          onClose={() => setSelectedProperty(null)}
          onStart={handleStartAuction}
        />
      )}
      <h2 className="text-xl font-bold mb-4">Ongoing Auctions</h2>
      {auctions.length === 0 ? (
        <p>No ongoing auctions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {auctions
            .filter((auction) =>
              ["upcoming", "active", "extended"].includes(auction.status)
            )
            .map((auction) => (
              <AuctionCard
                key={auction._id}
                auction={auction}
                onClose={handleCloseAuction}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default MyAuctions;
