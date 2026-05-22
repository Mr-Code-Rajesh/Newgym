"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { FiActivity } from "react-icons/fi";

export default function HeroImage() {
  return (
    <div className="relative w-full max-w-md md:max-w-lg aspect-square flex items-center justify-center select-none">
      
      {/* 1. LAYER 1: Ambient Red Spotlight & Rotating Crimson Ring */}
      <div className="absolute w-80 h-80 rounded-full bg-red-600/10 blur-3xl pointer-events-none z-0" />
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-red-500/15 pointer-events-none z-0 flex items-center justify-center"
      >
        {/* Orbit Node */}
        <div className="absolute top-0 w-2 h-2 rounded-full bg-red-500/80 shadow-[0_0_8px_#ef4444]" />
      </motion.div>

      {/* 2. LAYER 2 & 3: Floating Cinematic Composite Card */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-[85%] h-[85%] rounded-[32px] border border-white/[0.08] bg-zinc-950/40 backdrop-blur-md shadow-2xl p-3 overflow-hidden z-10 flex items-center justify-center group hover:border-red-500/25 transition-colors duration-500"
        style={{
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)"
        }}
      >
        {/* Next.js Optimized Image Frame */}
        <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-zinc-900 border border-black/40">
          <Image
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=700"
            alt="Apex Athlete Training Sanctuary"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out select-none"
            quality={85}
          />
          
          {/* Internal shadow frame vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* 3. LAYER 4: Floating Titanium Tech Border Overlay */}
        <div className="absolute inset-5 rounded-[22px] border border-white/[0.06] pointer-events-none group-hover:border-red-500/10 transition-colors duration-500" />

        {/* 4. LAYER 5: Overlapping Biometric HUD Widgets */}
        {/* Heart Rate Bio-Telemetry Gauge (Top Right) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.8, type: "spring" }}
          className="absolute top-6 right-6 p-3 rounded-2xl border border-white/[0.08] bg-zinc-950/85 backdrop-blur-xl shadow-lg flex items-center gap-3 pointer-events-none z-20"
        >
          <div className="w-8 h-8 rounded-lg bg-red-600/15 flex items-center justify-center text-red-500 border border-red-500/10 shadow-[0_0_8px_rgba(239,68,68,0.1)]">
            <FiActivity size={15} className="animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] font-black uppercase tracking-widest text-zinc-500">Peak HR</span>
            <span className="text-[13px] font-mono font-black text-white leading-none mt-0.5">142 <span className="text-[8px] text-red-500 font-sans uppercase font-bold">Bpm</span></span>
          </div>
        </motion.div>

        {/* Stability Telemetry (Bottom Left) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
          className="absolute bottom-6 left-6 p-3 rounded-2xl border border-white/[0.08] bg-zinc-950/85 backdrop-blur-xl shadow-lg flex flex-col gap-1.5 pointer-events-none z-20"
        >
          <span className="text-[7px] font-black uppercase tracking-widest text-zinc-500 leading-none">HRV Stability</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-black text-green-500 leading-none">92%</span>
            <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "92%" }}
                transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
                className="h-full bg-green-500" 
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Vector Accents */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 rounded-tl pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 rounded-br pointer-events-none" />
    </div>
  );
}
