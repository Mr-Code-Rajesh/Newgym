"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiTrendingUp, FiActivity } from "react-icons/fi";
import CoachSocials from "./CoachSocials";
import ExpertiseBadge from "./ExpertiseBadge";

interface FeaturedCoachProps {
  name: string;
  role: string;
  image: string;
  exp: number;
  bio: string;
  badges: string[];
}

export default function FeaturedCoach({ name, role, image, exp, bio, badges }: FeaturedCoachProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-[380px] lg:h-[784px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/[0.05] bg-white dark:bg-zinc-950/40 backdrop-blur-xl shadow-xl flex flex-col justify-end p-6 sm:p-8 select-none hover:border-red-500/20 hover:shadow-[0_15px_40px_rgba(239,68,68,0.15)] transition-all duration-500"
    >
      {/* 1. Large Portrait visual with optimized Next Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={image}
          alt={`Featured Head Coach Portrait: ${name}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 600px"
          className="object-cover object-top transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-103"
        />

        {/* Cinematic ambient overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90 dark:opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent opacity-95 dark:hidden" />
      </div>

      {/* 2. Top-left "FEATURED MASTER" Indicator tag */}
      <div className="absolute top-5 left-5 z-10">
        <div className="px-3 py-1 rounded bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.45)] text-[8px] font-black uppercase tracking-widest text-white">
          FEATURED CHIEF
        </div>
      </div>

      {/* 3. Top-right Floating Experience Badge */}
      <div className="absolute top-5 right-5 z-10">
        <div className="px-3 py-1 rounded bg-black/60 dark:bg-black/60 backdrop-blur-md border border-white/[0.08] text-[8px] font-black uppercase tracking-widest text-red-500">
          {exp} YRS EXPERIENCE
        </div>
      </div>

      {/* 4. Text details, specs gauges & interactive overlays (Relative z-10) */}
      <div className="relative z-10 flex flex-col gap-5 w-full">
        {/* Name / Role */}
        <div className="flex flex-col">
          <span className="text-[8.5px] font-black uppercase tracking-[0.25em] text-red-600 dark:text-red-500">
            {role}
          </span>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-zinc-950 dark:text-white mt-0.5">
            {name}
          </h3>
        </div>

        {/* Advanced Telemetry Stats Gauges (Only on Featured Coach!) */}
        <div className="grid grid-cols-2 gap-4 border-y border-zinc-200/50 dark:border-white/[0.04] py-4 w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-white/[0.04] flex items-center justify-center text-red-500">
              <FiTrendingUp size={13} />
            </div>
            <div className="flex flex-col">
              <span className="text-[7.5px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                ATHLETE RATING
              </span>
              <span className="text-xs font-black text-zinc-950 dark:text-white mt-0.5">
                99.8% PEAK
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-white/[0.04] flex items-center justify-center text-red-500">
              <FiActivity size={13} />
            </div>
            <div className="flex flex-col">
              <span className="text-[7.5px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                COACHING CYCLES
              </span>
              <span className="text-xs font-black text-zinc-950 dark:text-white mt-0.5">
                540+ ENROLLED
              </span>
            </div>
          </div>
        </div>

        {/* Motivational Bio */}
        <p className="text-xs font-semibold leading-relaxed tracking-wide text-zinc-600 dark:text-zinc-400 max-w-lg group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors duration-300">
          {bio}
        </p>

        {/* Badges & Social Links */}
        <div className="flex items-center justify-between border-t border-zinc-200/50 dark:border-white/[0.04] pt-4 w-full">
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, idx) => (
              <ExpertiseBadge key={idx} label={badge} />
            ))}
          </div>

          <CoachSocials />
        </div>
      </div>
    </motion.div>
  );
}
