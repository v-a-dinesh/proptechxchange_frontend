import React, { useState } from "react";
import { toast } from "react-toastify"; // Import toast from react-toastify

const StartAuctionForm = ({ property, sellerId, onClose, onStart }) => {
  const [formData, setFormData] = useState({
    sellerId: sellerId,
    propertyId: property._id,
    basePrice: 0,
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onStart(formData);
      toast.success("Auction started successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error("Error starting auction:", error);
      toast.error("Error starting auction. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Start Auction for {property.title}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="basePrice" className="block mb-1">
            Base Price:
          </label>
          <input
            type="number"
            id="basePrice"
            name="basePrice"
            value={formData.basePrice}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="startTime" className="block mb-1">
            Start Time:
          </label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="endTime" className="block mb-1">
            End Time:
          </label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="w-1/2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
          >
            Start Auction
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StartAuctionForm;
