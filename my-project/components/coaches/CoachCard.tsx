"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CoachSocials from "./CoachSocials";
import ExpertiseBadge from "./ExpertiseBadge";

interface CoachCardProps {
  name: string;
  role: string;
  image: string;
  exp: number;
  bio: string;
  badges: string[];
}

export default function CoachCard({ name, role, image, exp, bio, badges }: CoachCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-[380px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/[0.05] bg-white dark:bg-zinc-950/40 backdrop-blur-xl shadow-lg flex flex-col justify-end p-5 select-none hover:border-red-500/20 hover:shadow-[0_12px_30px_rgba(239,68,68,0.1)] transition-all duration-500"
    >
      {/* 1. Portrait visual with optimized Next Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={image}
          alt={`Professional Portrait of Gym Coach ${name}`}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover object-top transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
        />

        {/* Cinematic ambient overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90 dark:opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent opacity-95 dark:hidden" />
      </div>

      {/* 2. Top-right Floating Experience Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="px-2.5 py-1 rounded bg-black/60 dark:bg-black/60 backdrop-blur-md border border-white/[0.08] text-[7.5px] font-black uppercase tracking-widest text-red-500">
          {exp} YRS EXP
        </div>
      </div>

      {/* 3. Text details & interactive overlays (Relative z-10) */}
      <div className="relative z-10 flex flex-col gap-3">
        {/* Name / Role */}
        <div className="flex flex-col">
          <span className="text-[7.5px] font-black uppercase tracking-[0.25em] text-red-600 dark:text-red-500">
            {role}
          </span>
          <h3 className="text-sm font-black uppercase tracking-wide text-zinc-950 dark:text-white mt-0.5">
            {name}
          </h3>
        </div>

        {/* Motivational Bio */}
        <p className="text-[10px] font-semibold leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-xs group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors duration-300">
          {bio}
        </p>

        {/* Badges & Social Links */}
        <div className="flex items-center justify-between border-t border-zinc-200/50 dark:border-white/[0.04] pt-3 mt-1">
          <div className="flex flex-wrap gap-1.5">
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
