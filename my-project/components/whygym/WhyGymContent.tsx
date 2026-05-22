"use client";

import React from "react";
import { motion } from "framer-motion";
import BenefitGrid from "./BenefitGrid";

export default function WhyGymContent() {
  return (
    <div className="flex flex-col gap-6 text-left items-start w-full">
      {/* Section Pill Label */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 text-[10px] font-black tracking-[0.4em] uppercase text-red-600 dark:text-red-500"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 animate-ping shadow-[0_0_6px_#ef4444]" />
        <span>Science-Backed</span>
      </motion.div>

      {/* Cinematic Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-950 dark:text-white leading-[0.95]"
      >
        Why The Gym <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-zinc-800 to-red-600 dark:from-white dark:via-zinc-300 dark:to-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.15)]">
          Changes Everything.
        </span>
      </motion.h2>

      {/* Science-Backed motivational description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium tracking-wide leading-relaxed max-w-xl"
      >
        More than standard hypertrophy or cardiovascular conditioning, a dedicated training routine fundamentally upgrades your neural wiring, cellular mitochondria, and hormonal baselines. Explore the biological evidence of why physical training unlocks superior absolute performance.
      </motion.p>

      {/* Core Staggered Benefit Cards Grid */}
      <div className="w-full mt-4">
        <BenefitGrid />
      </div>
    </div>
  );
}
