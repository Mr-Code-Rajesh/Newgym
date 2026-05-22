"use client";

import React from "react";
import TestimonialHeader from "./TestimonialHeader";
import TestimonialGrid from "./TestimonialGrid";
import { TestimonialData } from "./FeaturedTestimonial";

export default function Testimonials() {
  // 1. Static high-fidelity open-source profiles collection
  const featuredMember: TestimonialData = {
    id: 1,
    name: "AURELIUS VANCE",
    role: "HYPERTROPHY & TENSOR DIRECTIVE",
    quote: "Apex completely restructured my physical trajectory. The precision biometric telemetry mapping enabled me to break plateaus I'd been stuck at for five years. This is not just a club, it's a science lab for biological engineering.",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600",
    duration: "16-WEEK BULKING SURPLUS",
    biometrics: "Before: 74 kg / After: 85 kg",
  };

  const secondaryMembers: TestimonialData[] = [
    {
      id: 2,
      name: "MARCUS SHIELD",
      role: "CARDIO & VELOCITY THRUST",
      quote: "The oxygenation chambers and clinical-grade cardio sensors refined my cellular respiration. Under Dr. Elena's telemetry programming, my recovery thresholds hit elite levels.",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=600",
      duration: "12-WEEK OXYGENATION TARGET",
      biometrics: "Before: 90 kg / After: 81 kg",
    },
    {
      id: 3,
      name: "ELENA ROXANNE",
      role: "RECOVERY FLOW & MOBILITY",
      quote: "I joined to address chronic neural limiters in my spine. The isometric drills combined with cryo-pulse therapy fully unlocked my mobility. My biomechanical state is absolute.",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600",
      duration: "8-WEEK MOBILE HOMEOCLASM",
      biometrics: "Before: Mobility 40% / After: Elite Flow",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative z-10 w-full bg-zinc-50 dark:bg-black text-zinc-950 dark:text-white py-20 md:py-28 border-t border-zinc-200 dark:border-white/[0.04] flex flex-col gap-12 sm:gap-16 scroll-mt-24 overflow-hidden select-none transition-colors duration-500"
    >
      {/* 2. Cinematic backdrop spotlights */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[30%] right-[-10%] w-[50%] aspect-square rounded-full bg-red-600/5 blur-[120px] dark:bg-red-950/10 dark:blur-[160px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[50%] aspect-square rounded-full bg-red-600/5 blur-[120px] dark:bg-red-950/10 dark:blur-[160px]" />
      </div>

      {/* 3. Header Block */}
      <div className="relative z-10">
        <TestimonialHeader />
      </div>

      {/* 4. Asymmetric Grid Layout */}
      <div className="relative z-10">
        <TestimonialGrid
          featuredMember={featuredMember}
          secondaryMembers={secondaryMembers}
        />
      </div>
    </section>
  );
}
