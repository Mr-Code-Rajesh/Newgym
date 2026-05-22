"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import CTAContent from "./CTAContent";
import CTAButtons from "./CTAButtons";

interface FloatingCTAProps {
  onDismiss: () => void;
}

export default function FloatingCTA({ onDismiss }: FloatingCTAProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      role="banner"
      aria-label="Floating call to action"
      className="fixed bottom-0 inset-x-0 z-40 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:max-w-3xl sm:w-[92%] bg-white/80 dark:bg-zinc-950/85 backdrop-blur-2xl border-t border-zinc-200 dark:border-white/[0.08] sm:border sm:rounded-full p-4 sm:py-3.5 sm:px-6 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] sm:shadow-[0_15px_40px_rgba(0,0,0,0.35)] hover:border-red-500/20 hover:shadow-[0_15px_40px_rgba(239,68,68,0.15)] transition-all duration-500 select-none flex items-center justify-between gap-4"
    >
      {/* Glow underline bottom highlighting */}
      <div className="absolute inset-x-6 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent pointer-events-none hidden sm:block" />

      {/* Left Column: Headings */}
      <div className="flex-1">
        <CTAContent size="sm" />
      </div>

      {/* Right Column: CTA Buttons & Close trigger */}
      <div className="flex items-center gap-3">
        <CTAButtons size="sm" />

        {/* Dismiss Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDismiss}
          aria-label="Dismiss Call to Action bar"
          className="w-7 h-7 rounded-full border border-zinc-200 dark:border-white/[0.08] bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-red-500 transition-colors duration-250 outline-none cursor-pointer"
        >
          <FiX size={12} />
        </motion.button>
      </div>
    </motion.div>
  );
}
