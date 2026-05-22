"use client";

import React from "react";
import { FiAward, FiCompass, FiShield, FiSliders, FiActivity } from "react-icons/fi";

interface AchievementBadgeProps {
  xp: number;
}

export default function AchievementBadge({ xp }: AchievementBadgeProps) {
  const xpPerLevel = 500;
  const level = Math.floor(xp / xpPerLevel) + 1;

  // Consistency rankings based on levels reached
  const getRank = () => {
    if (level >= 10) return { name: "Legend", icon: FiAward, color: "text-amber-500 border-amber-500/25 bg-amber-500/5", desc: "Supreme athletic champion status" };
    if (level >= 7) return { name: "Legend", icon: FiAward, color: "text-amber-500 border-amber-500/25 bg-amber-500/5", desc: "Supreme athletic champion status" };
    if (level >= 5) return { name: "Titan", icon: FiShield, color: "text-purple-500 border-purple-500/25 bg-purple-500/5", desc: "Unyielding strength telemetry level" };
    if (level >= 3) return { name: "Warrior", icon: FiSliders, color: "text-red-500 border-red-500/25 bg-red-500/5", desc: "Active workout discipline level" };
    return { name: "Beginner", icon: FiCompass, color: "text-zinc-450 border-zinc-200/50 dark:border-white/[0.03] bg-zinc-50/50 dark:bg-zinc-950/20", desc: "First biometrics sync established" };
  };

  const rank = getRank();
  const Icon = rank.icon;

  return (
    <div className="flex flex-col gap-2.5 text-left w-full select-none">
      <span className="text-[7.5px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-550">
        Discipline Level Rank
      </span>
      <div className={`p-4 rounded-3xl border flex items-center gap-4 transition-all duration-500 ${rank.color}`}>
        <div className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-900 shadow-md flex items-center justify-center shrink-0">
          <Icon size={16} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-black uppercase tracking-widest leading-none">
            {rank.name} RANK ACTIVE
          </span>
          <span className="text-[7.5px] font-semibold text-zinc-450 dark:text-zinc-500 mt-1 leading-tight">
            {rank.desc}
          </span>
        </div>
      </div>
    </div>
  );
}
