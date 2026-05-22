"use client";

import React from "react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import { FiLock, FiGift } from "react-icons/fi";

interface RewardCardProps {
  title: string;
  desc: string;
  isUnlocked: boolean;
  icon: IconType;
}

export default function RewardCard({ title, desc, isUnlocked, icon: Icon }: RewardCardProps) {
  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.02, y: -2 } : {}}
      className={`p-4 rounded-3xl border flex items-center justify-between relative overflow-hidden transition-all duration-500 select-none ${
        isUnlocked
          ? "bg-red-500/5 border-red-500/25 text-red-500 shadow-[0_8px_24px_rgba(239,68,68,0.06)]"
          : "bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200 dark:border-white/[0.03] text-zinc-400"
      }`}
    >
      {/* Locking overlay label */}
      {!isUnlocked && (
        <div className="absolute top-2 right-3 text-zinc-500 flex items-center gap-0.5 select-none">
          <FiLock size={8} />
          <span className="text-[5.5px] font-bold tracking-widest uppercase">LOCKED</span>
        </div>
      )}

      {/* Reward Content details */}
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
          isUnlocked ? "bg-red-500/10 text-red-500 animate-bounce" : "bg-zinc-150 dark:bg-zinc-900 text-zinc-500"
        }`}>
          <Icon size={14} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-black uppercase tracking-wide leading-none">
            {title}
          </span>
          <span className="text-[8px] text-zinc-450 dark:text-zinc-550 font-semibold mt-1 leading-none">
            {desc}
          </span>
        </div>
      </div>

      {/* Claim button or lock icon */}
      <div>
        {isUnlocked ? (
          <button 
            onClick={() => alert(`🎉 Congratulations! You have successfully claimed your physical reward: ${title}!`)}
            className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[8px] font-black uppercase tracking-widest cursor-pointer shadow-md transition-all shrink-0"
          >
            CLAIM
          </button>
        ) : (
          <FiLock size={12} className="text-zinc-500/50 shrink-0" />
        )}
      </div>
    </motion.div>
  );
}
