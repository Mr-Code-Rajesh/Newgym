"use client";

import React from "react";
import { IconType } from "react-icons";

interface SectionHeaderProps {
  title: string;
  label: string;
  icon: IconType;
}

export default function SectionHeader({ title, label, icon: Icon }: SectionHeaderProps) {
  return (
    <div className="flex items-start gap-3.5 select-none text-left mb-2">
      {/* Icon Badge */}
      <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/[0.04] flex items-center justify-center text-red-500 shadow-md">
        <Icon size={14} />
      </div>

      {/* Details */}
      <div className="flex flex-col">
        <span className="text-[7.5px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-505">
          {label}
        </span>
        <h3 className="text-xs sm:text-sm font-black uppercase tracking-wide text-zinc-950 dark:text-white mt-0.5">
          {title}
        </h3>
      </div>
    </div>
  );
}
