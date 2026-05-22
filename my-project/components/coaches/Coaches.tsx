"use client";

import React from "react";
import { motion } from "framer-motion";
import CoachesGrid, { CoachData } from "./CoachesGrid";

export default function Coaches() {
  // 1. High-contrast athletic portraits from Unsplash
  const featuredCoach: CoachData = {
    name: "Coach Marcus Aurelius",
    role: "Head Biometrics Physiologist",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop",
    exp: 15,
    bio: "Specializing in high-end, neuromuscular programming. Together we will map your exact cellular baseline variables to engineer your absolute peak physical output limits.",
    badges: ["Bodybuilding", "Biomechanics"],
  };

  const secondaryCoaches: CoachData[] = [
    {
      name: "Coach Sarah",
      role: "CrossFit & Strength Expert",
      image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600&auto=format&fit=crop",
      exp: 8,
      bio: "Focusing on high-velocity conditioning, functional alignment, and dynamic power to make your joints resilient and athletic capacity elite.",
      badges: ["CrossFit", "Strength"],
    },
    {
      name: "Dr. Elena R.",
      role: "Clinical Metabolic Advisor",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop",
      exp: 10,
      bio: "Science is clear: physical force is only as powerful as cellular fuel. I write metabolic protocols that optimize recovery and macro requirements.",
      badges: ["Nutrition", "Metabolics"],
    },
    {
      name: "Coach Marcus T.",
      role: "Velocity Cardio Specialist",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
      exp: 6,
      bio: "Pushing your lactic threshold beyond traditional limits. Using real-time HRV mapping, we train your aerobic zones for recovery speed.",
      badges: ["Cardio", "HRV Mapping"],
    },
  ];

  return (
    <section
      id="coaches"
      className="relative z-10 w-full bg-zinc-50 dark:bg-black text-zinc-950 dark:text-white py-20 md:py-28 border-t border-zinc-200 dark:border-white/[0.04] flex flex-col gap-12 sm:gap-16 scroll-mt-24 overflow-hidden select-none transition-colors duration-500"
    >
      {/* Cinematic background spotlight glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[15%] right-[-10%] w-[45vw] aspect-square rounded-full bg-red-600/5 blur-[120px] dark:bg-red-950/10 dark:blur-[160px]" />
        <div className="absolute bottom-[15%] left-[-10%] w-[45vw] aspect-square rounded-full bg-red-600/5 blur-[120px] dark:bg-red-950/10 dark:blur-[160px]" />
      </div>

      {/* Cinematic Section Header */}
      <div className="relative z-10 flex flex-col gap-4 text-center max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-600 dark:text-red-500">
            Expert Coaches
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-950 dark:text-white leading-none"
        >
          MEET YOUR{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500 dark:from-red-500 dark:via-red-400 dark:to-orange-400 drop-shadow-[0_2px_10px_rgba(239,68,68,0.15)]">
            COACHES.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm font-medium leading-relaxed tracking-wide text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto"
        >
          Train with world-class performance physiologists, Olympic lifters, and nutrition advisors who design scientific pathways to maximize force outputs.
        </motion.p>
      </div>

      {/* Dynamic Asymmetric Coaches Grid */}
      <div className="relative z-10 w-full">
        <CoachesGrid featured={featuredCoach} secondaries={secondaryCoaches} />
      </div>
    </section>
  );
}
