"use client";

import React from "react";
import { FiCheck, FiLock } from "react-icons/fi";

interface CalendarDayProps {
  dayNum: number;
  isActive: boolean;
  isToday: boolean;
  onClick: () => void;
}

export default function CalendarDay({ dayNum, isActive, isToday, onClick }: CalendarDayProps) {
  return (
    <button
      disabled={!isToday}
      onClick={onClick}
      title={isToday ? "Record today's attendance log" : "Locked: Biometrics history protocol active"}
      className={`aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
        isToday
          ? "cursor-pointer border-red-500/60 bg-red-500/5 hover:bg-red-600 hover:border-red-500 text-zinc-950 dark:text-white hover:text-white shadow-[0_0_10px_rgba(239,68,68,0.05)] hover:shadow-[0_0_15px_rgba(239,68,68,0.25)]"
          : "cursor-not-allowed opacity-50 border-zinc-200 dark:border-white/[0.04] text-zinc-400"
      } ${
        isActive
          ? "bg-red-600 border-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)]"
          : "bg-zinc-50 dark:bg-zinc-950/20"
      }`}
    >
      <span className="text-[9.5px] font-black font-mono leading-none">
        {dayNum}
      </span>
      {isActive ? (
        <FiCheck size={8} />
      ) : !isToday ? (
        <FiLock size={7} className="text-zinc-500/70" />
      ) : (
        <div className="w-1.5 h-1.5 rounded-full bg-red-500/30 animate-pulse" />
      )}
    </button>
  );
}
