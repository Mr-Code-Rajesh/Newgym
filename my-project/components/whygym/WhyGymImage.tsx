"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FloatingStats from "./FloatingStats";

export default function WhyGymImage() {
  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/[0.05] bg-zinc-100 dark:bg-zinc-950/40 p-1 flex items-center justify-center select-none shadow-[0_16px_48px_rgba(0,0,0,0.3)]">
      {/* Background Glow Lights */}
      <div className="absolute top-[-10%] right-[-10%] w-[180px] h-[180px] rounded-full bg-red-600/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[200px] h-[200px] rounded-full bg-zinc-800/10 dark:bg-zinc-900/15 blur-[95px] pointer-events-none" />

      {/* Optimized Athlete Image with subtle zoom on hover */}
      <div className="relative w-full h-full rounded-[22px] overflow-hidden group">
        <Image
          src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800&auto=format&fit=crop"
          alt="Athlete performing explosive heavy workout"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 30vw"
          className="object-cover object-center group-hover:scale-103 transition-transform duration-[2000ms] ease-[0.16, 1, 0.3, 1]"
          priority
        />
        
        {/* Cinematic dark mask overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Floating Telemetry Stats Overlay Badges */}
      
      {/* Stat 1: top-[-3%] right-[5%] */}
      <FloatingStats
        value="+42% VO2 MAX"
        label="Aerobic Capacity Shift"
        positionClass="top-[6%] right-[-4%] sm:right-[2%]"
        delay={0}
      />

      {/* Stat 2: middle-left area */}
      <FloatingStats
        value="-50% CORTISOL"
        label="Biological Stress Level"
        positionClass="top-[45%] left-[-6%] sm:left-[-2%]"
        delay={1.5}
      />

      {/* Stat 3: bottom-[5%] right-[2%] */}
      <FloatingStats
        value="+38% AGILITY"
        label="Neuromuscular Timing"
        positionClass="bottom-[8%] right-[-4%] sm:right-[4%]"
        delay={0.8}
      />
    </div>
  );
}
