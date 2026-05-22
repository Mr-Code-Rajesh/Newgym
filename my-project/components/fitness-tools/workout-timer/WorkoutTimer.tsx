"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiClock, FiPlay, FiPause, FiRotateCcw, FiChevronsRight } from "react-icons/fi";
import ToolCard from "../shared/ToolCard";
import SectionHeader from "../shared/SectionHeader";

type TimerMode = "hiit" | "cardio" | "custom";
type CycleType = "workout" | "rest";

export default function WorkoutTimer() {
  const [mode, setMode] = useState<TimerMode>("hiit");
  const [cycle, setCycle] = useState<CycleType>("workout");
  const [isActive, setIsActive] = useState(false);

  // Interval configurations
  const [workoutSec, setWorkoutSec] = useState(30);
  const [restSec, setRestSec] = useState(10);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [totalDuration, setTotalDuration] = useState(30);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Web Audio synthesizer buzzer beep
  const playBeep = (freq = 880) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      osc.start();
      setTimeout(() => {
        osc.stop();
        audioCtx.close();
      }, 200);
    } catch (err) {
      console.warn("Web Audio block", err);
    }
  };

  // 2. Adjust presets on mode switch
  useEffect(() => {
    setIsActive(false);
    if (mode === "hiit") {
      setWorkoutSec(30);
      setRestSec(10);
      setTimeRemaining(30);
      setTotalDuration(30);
      setCycle("workout");
    } else if (mode === "cardio") {
      setWorkoutSec(45);
      setRestSec(15);
      setTimeRemaining(45);
      setTotalDuration(45);
      setCycle("workout");
    }
  }, [mode]);

  // 3. Main timer ticking loop
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Cycle finished, trigger beep & switch
            playBeep(cycle === "workout" ? 587.33 : 880); // Alternate buzzer frequencies

            if (cycle === "workout") {
              setCycle("rest");
              setTotalDuration(restSec);
              return restSec;
            } else {
              setCycle("workout");
              setTotalDuration(workoutSec);
              return workoutSec;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, cycle, workoutSec, restSec]);

  const handleCustomSubmit = () => {
    setIsActive(false);
    setCycle("workout");
    setTimeRemaining(workoutSec);
    setTotalDuration(workoutSec);
  };

  // SVGs circular metrics
  const radius = 56;
  const stroke = 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (timeRemaining / totalDuration) * circumference;

  return (
    <ToolCard className="col-span-12 md:col-span-6 lg:col-span-4 min-h-[420px] flex flex-col justify-between">
      {/* Widget Header */}
      <SectionHeader title="HIIT Workstation" label="Interval Engine" icon={FiClock} />

      {/* Modes Segment Toggle */}
      <div className="flex bg-zinc-100 dark:bg-zinc-950 p-1 rounded-2xl border border-zinc-200/50 dark:border-white/[0.04] mt-2">
        {(["hiit", "cardio", "custom"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-1.5 rounded-xl text-[8.5px] font-black uppercase tracking-widest transition-all cursor-pointer ${
              mode === m
                ? "bg-red-600 text-white shadow-md shadow-red-600/10"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Main Countdown Visualizer */}
      <div className="flex items-center justify-center my-4 relative">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="rgba(239, 68, 68, 0.04)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke={cycle === "workout" ? "#ef4444" : "#10b981"}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transition={{ duration: 0.35 }}
          />
        </svg>

        {/* Floating details inside circular SVG */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-[7.5px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 leading-none">
            {cycle}
          </span>
          <span className="text-2xl font-black font-mono text-zinc-950 dark:text-white mt-1 leading-none">
            {timeRemaining}
          </span>
          <span className="text-[7px] font-bold text-zinc-400 leading-none mt-0.5">
            / {totalDuration}s
          </span>
        </div>
      </div>

      {/* Custom sliders (Only if custom mode is selected) */}
      {mode === "custom" && (
        <div className="flex flex-col gap-2.5 bg-zinc-50 dark:bg-black/40 border border-zinc-200/50 dark:border-white/[0.04] p-3 rounded-2xl">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[7.5px] font-black uppercase text-zinc-400 dark:text-zinc-500">
              <span>Workout Active</span>
              <span className="text-zinc-950 dark:text-white">{workoutSec}s</span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={workoutSec}
              onChange={(e) => setWorkoutSec(parseInt(e.target.value))}
              className="w-full accent-red-600 cursor-pointer h-1 rounded bg-zinc-200 dark:bg-zinc-800"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[7.5px] font-black uppercase text-zinc-400 dark:text-zinc-500">
              <span>Rest Duration</span>
              <span className="text-zinc-950 dark:text-white">{restSec}s</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={restSec}
              onChange={(e) => setRestSec(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1 rounded bg-zinc-200 dark:bg-zinc-800"
            />
          </div>

          <button
            onClick={handleCustomSubmit}
            className="w-full py-1.5 rounded-xl bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-850 text-[8px] font-black uppercase tracking-widest text-zinc-800 dark:text-white transition-colors cursor-pointer border border-zinc-300 dark:border-white/[0.04]"
          >
            Apply Intervals
          </button>
        </div>
      )}

      {/* Control Triggers Buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => {
            playBeep(880);
            setIsActive(!isActive);
          }}
          className={`flex items-center justify-center w-10 h-10 rounded-full text-white cursor-pointer shadow-md transition-all duration-300 hover:scale-105 ${
            isActive
              ? "bg-amber-600 shadow-amber-600/20 hover:bg-amber-700"
              : "bg-red-600 shadow-red-600/20 hover:bg-red-700"
          }`}
        >
          {isActive ? <FiPause size={14} /> : <FiPlay size={14} />}
        </button>

        <button
          onClick={() => {
            setIsActive(false);
            setTimeRemaining(workoutSec);
            setCycle("workout");
            setTotalDuration(workoutSec);
            playBeep(440);
          }}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.08] text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
        >
          <FiRotateCcw size={12} />
        </button>
      </div>
    </ToolCard>
  );
}
