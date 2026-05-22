"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDroplet, FiPlus, FiRefreshCw } from "react-icons/fi";
import ToolCard from "../shared/ToolCard";
import SectionHeader from "../shared/SectionHeader";

export default function WaterTracker() {
  const [waterMl, setWaterMl] = useState<number>(0);
  const [goalMl, setGoalMl] = useState<number>(3000); // Default 3 Litres

  // 1. Hydrate state from localStorage on mount
  useEffect(() => {
    const savedMl = localStorage.getItem("apex_water_logged");
    const savedGoal = localStorage.getItem("apex_water_goal");
    if (savedMl) setWaterMl(parseInt(savedMl));
    if (savedGoal) setGoalMl(parseInt(savedGoal));
  }, []);

  const updateWater = (newMl: number) => {
    const clampedVal = Math.max(0, newMl);
    setWaterMl(clampedVal);
    localStorage.setItem("apex_water_logged", clampedVal.toString());
  };

  const updateGoal = (newGoal: number) => {
    const clampedGoal = Math.max(1000, newGoal);
    setGoalMl(clampedGoal);
    localStorage.setItem("apex_water_goal", clampedGoal.toString());
  };

  // 2. Hydration metrics
  const percentage = Math.min(100, Math.round((waterMl / goalMl) * 100));
  const waterL = (waterMl / 1000).toFixed(2);
  const goalL = (goalMl / 1000).toFixed(1);

  return (
    <ToolCard className="col-span-12 md:col-span-6 lg:col-span-4 min-h-[420px] flex flex-col justify-between">
      {/* Header */}
      <SectionHeader title="Hydration Track" label="Cellular Fluid Levels" icon={FiDroplet} />

      {/* Main Hydration stats */}
      <div className="flex flex-col text-left py-1">
        <span className="text-[7.5px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
          LOGGED CONCENTRATION
        </span>
        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-3xl font-black font-mono text-zinc-950 dark:text-white leading-none">
            {waterL}
          </span>
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500">
            / {goalL} Litres
          </span>
        </div>
      </div>

      {/* Glass Container Level filling Graphic */}
      <div className="flex items-center justify-center my-2">
        <div className="relative w-24 h-32 border border-zinc-200 dark:border-white/[0.08] rounded-2xl overflow-hidden bg-zinc-50 dark:bg-black/40 shadow-inner flex flex-col justify-end">
          {/* Wave liquid level fill */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="absolute bottom-0 inset-x-0 bg-blue-500/35 dark:bg-blue-600/40 relative z-0 flex items-center justify-center"
          >
            {/* Soft wave animation details inside fill container */}
            <motion.div
              animate={{ y: [0, -3, 0], rotate: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute inset-x-0 top-0 h-2 bg-blue-500/20 dark:bg-blue-400/20 rounded-full blur-[1px]"
            />
          </motion.div>

          {/* Glowing central percentage indicator overlay */}
          <div className="relative z-10 w-full text-center pb-8 flex flex-col items-center">
            <span className="text-sm font-black font-mono text-zinc-950 dark:text-white leading-none">
              {percentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Adjust Goal Slider controls */}
      <div className="flex flex-col gap-1 text-left">
        <div className="flex items-center justify-between text-[7px] font-black uppercase text-zinc-400 dark:text-zinc-500">
          <span>Set Hydration Goal</span>
          <span>{goalL}L</span>
        </div>
        <input
          type="range"
          min="1500"
          max="5000"
          step="250"
          value={goalMl}
          onChange={(e) => updateGoal(parseInt(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer h-1 rounded bg-zinc-200 dark:bg-zinc-800"
        />
      </div>

      {/* Add Fluid Buttons Incremental controls */}
      <div className="flex items-center gap-2.5">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => updateWater(waterMl + 250)}
          className="flex-1 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.08] text-[8px] font-black uppercase tracking-widest text-zinc-850 dark:text-white hover:text-blue-500 hover:border-blue-500/20 transition-all cursor-pointer shadow-sm"
        >
          +250ml Cup
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => updateWater(waterMl + 500)}
          className="flex-1 py-2 rounded-xl bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all cursor-pointer shadow-[0_0_10px_rgba(37,99,235,0.2)] hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        >
          +500ml Shaker
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => updateWater(0)}
          aria-label="Reset water logs"
          className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.08] text-zinc-400 hover:text-red-500 flex items-center justify-center cursor-pointer transition-colors"
        >
          <FiRefreshCw size={11} />
        </motion.button>
      </div>
    </ToolCard>
  );
}
