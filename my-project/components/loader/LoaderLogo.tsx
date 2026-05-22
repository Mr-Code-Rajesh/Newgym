"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface LoaderLogoProps {
  isComplete: boolean;
}

export default function LoaderLogo({ isComplete }: LoaderLogoProps) {
  // SVG Stroke path animation variants
  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1.8, 
        ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
      }
    }
  };

  // Fill and glow animation variants
  const fillVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 1.0, 
        duration: 1.2, 
        ease: "easeOut" 
      }
    }
  };

  // Shimmer translation animation
  const shimmerVariants: Variants = {
    animate: {
      x: ["-150%", "150%"],
      transition: {
        repeat: Infinity,
        repeatDelay: 2.5,
        duration: 1.5,
        ease: "easeInOut",
        delay: 2.0
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer Glow behind the logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isComplete ? 0 : [0.2, 0.4, 0.2],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
        className="absolute w-48 h-48 rounded-full bg-red-600/20 blur-3xl pointer-events-none"
      />

      {/* Main Logo Container */}
      <motion.div
        variants={fillVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden w-40 h-40 flex items-center justify-center"
      >
        {/* SVG Emblem */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-32 h-32 select-none drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Brushed Metallic Silver Gradient for Outer Wings */}
            <linearGradient id="metallicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#e4e4e7" />
              <stop offset="70%" stopColor="#71717a" />
              <stop offset="100%" stopColor="#27272a" />
            </linearGradient>

            {/* Glowing Red Energy Core Gradient */}
            <linearGradient id="redEnergyGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#991b1b" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#fca5a5" />
            </linearGradient>
          </defs>

          {/* Left Wing (Geometric Chevron) */}
          <motion.path
            d="M 20,80 L 42,20 L 50,34 L 32,80 Z"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            stroke="#ffffff"
            strokeWidth="0.5"
            fill="url(#metallicGrad)"
          />

          {/* Right Wing (Geometric Chevron) */}
          <motion.path
            d="M 80,80 L 58,20 L 50,34 L 68,80 Z"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            stroke="#ffffff"
            strokeWidth="0.5"
            fill="url(#metallicGrad)"
          />

          {/* Glowing Center Core (Energetic Delta Chevron) */}
          <motion.path
            d="M 50,38 L 62,65 L 50,57 L 38,65 Z"
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { 
                opacity: 1, 
                scale: 1,
                transition: { 
                  delay: 1.4, 
                  duration: 1.0, 
                  ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number]
                } 
              }
            }}
            initial="hidden"
            animate="visible"
            fill="url(#redEnergyGrad)"
            className="drop-shadow-[0_0_8px_#ef4444]"
          />

          {/* Thin Tech-Accents (Vector Lines) */}
          <motion.line 
            x1="20" y1="85" x2="80" y2="85" 
            stroke="#dc2626" 
            strokeWidth="1.5"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { 
                pathLength: 1, 
                opacity: 0.8,
                transition: { delay: 1.8, duration: 1.0 }
              }
            }}
            initial="hidden"
            animate="visible"
          />
        </svg>

        {/* Metallic Shimmer Sweep overlay */}
        <motion.div
          variants={shimmerVariants}
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 select-none pointer-events-none"
          style={{ width: "200%" }}
        />
      </motion.div>

      {/* Brand Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
        className="mt-4 flex flex-col items-center gap-1"
      >
        <span className="text-2xl font-black tracking-[0.4em] text-white font-sans uppercase">
          Apex
        </span>
        <span className="text-[9px] font-medium tracking-[0.6em] text-red-500 font-sans uppercase ml-[0.6em]">
          Athletics
        </span>
      </motion.div>
    </div>
  );
}
