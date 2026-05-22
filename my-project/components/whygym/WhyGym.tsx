"use client";

import React from "react";
import WhyGymContent from "./WhyGymContent";
import WhyGymImage from "./WhyGymImage";

export default function WhyGym() {
  return (
    <section
      id="why-gym"
      aria-label="Apex Biometrics Storytelling Section"
      className="relative z-10 w-full bg-zinc-50 dark:bg-black text-zinc-950 dark:text-white py-20 md:py-28 border-t border-zinc-200 dark:border-white/[0.04] scroll-mt-24 overflow-hidden select-none transition-colors duration-500"
    >
      {/* Cinematic ambient background glow lights */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[-15%] w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-red-900/5 dark:bg-red-900/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[15%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] rounded-full bg-zinc-200/40 dark:bg-zinc-900/10 blur-[130px] pointer-events-none" />
      </div>

      {/* Main Split Grid Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Headings & Benefit Grid (7 Columns) */}
        <div className="lg:col-span-7 w-full">
          <WhyGymContent />
        </div>

        {/* Right Column: Training Image & Floating Stats (5 Columns) */}
        <div className="lg:col-span-5 w-full flex items-center justify-center">
          <WhyGymImage />
        </div>
      </div>
    </section>
  );
}
