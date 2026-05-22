"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiEye, FiZap } from "react-icons/fi";

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  span: string; // Tailwind grid layout spans
}

interface GalleryCardProps {
  item: GalleryItem;
  onSelect: (item: GalleryItem) => void;
}

export default function GalleryCard({ item, onSelect }: GalleryCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      onClick={() => onSelect(item)}
      className={`group relative w-full h-full min-h-[220px] rounded-3xl overflow-hidden cursor-pointer select-none bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/50 dark:border-white/[0.04] transition-all duration-500 shadow-md hover:shadow-[0_12px_30px_rgba(239,68,68,0.15)] hover:border-red-500/20 ${item.span}`}
    >
      {/* 1. Next/Image optimized component */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          className={`object-cover transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-102"
          }`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* 2. Shimmer loading state placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-900 animate-pulse z-10 flex items-center justify-center">
          <FiZap className="w-5 h-5 text-red-500 animate-pulse" />
        </div>
      )}

      {/* 3. Luxury overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5 opacity-80 group-hover:opacity-95 transition-opacity duration-500 z-10 pointer-events-none" />

      {/* 4. Fine glow border hover animation */}
      <div className="absolute inset-0 z-20 pointer-events-none border border-transparent group-hover:border-red-500/20 rounded-3xl transition-colors duration-500" />

      {/* 5. Card information & details */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end gap-2.5 z-20">
        {/* Category Label Pill */}
        <div className="flex justify-between items-start">
          <span className="px-2 py-0.5 rounded bg-zinc-950/70 border border-white/[0.05] text-[7px] font-black uppercase tracking-widest text-red-400 group-hover:text-red-300 group-hover:border-red-500/10 transition-colors duration-300">
            {item.category}
          </span>
          
          {/* Magnifying visual scan indicator */}
          <span className="w-6 h-6 rounded-full bg-zinc-950/70 border border-white/[0.05] flex items-center justify-center text-zinc-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
            <FiEye size={10} className="text-red-400" />
          </span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wide text-white group-hover:text-red-500 transition-colors duration-300">
            {item.title}
          </h3>
          <span className="text-[7.5px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-red-500" />
            Apex Biometrics
          </span>
        </div>
      </div>
    </motion.div>
  );
}
