"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiChevronLeft, FiSettings } from "react-icons/fi";
import WorkoutTimer from "@/components/fitness-tools/workout-timer/WorkoutTimer";
import StepCounter from "@/components/fitness-tools/step-counter/StepCounter";
import WaterTracker from "@/components/fitness-tools/water-tracker/WaterTracker";
import StreakTracker from "@/components/fitness-tools/streak-system/StreakTracker";
import CalorieBurn from "@/components/fitness-tools/calorie-burn/CalorieBurn";

export default function GymToolPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-black text-zinc-950 dark:text-white transition-colors duration-500 font-sans select-none overflow-x-hidden flex flex-col justify-between">
      
      {/* 1. Cinematic Ambient Spotlight Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-[-15%] w-[60vw] aspect-square rounded-full bg-red-600/5 blur-[120px] dark:bg-red-950/10 dark:blur-[180px]" />
        <div className="absolute bottom-[20%] right-[-15%] w-[60vw] aspect-square rounded-full bg-red-600/5 blur-[120px] dark:bg-red-950/10 dark:blur-[180px]" />
      </div>

      {/* 2. Floating Technical Grid Border Overlays */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15 dark:opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex-1 flex flex-col gap-10">
        
        {/* Navigation / Header Actions Controls */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.04] pb-5">
          {/* Back button */}
          <motion.button
            whileHover={{ scale: 1.03, x: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/")}
            className="py-2 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.04] text-[9px] font-black uppercase tracking-widest text-zinc-800 dark:text-zinc-300 hover:text-red-500 flex items-center gap-2 cursor-pointer shadow-sm transition-colors duration-300"
          >
            <FiChevronLeft size={12} />
            RETURN TO HOME
          </motion.button>

          {/* Logo Brand watermark */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-6 h-6 rounded bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
              <span className="text-white font-black text-xs">A</span>
            </div>
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-zinc-950 dark:text-white">
              APEX <span className="text-red-500">WORKSTATION</span>
            </span>
          </div>
        </div>

        {/* Dashboard Title Block */}
        <div className="flex flex-col gap-3 text-left max-w-2xl mt-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
            <span className="text-[9px] font-black tracking-[0.4em] uppercase text-red-600 dark:text-red-500">
              Biometrics Telemetry Systems
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-950 dark:text-white leading-none">
            FITNESS UTILITIES{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500 dark:from-red-500 dark:via-red-400 dark:to-orange-400 drop-shadow-[0_2px_10px_rgba(239,68,68,0.15)]">
              DASHBOARD.
            </span>
          </h1>

          <p className="text-[11px] sm:text-xs font-medium leading-relaxed tracking-wide text-zinc-500 dark:text-zinc-400">
            Welcome to the ultimate biometric controls. Log calorie logs, track step counts, load hydration cells, check active streak XP, and set interval counts directly on your local system database.
          </p>
        </div>

        {/* 12-Column High-Performance Grid layout */}
        <div className="grid grid-cols-12 gap-6 items-stretch mt-2 flex-1">
          {/* Row 1 widgets */}
          <WorkoutTimer />
          <StepCounter />
          <WaterTracker />

          {/* Row 2 widgets */}
          <StreakTracker />
          <CalorieBurn />
        </div>

      </div>

      {/* Watermark telemetry footer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-t border-zinc-200 dark:border-white/[0.04] text-[8px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 select-none mt-10">
        <span>APEX CORE WORKSPACE V4.2.1-SECURE</span>
        <span>SYS TELEMETRY LOCKS ACTIVE</span>
      </div>

    </div>
  );
}
