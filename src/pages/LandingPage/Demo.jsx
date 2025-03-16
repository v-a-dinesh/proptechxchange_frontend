// Demo.jsx
import React from "react";

const Demo = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Platform Demo
        </h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Discover how PropTechXchange can transform your real estate
          transactions with our interactive demo. Explore the platform's
          features and see how easy it is to buy and sell properties in
          real-time.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Interactive Walkthrough
            </h3>
            <p className="text-gray-600 mb-4">
              Experience a step-by-step guide through our platform's features,
              including property listings, bidding, and secure transactions.
            </p>
            <button className="bg-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800">
              Start Walkthrough
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Video Tutorial
          </h3>
          <div className="flex justify-center">
            <div className="w-full md:w-3/4 lg:w-2/3">
              <div
                className="relative"
                style={{ paddingBottom: "56.25%", height: 0 }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/rJ-kUiDfFJw"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Why Choose PropTechXchange?
          </h3>
          <p className="text-gray-600 mb-4">
            Our platform offers a seamless and secure experience for both buyers
            and sellers. With real-time updates, secure payments, and a
            user-friendly interface, PropTechXchange is the future of real
            estate transactions.
          </p>
          <button className="bg-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-800">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Demo;
