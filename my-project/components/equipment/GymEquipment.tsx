"use client";

import React from "react";
import { motion } from "framer-motion";
import EquipmentGrid from "./EquipmentGrid";

export default function GymEquipment() {
  return (
    <section
      id="equipment"
      aria-label="Apex Biomechanical Equipment Showcase"
      className="relative z-10 w-full bg-zinc-50 dark:bg-black text-zinc-950 dark:text-white py-20 md:py-28 border-t border-zinc-200 dark:border-white/[0.04] flex flex-col gap-12 sm:gap-16 scroll-mt-24 overflow-hidden select-none transition-colors duration-500"
    >
      {/* 1. Subtle cinematic ambient spotlights */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[15%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-red-900/5 dark:bg-red-900/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-15%] w-[50vw] h-[50vw] max-w-[500px] rounded-full bg-zinc-200/40 dark:bg-zinc-900/10 blur-[130px] pointer-events-none" />
      </div>

      {/* 2. Heading and Technical Description Block */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-4">
        {/* Section Pill Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-[10px] font-black tracking-[0.4em] uppercase text-red-600 dark:text-red-500"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 animate-ping shadow-[0_0_6px_#ef4444]" />
          <span>Premium Equipment</span>
        </motion.div>

        {/* Cinematic Primary Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-950 dark:text-white leading-[0.95]"
        >
          Train With <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-zinc-800 to-red-600 dark:from-white dark:via-zinc-300 dark:to-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.15)]">
            World-Class Equipment.
          </span>
        </motion.h2>

        {/* Technical Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium tracking-wide leading-relaxed max-w-2xl mt-1"
        >
          Explore a training environment calibrated down to the micro-gram. Our laboratory assets feature absolute 3D force tracking, self-powered magnetic decks, and zero-inertia pulley crossovers.
        </motion.p>
      </div>

      {/* 3. The Core Bento Grid Showcase */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <EquipmentGrid />
      </div>
    </section>
  );
}
