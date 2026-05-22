"use client";

import React from "react";
import { FiCheck } from "react-icons/fi";

interface WeeklyTrackerProps {
  logs: boolean[];
  todayIdx: number;
}

export default function WeeklyTracker({ logs, todayIdx }: WeeklyTrackerProps) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Map today's week index: e.g. 18th falls into some week offset
  // We can just grab the last 7 days of logs to represent the active week!
  const weeklyLogs = logs.slice(Math.max(0, todayIdx - 6), todayIdx + 1);
  // Pad if array is less than 7 items
  while (weeklyLogs.length < 7) {
    weeklyLogs.unshift(false);
  }

  return (
    <div className="flex flex-col gap-2.5 text-left w-full">
      <span className="text-[7.5px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-505">
        Weekly Session Grid
      </span>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day, idx) => {
          const active = weeklyLogs[idx];
          return (
            <div
              key={idx}
              className={`py-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 select-none transition-all ${
                active
                  ? "bg-red-500/10 border-red-500/30 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.08)]"
                  : "bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200 dark:border-white/[0.04] text-zinc-400"
              }`}
            >
              <span className="text-[7px] font-black uppercase leading-none">{day}</span>
              {active ? (
                <FiCheck size={8} />
              ) : (
                <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-800" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
