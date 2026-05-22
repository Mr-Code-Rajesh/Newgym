"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

export default function NavbarLogo() {
  // Shimmer animation sweep on hover
  const shimmerVariants: Variants = {
    initial: { x: "-150%" },
    hover: {
      x: "150%",
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      }
    }
  };

  return (
    <motion.a 
      href="#home"
      initial="initial"
      whileHover="hover"
      className="flex items-center gap-2.5 select-none group cursor-pointer"
    >
      {/* SVG Geometric Emblem Container */}
      <div className="relative overflow-hidden w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-white/[0.08] flex items-center justify-center shadow-lg group-hover:border-red-500/30 transition-colors duration-500">
        
        <svg 
          viewBox="0 0 100 100" 
          className="w-6 h-6 drop-shadow-[0_0_8px_rgba(239,68,68,0.2)] group-hover:drop-shadow-[0_0_12px_rgba(239,68,68,0.4)] transition-all duration-500"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Brushed Metallic Gradient */}
            <linearGradient id="navMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#f4f4f5" />
              <stop offset="75%" stopColor="#a1a1aa" />
              <stop offset="100%" stopColor="#3f3f46" />
            </linearGradient>

            {/* Beating Core Glow */}
            <linearGradient id="navRedCore" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          {/* Left chevron wing */}
          <path d="M 20,80 L 42,20 L 50,34 L 32,80 Z" fill="url(#navMetallic)" />
          {/* Right chevron wing */}
          <path d="M 80,80 L 58,20 L 50,34 L 68,80 Z" fill="url(#navMetallic)" />
          {/* Beating Energy Delta Core */}
          <path d="M 50,38 L 62,65 L 50,57 L 38,65 Z" fill="url(#navRedCore)" />
        </svg>

        {/* Shimmer overlay sweep on hover */}
        <motion.div
          variants={shimmerVariants}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 select-none pointer-events-none"
          style={{ width: "200%" }}
        />
      </div>

      {/* Brand Text Lettering */}
      <div className="flex flex-col">
        <span className="text-sm font-black tracking-[0.25em] uppercase text-white group-hover:text-red-500 transition-colors duration-500 leading-none">
          Apex
        </span>
        <span className="text-[7px] font-extrabold tracking-[0.35em] uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500 mt-1 leading-none ml-[0.1em]">
          Athletics
        </span>
      </div>
    </motion.a>
  );
}
