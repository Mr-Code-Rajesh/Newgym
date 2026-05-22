"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressHeatmapProps {
  logs: boolean[];
}

export default function ProgressHeatmap({ logs }: ProgressHeatmapProps) {
  return (
    <div className="flex flex-col gap-2.5 text-left w-full">
      <span className="text-[7.5px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-505">
        Gym Attendance Heatmap
      </span>
      {/* 30-day contribution grid block matrix */}
      <div className="grid grid-cols-10 gap-1.5 w-full bg-zinc-50 dark:bg-black/30 border border-zinc-200/40 dark:border-white/[0.03] p-3 rounded-2xl">
        {logs.map((active, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.01 }}
            className={`aspect-square rounded-md transition-all duration-300 ${
              active
                ? "bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.3)] border border-red-500/30"
                : "bg-zinc-200 dark:bg-zinc-900/60 border border-zinc-300/40 dark:border-white/[0.02]"
            }`}
            title={`Day ${idx + 1}: ${active ? "Workout Logged" : "No Activity"}`}
          />
        ))}
      </div>
    </div>
  );
}
