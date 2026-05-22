"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FiZap } from "react-icons/fi";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  // Stagger children layout animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      }
    }
  };

  // Text slide fade-up details
  const itemVariants: Variants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 18,
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 text-center md:text-left items-center md:items-start max-w-2xl select-none"
    >
      {/* 1. Small Premium Label Text */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/10 bg-red-950/15 text-[8.5px] sm:text-[9.5px] font-black tracking-[0.35em] uppercase text-red-500 shadow-[0_0_12px_rgba(239,68,68,0.1)] border-white/[0.03] select-none"
      >
        <FiZap className="animate-pulse text-red-500" size={10} />
        <span>Biometric Peak Performance Arena</span>
      </motion.div>

      {/* 2. Bold Cinematic Heading */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] text-white select-none"
      >
        Train Beyond <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.15)]">
          Human Limits.
        </span>
      </motion.h1>

      {/* 3. Short Supporting Paragraph */}
      <motion.p
        variants={itemVariants}
        className="text-xs sm:text-sm text-zinc-400 font-medium tracking-wide leading-relaxed max-w-lg select-none"
      >
        APEX combines raw athletic mechanical designs with cinematic environmental atmospheres and next-gen neural biometric mapping. This is not just a club—it is a performance sanctuary.
      </motion.p>

      {/* 4. Action Buttons CTA */}
      <motion.div variants={itemVariants} className="w-full">
        <HeroButtons />
      </motion.div>

      {/* 5. Telemetry Metrics Stats */}
      <motion.div variants={itemVariants} className="w-full mt-4">
        <HeroStats />
      </motion.div>
    </motion.div>
  );
}
