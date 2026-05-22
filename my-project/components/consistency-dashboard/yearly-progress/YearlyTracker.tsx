"use client";

import React from "react";
import { FiCheckSquare, FiLock } from "react-icons/fi";

interface YearlyTrackerProps {
  yearlyLogs: boolean[];
  todayYearIdx: number;
  onToggleMonth: (idx: number) => void;
}

export default function YearlyTracker({ yearlyLogs, todayYearIdx, onToggleMonth }: YearlyTrackerProps) {
  const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="flex flex-col gap-2.5 text-left w-full select-none">
      <div className="flex justify-between items-center text-[7.5px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-550 mb-0.5">
        <span>12-Month Compliance Map</span>
        <span className="text-red-500 font-mono font-black">
          {yearlyLogs.filter(Boolean).length} / 12 Months
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {monthsOfYear.map((m, idx) => {
          const isToday = idx === todayYearIdx;
          const active = yearlyLogs[idx];
          return (
            <button
              key={idx}
              disabled={!isToday}
              onClick={() => onToggleMonth(idx)}
              title={isToday ? "Toggle current month record" : "Locked: Strict monthly lock protocol active"}
              className={`py-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                isToday
                  ? "cursor-pointer border-red-500/50 bg-red-500/5 hover:bg-red-650 hover:text-white"
                  : "cursor-not-allowed opacity-50 border-zinc-200 dark:border-white/[0.04] text-zinc-450"
              } ${
                active
                  ? "bg-red-600 border-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.25)]"
                  : "bg-zinc-50 dark:bg-zinc-950/20"
              }`}
            >
              <span className="text-[8px] font-black uppercase tracking-wider leading-none">
                {m}
              </span>
              {active ? (
                <FiCheckSquare size={8} className="mt-1" />
              ) : !isToday ? (
                <FiLock size={6.5} className="mt-1 text-zinc-550" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/30 animate-pulse mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
