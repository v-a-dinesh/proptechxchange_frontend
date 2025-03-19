import React from "react";
import { Route } from "react-router-dom";
import { lazy } from "react";

const LandingPage = lazy(() => import("../pages/LandingPage/LandingPage"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const AboutUs = lazy(() => import("../pages/LandingPage/AboutUs"));
const Features = lazy(() => import("../pages/LandingPage/Features"));
const Demo = lazy(() => import("../pages/LandingPage/Demo"));

const PublicRoutes = () => [
  <Route key="home" path="/" element={<LandingPage />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<Register />} />,
  <Route key="about" path="/about" element={<AboutUs />} />,
  <Route key="features" path="/features" element={<Features />} />,
  <Route key="demo" path="/demo" element={<Demo />} />,
];

export default PublicRoutes;
