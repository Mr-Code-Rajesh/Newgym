"use client";

import React from "react";
import { motion } from "framer-motion";

interface GoalSelectorProps {
  goal: "lose" | "gain" | "maintain";
  setGoal: (goal: "lose" | "gain" | "maintain") => void;
}

export default function GoalSelector({ goal, setGoal }: GoalSelectorProps) {
  const goals = [
    {
      id: "lose",
      emoji: "🔥",
      title: "Lose",
      subtitle: "Fat Deficit",
      desc: "Optimize shredding & cardiac output",
    },
    {
      id: "maintain",
      emoji: "⚡",
      title: "Maintain",
      subtitle: "Biometrics",
      desc: "Recomposition & power stability",
    },
    {
      id: "gain",
      emoji: "💪",
      title: "Gain",
      subtitle: "Surplus",
      desc: "Accelerate myofibrillar hypertrophy",
    },
  ] as const;

  return (
    <div className="flex flex-col gap-2.5 w-full select-none">
      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        Primary Training Directive
      </span>

      <div className="grid grid-cols-3 gap-3">
        {goals.map((item) => {
          const isActive = goal === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setGoal(item.id)}
              className={`relative p-3.5 rounded-2xl border text-left flex flex-col gap-2 outline-none cursor-pointer transition-all duration-300 ${
                isActive
                  ? "bg-zinc-100 dark:bg-zinc-950 border-red-500 shadow-[0_4px_16px_rgba(239,68,68,0.1)]"
                  : "bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200 dark:border-white/[0.04] hover:border-zinc-300 dark:hover:border-white/[0.08]"
              }`}
            >
              {/* Emoji header visual */}
              <div className="flex items-center justify-between w-full">
                <span className="text-base">{item.emoji}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-goal-dot"
                    className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"
                  />
                )}
              </div>

              {/* Title & subtitle details */}
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-wide text-zinc-950 dark:text-white">
                  {item.title}
                </span>
                <span className="text-[7.5px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none mt-0.5">
                  {item.subtitle}
                </span>
              </div>

              {/* Extra short desc */}
              <span className="text-[6.5px] font-semibold text-zinc-400 dark:text-zinc-600 leading-tight">
                {item.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
