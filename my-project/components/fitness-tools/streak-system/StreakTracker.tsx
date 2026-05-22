"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiAward, FiStar, FiZap, FiCheck, FiLock, FiChevronRight, FiCheckSquare, FiShield } from "react-icons/fi";
import ToolCard from "../shared/ToolCard";
import SectionHeader from "../shared/SectionHeader";

type PeriodType = "week" | "month" | "year";

export default function StreakTracker() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [connectStep, setConnectStep] = useState<string>("");

  const [activePeriod, setActivePeriod] = useState<PeriodType>("week");

  // Telemetry core tracking variables
  const [streak, setStreak] = useState<number>(3);
  const [xp, setXp] = useState<number>(180);

  // Calendar checklists states
  const [weekLogs, setWeekLogs] = useState<boolean[]>([true, true, false, false, false, false, false]);
  const [monthLogs, setMonthLogs] = useState<boolean[]>([]);
  const [yearLogs, setYearLogs] = useState<boolean[]>([]);

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // 1. Compute strict indices for Today's Date
  const getTodayWeekIdx = () => {
    const day = new Date().getDay(); // 0 is Sunday, 1 is Monday...
    return day === 0 ? 6 : day - 1; // Monday = 0, Sunday = 6
  };
  const todayWeekIdx = getTodayWeekIdx();
  const todayMonthIdx = new Date().getDate() - 1; // 0-indexed day of month (e.g. 18th is 17)
  const todayYearIdx = new Date().getMonth(); // 0-indexed month of year (e.g. May is 4)

  // 2. Hydrate state from localStorage on mount
  useEffect(() => {
    const savedLogin = localStorage.getItem("apex_user_logged_in");
    const savedStreak = localStorage.getItem("apex_streak_days");
    const savedXp = localStorage.getItem("apex_streak_xp");
    const savedWeek = localStorage.getItem("apex_weekly_logs");
    const savedMonth = localStorage.getItem("apex_monthly_logs");
    const savedYear = localStorage.getItem("apex_yearly_logs");

    if (savedLogin === "true") setIsLoggedIn(true);
    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedXp) setXp(parseInt(savedXp));

    if (savedWeek) {
      try {
        setWeekLogs(JSON.parse(savedWeek));
      } catch (e) {
        console.warn(e);
      }
    }

    // Initialize 30 month items
    if (savedMonth) {
      try {
        setMonthLogs(JSON.parse(savedMonth));
      } catch (e) {
        const init = Array(30).fill(false);
        init[0] = true;
        init[4] = true;
        setMonthLogs(init);
      }
    } else {
      const init = Array(30).fill(false);
      init[0] = true;
      init[4] = true;
      setMonthLogs(init);
    }

    // Initialize 12 year items
    if (savedYear) {
      try {
        setYearLogs(JSON.parse(savedYear));
      } catch (e) {
        const init = Array(12).fill(false);
        init[0] = true; // Jan active
        setYearLogs(init);
      }
    } else {
      const init = Array(12).fill(false);
      init[0] = true; // Jan active
      setYearLogs(init);
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

  // Toggle checks with XP actions (STRICTLY ONLY ALLOWED IF IDX === TODAY_IDX)
  const toggleWeekDay = (idx: number) => {
    if (idx !== todayWeekIdx) return; // Strict Lock

    const next = [...weekLogs];
    const orig = next[idx];
    next[idx] = !orig;
    setWeekLogs(next);
    localStorage.setItem("apex_weekly_logs", JSON.stringify(next));

    if (!orig) {
      updateXp(xp + 50);
      if (idx > 0 && next[idx - 1]) updateStreak(streak + 1);
    } else {
      updateXp(xp - 50);
      updateStreak(Math.max(0, streak - 1));
    }
  };

  const toggleMonthDay = (idx: number) => {
    if (idx !== todayMonthIdx) return; // Strict Lock

    const next = [...monthLogs];
    const orig = next[idx];
    next[idx] = !orig;
    setMonthLogs(next);
    localStorage.setItem("apex_monthly_logs", JSON.stringify(next));

    if (!orig) {
      updateXp(xp + 30);
    } else {
      updateXp(xp - 30);
    }
  };

  const toggleYearMonth = (idx: number) => {
    if (idx !== todayYearIdx) return; // Strict Lock

    const next = [...yearLogs];
    const orig = next[idx];
    next[idx] = !orig;
    setYearLogs(next);
    localStorage.setItem("apex_yearly_logs", JSON.stringify(next));

    if (!orig) {
      updateXp(xp + 150);
    } else {
      updateXp(xp - 150);
    }
  };

  // Levels indicators
  const xpPerLevel = 500;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const currentLevelXp = xp % xpPerLevel;
  const xpPercentage = Math.round((currentLevelXp / xpPerLevel) * 100);

  const activeMonthCount = monthLogs.filter(Boolean).length;
  const activeYearCount = yearLogs.filter(Boolean).length;

  const badgesList = [
    { name: "Hydra Hero", desc: "Require level 2+", unlocked: level >= 2 },
    { name: "XP Vanguard", desc: "Require XP >= 600", unlocked: xp >= 600 },
    { name: "Active Sentinel", desc: "Streak >= 5 Days", unlocked: streak >= 5 },
  ];

  return (
    <ToolCard className="col-span-12 md:col-span-6 lg:col-span-4 min-h-[520px] flex flex-col justify-between relative overflow-hidden">
      {/* Header */}
      <SectionHeader title="Streak Sentinel" label="Immutable Registry" icon={FiStar} />

      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          /* LOCKED LOGIN GATEWAY INTERFACE */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex-1 flex flex-col justify-center items-center text-center gap-5 py-4 z-10 select-none"
          >
            {/* Warning visual lock */}
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
              <FiLock size={20} className="animate-pulse" />
              <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-600 animate-ping" />
            </div>

            <div className="flex flex-col gap-1.5 max-w-xs">
              <span className="text-[7.5px] font-black uppercase text-red-500 tracking-[0.25em]">
                BIOMETRICS SECURITY GATE
              </span>
              <h4 className="text-xs font-black uppercase text-zinc-950 dark:text-white tracking-wide">
                AUTHENTICATE TO RECORD PROGRESS
              </h4>
              <p className="text-[9.5px] font-semibold text-zinc-400 dark:text-zinc-500 leading-relaxed">
                Connect your secure athletic profile lock key to track consecutive weekly, monthly checkoffs, and annual fitness badges.
              </p>
            </div>

            {/* Simulated Authenticating HUD loaders */}
            <div className="w-full max-w-[220px]">
              {isConnecting ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[7.5px] font-black uppercase text-red-500 tracking-widest leading-none mt-1 animate-pulse">
                    {connectStep}
                  </span>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleInitiateUplink}
                  className="w-full py-2.5 rounded-xl bg-red-600 text-white text-[8px] font-black uppercase tracking-widest hover:bg-red-700 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                >
                  INITIATE ATHLETIC UPLINK
                  <FiChevronRight size={10} />
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : (
          /* UNLOCKED FULL CALENDAR WORKSPACE */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col justify-between gap-4 mt-2"
          >
            {/* Header Telemetry Status Row */}
            <div className="flex items-center justify-between text-left">
              <div className="flex flex-col">
                <span className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 leading-none">
                  CONSECUTIVE RUN
                </span>
                <span className="text-2xl font-black font-mono text-zinc-950 dark:text-white mt-1 leading-none">
                  {streak} <span className="text-[9px] font-bold text-zinc-400">Days</span>
                </span>
              </div>

              {/* Level indicator */}
              <div className="px-2.5 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.04] text-center flex flex-col justify-center select-none">
                <span className="text-[5.5px] font-black text-red-500 tracking-wider">LEVEL</span>
                <span className="text-xs font-black text-zinc-950 dark:text-white leading-none mt-0.5">
                  {level}
                </span>
              </div>
            </div>

            {/* Level XP Progress Slider */}
            <div className="flex flex-col gap-1 w-full text-left">
              <div className="flex items-center justify-between text-[6.5px] font-black uppercase text-zinc-400 dark:text-zinc-500 leading-none">
                <span>XP progression</span>
                <span>
                  {currentLevelXp} / {xpPerLevel} XP
                </span>
              </div>
              <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/[0.04] rounded-full overflow-hidden relative mt-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercentage}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full"
                />
              </div>
            </div>

            {/* Strict Logging Security Protocol Alert */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 dark:bg-black/30 border border-zinc-200/40 dark:border-white/[0.03] select-none text-left">
              <FiShield size={11} className="text-red-500" />
              <span className="text-[7.5px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 leading-tight">
                STRICT LOCK ACTIVE: ONLY TODAY'S COORDINATES UNLOCKED FOR INPUTS.
              </span>
            </div>

            {/* Tabs selector: WEEK / MONTH / YEAR */}
            <div className="flex bg-zinc-100 dark:bg-zinc-950 p-0.5 rounded-xl border border-zinc-200/50 dark:border-white/[0.04]">
              {(["week", "month", "year"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setActivePeriod(period)}
                  className={`flex-1 py-1 rounded-lg text-[7.5px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                    activePeriod === period
                      ? "bg-red-600 text-white shadow-sm"
                      : "text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* Tab Panels with AnimatePresence */}
            <div className="flex-1 flex flex-col justify-center min-h-[140px]">
              <AnimatePresence mode="wait">
                {activePeriod === "week" && (
                  /* WEEK LOGS ACCORDIONS PANEL */
                  <motion.div
                    key="week"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col gap-2 text-left"
                  >
                    <span className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                      WEEKLY WORKOUT REGISTRY
                    </span>
                    <div className="grid grid-cols-7 gap-1.5">
                      {daysOfWeek.map((day, idx) => {
                        const isToday = idx === todayWeekIdx;
                        return (
                          <button
                            key={idx}
                            disabled={!isToday}
                            onClick={() => toggleWeekDay(idx)}
                            title={isToday ? "Record today's progress" : "Locked: Strict daily progress"}
                            className={`aspect-square rounded-lg border flex flex-col items-center justify-center gap-1 transition-all ${
                              isToday 
                                ? "cursor-pointer border-red-500/65 bg-red-500/5 hover:bg-red-600 hover:text-white" 
                                : "cursor-not-allowed opacity-50 border-zinc-200 dark:border-white/[0.04]"
                            } ${
                              weekLogs[idx]
                                ? "bg-red-600 border-red-500 text-white shadow"
                                : "bg-zinc-50 dark:bg-zinc-950/40 text-zinc-400"
                            }`}
                          >
                            <span className="text-[7.5px] font-black leading-none">{day}</span>
                            {weekLogs[idx] ? (
                              <FiCheck size={8} />
                            ) : (
                              <div className="w-1 h-1 rounded-full bg-zinc-350 dark:bg-zinc-800" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activePeriod === "month" && (
                  /* MONTH LOGS CONTRIBUTION GRID */
                  <motion.div
                    key="month"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col gap-2 text-left"
                  >
                    <div className="flex justify-between items-center text-[7px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                      <span>30-DAY METABOLIC FREQUENCY</span>
                      <span className="text-red-500 font-mono font-black">{activeMonthCount} / 30 Active</span>
                    </div>

                    <div className="grid grid-cols-6 gap-1 w-full">
                      {monthLogs.map((active, idx) => {
                        const isToday = idx === todayMonthIdx;
                        return (
                          <button
                            key={idx}
                            disabled={!isToday}
                            onClick={() => toggleMonthDay(idx)}
                            title={isToday ? "Record today's progress" : "Locked: Strict daily progress"}
                            className={`h-6 rounded-md border flex items-center justify-center transition-all ${
                              isToday 
                                ? "cursor-pointer border-red-500/65 bg-red-500/5 hover:bg-red-600 hover:text-white" 
                                : "cursor-not-allowed opacity-45 border-zinc-200 dark:border-white/[0.04]"
                            } ${
                              active
                                ? "bg-red-600 border-red-500 text-white shadow"
                                : "bg-zinc-50 dark:bg-zinc-950/40"
                            }`}
                          >
                            <span className="text-[7px] font-black font-mono leading-none">
                              {idx + 1}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activePeriod === "year" && (
                  /* ANNUAL SEASONS 12-MONTH BLOCKS */
                  <motion.div
                    key="year"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col gap-2 text-left"
                  >
                    <div className="flex justify-between items-center text-[7px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                      <span>12-MONTH CONDITIONAL MAPS</span>
                      <span className="text-red-500 font-mono font-black">{activeYearCount} / 12 Months</span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5">
                      {monthsOfYear.map((m, idx) => {
                        const isToday = idx === todayYearIdx;
                        return (
                          <button
                            key={idx}
                            disabled={!isToday}
                            onClick={() => toggleYearMonth(idx)}
                            title={isToday ? "Record current month" : "Locked: Strict daily progress"}
                            className={`py-1.5 rounded-lg border flex flex-col items-center justify-center transition-all ${
                              isToday 
                                ? "cursor-pointer border-red-500/65 bg-red-500/5 hover:bg-red-600 hover:text-white" 
                                : "cursor-not-allowed opacity-45 border-zinc-200 dark:border-white/[0.04]"
                            } ${
                              yearLogs[idx]
                                ? "bg-red-600 border-red-500 text-white shadow"
                                : "bg-zinc-50 dark:bg-zinc-950/40"
                            }`}
                          >
                            <span className="text-[8px] font-black uppercase tracking-wider leading-none">
                              {m}
                            </span>
                            {yearLogs[idx] && <FiCheckSquare size={7} className="mt-1" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Locked Achievements Badges footer display */}
            <div className="flex flex-col gap-2 border-t border-zinc-200/50 dark:border-white/[0.04] pt-3.5 mt-1">
              <span className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 text-left">
                LOCKED SPECIALTIES
              </span>
              <div className="grid grid-cols-3 gap-2">
                {badgesList.map((badge, idx) => (
                  <div
                    key={idx}
                    className={`p-1.5 rounded-lg border flex flex-col items-center text-center gap-0.5 transition-all select-none ${
                      badge.unlocked
                        ? "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400 shadow-sm"
                        : "bg-zinc-50/50 dark:bg-zinc-950/20 border-zinc-200/40 dark:border-white/[0.02] text-zinc-300 dark:text-zinc-700"
                    }`}
                  >
                    <div className={badge.unlocked ? "text-amber-500 animate-pulse" : "text-zinc-350 dark:text-zinc-800"}>
                      <FiAward size={11} />
                    </div>
                    <span className="text-[7.5px] font-black uppercase leading-tight truncate w-full">
                      {badge.name}
                    </span>
                    <span className="text-[6px] font-semibold text-zinc-450 dark:text-zinc-500 truncate w-full mt-0.5">
                      {badge.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logout button connection trigger */}
            <div className="w-full text-right mt-1.5">
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.removeItem("apex_user_logged_in");
                }}
                className="text-[7.5px] font-black uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                DISCONNECT PROFILE KEY
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToolCard>
  );
}
