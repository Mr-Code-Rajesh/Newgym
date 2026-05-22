"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiTrendingUp } from "react-icons/fi";
import clsx from "clsx";

interface FloatingStatsProps {
  value: string;
  label: string;
  positionClass: string;
  delay?: number;
}

export default function FloatingStats({
  value,
  label,
  positionClass,
  delay = 0,
}: FloatingStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
        opacity: { duration: 0.6 },
        scale: { duration: 0.6 },
      }}
      className={clsx(
        "absolute z-20 flex items-center gap-3 px-4 py-3 rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md shadow-lg select-none",
        positionClass
      )}
    >
      {/* Dynamic icon circle */}
      <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/25 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
        <FiTrendingUp size={12} />
      </div>

      {/* Info labels */}
      <div className="flex flex-col text-left">
        <span className="text-sm font-mono font-black text-zinc-950 dark:text-white leading-none">
          {value}
        </span>
        <span className="text-[7.5px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-1 leading-none">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
