"use client";

import React from "react";
import { FiTarget } from "react-icons/fi";
import DashboardCard from "../shared/DashboardCard";
import SectionHeader from "../shared/SectionHeader";
import YearlyTracker from "./YearlyTracker";
import EliteRewards from "./EliteRewards";
import AnnualGoals from "./AnnualGoals";

interface YearlyTrackerCardProps {
  yearlyLogs: boolean[];
  todayYearIdx: number;
  onToggleMonth: (idx: number) => void;
}

export default function YearlyTrackerCard({ yearlyLogs, todayYearIdx, onToggleMonth }: YearlyTrackerCardProps) {
  return (
    <DashboardCard className="col-span-12 md:col-span-6 lg:col-span-4 min-h-[460px] flex flex-col justify-between">
      {/* Header */}
      <SectionHeader title="Yearly Target" label="Macro compliance blocks" icon={FiTarget} />

      {/* 12-Month Map */}
      <div className="my-1.5 w-full">
        <YearlyTracker yearlyLogs={yearlyLogs} todayYearIdx={todayYearIdx} onToggleMonth={onToggleMonth} />
      </div>

      {/* Elite Rewards */}
      <div className="my-1.5 w-full">
        <EliteRewards yearlyLogs={yearlyLogs} />
      </div>

      {/* Annual Goals */}
      <div className="w-full mt-1">
        <AnnualGoals yearlyLogs={yearlyLogs} />
      </div>
    </DashboardCard>
  );
}
