"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight, FiPlay, FiZap } from "react-icons/fi";

export default function Hero() {
  const handleScrollToSection = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const yOffset = -90;
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      aria-label="Apex Gym Main Showcase"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 pt-36 pb-20 select-none"
    >
      {/* 1. Full-Screen Background Image (Fully Visible & Gritty Motivation) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1920"
          alt="Evil Attitude Aggressive Gym Motivation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 grayscale"
          quality={90}
        />
        {/* Cinematic dark overlays to preserve layout readability without washing out the image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/95" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/85 to-transparent" />
        {/* Subtle red spotlight glow */}
        <div className="absolute top-[20%] left-[15%] w-[45vw] h-[45vw] max-w-[500px] rounded-full bg-red-600/10 blur-[130px]" />
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-8">
        
        {/* Small Accent Tag */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-500/15 bg-red-950/20 text-[9px] sm:text-[10px] font-black tracking-[0.3em] uppercase text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
        >
          <FiZap size={11} className="animate-pulse" />
          <span>BIOMETRIC PERFORMANCE SANCTUARY</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7.5xl font-black uppercase tracking-tight leading-[0.9] text-white"
        >
          TRAIN BEYOND <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-zinc-400">
            HUMAN LIMITS
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-xs sm:text-sm text-zinc-300 font-medium tracking-wide leading-relaxed max-w-2xl"
        >
          APEX combines raw heavy weight conditioning with custom bio-feedback mapping. Build consistency, calibrate metrics, and perform at your biological peak.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <button
            onClick={() => handleScrollToSection("contact")}
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-red-650 hover:bg-red-700 text-[10px] font-black uppercase tracking-widest text-white border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_35px_rgba(239,68,68,0.65)] hover:scale-102 transition-all duration-300 cursor-pointer outline-none flex items-center justify-center gap-2"
          >
            <span>JOIN THE ARENA</span>
            <FiArrowRight size={13} />
          </button>

          <button
            onClick={() => handleScrollToSection("services")}
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-zinc-950/50 backdrop-blur-md border border-white/[0.08] hover:border-white/20 text-[10px] font-black uppercase tracking-widest text-zinc-350 hover:text-white transition-all duration-300 hover:scale-102 cursor-pointer outline-none flex items-center justify-center gap-2"
          >
            <FiPlay size={11} className="text-red-500" />
            <span>CALIBRATE SERVICES</span>
          </button>
        </motion.div>

        {/* Minimalist Stats Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="grid grid-cols-3 gap-6 sm:gap-12 md:gap-16 pt-10 border-t border-white/[0.06] w-full max-w-3xl mt-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight leading-none">
              15K+
            </span>
            <span className="text-[8px] sm:text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-none mt-1">
              Active Members
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight leading-none">
              50+
            </span>
            <span className="text-[8px] sm:text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-none mt-1">
              Elite Coaches
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight leading-none">
              99.4%
            </span>
            <span className="text-[8px] sm:text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-none mt-1">
              Success Rate
            </span>
          </div>
        </motion.div>
      </div>

      {/* 3. Cinematic Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => handleScrollToSection("about")}
          aria-label="Scroll down to active telemetry features"
          className="flex flex-col items-center gap-1 cursor-pointer outline-none group"
        >
          <span className="text-[7.5px] font-black uppercase tracking-[0.4em] text-zinc-500 group-hover:text-red-500 transition-colors duration-300">
            Scroll Telemetry
          </span>
          <div className="w-5 h-9 rounded-full border border-zinc-700 group-hover:border-red-500/50 flex items-start justify-center p-1 transition-all duration-300">
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                opacity: [1, 0.4, 1]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1 h-2 bg-red-500 rounded-full shadow-[0_0_6px_#ef4444]"
            />
          </div>
        </button>
      </div>
    </section>
  );
}
