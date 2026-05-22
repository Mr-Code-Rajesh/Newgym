"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiActivity, FiZap, FiCalendar, FiClock } from "react-icons/fi";
import MacroCard from "./MacroCard";

interface ResultsPanelProps {
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    proteinPct: number;
    carbsPct: number;
    fatPct: number;
  };
  bmi: number;
  bmiStatus: string;
  goal: "lose" | "gain" | "maintain";
  targetWeeks: number;
  isCalculating: boolean;
  hasCalculated: boolean;
}

export default function ResultsPanel({
  calories,
  macros,
  bmi,
  bmiStatus,
  goal,
  targetWeeks,
  isCalculating,
  hasCalculated,
}: ResultsPanelProps) {
  // Renders the glowing loading state
  if (isCalculating) {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center gap-4 bg-zinc-100/40 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-white/[0.04] backdrop-blur-2xl rounded-3xl p-8 text-center select-none">
        <div className="relative">
          <div className="w-14 h-14 rounded-full border border-red-500/20 border-t-red-500 animate-spin" />
          <FiActivity size={18} className="absolute inset-0 m-auto text-red-500 animate-pulse" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
            Biometric Telemetry Scan
          </span>
          <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            Compiling Mifflin-St Jeor protocols...
          </span>
        </div>
      </div>
    );
  }

  // Renders initial CTA placeholder if no calculations have run
  if (!hasCalculated) {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center gap-5 bg-zinc-100/40 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-white/[0.04] backdrop-blur-2xl rounded-3xl p-8 text-center select-none">
        <div className="w-12 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-white/[0.03] flex items-center justify-center text-zinc-400 dark:text-zinc-600">
          <FiZap size={20} />
        </div>
        <div className="flex flex-col gap-2 max-w-xs">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">
            Awaiting Input Telemetry
          </h3>
          <p className="text-[8.5px] font-medium leading-relaxed tracking-wide text-zinc-500 dark:text-zinc-400">
            Configure your height, weight, goal, and metabolic activity inputs on the left, then click calculate to compile your exact program blueprint.
          </p>
        </div>
      </div>
    );
  }

  // Define macro calories breakdown
  const proteinKcal = macros.protein * 4;
  const carbsKcal = macros.carbs * 4;
  const fatKcal = macros.fat * 9;

  // Visual formatting details based on goal
  const goalBadge = {
    lose: { text: "🔥 Shred directive active", color: "text-red-500 bg-red-500/10" },
    maintain: { text: "⚡ Homeostatic recomposition active", color: "text-amber-500 bg-amber-500/10" },
    gain: { text: "💪 Hypertrophic surplus active", color: "text-emerald-500 bg-emerald-500/10" },
  }[goal];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-zinc-100/40 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-white/[0.05] backdrop-blur-2xl rounded-3xl p-6 sm:p-8 flex flex-col gap-6 select-none relative overflow-hidden"
    >
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-red-500/5 dark:bg-red-500/5 blur-2xl pointer-events-none" />

      {/* Header and Program Directive badge */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Telemetry Output Blueprint
          </span>
          <span className={`px-2.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest ${goalBadge.color}`}>
            {goalBadge.text}
          </span>
        </div>
        
        {/* Calories highlight banner */}
        <div className="flex flex-col border-b border-zinc-200/60 dark:border-white/[0.04] pb-4">
          <span className="text-[7.5px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            Recommended Daily Caloric Target
          </span>
          <div className="flex items-baseline font-mono text-zinc-950 dark:text-white mt-1">
            <span className="text-4xl sm:text-5xl font-black tracking-tighter">
              {calories.toLocaleString()}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 ml-2">
              kcal / day
            </span>
          </div>
        </div>
      </div>

      {/* 3 Macros breakdowns cards */}
      <div className="flex flex-col gap-3">
        <span className="text-[7.5px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
          Macro Nutrients Telemetry Split
        </span>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <MacroCard
            label="Protein"
            grams={macros.protein}
            calories={proteinKcal}
            percentage={macros.proteinPct}
            colorClass="bg-red-600 shadow-red-500/10"
            shadowClass="shadow-red-500/20"
          />
          <MacroCard
            label="Carbohydrates"
            grams={macros.carbs}
            calories={carbsKcal}
            percentage={macros.carbsPct}
            colorClass="bg-amber-500 shadow-amber-500/10"
            shadowClass="shadow-amber-500/20"
          />
          <MacroCard
            label="Dietary Fats"
            grams={macros.fat}
            calories={fatKcal}
            percentage={macros.fatPct}
            colorClass="bg-rose-500 shadow-rose-500/10"
            shadowClass="shadow-rose-500/20"
          />
        </div>
      </div>

      {/* Body Mass Index (BMI) Indicator card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-200/60 dark:border-white/[0.04] pt-4.5">
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-white/[0.04] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[7.5px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              Body Mass Index
            </span>
            <span className="text-[10px] font-black uppercase text-zinc-950 dark:text-white mt-1">
              BMI Status: {bmiStatus}
            </span>
          </div>
          <span className="font-mono text-2xl font-black text-red-500">{bmi.toFixed(1)}</span>
        </div>

        {/* Phase timeline card */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-white/[0.04] flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-white/[0.03] flex items-center justify-center text-red-500">
            <FiClock size={14} className="animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-[7.5px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              Estimated Phase Timeline
            </span>
            <span className="text-[9.5px] font-black uppercase text-zinc-950 dark:text-white mt-0.5">
              {targetWeeks > 0
                ? `~${targetWeeks} Weeks to Target Weight`
                : "Continuous Recomposition"}
            </span>
          </div>
        </div>
      </div>

      {/* Clinical advice text block */}
      <div className="text-[7.5px] font-semibold tracking-wide leading-relaxed text-zinc-400 dark:text-zinc-600 uppercase">
        *Disclaimer: Calculations compile science-based algorithms. Individual biometrics, cellular respiration rates, and exact skeletal frame structures may slightly adjust macro targets. Discuss with Apex physiologists.
      </div>
    </motion.div>
  );
}
