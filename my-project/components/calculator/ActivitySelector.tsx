"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiActivity } from "react-icons/fi";

export interface ActivityLevel {
  id: "sedentary" | "light" | "moderate" | "very" | "extreme";
  label: string;
  desc: string;
  mult: number;
  multLabel: string;
}

interface ActivitySelectorProps {
  activity: ActivityLevel["id"];
  setActivity: (activity: ActivityLevel["id"]) => void;
}

export const activityLevels: ActivityLevel[] = [
  {
    id: "sedentary",
    label: "Sedentary",
    desc: "Little or no exercise, desk-bound routine",
    mult: 1.2,
    multLabel: "1.20x",
  },
  {
    id: "light",
    label: "Lightly Active",
    desc: "Light aerobic drills or gym 1–3 days/week",
    mult: 1.375,
    multLabel: "1.38x",
  },
  {
    id: "moderate",
    label: "Moderately Active",
    desc: "Coordinated sports or load lifting 3–5 days/week",
    mult: 1.55,
    multLabel: "1.55x",
  },
  {
    id: "very",
    label: "Very Active",
    desc: "Extreme athletic loading / conditioning 6–7 days/week",
    mult: 1.725,
    multLabel: "1.73x",
  },
  {
    id: "extreme",
    label: "Extremely Active",
    desc: "Twice daily elite sports or heavy metabolic physical job",
    mult: 1.9,
    multLabel: "1.90x",
  },
];

export default function ActivitySelector({ activity, setActivity }: ActivitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLevel = activityLevels.find((level) => level.id === activity) || activityLevels[2];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-2.5 w-full relative select-none">
      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        Metabolic Activity Level
      </span>

      {/* Select Box Toggle Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-4 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/60 dark:border-white/[0.05] hover:border-zinc-300 dark:hover:border-white/[0.08] flex items-center justify-between text-left outline-none cursor-pointer transition-colors duration-300"
      >
        <div className="flex items-center gap-3">
          <FiActivity size={14} className="text-red-500" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wide text-zinc-950 dark:text-white">
              {selectedLevel.label}
            </span>
            <span className="text-[7.5px] font-medium text-zinc-400 dark:text-zinc-500 leading-none mt-0.5 max-w-[210px] sm:max-w-none truncate">
              {selectedLevel.desc}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] font-black text-red-500 bg-red-500/10 dark:bg-red-500/10 px-2 py-0.5 rounded border border-red-500/10">
            {selectedLevel.multLabel}
          </span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <FiChevronDown size={14} className="text-zinc-400" />
          </motion.div>
        </div>
      </button>

      {/* Expanded Dropdown Options Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 4 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-30 p-1.5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.08] shadow-[0_12px_30px_rgba(0,0,0,0.15)] flex flex-col gap-0.5 overflow-hidden"
          >
            {activityLevels.map((level) => {
              const isOptionSelected = level.id === activity;

              return (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => {
                    setActivity(level.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-left outline-none cursor-pointer transition-colors duration-250 ${
                    isOptionSelected
                      ? "bg-zinc-100 dark:bg-zinc-900 text-red-500"
                      : "bg-transparent text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9.5px] font-black uppercase tracking-wide">
                      {level.label}
                    </span>
                    <span className="text-[7.5px] font-medium leading-none text-zinc-400 dark:text-zinc-500 max-w-[210px] sm:max-w-none">
                      {level.desc}
                    </span>
                  </div>

                  <span className="font-mono text-[8.5px] font-bold">
                    {level.multLabel}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
