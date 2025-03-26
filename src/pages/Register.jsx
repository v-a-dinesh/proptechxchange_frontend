import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { registerWithEmail, loginWithGoogle } from "../firebaseConfig";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("buyer"); // Default role
  const [loading, setLoading] = useState(false);
  const [otp, setOTP] = useState("");
  const [otpSent, setOTPSent] = useState(false);
  const navigate = useNavigate();
  const { setError, setUser } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Comprehensive input validation
    const validations = [
      {
        condition: password !== confirmPassword,
        message: "Passwords do not match",
      },
      {
        condition: password.length < 8,
        message: "Password must be at least 8 characters long",
      },
      {
        condition: !displayName.trim(),
        message: "Full name is required",
      },
      {
        condition: !email.includes("@"),
        message: "Please enter a valid email address",
      },
      {
        condition: !otpSent,
        message: "Please send OTP first",
      },
    ];

    // Check validations
    for (let validation of validations) {
      if (validation.condition) {
        setError(validation.message);
        setLoading(false);
        return;
      }
    }

    try {
      // Verify OTP with backend
      const verifyResponse = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/otp/verify-otp`,
        { email, otp }
      );

      if (verifyResponse.status !== 200) {
        setError("Invalid OTP");
        setLoading(false);
        return;
      }

      // If OTP is valid, proceed with Firebase registration
      const userCredential = await registerWithEmail(
        email,
        password,
        displayName,
        role
      );

      // Update user in AuthContext
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        role: role,
      });

      // Navigate to role-specific dashboard
      navigate(`/${role}/dashboard`);
    } catch (error) {
      setError(handleAuthError(error));
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/otp/send-otp`,
        {
          email,
          displayName,
        }
      );
      setOTPSent(true);
      setError("OTP sent. Please check your email.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    setError(null);

    try {
      // Register with Google and include role
      const userCredential = await loginWithGoogle(role);

      // Update user in AuthContext
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        role: role,
      });

      // Navigate to role-specific dashboard
      navigate(`/${role}/dashboard`);
    } catch (error) {
      setError(handleAuthError(error));
      setLoading(false);
    }
  };

  // Error handling utility
  const handleAuthError = (error) => {
    const errorCodes = {
      "auth/email-already-in-use":
        "Email already in use. Please use a different email or log in.",
      "auth/invalid-email": "Invalid email address.",
      "auth/weak-password":
        "Password is too weak. It should be at least 6 characters long.",
    };

    return (
      errorCodes[error.code] ||
      error.message ||
      "Registration failed. Please try again."
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Your PropTech Exchange Account
        </h2>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleRegister}>
            {/* Role Selection */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Select Your Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            {/* Full Name Input */}
            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="displayName"
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="Your full name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Inputs */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="Repeat your password"
              />
            </div>

            {/* OTP Section */}
            <div>
              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              ) : (
                <>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    placeholder="Enter the OTP you received"
                  />
                </>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading || !otpSent}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {loading ? "Registering..." : "Create Account"}
              </button>
            </div>
          </form>

          {/* Google Registration */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleRegister}
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaGoogle className="mr-2 h-5 w-5" />
                Sign up with Google
              </button>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
