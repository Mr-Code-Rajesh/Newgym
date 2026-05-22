"use client";

import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import DashboardCard from "../shared/DashboardCard";
import SectionHeader from "../shared/SectionHeader";
import ProgressHeatmap from "./ProgressHeatmap";
import MonthlyStats from "./MonthlyStats";

interface MonthlyTrackerProps {
  logs: boolean[];
}

export default function MonthlyTracker({ logs }: MonthlyTrackerProps) {
  return (
    <DashboardCard className="col-span-12 md:col-span-6 lg:col-span-4 min-h-[460px] flex flex-col justify-between">
      {/* Header */}
      <SectionHeader title="Monthly Velocity" label="Active habits trackers" icon={FiTrendingUp} />

      {/* Heatmap density checker */}
      <div className="my-2 w-full">
        <ProgressHeatmap logs={logs} />
      </div>

      {/* Statistics */}
      <div className="w-full mt-2">
        <MonthlyStats logs={logs} />
      </div>
    </DashboardCard>
  );
}
