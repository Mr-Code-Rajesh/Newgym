"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiMaximize2, FiCpu } from "react-icons/fi";
import EquipmentBadge from "./EquipmentBadge";

export interface EquipmentItem {
  id: number;
  name: string;
  category: "strength" | "cardio" | "functional" | "weights" | "recovery";
  categoryLabel: string;
  image: string;
  description: string;
  highlightBadge: string;
  targetedMuscles: string[];
  techSpecs: {
    loadAdjustment?: string;
    consoleType?: string;
    telemetry?: string;
    resistance?: string;
  };
  physiologistNotes: string;
}

interface EquipmentCardProps {
  item: EquipmentItem;
  onClick: () => void;
}

export default function EquipmentCard({ item, onClick }: EquipmentCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200 dark:border-white/[0.04] bg-white dark:bg-zinc-950/40 p-5 gap-5 transition-all duration-500 hover:border-red-500/25 dark:hover:bg-zinc-950/60 hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(239,68,68,0.1)] overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Dynamic background glow spotlight */}
      <div className="absolute top-[-10%] left-[-10%] w-[120px] h-[120px] rounded-full bg-red-600/5 blur-[50px] group-hover:bg-red-600/10 group-hover:scale-150 transition-all duration-700 pointer-events-none" />

      {/* 1. Category & Highlight Badges */}
      <div className="flex items-center justify-between gap-2 z-10">
        <span className="px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.05] text-[7.5px] font-black uppercase tracking-widest text-zinc-500 dark:text-red-400">
          {item.categoryLabel}
        </span>
        <EquipmentBadge text={item.highlightBadge} glow />
      </div>

      {/* 2. Cinematic Zoom Image Container */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/[0.04] bg-zinc-100 dark:bg-zinc-950 select-none">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]"
        />

        {/* Action hover reveal overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-red-500/30 flex items-center justify-center text-zinc-900 dark:text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] z-10"
          >
            <FiMaximize2 size={14} />
          </motion.div>
        </div>
      </div>

      {/* 3. Text details */}
      <div className="flex flex-col gap-2 z-10">
        <h3 className="text-base font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-red-500 transition-colors duration-300 flex items-center gap-2">
          <span>{item.name}</span>
          <FiCpu size={12} className="text-zinc-400 dark:text-zinc-500 group-hover:text-red-500 transition-colors duration-300" />
        </h3>
        <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>

      {/* 4. Targeted Areas Row */}
      <div className="flex flex-wrap gap-1.5 border-t border-zinc-200 dark:border-white/[0.04] pt-3.5 select-none z-10">
        {item.targetedMuscles.slice(0, 3).map((muscle, idx) => (
          <span
            key={idx}
            className="text-[7.5px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500"
          >
            • {muscle}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
