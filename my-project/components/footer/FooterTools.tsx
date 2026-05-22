"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FooterTools() {
  const tools = [
    { name: "Consistency Tracker", href: "/consistency" },
    { name: "HIIT Workstation", href: "/gymtool" },
    { name: "Cardio Displacement", href: "/gymtool" },
    { name: "Hydration Cells", href: "/gymtool" },
    { name: "Calorie Metrics", href: "/gymtool" },
    { name: "Bio Calculator", href: "/#calculator" },
  ];

  return (
    <div className="flex flex-col gap-4 select-none text-left">
      {/* Column Title Header */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-white/[0.06] pb-2 mb-2 w-full">
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 animate-pulse shadow-[0_0_6px_#ef4444] shrink-0" />
        <span className="text-[9.5px] font-black uppercase tracking-[0.25em] text-zinc-950 dark:text-white">
          TELEMETRY APPS
        </span>
      </div>

      {/* Tools List */}
      <ul className="flex flex-col gap-2.5">
        {tools.map((tool, idx) => (
          <li key={idx} className="flex w-full">
            <motion.div whileHover={{ x: 4 }} className="flex w-full">
              <Link
                href={tool.href}
                className="group text-[10.5px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 w-full"
              >
                <div className="h-[2px] w-2 bg-zinc-300 dark:bg-zinc-800 group-hover:bg-red-500 group-hover:w-4 transition-all duration-300 shrink-0" />
                <span className="group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-200">{tool.name}</span>
              </Link>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}
