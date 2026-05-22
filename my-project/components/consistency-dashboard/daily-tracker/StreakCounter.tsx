"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";
import AnimatedCounter from "../shared/AnimatedCounter";

interface StreakCounterProps {
  streak: number;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  const isActive = streak > 0;

  return (
    <div className="flex items-center gap-3.5 select-none text-left">
      {/* Flame Streak Fire badge wrapper */}
      <motion.div
        animate={isActive ? { scale: [1, 1.06, 1], rotate: [0, 1, 0] } : {}}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
          isActive
            ? "bg-red-500/10 border-red-500/30 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
            : "bg-zinc-100 dark:bg-zinc-950 border-zinc-200 dark:border-white/[0.04] text-zinc-400"
        }`}
      >
        <FiZap size={18} className={isActive ? "fill-red-500" : ""} />
      </motion.div>

      {/* Streak value details */}
      <div className="flex flex-col">
        <span className="text-[7.5px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-505 leading-none">
          CONSECUTIVE RUN
        </span>
        <div className="flex items-baseline gap-1 mt-1 leading-none">
          <AnimatedCounter value={streak} className="text-2xl font-black text-zinc-950 dark:text-white" />
          <span className="text-[9.5px] font-bold text-zinc-400">DAYS ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
