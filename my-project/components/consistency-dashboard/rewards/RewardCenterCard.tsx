"use client";

import React from "react";
import { FiAward, FiGift } from "react-icons/fi";
import DashboardCard from "../shared/DashboardCard";
import SectionHeader from "../shared/SectionHeader";
import RewardCard from "./RewardCard";
import AchievementBadge from "./AchievementBadge";
import XPLevel from "./XPLevel";
import HallOfFame from "./HallOfFame";

interface RewardCenterCardProps {
  xp: number;
  yearlyLogs: boolean[];
}

export default function RewardCenterCard({ xp, yearlyLogs }: RewardCenterCardProps) {
  const activeMonths = yearlyLogs.filter(Boolean).length;
  const wheyUnlocked = activeMonths >= 8;
  const membershipUnlocked = activeMonths >= 10;

  return (
    <DashboardCard className="col-span-12 md:col-span-6 lg:col-span-4 min-h-[460px] flex flex-col justify-between">
      {/* Header */}
      <SectionHeader title="Reward Center" label="Discipline payout nodes" icon={FiAward} />

      {/* Ranks and badges */}
      <div className="my-1.5 w-full">
        <AchievementBadge xp={xp} />
      </div>

      {/* Progress Levels Math */}
      <div className="my-1.5 w-full">
        <XPLevel xp={xp} />
      </div>

      {/* Leaderboard profiles */}
      <div className="my-1.5 w-full">
        <HallOfFame />
      </div>

      {/* Claimable physical rewards */}
      <div className="flex flex-col gap-2 w-full mt-1">
        <span className="text-[7.5px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-550 text-left mb-0.5">
          Claimable Loot Drops
        </span>
        <RewardCard
          title="1KG Whey Protein Tub"
          desc="Unlocked at 8 months active"
          isUnlocked={wheyUnlocked}
          icon={FiGift}
        />
        <RewardCard
          title="2 Months Free Gym Pass"
          desc="Unlocked at 10 months active"
          isUnlocked={membershipUnlocked}
          icon={FiAward}
        />
      </div>
    </DashboardCard>
  );
}
