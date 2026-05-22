"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiTrendingUp } from "react-icons/fi";

interface XPLevelProps {
  xp: number;
}

export default function XPLevel({ xp }: XPLevelProps) {
  const xpPerLevel = 500;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const currentXp = xp % xpPerLevel;
  const pct = Math.round((currentXp / xpPerLevel) * 100);

  return (
    <div className="flex flex-col gap-3 text-left w-full select-none">
      <div className="flex items-center justify-between">
        <span className="text-[7.5px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-550 leading-none">
          XP LEVEL TELEMETRY
        </span>
        <span className="text-[8px] font-black text-red-500 font-mono">
          {xp} TOTAL XP
        </span>
      </div>

      <div className="p-4 rounded-3xl bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-white/[0.04] flex items-center justify-between gap-4">
        {/* Detail text */}
        <div className="flex-1 flex flex-col gap-1.5 text-left">
          <div className="flex justify-between items-baseline text-[9.5px] font-black uppercase tracking-wide text-zinc-950 dark:text-white leading-none">
            <span>LEVEL {level}</span>
            <span className="text-[7.5px] font-mono text-zinc-450">{currentXp} / {xpPerLevel} XP</span>
          </div>

          <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/[0.04] rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-red-650 to-orange-500 rounded-full"
            />
          </div>
        </div>

        {/* Level visual marker */}
        <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center shrink-0 shadow-sm animate-pulse">
          <FiTrendingUp size={16} />
        </div>
      </div>
    </div>
  );
}
