"use client";

import React from "react";
import clsx from "clsx";

interface TransformationBadgeProps {
  text: string;
  variant?: "duration" | "goal" | "result";
  glow?: boolean;
  className?: string;
}

export default function TransformationBadge({
  text,
  variant = "goal",
  glow = false,
  className,
}: TransformationBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full text-[9px] font-black uppercase tracking-widest px-3 py-1 border transition-all duration-300 select-none",
        {
          // Duration: Subtle, clean, technical look
          "bg-zinc-100/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-white/[0.06] text-zinc-800 dark:text-zinc-300":
            variant === "duration",
          
          // Goal: Strong outline with branded athletic feels
          "bg-transparent border-red-500/30 text-red-600 dark:text-red-500":
            variant === "goal",
          
          // Result: Bold high-contrast indicator
          "bg-red-600 border-red-500/20 text-white":
            variant === "result",
          
          // Glow enhancement
          "shadow-[0_0_12px_rgba(239,68,68,0.25)] dark:shadow-[0_0_15px_rgba(239,68,68,0.4)]":
            glow || variant === "result",
        },
        className
      )}
    >
      {text}
    </span>
  );
}
