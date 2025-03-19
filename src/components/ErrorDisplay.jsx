import React from "react";
import { useAuth } from "../context/AuthContext";

const ErrorDisplay = () => {
  const { error, setError } = useAuth();

  if (!error) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white p-4 text-center flex justify-between items-center">
      <span>{error}</span>
      <button
        onClick={() => setError(null)}
        className="ml-4 underline hover:text-gray-200"
      >
        Dismiss
      </button>
    </div>
  );
};

export default ErrorDisplay;
