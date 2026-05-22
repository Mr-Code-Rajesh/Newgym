"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";

interface WeeklyXPProps {
  xp: number;
}

export default function WeeklyXP({ xp }: WeeklyXPProps) {
  const xpPerLevel = 500;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const currentXp = xp % xpPerLevel;
  const pct = Math.round((currentXp / xpPerLevel) * 100);

  return (
    <div className="flex flex-col gap-2.5 text-left w-full">
      <div className="flex items-center justify-between">
        <span className="text-[7.5px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-505">
          XP LEVEL PROGRESSION
        </span>
        <span className="text-[8.5px] font-black font-mono text-red-500">
          LEVEL {level}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Progress Bar */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/[0.04] rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full"
            />
          </div>
          <div className="flex justify-between text-[7px] font-bold text-zinc-400">
            <span>{currentXp} XP</span>
            <span>{xpPerLevel} XP</span>
          </div>
        </div>

        {/* Level badge icon */}
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center animate-pulse">
          <FiAward size={15} />
        </div>
      </div>
    </div>
  );
}
