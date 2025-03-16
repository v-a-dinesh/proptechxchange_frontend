import React from "react";
import NavigationBar from "./LandingPage/NavigationBar";
import HeroSection from "./LandingPage/HeroSection";
import FeaturesSection from "./LandingPage/FeaturesSection";
import TestimonialsSection from "./LandingPage/TestimonialsSection";
import Footer from "./LandingPage/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <NavigationBar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
