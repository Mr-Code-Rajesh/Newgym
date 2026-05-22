"use client";

import React from "react";
import clsx from "clsx";

interface EquipmentBadgeProps {
  text: string;
  glow?: boolean;
  className?: string;
}

export default function EquipmentBadge({
  text,
  glow = false,
  className,
}: EquipmentBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full text-[8.5px] font-black uppercase tracking-widest px-2.5 py-1 border transition-all duration-300 select-none",
        "bg-zinc-100/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-white/[0.06] text-zinc-800 dark:text-zinc-300",
        {
          "shadow-[0_0_12px_rgba(239,68,68,0.2)] dark:shadow-[0_0_15px_rgba(239,68,68,0.35)] border-red-500/25 dark:border-red-500/20 text-red-600 dark:text-red-400":
            glow,
        },
        className
      )}
    >
      {text}
    </span>
  );
}
