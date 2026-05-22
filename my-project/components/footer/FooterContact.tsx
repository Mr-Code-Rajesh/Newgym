"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiClock, FiMap } from "react-icons/fi";

export default function FooterContact() {
  const coordinates = [
    { icon: FiMapPin, label: "HQ", val: "Apex Club, Sector 7" },
    { icon: FiPhone, label: "Audio", val: "+1 (800) APEX-CORE" },
    { icon: FiMail, label: "Email", val: "uplink@apex.net" },
    { icon: FiClock, label: "Cycle", val: "24/7 / 365 Days" },
  ];

  return (
    <div className="flex flex-col gap-4 select-none text-left">
      {/* Column Title Header */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-white/[0.06] pb-2 mb-2 w-full">
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 animate-pulse shadow-[0_0_6px_#ef4444] shrink-0" />
        <span className="text-[9.5px] font-black uppercase tracking-[0.25em] text-zinc-950 dark:text-white">
          COORDINATES
        </span>
      </div>

      {/* Details Specifications */}
      <div className="flex flex-col gap-3">
        {coordinates.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5 group">
              <div className="text-red-500 flex items-center justify-center">
                <Icon size={11} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors duration-200">
                  {item.val}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Styled Google Maps Action Link */}
      <motion.a
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        href="https://maps.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto mt-2 py-2 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.04] text-[8.5px] font-black uppercase tracking-widest text-zinc-800 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400 flex items-center justify-center gap-2 shadow-sm transition-all duration-300 cursor-pointer"
      >
        <FiMap size={11} />
        Initialize Arena Map
      </motion.a>
    </div>
  );
}
