"use client";

import React from "react";
import { motion } from "framer-motion";

interface GalleryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function GalleryFilter({
  categories,
  activeCategory,
  setActiveCategory,
}: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto px-4">
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/60 dark:border-white/[0.05] backdrop-blur-xl shadow-inner">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative px-4 py-1.5 rounded-full text-[8.5px] font-black uppercase tracking-widest transition-colors duration-300 outline-none cursor-pointer select-none"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {/* Animated Sliding Pill Background */}
              {isActive && (
                <motion.div
                  layoutId="active-gallery-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-red-600 dark:bg-red-600 rounded-full shadow-[0_4px_12px_rgba(239,68,68,0.25)] dark:shadow-[0_4px_12px_rgba(239,68,68,0.15)]"
                />
              )}

              {/* Pill Text Label */}
              <span
                className={`relative z-10 block transition-colors duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
