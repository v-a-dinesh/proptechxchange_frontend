// FeaturesSection.jsx
import React from "react";
import {
  FaGavel,
  FaSearchDollar,
  FaShieldAlt,
  FaChartLine,
  FaHome,
  FaUsers,
} from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: FaGavel,
      title: "Real-Time Auctions",
      description:
        "Experience transparent, live property bidding with instant updates.",
    },
    {
      icon: FaSearchDollar,
      title: "Advanced Filtering",
      description:
        "Find your perfect property with comprehensive search options.",
    },
    {
      icon: FaShieldAlt,
      title: "Secure Transactions",
      description: "End-to-end encryption and verified user authentication.",
    },
    {
      icon: FaChartLine,
      title: "Market Insights",
      description: "Access real-time market trends and property valuations.",
    },
    {
      icon: FaHome,
      title: "Diverse Listings",
      description: "Wide range of properties from residential to commercial.",
    },
    {
      icon: FaUsers,
      title: "Community-Driven",
      description:
        "Connect with buyers, sellers, and real estate professionals.",
    },
  ];

  return (
    <section id="features" className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
          Powerful Features for Modern Real Estate Transactions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <feature.icon className="text-5xl text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
