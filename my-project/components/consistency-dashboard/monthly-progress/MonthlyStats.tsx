"use client";

import React from "react";
import { FiTarget, FiActivity, FiTrendingUp } from "react-icons/fi";

interface MonthlyStatsProps {
  logs: boolean[];
}

export default function MonthlyStats({ logs }: MonthlyStatsProps) {
  const activeCount = logs.filter(Boolean).length;
  const totalDays = logs.length || 30;
  const consistencyScore = Math.round((activeCount / totalDays) * 100);

  const stats = [
    {
      label: "Consistency Score",
      value: `${consistencyScore}%`,
      desc: "Attendance weight rating",
      icon: FiTrendingUp
    },
    {
      label: "Active Days",
      value: `${activeCount} / ${totalDays}`,
      desc: "Recorded check-ins count",
      icon: FiActivity
    }
  ];

  return (
    <div className="flex flex-col gap-2.5 text-left w-full">
      <span className="text-[7.5px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-505">
        Attendance Ratios
      </span>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-white/[0.04] flex items-center gap-3 select-none"
            >
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                <Icon size={13} />
              </div>
              <div className="flex flex-col">
                <span className="text-[7.5px] font-black uppercase text-zinc-400 dark:text-zinc-500 leading-none">
                  {stat.label}
                </span>
                <span className="text-sm font-black text-zinc-950 dark:text-white leading-none mt-1">
                  {stat.value}
                </span>
                <span className="text-[6.5px] font-bold text-zinc-400 mt-0.5 leading-none">
                  {stat.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
