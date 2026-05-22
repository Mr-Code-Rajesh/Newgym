"use client";

import React from "react";
import CalendarDay from "./CalendarDay";

interface AttendanceCalendarProps {
  logs: boolean[];
  todayIdx: number;
  onToggleDay: (idx: number) => void;
}

export default function AttendanceCalendar({ logs, todayIdx, onToggleDay }: AttendanceCalendarProps) {
  return (
    <div className="flex flex-col gap-2.5 text-left w-full">
      <div className="flex justify-between items-center text-[7.5px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-505 mb-0.5">
        <span>30-Day Attendance Grid</span>
        <span className="text-red-500 font-mono font-black">
          {logs.filter(Boolean).length} / 30 LOGGED IN
        </span>
      </div>

      <div className="grid grid-cols-6 gap-2 w-full">
        {logs.map((active, idx) => {
          const isToday = idx === todayIdx;
          return (
            <CalendarDay
              key={idx}
              dayNum={idx + 1}
              isActive={active}
              isToday={isToday}
              onClick={() => onToggleDay(idx)}
            />
          );
        })}
      </div>
    </div>
  );
}
