"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa6";
import RatingStars from "./RatingStars";

export interface TestimonialData {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
  duration: string; // e.g. "12-WEEK METABOLIC PHASE"
  biometrics: string; // e.g. "Before: 94 kg / After: 80 kg"
}

interface FeaturedTestimonialProps {
  member: TestimonialData;
}

export default function FeaturedTestimonial({ member }: FeaturedTestimonialProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full rounded-3xl overflow-hidden bg-white dark:bg-zinc-950/40 border border-zinc-200 dark:border-white/[0.05] backdrop-blur-xl shadow-xl hover:shadow-[0_15px_35px_rgba(239,68,68,0.12)] hover:border-red-500/20 transition-all duration-500 grid grid-cols-1 md:grid-cols-12 items-stretch"
    >
      {/* 1. Profile visual side panel (Col 5) */}
      <div className="relative md:col-span-5 w-full min-h-[300px] md:min-h-full overflow-hidden bg-zinc-200 dark:bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-white/[0.04]">
        <Image
          src={member.image}
          alt={`Apex member athlete: ${member.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          loading="lazy"
          className={`object-cover transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-103 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-102"
          }`}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none z-10" />

        {/* Biometrics badge floating on picture */}
        <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1">
          <span className="px-2 py-0.5 rounded bg-zinc-950/80 border border-white/[0.08] text-[7.5px] font-black uppercase tracking-widest text-red-400">
            {member.duration}
          </span>
          <span className="text-[8px] font-bold text-zinc-300 uppercase tracking-wider ml-1">
            {member.biometrics}
          </span>
        </div>
      </div>

      {/* 2. Text quote reviews panel (Col 7) */}
      <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-8 relative z-10 text-zinc-950 dark:text-white">
        {/* Quote overlay watermark */}
        <div className="absolute top-6 right-6 opacity-[0.03] dark:opacity-[0.04] pointer-events-none select-none text-zinc-950 dark:text-white">
          <FaQuoteLeft size={70} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <RatingStars rating={member.rating} size={13} />
            <span className="text-[7.5px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Featured Athlete Review
            </span>
          </div>

          {/* Inspirational client quote */}
          <blockquote className="text-sm sm:text-base md:text-lg font-bold leading-relaxed tracking-wide italic text-zinc-800 dark:text-zinc-200">
            "{member.quote}"
          </blockquote>
        </div>

        {/* Member profile author footer info */}
        <div className="flex items-center justify-between border-t border-zinc-200/80 dark:border-white/[0.04] pt-5">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-black uppercase tracking-wide text-zinc-950 dark:text-white">
              {member.name}
            </span>
            <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">
              Directive: {member.role}
            </span>
          </div>

          <div className="flex flex-col text-right text-[7.5px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            <span>Verified Member</span>
            <span>Biometrics Match: Apex Central</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
