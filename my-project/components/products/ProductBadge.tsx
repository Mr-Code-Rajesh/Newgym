"use client";

import { FiStar, FiActivity, FiZap } from "react-icons/fi";

interface ProductBadgeProps {
  type: "rating" | "discount" | "hot";
  value?: string | number;
}

export default function ProductBadge({ type, value }: ProductBadgeProps) {
  if (type === "rating") {
    return (
      <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-zinc-950/80 border border-white/[0.08] backdrop-blur-md text-[9px] font-black font-mono text-amber-500 uppercase select-none">
        <FiStar size={10} className="fill-amber-500" />
        <span>{value || "4.8"}</span>
      </div>
    );
  }

  if (type === "discount") {
    return (
      <div className="px-2 py-0.5 rounded-lg bg-red-600 dark:bg-red-500 text-white text-[9px] font-black font-mono tracking-widest uppercase select-none shadow-[0_0_8px_rgba(239,68,68,0.5)]">
        -{value}% OFF
      </div>
    );
  }

  if (type === "hot") {
    return (
      <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-zinc-950/85 border border-red-500/30 backdrop-blur-md text-[8.5px] font-black font-mono text-red-500 uppercase tracking-widest select-none shadow-[0_0_10px_rgba(239,68,68,0.2)]">
        <FiZap size={9} className="animate-pulse text-red-500" />
        <span>HOT CELL</span>
      </div>
    );
  }

  return null;
}
