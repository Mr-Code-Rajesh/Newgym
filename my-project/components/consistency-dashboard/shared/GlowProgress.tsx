"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlowProgressProps {
  value: number; // percentage 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export default function GlowProgress({
  value,
  size = 80,
  strokeWidth = 6,
  color = "#ef4444",
  label
}: GlowProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(239, 68, 68, 0.03)"
          strokeWidth={strokeWidth}
        />
        {/* Active Ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 4px rgba(239, 68, 68, 0.25))"
          }}
        />
      </svg>

      {/* Floating Center text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-sm font-black font-mono text-zinc-950 dark:text-white leading-none">
          {Math.round(value)}%
        </span>
        {label && (
          <span className="text-[6.5px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider leading-none mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
