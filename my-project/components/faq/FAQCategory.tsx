"use client";

import React from "react";
import { motion } from "framer-motion";

export const categories = [
  { id: "all", label: "All FAQ" },
  { id: "membership", label: "Membership" },
  { id: "training", label: "Personal Training" },
  { id: "facilities", label: "Gym Facilities" },
  { id: "pricing", label: "Pricing" },
] as const;

export type FAQCatType = (typeof categories)[number]["id"];

interface FAQCategoryProps {
  activeCat: FAQCatType;
  setActiveCat: (cat: FAQCatType) => void;
}

export default function FAQCategory({ activeCat, setActiveCat }: FAQCategoryProps) {
  return (
    <div className="flex justify-center select-none w-full px-4 overflow-x-auto scrollbar-none py-1">
      <div className="flex gap-2.5 bg-zinc-100 dark:bg-zinc-950 p-1.5 rounded-full border border-zinc-200/60 dark:border-white/[0.05] whitespace-nowrap">
        {categories.map((cat) => {
          const isActive = activeCat === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className="relative px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest outline-none cursor-pointer overflow-hidden transition-all duration-300"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {/* Sliding Background Indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-faq-segment-pill"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className="absolute inset-0 bg-red-600 rounded-full shadow-[0_4px_12px_rgba(239,68,68,0.25)]"
                />
              )}

              {/* Text Link */}
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
