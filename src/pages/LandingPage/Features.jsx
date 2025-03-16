// Features.jsx
import React from "react";
import {
  FaGavel,
  FaSearchDollar,
  FaShieldAlt,
  FaChartLine,
  FaHome,
  FaUsers,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: FaGavel,
      title: "Real-Time Auctions",
      description:
        "Engage in live property bidding with instant updates, ensuring transparency and competitiveness in the auction process.",
    },
    {
      icon: FaSearchDollar,
      title: "Advanced Filtering",
      description:
        "Utilize comprehensive search options to find properties by location, price, type, size, and auction status.",
    },
    {
      icon: FaShieldAlt,
      title: "Secure Transactions",
      description:
        "Benefit from end-to-end encryption and verified user authentication for safe and secure property transactions.",
    },
    {
      icon: FaChartLine,
      title: "Market Insights",
      description:
        "Access real-time market trends and property valuations to make informed bidding decisions.",
    },
    {
      icon: FaHome,
      title: "Diverse Listings",
      description:
        "Explore a wide range of properties, from residential to commercial, catering to various buyer needs.",
    },
    {
      icon: FaUsers,
      title: "Community-Driven",
      description:
        "Connect with a network of buyers, sellers, and real estate professionals to enhance your property transaction experience.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
          Platform Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <feature.icon className="text-5xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Core Functionalities
          </h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              <strong>Authentication & Authorization:</strong> Secure sign-in
              with Firebase Authentication and role-based access control.
            </li>
            <li>
              <strong>Property Listings & Management:</strong> Sellers can
              upload and manage property details, with admin verification for
              approval.
            </li>
            <li>
              <strong>Real-Time Bidding System:</strong> Live bid updates with
              Socket.io, countdown timers, and auto-bid options.
            </li>
            <li>
              <strong>Auction Management:</strong> Set auction durations,
              real-time leaderboards, and seller approval for final bids.
            </li>
            <li>
              <strong>Secure Payment & Transactions:</strong> Payments via
              Razorpay or UPI, with transaction receipts and refund processes.
            </li>
            <li>
              <strong>Notifications & Alerts:</strong> Real-time notifications
              for bid updates, auction end, and payment reminders.
            </li>
            <li>
              <strong>Search & Filtering:</strong> Advanced search by property
              type, price range, location, and auction status.
            </li>
            <li>
              <strong>Fraud Prevention & Moderation:</strong> AI-based anomaly
              detection, manual admin verification, and bidding cooldowns.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Features;
