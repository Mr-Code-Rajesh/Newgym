"use client";

import React from "react";
import { FiAward, FiGift, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";

interface EliteRewardsProps {
  yearlyLogs: boolean[];
}

export default function EliteRewards({ yearlyLogs }: EliteRewardsProps) {
  const activeMonths = yearlyLogs.filter(Boolean).length;
  const rewardThreshold = 8; // requires 8 active months to unlock whey protein!
  const isUnlocked = activeMonths >= rewardThreshold;
  const progressPct = Math.round((activeMonths / rewardThreshold) * 100);

  const rewards = [
    {
      name: "1KG Whey Protein",
      desc: "Premium isolate whey tub",
      icon: FiGift
    },
    {
      name: "2 Months Free Gym",
      desc: "Extended biometrics pass",
      icon: FiAward
    }
  ];

  return (
    <div className="flex flex-col gap-3 text-left w-full select-none">
      <div className="flex justify-between items-baseline">
        <span className="text-[7.5px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-505">
          Elite Annual Rewards
        </span>
        <span className="text-[8.5px] font-black text-red-500 font-mono">
          {progressPct}% UNLOCKED
        </span>
      </div>

      {/* Progress slider tracking monthly count */}
      <div className="flex flex-col gap-1 w-full">
        <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/[0.04] rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, progressPct)}%` }}
            transition={{ duration: 0.8 }}
            className="h-full bg-gradient-to-r from-red-650 to-orange-500 rounded-full"
          />
        </div>
        <div className="flex justify-between text-[6.5px] font-bold text-zinc-450 mt-0.5">
          <span>{activeMonths} Months Active</span>
          <span>{rewardThreshold} Months Required</span>
        </div>
      </div>

      {/* Rewards visual row items */}
      <div className="grid grid-cols-2 gap-3 mt-1">
        {rewards.map((rew, idx) => {
          const Icon = rew.icon;
          return (
            <motion.div
              key={idx}
              whileHover={isUnlocked ? { scale: 1.03 } : {}}
              className={`p-3 rounded-2xl border flex flex-col justify-between gap-3 relative transition-all duration-500 overflow-hidden ${
                isUnlocked
                  ? "bg-red-500/5 border-red-500/25 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.06)]"
                  : "bg-zinc-50/50 dark:bg-zinc-950/20 border-zinc-200/40 dark:border-white/[0.02] text-zinc-450"
              }`}
            >
              {/* Laser locks visual tag */}
              {!isUnlocked && (
                <div className="absolute top-1.5 right-1.5 text-zinc-500 flex items-center gap-0.5">
                  <FiLock size={8} />
                  <span className="text-[5.5px] font-bold">LOCKED</span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isUnlocked ? "bg-red-500/10 text-red-500 animate-bounce" : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500"
              }`}>
                <Icon size={14} />
              </div>

              {/* Details */}
              <div className="flex flex-col">
                <span className="text-[9.5px] font-black uppercase tracking-wide leading-tight">
                  {rew.name}
                </span>
                <span className="text-[7px] text-zinc-450 dark:text-zinc-550 font-semibold mt-0.5 leading-tight">
                  {rew.desc}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
