"use client";

import React from "react";

interface ExpertiseBadgeProps {
  label: string;
}

export default function ExpertiseBadge({ label }: ExpertiseBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-950/60 border border-zinc-200 dark:border-white/[0.08] text-[8px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 select-none shadow-sm hover:border-red-500/20 hover:text-red-500 transition-all duration-300">
      <span className="w-1 h-1 rounded-full bg-red-600 shadow-[0_0_6px_#ef4444] animate-pulse" />
      <span>{label}</span>
    </div>
  );
}
