"use client";

import React from "react";
import { motion } from "framer-motion";

interface CTAButtonsProps {
  size?: "sm" | "lg";
}

export default function CTAButtons({ size = "lg" }: CTAButtonsProps) {
  const isSm = size === "sm";

  return (
    <div className={`flex items-center gap-3.5 select-none ${isSm ? "" : "justify-center lg:justify-start"}`}>
      {/* 1. Primary "Join Now" Action */}
      <motion.a
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        href="#contact"
        className={`rounded-full bg-gradient-to-r from-red-700 to-red-600 text-white font-black uppercase tracking-widest text-center border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-500 cursor-pointer ${
          isSm ? "px-4 py-2 text-[8px]" : "px-8 py-3.5 text-[10px]"
        }`}
      >
        Join Now
      </motion.a>

      {/* 2. Secondary "Book Free Trial" Action */}
      <motion.a
        whileHover={{ scale: 1.03, backgroundColor: "rgba(239, 68, 68, 0.05)" }}
        whileTap={{ scale: 0.97 }}
        href="#contact"
        className={`rounded-full bg-transparent border border-zinc-300 dark:border-white/[0.08] text-zinc-900 dark:text-white font-black uppercase tracking-widest text-center transition-all duration-300 cursor-pointer hover:border-red-500/20 hover:text-red-500 ${
          isSm ? "px-3.5 py-2 text-[8px]" : "px-7 py-3.5 text-[10px]"
        }`}
      >
        Book Free Trial
      </motion.a>
    </div>
  );
}
