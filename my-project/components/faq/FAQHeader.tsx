"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FAQHeader() {
  return (
    <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto px-4 select-none">
      {/* 1. Subtle, uppercase premium accent label */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-600 dark:text-red-500">
          Need Help?
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
      </motion.div>

      {/* 2. Cinematic Bold Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-950 dark:text-white leading-[1.1]"
      >
        Frequently Asked <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500 dark:from-red-500 dark:via-red-400 dark:to-orange-400 drop-shadow-[0_2px_10px_rgba(239,68,68,0.15)]">
          Questions
        </span>
      </motion.h2>

      {/* 3. Short Supporting Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xs sm:text-sm font-medium leading-relaxed tracking-wide text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto"
      >
        Clear parameters remove friction. Review answers about training, membership tiers, biometrics conditioning, and recovery support.
      </motion.p>
    </div>
  );
}
