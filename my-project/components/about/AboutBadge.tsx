"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";

export default function AboutBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: 0.8
      }}
      className="absolute -bottom-6 -right-6 md:bottom-6 md:right-6 p-4 rounded-2xl border border-white/[0.08] bg-zinc-950/85 backdrop-blur-xl shadow-2xl flex items-center gap-3.5 pointer-events-none select-none z-20"
      style={{
        boxShadow: "0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
      }}
    >
      {/* Glowing Icon */}
      <div className="w-10 h-10 rounded-xl bg-red-600/15 flex items-center justify-center text-red-500 border border-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
        <FiAward size={18} className="animate-pulse" />
      </div>

      {/* Badge Lettering */}
      <div className="flex flex-col">
        <span className="text-[14px] font-mono font-black text-white leading-none">
          10+ Years
        </span>
        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500 mt-1 leading-none">
          Apex Caliber
        </span>
      </div>
    </motion.div>
  );
}
