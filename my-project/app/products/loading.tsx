"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiActivity } from "react-icons/fi";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center select-none">
      <div className="relative flex flex-col items-center gap-4">
        {/* Pulsing led node */}
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-red-500/20 bg-zinc-950">
          <FiActivity className="text-red-500 animate-pulse" size={20} />
          <span className="absolute inset-0 rounded-full border border-red-500/10 animate-ping" />
        </div>
        
        {/* Monospace loader label */}
        <div className="flex flex-col items-center gap-1.5 mt-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
            Apex Systems Loading
          </span>
          <div className="h-[2px] w-24 rounded-full bg-zinc-900 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-red-600 w-12"
            />
          </div>
          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
            Uplinking Database Matrix...
          </span>
        </div>
      </div>
    </div>
  );
}
