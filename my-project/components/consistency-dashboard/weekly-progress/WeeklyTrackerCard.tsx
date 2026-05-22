"use client";

import React from "react";
import { FiCalendar } from "react-icons/fi";
import DashboardCard from "../shared/DashboardCard";
import SectionHeader from "../shared/SectionHeader";
import WeeklyTracker from "./WeeklyTracker";
import WeeklyGoals from "./WeeklyGoals";
import WeeklyXP from "./WeeklyXP";

interface WeeklyTrackerCardProps {
  logs: boolean[];
  xp: number;
  todayIdx: number;
}

export default function WeeklyTrackerCard({ logs, xp, todayIdx }: WeeklyTrackerCardProps) {
  const activeCount = logs.filter(Boolean).length;

  return (
    <DashboardCard className="col-span-12 md:col-span-6 lg:col-span-4 min-h-[460px] flex flex-col justify-between">
      {/* Header */}
      <SectionHeader title="Weekly Targets" label="Sprint baselines" icon={FiCalendar} />

      {/* Week session strip */}
      <div className="my-1 w-full">
        <WeeklyTracker logs={logs} todayIdx={todayIdx} />
      </div>

      {/* Goals milestones */}
      <div className="my-1.5 w-full">
        <WeeklyGoals completedWorkouts={activeCount} />
      </div>

      {/* Weekly Level XP */}
      <div className="w-full mt-1.5">
        <WeeklyXP xp={xp} />
      </div>
    </DashboardCard>
  );
}
