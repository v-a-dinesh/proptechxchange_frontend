import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addProperty } from "../../utils/api";
import { auth } from "../../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePropertyForm = () => {
  const navigate = useNavigate();
  const [sellerId, setSellerId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "Apartment",
    size: {
      value: "",
      unit: "sqft",
    },
    address: {
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });

  const [imageUrls, setImageUrls] = useState([{ url: "", description: "" }]);
  const [videoUrls, setVideoUrls] = useState([
    { url: "", thumbnail: "", description: "" },
  ]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setSellerId(user.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = React.useCallback((e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const updateImageUrls = (index, field, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    setImageUrls(newUrls);
  };

  const updateVideoUrls = (index, field, value) => {
    const newUrls = [...videoUrls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    setVideoUrls(newUrls);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, { url: "", description: "" }]);
  };

  const addVideoUrlField = () => {
    setVideoUrls([...videoUrls, { url: "", thumbnail: "", description: "" }]);
  };

  const removeImageUrlField = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
  };

  const removeVideoUrlField = (index) => {
    const newUrls = videoUrls.filter((_, i) => i !== index);
    setVideoUrls(newUrls);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  // Basic validation
  if (!formData.title || !formData.description || !formData.size.value) {
    setError("Please fill out all required fields");
    return;
  }

  if (!sellerId) {
    setError("User authentication failed. Please log in again.");
    return;
  }

  try {
    // Prepare the property data matching the backend schema
    const propertyData = {
      sellerId,
      title: formData.title,
      description: formData.description,
      propertyType: formData.propertyType,
      size: {
        value: Number(formData.size.value),
        unit: formData.size.unit,
      },
      address: formData.address,
      images: imageUrls
        .filter((img) => img.url)
        .map((img) => ({
          url: img.url,
          description: img.description || "",
        })),
      videos: videoUrls
        .filter((vid) => vid.url)
        .map((vid) => ({
          url: vid.url,
          thumbnail: vid.thumbnail || "",
          description: vid.description || "",
        })),
    };

    const response = await addProperty(propertyData);
    console.log("Property created:", response);

    // Show toast message
    toast.success("Property created successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Clear the form after successful submission
    setFormData({
      title: "",
      description: "",
      propertyType: "Apartment",
      size: {
        value: "",
        unit: "sqft",
      },
      address: {
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
      },
    });
    setImageUrls([{ url: "", description: "" }]);
    setVideoUrls([{ url: "", thumbnail: "", description: "" }]);
  } catch (error) {
    console.error("Error creating property:", error);
    setError(error.response?.data?.message || "An error occurred");
  }
};

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Property</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="propertyType" className="block mb-1">
            Property Type:
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="size.value" className="block mb-1">
            Size:
          </label>
          <div className="flex">
            <input
              type="number"
              id="size.value"
              name="size.value"
              value={formData.size.value}
              onChange={handleChange}
              className="w-3/4 p-2 border rounded mr-2"
              required
            />
            <select
              id="size.unit"
              name="size.unit"
              value={formData.size.unit}
              onChange={handleChange}
              className="w-1/4 p-2 border rounded"
              required
            >
              <option value="sqft">sqft</option>
              <option value="sqm">sqm</option>
              <option value="acres">acres</option>
              <option value="hectares">hectares</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="address.address" className="block mb-1">
            Address:
          </label>
          <input
            type="text"
            id="address.address"
            name="address.address"
            value={formData.address.address}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Street Address"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              id="address.city"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="City"
            />
            <input
              type="text"
              id="address.state"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="State"
            />
            <input
              type="text"
              id="address.country"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Country"
            />
            <input
              type="text"
              id="address.zipCode"
              name="address.zipCode"
              value={formData.address.zipCode}
              onChange={handleChange}
              className="p-2 border rounded"
              placeholder="Zip Code"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Images:</label>
          {imageUrls.map((img, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Image URL"
                value={img.url}
                onChange={(e) => updateImageUrls(index, "url", e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Image Description (optional)"
                value={img.description || ""}
                onChange={(e) =>
                  updateImageUrls(index, "description", e.target.value)
                }
                className="w-1/2 p-2 border rounded"
              />
              {imageUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageUrlField(index)}
                  className="bg-red-200 p-2 rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageUrlField}
            className="bg-blue-200 p-2 rounded mb-2"
          >
            Add Image
          </button>
        </div>

        <div>
          <label className="block mb-1">Videos:</label>
          {videoUrls.map((video, index) => (
            <div key={index} className="space-y-2 mb-2">
              <input
                type="text"
                placeholder="Video URL"
                value={video.url || ""}
                onChange={(e) => updateVideoUrls(index, "url", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Thumbnail URL (optional)"
                value={video.thumbnail || ""}
                onChange={(e) =>
                  updateVideoUrls(index, "thumbnail", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Video Description (optional)"
                  value={video.description || ""}
                  onChange={(e) =>
                    updateVideoUrls(index, "description", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
                {videoUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVideoUrlField(index)}
                    className="bg-red-200 p-2 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addVideoUrlField}
            className="bg-blue-200 p-2 rounded"
          >
            Add Video
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Property
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreatePropertyForm;
