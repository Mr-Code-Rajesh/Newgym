"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiActivity, FiZap, FiPlusCircle, FiCheck } from "react-icons/fi";
import ToolCard from "../shared/ToolCard";
import SectionHeader from "../shared/SectionHeader";

type WorkoutType = "strength" | "hiit" | "cardio" | "yoga";

export default function CalorieBurn() {
  const [workoutType, setWorkoutType] = useState<WorkoutType>("strength");
  const [minutes, setMinutes] = useState<number>(30);
  const [historyBurn, setHistoryBurn] = useState<number[]>([450, 320, 680, 500, 0, 0, 0]);
  const [logSuccess, setLogSuccess] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("apex_calorie_history");
    if (savedHistory) {
      try {
        setHistoryBurn(JSON.parse(savedHistory));
      } catch (err) {
        console.warn("Calorie load failed", err);
      }
    }
  }, []);

  // Multiplier scales based on MET factors (kcal per minute approx)
  const multipliers: Record<WorkoutType, number> = {
    strength: 6.5,
    hiit: 11.0,
    cardio: 8.5,
    yoga: 3.5,
  };

  const calculatedBurn = Math.round(minutes * multipliers[workoutType]);

  const handleLogBurn = () => {
    // Log into active day (e.g. idx 4 represents Friday)
    const nextHistory = [...historyBurn];
    nextHistory[4] = Math.min(1000, nextHistory[4] + calculatedBurn);
    setHistoryBurn(nextHistory);
    localStorage.setItem("apex_calorie_history", JSON.stringify(nextHistory));

    // Award simulated XP points inside Streak System
    const currentXp = localStorage.getItem("apex_streak_xp");
    const updatedXp = currentXp ? parseInt(currentXp) + 40 : 40;
    localStorage.setItem("apex_streak_xp", updatedXp.toString());

    // Trigger visual feedback
    setLogSuccess(true);
    setTimeout(() => {
      setLogSuccess(false);
    }, 1200);
  };

  const weeklyDays = [
    { day: "Mon", val: historyBurn[0] },
    { day: "Tue", val: historyBurn[1] },
    { day: "Wed", val: historyBurn[2] },
    { day: "Thu", val: historyBurn[3] },
    { day: "Fri", val: historyBurn[4] },
    { day: "Sat", val: historyBurn[5] },
    { day: "Sun", val: historyBurn[6] },
  ];

  return (
    <ToolCard className="col-span-12 md:col-span-12 lg:col-span-8 min-h-[420px] flex flex-col justify-between">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch h-full w-full">
        {/* Left Segment: Estimate Calculations controls */}
        <div className="flex flex-col justify-between gap-4 text-left">
          {/* Header */}
          <SectionHeader title="Calorie Expended" label="Energy Analytics" icon={FiZap} />

          {/* Workout Modes select */}
          <div className="flex flex-col gap-2">
            <span className="text-[7.5px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
              PHYSICAL DISCIPLINE
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(["strength", "hiit", "cardio", "yoga"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setWorkoutType(mode)}
                  className={`py-2 px-3 rounded-xl border text-[8px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                    workoutType === mode
                      ? "bg-red-600 border-red-500 text-white shadow-md shadow-red-500/10"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200/50 dark:border-white/[0.04] text-zinc-400 hover:text-zinc-800 dark:hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Duration minutes slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[7px] font-black uppercase text-zinc-400 dark:text-zinc-500">
              <span>Minutes Logged</span>
              <span className="text-zinc-950 dark:text-white">{minutes} Mins</span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value))}
              className="w-full accent-red-600 cursor-pointer h-1 rounded bg-zinc-200 dark:bg-zinc-800"
            />
          </div>

          {/* Computed Burn results */}
          <div className="flex flex-col bg-zinc-50 dark:bg-black/40 border border-zinc-200/50 dark:border-white/[0.04] p-3 rounded-2xl">
            <span className="text-[7px] font-black uppercase text-zinc-400 dark:text-zinc-500">
              ESTIMATED EXPENDITURE
            </span>
            <span className="text-2xl font-black font-mono text-red-500 leading-none mt-1">
              {calculatedBurn} <span className="text-[10px] text-zinc-400">kcal</span>
            </span>
          </div>

          {/* Log Burn action button */}
          <AnimatePresence mode="wait">
            {logSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="w-full py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[8px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <FiCheck size={12} />
                Energy Logs Checked
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogBurn}
                className="w-full py-2.5 rounded-xl bg-red-600 text-white text-[8px] font-black uppercase tracking-widest hover:bg-red-700 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(239,68,68,0.25)]"
              >
                <FiPlusCircle size={12} />
                Record Energy Burn
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Right Segment: Vertical history chart */}
        <div className="flex flex-col justify-between gap-4 text-left border-t md:border-t-0 md:border-l border-zinc-200/60 dark:border-white/[0.04] pt-6 md:pt-0 md:pl-6">
          <div className="flex flex-col">
            <span className="text-[7.5px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
              LOG HISTORY
            </span>
            <span className="text-sm font-black uppercase text-zinc-950 dark:text-white mt-0.5">
              Weekly Burn Map
            </span>
          </div>

          {/* Dynamic vertical bars */}
          <div className="flex items-end justify-between h-36 px-1 gap-2.5 my-2">
            {weeklyDays.map((h, idx) => {
              // Cap at 800 kcal visually
              const pct = Math.min(100, (h.val / 800) * 100);
              return (
                <div key={idx} className="flex flex-col items-center flex-1 gap-1.5">
                  <div className="w-full bg-zinc-100 dark:bg-zinc-950/60 border border-zinc-200/40 dark:border-white/[0.04] rounded-lg h-24 relative flex items-end overflow-hidden">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${pct}%` }}
                      transition={{ type: "spring", stiffness: 60, damping: 15 }}
                      className="w-full bg-gradient-to-t from-red-600 to-orange-500 rounded-b-lg relative"
                    />
                  </div>
                  <span className="text-[7px] font-black uppercase text-zinc-400 dark:text-zinc-500 leading-none">
                    {h.day}
                  </span>
                  <span className="text-[6px] font-bold text-zinc-400/80 leading-none">
                    {h.val}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-[7px] font-bold text-zinc-400">
            <div className="w-2 h-2 rounded bg-gradient-to-r from-red-600 to-orange-500" />
            <span>Simulated Calories Target (800 kcal baseline)</span>
          </div>
        </div>
      </div>
    </ToolCard>
  );
}
