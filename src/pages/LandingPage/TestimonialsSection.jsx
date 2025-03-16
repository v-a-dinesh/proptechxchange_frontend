// TestimonialsSection.jsx
import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback:
        "This platform revolutionized the way I buy properties. Highly recommend!",
    },
    {
      name: "Jane Smith",
      feedback:
        "A seamless experience from start to finish. The real-time bidding is a game-changer.",
    },
    {
      name: "Sam Wilson",
      feedback:
        "Secure and transparent transactions. I feel confident using this platform.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">"{testimonial.feedback}"</p>
              <h3 className="text-lg font-bold text-blue-600">
                {testimonial.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
