"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CalculatorForm, { CalculationResults } from "./CalculatorForm";
import ResultsPanel from "./ResultsPanel";

export default function FitnessCalculator() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [results, setResults] = useState<CalculationResults>({
    calories: 2200,
    macros: {
      protein: 165,
      carbs: 220,
      fat: 73,
      proteinPct: 30,
      carbsPct: 40,
      fatPct: 30,
    },
    bmi: 24.5,
    bmiStatus: "Normal Weight",
    goal: "lose",
    targetWeeks: 10,
  });

  const handleStartCalculating = () => {
    setIsCalculating(true);
  };

  const handleCalculationComplete = (output: CalculationResults) => {
    setResults(output);
    setIsCalculating(false);
    setHasCalculated(true);
  };

  return (
    <section
      id="calculator"
      className="relative z-10 w-full bg-zinc-50 dark:bg-black text-zinc-950 dark:text-white py-20 md:py-28 border-t border-zinc-200 dark:border-white/[0.04] flex flex-col gap-12 sm:gap-16 scroll-mt-24 overflow-hidden select-none transition-colors duration-500"
    >
      {/* 1. Subtle, uppercase premium accent labels & glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-red-900/5 dark:bg-red-900/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-red-900/5 dark:bg-red-900/5 blur-[120px] pointer-events-none" />
      </div>

      {/* Header Block */}
      <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-600 dark:text-red-500">
            Free Tool
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-950 dark:text-white leading-[1.1]"
        >
          FITNESS CALCULATOR
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm font-medium leading-relaxed tracking-wide text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto"
        >
          Know your numbers. Uses the Mifflin-St Jeor formula to calculate your exact caloric needs and macro targets.
        </motion.p>
      </div>

      {/* Inputs Form and Results Dashboard columns grid */}
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        <div className="lg:col-span-7 flex flex-col justify-start">
          <CalculatorForm
            onStartCalculating={handleStartCalculating}
            onComplete={handleCalculationComplete}
            isCalculating={isCalculating}
          />
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <ResultsPanel
            calories={results.calories}
            macros={results.macros}
            bmi={results.bmi}
            bmiStatus={results.bmiStatus}
            goal={results.goal}
            targetWeeks={results.targetWeeks}
            isCalculating={isCalculating}
            hasCalculated={hasCalculated}
          />
        </div>
      </div>
    </section>
  );
}
