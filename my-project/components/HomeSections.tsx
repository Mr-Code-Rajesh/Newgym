"use client";

import React, { useState } from "react";


import About from "@/components/about/About";
import TransformationShowcase from "@/components/transformation/TransformationShowcase";
import GymEquipment from "@/components/equipment/GymEquipment";
import WhyGym from "@/components/whygym/WhyGym";
import Coaches from "@/components/coaches/Coaches";
import Gallery from "@/components/gallery/Gallery";
import FitnessCalculator from "@/components/calculator/FitnessCalculator";
import Pricing from "@/components/pricing/Pricing";
import Testimonials from "@/components/testimonials/Testimonials";
import FAQ from "@/components/faq/FAQ";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";
import StickyCTA from "@/components/contact/StickyCTA";

export default function HomeSections() {
  const [activeTab, setActiveTab] = useState("all");

  // High-performance schedule list
  const classes = [
    { id: 1, name: "Hyper-Velocity Cardio", category: "cardio", time: "08:00 AM", instructor: "Coach Marcus", level: "Advanced", intensity: 95 },
    { id: 2, name: "Force Biometrics Lift", category: "strength", time: "10:30 AM", instructor: "Coach Sarah", level: "All Levels", intensity: 88 },
    { id: 3, name: "Neural Reflex Mobility", category: "recovery", time: "02:00 PM", instructor: "Dr. Elena", level: "Intermediate", intensity: 45 },
    { id: 4, name: "Isometric Power Flow", category: "strength", time: "04:30 PM", instructor: "Coach Marcus", level: "Elite", intensity: 92 },
    { id: 5, name: "Cryo-Pulse Oxygenation", category: "recovery", time: "06:00 PM", instructor: "Staff Medic", level: "All Levels", intensity: 20 },
  ];

  const filteredClasses = activeTab === "all"
    ? classes
    : classes.filter(c => c.category === activeTab);

  return (
    <div className="relative z-10 w-full bg-black text-white font-sans overflow-x-hidden select-none">

      {/* 1. Modular About Section */}
      <About />

      {/* 1b. Premium Transformation Showcase */}
      <TransformationShowcase />

      {/* 1c. Premium Gym Equipment */}
      <GymEquipment />

      {/* 1d. Premium Why The Gym Changes Everything */}
      <WhyGym />

      {/* 1d-alt. Premium Coaches Showcase */}
      <Coaches />

      {/* 1e. Premium Bento Grid Gallery Showcase */}
      <Gallery />

      {/* 1f. Premium Science-Based Fitness Calculator */}
      <FitnessCalculator />

      {/* 1f-alt. Premium Pricing Tiers Section */}
      <Pricing />

      {/* 1g. Premium Asymmetric Testimonials Showcase */}
      <Testimonials />

      {/* 1h. Premium Interactive FAQ Accordions */}
      <FAQ />

      {/* 5. Contact Section */}
      <ContactSection />

      {/* 6. Premium Cinematic Footer */}
      <Footer />

      {/* Floating Sticky CTA pill observer */}
      <StickyCTA />
    </div>

  );
}
