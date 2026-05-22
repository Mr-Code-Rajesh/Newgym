"use client";

import React from "react";
import { FiCheckSquare, FiSquare } from "react-icons/fi";

interface WeeklyGoalsProps {
  completedWorkouts: number;
}

export default function WeeklyGoals({ completedWorkouts }: WeeklyGoalsProps) {
  const goals = [
    {
      title: "Hit 3 Gym Sessions",
      desc: "Complete at least 3 workouts this week",
      target: 3,
      current: Math.min(3, completedWorkouts)
    },
    {
      title: "HIIT Endurance",
      desc: "Log workout using the HIIT Timer preset",
      target: 1,
      current: completedWorkouts > 0 ? 1 : 0
    }
  ];

  return (
    <div className="flex flex-col gap-2.5 text-left w-full">
      <span className="text-[7.5px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-505">
        Weekly Milestone Goals
      </span>
      <div className="flex flex-col gap-2">
        {goals.map((goal, idx) => {
          const isDone = goal.current >= goal.target;
          return (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                isDone
                  ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-450"
                  : "bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200 dark:border-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isDone ? "text-emerald-500" : "text-zinc-400"}>
                  {isDone ? <FiCheckSquare size={13} /> : <FiSquare size={13} />}
                </span>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-wide leading-none">
                    {goal.title}
                  </span>
                  <span className="text-[7.5px] text-zinc-400 dark:text-zinc-500 font-semibold mt-0.5 leading-none">
                    {goal.desc}
                  </span>
                </div>
              </div>

              <span className="text-[9px] font-black font-mono leading-none">
                {goal.current} / {goal.target}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
