"use client";

import React from "react";
import { FiCheckSquare } from "react-icons/fi";

interface AnnualGoalsProps {
  yearlyLogs: boolean[];
}

export default function AnnualGoals({ yearlyLogs }: AnnualGoalsProps) {
  const activeMonths = yearlyLogs.filter(Boolean).length;

  const annualMilestones = [
    {
      title: "Active Quarter Baseline",
      desc: "Complete 3 active workout months",
      target: 3,
      current: Math.min(3, activeMonths)
    },
    {
      title: "Mid-Year Consistency Check",
      desc: "Log 6 consistent active months",
      target: 6,
      current: Math.min(6, activeMonths)
    }
  ];

  return (
    <div className="flex flex-col gap-2.5 text-left w-full select-none">
      <span className="text-[7.5px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-505">
        Annual Telemetry Targets
      </span>
      <div className="flex flex-col gap-2">
        {annualMilestones.map((ms, idx) => {
          const isDone = ms.current >= ms.target;
          return (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                isDone
                  ? "bg-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-450"
                  : "bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200/40 dark:border-white/[0.03]"
              }`}
            >
              <div className="flex items-center gap-2">
                <FiCheckSquare className={isDone ? "text-amber-500" : "text-zinc-450"} size={13} />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-wide leading-none">
                    {ms.title}
                  </span>
                  <span className="text-[7.5px] text-zinc-400 dark:text-zinc-500 font-semibold mt-0.5 leading-none">
                    {ms.desc}
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-black font-mono leading-none">
                {ms.current} / {ms.target}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
