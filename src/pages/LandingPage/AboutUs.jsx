// AboutUs.jsx
import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          About PropTechXchange
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          PropTechXchange is a cutting-edge real estate bidding platform
          designed to revolutionize property transactions. Our platform enables
          buyers and sellers to engage in transparent, real-time auctions,
          ensuring secure and seamless transactions.
        </p>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Project Overview
          </h3>
          <p className="text-gray-600">
            PropTechXchange offers a real-time online auction system for real
            estate, providing secure authentication for buyers and sellers. With
            live auction updates using WebSockets and secure payments via
            Razorpay or UPI APIs, our platform supports role-based access
            control for Admins, Buyers, and Sellers.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Objectives</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>Develop a real-time online auction system for real estate.</li>
            <li>Provide secure authentication for buyers and sellers.</li>
            <li>
              Implement live auction updates using WebSockets (Socket.io).
            </li>
            <li>Ensure secure payments using Razorpay or UPI APIs.</li>
            <li>Support role-based access control (Admin, Buyer, Seller).</li>
            <li>Enable search, filtering, and property management features.</li>
          </ul>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Features & Functionalities
          </h3>
          <p className="text-gray-600">
            Our platform offers a range of features tailored to different user
            roles:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              <strong>Guest Users:</strong> Browse listings, view seller
              details, and search properties.
            </li>
            <li>
              <strong>Buyers:</strong> Register, place bids, receive
              notifications, and make payments.
            </li>
            <li>
              <strong>Sellers:</strong> List properties, set auction details,
              and manage listings.
            </li>
            <li>
              <strong>Admin:</strong> Approve listings, manage users, and
              oversee transactions.
            </li>
          </ul>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Technology Stack
          </h3>
          <p className="text-gray-600">
            PropTechXchange is built using a robust technology stack to ensure
            performance and scalability:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              <strong>Frontend:</strong> React.js with Tailwind CSS for a
              responsive UI.
            </li>
            <li>
              <strong>Backend:</strong> Node.js and Express.js for scalable API
              handling.
            </li>
            <li>
              <strong>Database:</strong> MongoDB for fast performance.
            </li>
            <li>
              <strong>Authentication:</strong> Firebase Authentication for
              secure sign-in.
            </li>
            <li>
              <strong>Real-Time Updates:</strong> Socket.io for live bid
              updates.
            </li>
            <li>
              <strong>Payments:</strong> Razorpay and UPI API for secure
              transactions.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Future Enhancements
          </h3>
          <p className="text-gray-600">
            We are committed to continuous improvement and plan to introduce:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>AI-based price predictions for property valuation.</li>
            <li>Blockchain-based smart contracts for transparency.</li>
            <li>Multi-language support for wider reach.</li>
            <li>Mobile App Version (React Native) for better accessibility.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
