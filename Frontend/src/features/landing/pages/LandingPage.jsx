import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import ReportPreview from "../components/ReportPreview";
import FinalCta from "../components/FinalCta";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <ReportPreview />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
};

export default LandingPage;