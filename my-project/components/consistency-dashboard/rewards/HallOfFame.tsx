"use client";

import React from "react";
import { FiStar } from "react-icons/fi";

export default function HallOfFame() {
  const leaders = [
    { name: "Marcus Aurelius", streak: 42, rank: "Legend", level: 12 },
    { name: "Elena Rostova", streak: 28, rank: "Titan", level: 9 },
    { name: "Sarah Connor", streak: 19, rank: "Warrior", level: 6 }
  ];

  return (
    <div className="flex flex-col gap-2.5 text-left w-full select-none">
      <span className="text-[7.5px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-550">
        Discipline Leaderboard
      </span>
      <div className="flex flex-col gap-2">
        {leaders.map((leader, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-white/[0.03] flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2.5">
              {/* Leader position numeric badge */}
              <div className="w-5 h-5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center text-[9px] font-black font-mono shrink-0">
                #{idx + 1}
              </div>
              <div className="flex flex-col">
                <span className="text-[9.5px] font-black uppercase tracking-wide leading-none text-zinc-900 dark:text-white">
                  {leader.name}
                </span>
                <span className="text-[7.5px] text-zinc-450 dark:text-zinc-500 font-semibold mt-0.5 leading-none">
                  {leader.rank} Rank (Level {leader.level})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[9.5px] font-black font-mono text-zinc-950 dark:text-white leading-none">
                {leader.streak}
              </span>
              <FiStar size={10} className="text-amber-500 fill-amber-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
