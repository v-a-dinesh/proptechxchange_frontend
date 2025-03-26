// src/pages/Seller/Profile.jsx

import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProfileForm from "../../components/seller/ProfileForm";

const Profile = () => {
  const { user } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {isEditing ? (
        <ProfileForm user={user} onClose={handleCloseForm} />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">User Information</h2>
          <p className="mb-2">
            <span className="font-medium">Display Name:</span>{" "}
            {user.displayName || "N/A"}
          </p>
          <p className="mb-2">
            <span className="font-medium">Email:</span> {user.email || "N/A"}
          </p>
          <p className="mb-2">
            <span className="font-medium">Phone Number:</span>{" "}
            {user.phoneNumber || "N/A"}
          </p>
          <p className="mb-4">
            <span className="font-medium">Address:</span>{" "}
            {user.address || "N/A"}
          </p>
          <button
            onClick={handleEditProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
