"use client";

import React from "react";
import { motion } from "framer-motion";

interface ToolCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function ToolCard({ children, className = "" }: ToolCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-950/40 border border-zinc-200 dark:border-white/[0.05] backdrop-blur-xl p-6 sm:p-7 shadow-lg hover:border-red-500/20 hover:shadow-[0_8px_25px_rgba(239,68,68,0.06)] transition-all duration-500 flex flex-col justify-between gap-5 select-none ${className}`}
    >
      {/* Subtle top-right red accent glow */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 blur-2xl pointer-events-none" />

      {children}
    </motion.div>
  );
}
