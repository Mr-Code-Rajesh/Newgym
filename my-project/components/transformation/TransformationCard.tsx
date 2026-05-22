"use client";

import React from "react";
import { motion } from "framer-motion";
import BeforeAfterCard from "./BeforeAfterCard";
import TransformationBadge from "./TransformationBadge";
import { FiTrendingDown, FiActivity, FiArrowRight } from "react-icons/fi";

export interface TransformationMetric {
  label: string;
  value: string;
  isNegative?: boolean; // Highlight weight loss, fat drop etc.
}

export interface MemberTransformation {
  id: number;
  name: string;
  goal: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  quote: string;
  category: "recomp" | "strength" | "recovery" | "conditioning";
  metrics: TransformationMetric[];
  biometrics: {
    vo2max?: string;
    strengthIndex?: string;
    recoveryTime?: string;
    bodyFatBefore?: string;
    bodyFatAfter?: string;
  };
  trainerNotes: string;
}

interface TransformationCardProps {
  member: MemberTransformation;
  onClick: () => void;
}

export default function TransformationCard({ member, onClick }: TransformationCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200 dark:border-white/[0.04] bg-white dark:bg-zinc-950/40 p-5 gap-6 transition-all duration-500 hover:border-red-500/25 dark:hover:bg-zinc-950/60 hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(239,68,68,0.1)] overflow-hidden"
    >
      {/* Dynamic glow spotlight background element */}
      <div className="absolute top-[-10%] right-[-10%] w-[120px] h-[120px] rounded-full bg-red-600/5 blur-[50px] group-hover:bg-red-600/10 group-hover:scale-150 transition-all duration-700 pointer-events-none" />

      {/* 1. Header Badges & Info */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <TransformationBadge text={member.duration} variant="duration" />
          <TransformationBadge text={member.goal} variant="goal" glow />
        </div>
        
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-red-500 transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
            APEX Telemetry Case #{1000 + member.id}
          </p>
        </div>
      </div>

      {/* 2. Before/After Compare Slider Container */}
      <div className="relative w-full z-10">
        <BeforeAfterCard
          beforeImage={member.beforeImage}
          afterImage={member.afterImage}
          beforeAlt={`${member.name} Before Transformation`}
          afterAlt={`${member.name} After Transformation`}
        />
      </div>

      {/* 3. Emotional Journey Text Summary */}
      <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium tracking-wide leading-relaxed line-clamp-2">
        "{member.description}"
      </p>

      {/* 4. Core Statistical Results Highlights */}
      <div className="grid grid-cols-3 gap-3 border-y border-zinc-200 dark:border-white/[0.04] py-4 select-none">
        {member.metrics.slice(0, 3).map((metric, idx) => (
          <div key={idx} className="flex flex-col items-center text-center gap-1">
            <span className="text-[8px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              {metric.label}
            </span>
            <div className="flex items-center gap-1">
              {metric.isNegative ? (
                <FiTrendingDown size={11} className="text-green-500 dark:text-green-400" />
              ) : (
                <FiActivity size={10} className="text-red-500" />
              )}
              <span className="text-sm font-mono font-black text-zinc-800 dark:text-white">
                {metric.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Start Journey / Telemetry Details Button */}
      <motion.button
        whileHover={{ x: 4 }}
        onClick={onClick}
        className="w-full py-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.06] text-[9.5px] font-black uppercase tracking-widest text-zinc-800 dark:text-white hover:text-white hover:bg-red-600 hover:border-red-500/20 transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer outline-none"
      >
        <span>Examine Telemetry Log</span>
        <FiArrowRight size={12} className="text-zinc-500 dark:text-zinc-400 group-hover/btn:text-white transition-colors duration-300" />
      </motion.button>
    </motion.div>
  );
}
