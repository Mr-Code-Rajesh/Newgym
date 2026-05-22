"use client";

import React from "react";
import { motion } from "framer-motion";

interface MacroCardProps {
  label: string;
  grams: number;
  calories: number;
  percentage: number;
  colorClass: string; // e.g. "bg-red-500", "bg-amber-500"
  shadowClass: string; // e.g. "shadow-red-500/20"
}

export default function MacroCard({
  label,
  grams,
  calories,
  percentage,
  colorClass,
  shadowClass,
}: MacroCardProps) {
  return (
    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-white/[0.04] backdrop-blur-xl flex flex-col gap-3 transition-all duration-300 hover:border-red-500/10 hover:shadow-md select-none">
      {/* Label and Percentage */}
      <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        <span>{label}</span>
        <span className="font-mono text-zinc-400 dark:text-zinc-500">{percentage}% Split</span>
      </div>

      {/* Target quantity metrics */}
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-zinc-950 dark:text-white flex items-baseline">
          <span className="text-xl font-black">{grams}</span>
          <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-0.5">g</span>
        </span>

        <span className="text-[7.5px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
          {calories} kcal
        </span>
      </div>

      {/* Visual dynamic progress bar */}
      <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${colorClass} ${shadowClass}`}
          style={{ boxShadow: "0 0 6px var(--tw-shadow-color)" }}
        />
      </div>
    </div>
  );
}
