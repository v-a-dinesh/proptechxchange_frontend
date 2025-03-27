// src/pages/Buyer/Profile.jsx

import React, { useState, useEffect, useCallback } from "react";
import ProfileForm from "../../components/buyer/ProfileForm";
import { getUserDocument } from "../../firebaseConfig";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfileData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const userDoc = await getUserDocument(localStorage.getItem("authToken"));
      setProfileData({
        displayName: localStorage.getItem("displayName") || "",
        email: localStorage.getItem("email") || "",
        phoneNumber:
          localStorage.getItem("phoneNumber") || userDoc?.phoneNumber || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleUpdate = useCallback(async (updatedData) => {
    setLoading(true);
    setError(null);
    try {
      // Update the user's profile in localStorage
      localStorage.setItem("displayName", updatedData.displayName);
      localStorage.setItem("phoneNumber", updatedData.phoneNumber);

      // Update the user's document in Firestore
      await getUserDocument(localStorage.getItem("authToken")).update({
        phoneNumber: updatedData.phoneNumber,
      });

      // Update the local state
      setProfileData(updatedData);

      alert("Profile updated successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {profileData && (
        <ProfileForm initialData={profileData} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default Profile;
