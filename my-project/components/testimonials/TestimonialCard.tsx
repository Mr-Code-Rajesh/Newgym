"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa6";
import RatingStars from "./RatingStars";
import { TestimonialData } from "./FeaturedTestimonial";

interface TestimonialCardProps {
  member: TestimonialData;
}

export default function TestimonialCard({ member }: TestimonialCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative p-5 rounded-3xl bg-white dark:bg-zinc-950/40 border border-zinc-200 dark:border-white/[0.05] backdrop-blur-xl flex flex-col justify-between gap-5 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(239,68,68,0.08)] hover:border-red-500/20 select-none text-zinc-950 dark:text-white"
    >
      {/* Quote symbol mark */}
      <div className="absolute top-5 right-5 opacity-[0.03] dark:opacity-[0.04] pointer-events-none select-none text-zinc-950 dark:text-white">
        <FaQuoteLeft size={35} />
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        <div className="flex items-center justify-between">
          <RatingStars rating={member.rating} size={11} />
          <span className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.04] text-[6.5px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {member.duration}
          </span>
        </div>

        {/* Member Quote */}
        <blockquote className="text-xs font-semibold leading-relaxed text-zinc-700 dark:text-zinc-300">
          "{member.quote}"
        </blockquote>
      </div>

      {/* Member Details Footer */}
      <div className="flex items-center gap-3.5 border-t border-zinc-100 dark:border-white/[0.04] pt-4 relative z-10">
        {/* Circle Profile image (optimized) */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-200 dark:border-white/[0.08] bg-zinc-200 dark:bg-zinc-900">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="32px"
            loading="lazy"
            className={`object-cover transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-[10.5px] font-black uppercase tracking-wide text-zinc-950 dark:text-white">
            {member.name}
          </span>
          <span className="text-[7px] font-bold text-red-500 uppercase tracking-widest leading-none mt-0.5">
            {member.role}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
