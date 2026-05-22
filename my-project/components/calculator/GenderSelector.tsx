"use client";

import React from "react";
import { motion } from "framer-motion";
import { IoMale, IoFemale } from "react-icons/io5";

interface GenderSelectorProps {
  gender: "male" | "female";
  setGender: (gender: "male" | "female") => void;
}

export default function GenderSelector({ gender, setGender }: GenderSelectorProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full select-none">
      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        Biological Gender
      </span>

      <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/60 dark:border-white/[0.05]">
        {(["male", "female"] as const).map((option) => {
          const isActive = gender === option;
          const Icon = option === "male" ? IoMale : IoFemale;

          return (
            <button
              key={option}
              type="button"
              onClick={() => setGender(option)}
              className="relative py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer overflow-hidden transition-all duration-300"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {/* Sliding background element */}
              {isActive && (
                <motion.div
                  layoutId="active-gender-pill"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className="absolute inset-0 bg-red-600 rounded-xl shadow-[0_4px_12px_rgba(239,68,68,0.2)]"
                />
              )}

              {/* Text & Icon indicator */}
              <span
                className={`relative z-10 flex items-center gap-1.5 transition-colors duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                <Icon size={12} className={isActive ? "text-white" : "text-zinc-400"} />
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
