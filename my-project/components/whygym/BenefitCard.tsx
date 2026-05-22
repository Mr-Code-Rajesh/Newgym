"use client";

import React from "react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

interface BenefitCardProps {
  title: string;
  description: string;
  icon: IconType;
}

export default function BenefitCard({ title, description, icon: Icon }: BenefitCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative flex flex-col gap-4 rounded-2xl border border-zinc-200 dark:border-white/[0.04] bg-white dark:bg-zinc-950/40 p-5 transition-all duration-500 hover:border-red-500/25 dark:hover:bg-zinc-950/60 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(239,68,68,0.08)] overflow-hidden"
    >
      {/* Background glow overlay */}
      <div className="absolute top-[-20%] right-[-20%] w-[100px] h-[100px] rounded-full bg-red-600/5 blur-[40px] group-hover:bg-red-600/10 group-hover:scale-125 transition-all duration-700 pointer-events-none" />

      {/* Reusable Icon segment */}
      <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.04] text-red-500 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500/20 shadow-sm">
        <Icon size={14} className="transition-transform duration-500 group-hover:rotate-12" />
      </div>

      {/* Identity titles and science descriptions */}
      <div className="flex flex-col gap-1.5 text-left">
        <h4 className="text-sm font-black uppercase tracking-tight text-zinc-950 dark:text-white group-hover:text-red-500 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
