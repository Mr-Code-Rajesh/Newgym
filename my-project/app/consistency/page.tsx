"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiCompass, FiShield, FiTrendingUp, FiLock } from "react-icons/fi";
import Link from "next/link";

// Subcomponents
import DailyTracker from "@/components/consistency-dashboard/daily-tracker/DailyTracker";
import WeeklyTrackerCard from "@/components/consistency-dashboard/weekly-progress/WeeklyTrackerCard";
import MonthlyTracker from "@/components/consistency-dashboard/monthly-progress/MonthlyTracker";
import YearlyTrackerCard from "@/components/consistency-dashboard/yearly-progress/YearlyTrackerCard";
import RewardCenterCard from "@/components/consistency-dashboard/rewards/RewardCenterCard";

export default function ConsistencyPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [connectStep, setConnectStep] = useState<string>("");

  // Telemetry core tracking variables
  const [streak, setStreak] = useState<number>(3);
  const [xp, setXp] = useState<number>(180);

  // Calendar checklists states
  const [logs, setLogs] = useState<boolean[]>([]);
  const [yearlyLogs, setYearlyLogs] = useState<boolean[]>([]);

  // Strict Today indices
  const getTodayWeekIdx = () => {
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1; // Mon=0, Sun=6
  };
  const todayWeekIdx = getTodayWeekIdx();
  const todayIdx = new Date().getDate() - 1; // 0-indexed day of month (e.g. 18th is 17)
  const todayYearIdx = new Date().getMonth(); // 0-indexed month of year (e.g. May is 4)

  // 1. Hydrate state from localStorage on mount
  useEffect(() => {
    const savedLogin = localStorage.getItem("apex_user_logged_in");
    const savedStreak = localStorage.getItem("apex_streak_days");
    const savedXp = localStorage.getItem("apex_streak_xp");
    const savedLogs = localStorage.getItem("apex_monthly_logs");
    const savedYear = localStorage.getItem("apex_yearly_logs");

    if (savedLogin === "true") setIsLoggedIn(true);
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedXp) setXp(parseInt(savedXp));

    // Initialize 30 month items
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs));
      } catch (e) {
        const init = Array(30).fill(false);
        init[0] = true;
        init[4] = true;
        setLogs(init);
      }
    } else {
      const init = Array(30).fill(false);
      init[0] = true;
      init[4] = true;
      setLogs(init);
    }

    // Initialize 12 year items
    if (savedYear) {
      try {
        setYearlyLogs(JSON.parse(savedYear));
      } catch (e) {
        const init = Array(12).fill(false);
        init[0] = true; // Jan active
        setYearlyLogs(init);
      }
    } else {
      const init = Array(12).fill(false);
      init[0] = true; // Jan active
      setYearlyLogs(init);
    }
  }, []);

  // Update operations
  const updateXp = (newVal: number) => {
    const clamped = Math.max(0, newVal);
    setXp(clamped);
    localStorage.setItem("apex_streak_xp", clamped.toString());
  };

  const updateStreak = (newStreak: number) => {
    const clamped = Math.max(0, newStreak);
    setStreak(clamped);
    localStorage.setItem("apex_streak_days", clamped.toString());
  };

  // Simulating Cinematic Authentication Gateway
  const handleInitiateUplink = () => {
    setIsConnecting(true);
    setConnectStep("ESTABLISHING BIOMETRICS LOCKS...");

    setTimeout(() => {
      setConnectStep("SYNCING ACTIVE WORKOUT CHANNELS...");
      setTimeout(() => {
        setConnectStep("SECURING XP CORE Telemetry... 100%");
        setTimeout(() => {
          setIsLoggedIn(true);
          setIsConnecting(false);
          localStorage.setItem("apex_user_logged_in", "true");
        }, 800);
      }, 800);
    }, 800);
  };

  const toggleDayLog = (idx: number) => {
    if (idx !== todayIdx) return; // Strict Lock

    const next = [...logs];
    const orig = next[idx];
    next[idx] = !orig;
    setLogs(next);
    localStorage.setItem("apex_monthly_logs", JSON.stringify(next));

    // XP and Streak math
    if (!orig) {
      updateXp(xp + 50);
      // Auto-increment streak
      if (idx > 0 && next[idx - 1]) {
        updateStreak(streak + 1);
      }
    } else {
      updateXp(xp - 50);
      updateStreak(Math.max(0, streak - 1));
    }
  };

  const toggleMonthLog = (idx: number) => {
    if (idx !== todayYearIdx) return; // Strict Lock

    const next = [...yearlyLogs];
    const orig = next[idx];
    next[idx] = !orig;
    setYearlyLogs(next);
    localStorage.setItem("apex_yearly_logs", JSON.stringify(next));

    if (!orig) {
      updateXp(xp + 150);
    } else {
      updateXp(xp - 150);
    }
  };

  // Stagger animation presets
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans pt-28 pb-16 px-6 md:px-12 flex flex-col gap-8 relative overflow-hidden select-none">
      {/* Background neon ambient spotlights */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-red-700/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Navigation breadcrumbs Action row */}
      <div className="flex justify-between items-center z-10 w-full select-none">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-400 hover:text-white text-[9.5px] font-black uppercase tracking-widest transition-colors cursor-pointer group"
        >
          <FiArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO HQ
        </Link>

        {isLoggedIn && (
          <button
            onClick={() => {
              setIsLoggedIn(false);
              localStorage.removeItem("apex_user_logged_in");
            }}
            className="text-[8.5px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            DISCONNECT TELEMETRY KEY
          </button>
        )}
      </div>

      {/* Title cinematic Header section */}
      <div className="flex flex-col gap-2 text-left z-10 w-full max-w-4xl select-none">
        <span className="text-[9px] font-black text-red-500 tracking-[0.3em] uppercase leading-none">
          Active Biometric Compliance
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wide text-white leading-none mt-1">
          CONSISTENCY DASHBOARD.
        </h1>
        <p className="text-zinc-400 dark:text-zinc-500 text-xs font-semibold leading-relaxed max-w-2xl mt-1.5">
          Establish immutable biometric logs, track check-ins across weekly sprints, monthly contribution heatmaps, and unlock yearly whey protein milestones.
        </p>
      </div>

      {/* Strict Logging Warnings banner */}
      <div className="flex items-center gap-3 p-3.5 rounded-3xl bg-red-950/20 border border-red-500/10 z-10 text-left select-none max-w-4xl">
        <FiShield size={16} className="text-red-500 shrink-0 animate-pulse" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[8px] font-black uppercase tracking-wider text-red-500">
            STRICT SECURITY PROTOCOLS ACTIVE
          </span>
          <p className="text-[9.5px] font-semibold text-zinc-400 dark:text-zinc-500">
            Only today's attendance coordinate is unlocked for edits. Past compliance history is rendered as immutable telemetry records to guarantee authentic streak tracking.
          </p>
        </div>
      </div>

      {/* Main Dynamic Workspace Area */}
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          /* LOCKED SECURITY PORTAL ACCESS GATEWAY */
          <motion.div
            key="locked-portal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col justify-center items-center text-center gap-6 py-12 z-10 select-none max-w-lg mx-auto"
          >
            {/* Pulsing Lock Ring indicator */}
            <div className="relative flex items-center justify-center w-16 h-16 rounded-3xl bg-red-500/5 border border-red-500/20 text-red-500 shadow-[0_0_25px_rgba(239,68,68,0.08)]">
              <FiLock size={22} className="animate-pulse" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[8px] font-black uppercase text-red-500 tracking-[0.3em]">
                BIOMETRICS SECURITY GATEWAY
              </span>
              <h2 className="text-xl font-black uppercase text-white tracking-wide leading-none">
                ESTABLISH CONSISTENCY UPLINK
              </h2>
              <p className="text-zinc-400 dark:text-zinc-500 text-[10.5px] font-semibold leading-relaxed">
                Connect your active gym member key passcode to unlock biometric check-in modules, streak tracking channels, and progress badges.
              </p>
            </div>

            {/* Authenticating indicators */}
            <div className="w-full max-w-[260px] mt-2">
              {isConnecting ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[8px] font-black uppercase text-red-500 tracking-widest animate-pulse mt-1">
                    {connectStep}
                  </span>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleInitiateUplink}
                  className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                >
                  INITIATE ATHLETIC UPLINK
                  <FiCompass size={11} className="animate-spin-slow" />
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : (
          /* UNLOCKED FULL WIDTH MULTI-TIERED HUD GRID */
          <motion.div
            key="unlocked-dashboard"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-12 gap-6 z-10 w-full"
          >
            {/* 1. Daily attendance tracking panel */}
            <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4 flex">
              <DailyTracker
                logs={logs}
                streak={streak}
                todayIdx={todayIdx}
                onToggleDay={toggleDayLog}
              />
            </motion.div>

            {/* 2. Weekly & Monthly velocity tracking panel */}
            <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <WeeklyTrackerCard logs={logs} xp={xp} todayIdx={todayIdx} />
              <MonthlyTracker logs={logs} />
            </motion.div>

            {/* 3. Yearly calendar compliance mapping & reward panel */}
            <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <YearlyTrackerCard
                yearlyLogs={yearlyLogs}
                todayYearIdx={todayYearIdx}
                onToggleMonth={toggleMonthLog}
              />
              <RewardCenterCard xp={xp} yearlyLogs={yearlyLogs} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
