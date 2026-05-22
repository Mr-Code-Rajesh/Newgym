"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CinematicLoader from "@/components/loader/CinematicLoader";
import Hero from "@/components/hero/Hero";
import Navbar from "@/components/navbar/Navbar";
import HomeSections from "@/components/HomeSections";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-black">
      {/* 1. Fullscreen Cinematic Loader Sequence */}
      {isLoading && (
        <CinematicLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* 2. Premium Luxury Fitness Showcase */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1], // Luxury cubic ease-out
                delay: 0.1 // Let the shutter transition sweep complete slightly first
              }
            }}
            className="w-full min-h-screen relative"
          >
            <Navbar />
            <Hero />
            <HomeSections />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
