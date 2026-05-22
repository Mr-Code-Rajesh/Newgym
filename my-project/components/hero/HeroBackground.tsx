"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Next.js Optimized Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=1600"
        alt="Evil Attitude Aggressive Gym Motivation"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-65 select-none grayscale hover:grayscale-0 transition-all duration-700"
        quality={85}
      />

      {/* 2. Dark Luxury Gradient Overlays */}
      {/* Absolute dark mask */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Left-to-right fade-to-black to ensure perfect content readability */}
      <div className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
      
      {/* Bottom fade to page bg */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-10" />

      {/* 3. Layered Ambient glowing scarlet lights */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.22, 0.15]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[10%] left-[-10%] w-[55vw] h-[55vw] max-w-[500px] rounded-full bg-red-600/10 blur-[130px] z-10 pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] max-w-[450px] rounded-full bg-red-800/10 blur-[120px] z-10 pointer-events-none"
      />

      {/* 4. Fine Grid Telemetry Mesh Layer */}
      <div 
        className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] z-10"
        style={{ transform: "perspective(500px) rotateX(60deg) translateY(-20%) scale(1.5)" }}
      />
    </div>
  );
}
