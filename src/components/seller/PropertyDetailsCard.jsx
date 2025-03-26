// src/components/Seller/PropertyDetailsCard.jsx

import React from "react";

const PropertyDetailsCard = ({ property }) => {
  if (!property) {
    return <div>Property data not available</div>;
  }

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Images */}
      <div className="mb-4">
        {property.images && property.images.length > 0 ? (
          property.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.description || "Property image"}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">
        {property.title || "No title available"}
      </h2>

      {/* Description */}
      <p className="text-gray-700 mb-4">
        {property.description || "No description available"}
      </p>

      {/* Property Details */}
      <div className="mb-4">
        <p className="text-gray-600">
          <span className="font-semibold">Property Type:</span>{" "}
          {property.propertyType || "Not specified"}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Size:</span>{" "}
          {property.size
            ? `${property.size.value || "Not specified"} ${
                property.size.unit || "Not specified"
              }`
            : "Not specified"}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Status:</span>{" "}
          {property.status || "Not specified"}
        </p>
      </div>

      {/* Address */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Address</h3>
        <p className="text-gray-600">
          {property.address
            ? `${property.address.address || "Not specified"}, ${
                property.address.city || "Not specified"
              }, ${property.address.state || "Not specified"}, ${
                property.address.country || "Not specified"
              } ${property.address.zipCode || "Not specified"}`
            : "Address not specified"}
        </p>
      </div>

      {/* Videos */}
      {property.videos && property.videos.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Videos</h3>
          {property.videos.map((video, index) => (
            <div key={index} className="mb-2">
              {video.url.includes("youtube.com") ||
              video.url.includes("youtu.be") ? (
                <div className="relative w-full pt-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      video.url
                    )}`}
                    title={video.description || "YouTube video"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <video
                  src={video.url}
                  poster={video.thumbnail}
                  controls
                  className="w-full rounded-lg"
                />
              )}
              <p className="text-sm text-gray-600 mt-1">
                {video.description || "Video description not available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyDetailsCard;
