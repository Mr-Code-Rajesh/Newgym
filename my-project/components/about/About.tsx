"use client";

import React from "react";
import AboutImages from "./AboutImages";
import AboutContent from "./AboutContent";

export default function About() {
  return (
    <section
      id="about"
      aria-label="About APEX Athletics Sanctuary"
      className="relative w-full py-20 md:py-28 overflow-hidden bg-black select-none scroll-mt-24 border-t border-white/[0.04]"
    >
      {/* 1. Subtle background glow lights */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] rounded-full bg-red-900/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-15%] w-[45vw] h-[45vw] max-w-[450px] rounded-full bg-zinc-900/10 blur-[130px]" />
      </div>

      {/* 2. Responsive 12-Column Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        {/* Left Side: Overlapping Composite Images */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <AboutImages />
        </div>

        {/* Right Side: Staggered Content Details */}
        <div className="lg:col-span-6 flex justify-center lg:justify-start w-full">
          <AboutContent />
        </div>
      </div>
    </section>
  );
}
