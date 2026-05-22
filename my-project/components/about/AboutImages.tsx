"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AboutBadge from "./AboutBadge";

export default function AboutImages() {
  return (
    <div className="relative w-full max-w-md md:max-w-lg flex items-center justify-center p-6 select-none">
      
      {/* 1. Backdrop ambient spotlight glow */}
      <div className="absolute w-72 h-72 rounded-full bg-red-800/10 blur-3xl pointer-events-none z-0" />

      {/* 2. BASE IMAGE: High-End Gym machinery (Back Layer) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0 }}
        className="relative w-[85%] aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-900 border border-white/[0.06] shadow-2xl z-10 self-start ml-auto group"
        style={{
          boxShadow: "0 20px 50px rgba(0,0,0,0.6)"
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600"
          alt="Apex Luxury Arena Machinery"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
          className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out select-none"
          quality={80}
        />
        
        {/* Dark overlay mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </motion.div>

      {/* 3. OVERLAPPING IMAGE: Athlete workout details (Front Layer) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -20 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay: 0.3 }}
        className="absolute bottom-[-10px] left-2 w-[48%] aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 border-[6px] border-black shadow-2xl z-20 group"
      >
        <Image
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400"
          alt="Apex Athlete Biometric Training"
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          loading="lazy"
          className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out select-none"
          quality={80}
        />
        
        {/* Dark overlay mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </motion.div>

      {/* 4. FLOATING WIDGETS: Experience Badge */}
      <AboutBadge />

      {/* Aesthetic Vector Angles */}
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/20 rounded-tr pointer-events-none z-10" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/20 rounded-bl pointer-events-none z-10" />
    </div>
  );
}
