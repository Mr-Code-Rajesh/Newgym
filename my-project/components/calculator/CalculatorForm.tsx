"use client";

import React, { useState } from "react";
import GenderSelector from "./GenderSelector";
import GoalSelector from "./GoalSelector";
import CalculatorSlider from "./CalculatorSlider";
import ActivitySelector, { ActivityLevel } from "./ActivitySelector";
import { motion } from "framer-motion";

export interface CalculationResults {
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
}

interface CalculatorFormProps {
  onStartCalculating: () => void;
  onComplete: (results: CalculationResults) => void;
  isCalculating: boolean;
}

export default function CalculatorForm({
  onStartCalculating,
  onComplete,
  isCalculating,
}: CalculatorFormProps) {
  // Input parameters state variables
  const [gender, setGender] = useState<"male" | "female">("male");
  const [goal, setGoal] = useState<"lose" | "gain" | "maintain">("lose");
  const [age, setAge] = useState<number>(28);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(175);
  const [targetWeight, setTargetWeight] = useState<number>(70);
  const [activity, setActivity] = useState<ActivityLevel["id"]>("moderate");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCalculating) return;

    onStartCalculating();

    // Premium telemetry compile duration (1 sec)
    setTimeout(() => {
      // 1. Basal Metabolic Rate via Mifflin-St Jeor Formula
      let bmr = 0;
      if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      // 2. Activity Multipliers
      const multMap = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        very: 1.725,
        extreme: 1.9,
      };

      const tdee = bmr * multMap[activity];

      // 3. Target Calorie adjustments based on Directive Goals
      let finalCalories = tdee;
      if (goal === "lose") {
        finalCalories = tdee - 500;
      } else if (goal === "gain") {
        finalCalories = tdee + 500;
      }

      // Lower metabolic security bound: 1200 kcal
      finalCalories = Math.max(1200, Math.round(finalCalories));

      // 4. Macro Splits Allocation
      let proteinPct = 30;
      let carbsPct = 40;
      let fatPct = 30;

      if (goal === "lose") {
        proteinPct = 40;
        carbsPct = 30;
        fatPct = 30;
      } else if (goal === "gain") {
        proteinPct = 30;
        carbsPct = 50;
        fatPct = 20;
      }

      const proteinGrams = Math.round((finalCalories * (proteinPct / 100)) / 4);
      const carbsGrams = Math.round((finalCalories * (carbsPct / 100)) / 4);
      const fatGrams = Math.round((finalCalories * (fatPct / 100)) / 9);

      // 5. Body Mass Index Score
      const hM = height / 100;
      const bmiScore = weight / (hM * hM);

      let bmiStatusStr = "Normal Weight";
      if (bmiScore < 18.5) {
        bmiStatusStr = "Underweight";
      } else if (bmiScore >= 25 && bmiScore < 29.9) {
        bmiStatusStr = "Overweight";
      } else if (bmiScore >= 30) {
        bmiStatusStr = "Obese";
      }

      // 6. Safe Timeline Estimates (0.5kg/wk lose, 0.25kg/wk gain)
      let weeks = 0;
      if (goal === "lose" && weight > targetWeight) {
        weeks = Math.ceil((weight - targetWeight) / 0.5);
      } else if (goal === "gain" && targetWeight > weight) {
        weeks = Math.ceil((targetWeight - weight) / 0.25);
      }

      onComplete({
        calories: finalCalories,
        macros: {
          protein: proteinGrams,
          carbs: carbsGrams,
          fat: fatGrams,
          proteinPct,
          carbsPct,
          fatPct,
        },
        bmi: bmiScore,
        bmiStatus: bmiStatusStr,
        goal,
        targetWeeks: weeks,
      });
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-950/40 border border-zinc-200 dark:border-white/[0.05] backdrop-blur-xl flex flex-col gap-6 shadow-xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <GenderSelector gender={gender} setGender={setGender} />
        <ActivitySelector activity={activity} setActivity={setActivity} />
      </div>

      <GoalSelector goal={goal} setGoal={setGoal} />

      {/* Grid containing the 4 Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-zinc-200/60 dark:border-white/[0.04] pt-5.5">
        <CalculatorSlider
          label="Biological Age"
          min={15}
          max={75}
          value={age}
          onChange={setAge}
          unit="years"
        />
        <CalculatorSlider
          label="Height Scale"
          min={140}
          max={220}
          value={height}
          onChange={setHeight}
          unit="cm"
        />
        <CalculatorSlider
          label="Current Weight"
          min={40}
          max={200}
          value={weight}
          onChange={setWeight}
          unit="kg"
        />
        <CalculatorSlider
          label="Target Body Weight"
          min={40}
          max={200}
          value={targetWeight}
          onChange={setTargetWeight}
          unit="kg"
        />
      </div>

      {/* Form Trigger CTA Button */}
      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        disabled={isCalculating}
        type="submit"
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-700 to-red-600 text-[10.5px] font-black uppercase tracking-[0.2em] text-white border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 outline-none cursor-pointer flex items-center justify-center gap-1.5"
      >
        {isCalculating ? "COMPILING BIOMETRICS..." : "CALCULATE NOW →"}
      </motion.button>
    </form>
  );
}
