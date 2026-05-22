"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiActivity, FiMapPin, FiRefreshCw } from "react-icons/fi";
import ToolCard from "../shared/ToolCard";
import SectionHeader from "../shared/SectionHeader";

export default function StepCounter() {
  const [steps, setSteps] = useState<number>(0);
  const [goal, setGoal] = useState<number>(10000);

  // 1. Hydrate state from localStorage on mount
  useEffect(() => {
    const savedSteps = localStorage.getItem("apex_logged_steps");
    const savedGoal = localStorage.getItem("apex_steps_goal");
    if (savedSteps) setSteps(parseInt(savedSteps));
    if (savedGoal) setGoal(parseInt(savedGoal));
  }, []);

  const updateSteps = (newVal: number) => {
    const clampedVal = Math.max(0, newVal);
    setSteps(clampedVal);
    localStorage.setItem("apex_logged_steps", clampedVal.toString());
  };

  const updateGoal = (newGoal: number) => {
    const clampedGoal = Math.max(1000, newGoal);
    setGoal(clampedGoal);
    localStorage.setItem("apex_steps_goal", clampedGoal.toString());
  };

  // 2. Telemetry Calculations
  const percentage = Math.min(100, Math.round((steps / goal) * 100));
  const caloriesBurned = Math.round(steps * 0.04); // ~0.04 kcal per step
  const distanceKm = parseFloat((steps * 0.00075).toFixed(2)); // ~0.75m per step stride in km

  return (
    <ToolCard className="col-span-12 md:col-span-6 lg:col-span-4 min-h-[420px] flex flex-col justify-between">
      {/* Header */}
      <SectionHeader title="Step Telemetry" label="Cardio Coordinates" icon={FiTrendingUp} />

      {/* Primary Counter Stats Display */}
      <div className="flex flex-col text-left py-2">
        <span className="text-[7.5px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
          LOGGED DISPLACEMENT
        </span>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-3xl font-black font-mono text-zinc-950 dark:text-white leading-none">
            {steps.toLocaleString()}
          </span>
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500">
            / {goal.toLocaleString()} Steps
          </span>
        </div>
      </div>

      {/* Progress Bar Gauge */}
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/[0.04] rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full"
          />
        </div>
        <div className="flex justify-between text-[7.5px] font-black uppercase text-zinc-400 dark:text-zinc-500">
          <span>Daily Baseline Target</span>
          <span className="text-red-500">{percentage}%</span>
        </div>
      </div>

      {/* Calculations Grid: Calories / Distance */}
      <div className="grid grid-cols-2 gap-4 border-y border-zinc-200/60 dark:border-white/[0.04] py-3.5 my-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-white/[0.04] flex items-center justify-center text-red-500">
            <FiActivity size={12} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[7px] font-black uppercase text-zinc-400 dark:text-zinc-500">
              EST BURNED
            </span>
            <span className="text-xs font-black text-zinc-950 dark:text-white leading-none mt-0.5">
              {caloriesBurned} kcal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-white/[0.04] flex items-center justify-center text-red-500">
            <FiMapPin size={12} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[7px] font-black uppercase text-zinc-400 dark:text-zinc-500">
              DISTANCE
            </span>
            <span className="text-xs font-black text-zinc-950 dark:text-white leading-none mt-0.5">
              {distanceKm} km
            </span>
          </div>
        </div>
      </div>

      {/* Sub controls Goal adjustment slider */}
      <div className="flex flex-col gap-1 text-left">
        <div className="flex items-center justify-between text-[7px] font-black uppercase text-zinc-400 dark:text-zinc-500">
          <span>Adjust Step Goal</span>
          <span>{goal.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="3000"
          max="20000"
          step="500"
          value={goal}
          onChange={(e) => updateGoal(parseInt(e.target.value))}
          className="w-full accent-red-600 cursor-pointer h-1 rounded bg-zinc-200 dark:bg-zinc-800"
        />
      </div>

      {/* Manual loggers Incremental Triggers */}
      <div className="flex items-center gap-2.5">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => updateSteps(steps + 1000)}
          className="flex-1 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.08] text-[8px] font-black uppercase tracking-widest text-zinc-800 dark:text-white hover:text-red-500 hover:border-red-500/20 transition-all cursor-pointer shadow-sm"
        >
          +1,000 Steps
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => updateSteps(steps + 5000)}
          className="flex-1 py-2 rounded-xl bg-red-600 text-white text-[8px] font-black uppercase tracking-widest hover:bg-red-700 transition-all cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.2)] hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
        >
          +5,000 Steps
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => updateSteps(0)}
          aria-label="Reset steps logs"
          className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.08] text-zinc-400 hover:text-red-500 flex items-center justify-center cursor-pointer transition-colors"
        >
          <FiRefreshCw size={11} />
        </motion.button>
      </div>
    </ToolCard>
  );
}
