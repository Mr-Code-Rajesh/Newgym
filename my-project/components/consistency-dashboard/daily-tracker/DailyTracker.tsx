"use client";

import React from "react";
import { FiTrendingUp, FiShield } from "react-icons/fi";
import DashboardCard from "../shared/DashboardCard";
import SectionHeader from "../shared/SectionHeader";
import StreakCounter from "./StreakCounter";
import AttendanceCalendar from "./AttendanceCalendar";

interface DailyTrackerProps {
  logs: boolean[];
  streak: number;
  todayIdx: number;
  onToggleDay: (idx: number) => void;
}

export default function DailyTracker({ logs, streak, todayIdx, onToggleDay }: DailyTrackerProps) {
  return (
    <DashboardCard className="col-span-12 lg:col-span-4 min-h-[460px] flex flex-col justify-between">
      {/* Header */}
      <SectionHeader title="Attendance Logs" label="Daily telemetry locks" icon={FiTrendingUp} />

      {/* Streak indicators */}
      <div className="my-3">
        <StreakCounter streak={streak} />
      </div>

      {/* Strict Logging Alerts */}
      <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-zinc-50 dark:bg-black/35 border border-zinc-200/50 dark:border-white/[0.04] mb-3 text-left">
        <FiShield size={12} className="text-red-500 shrink-0" />
        <span className="text-[7.5px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-505 leading-tight">
          Strict Daily Locks Active: Only today's attendance slot is unlocked. Past logs are locked as immutable records.
        </span>
      </div>

      {/* 30-Day Attendance Grid */}
      <div className="flex-1 flex flex-col justify-center">
        <AttendanceCalendar logs={logs} todayIdx={todayIdx} onToggleDay={onToggleDay} />
      </div>
    </DashboardCard>
  );
}
