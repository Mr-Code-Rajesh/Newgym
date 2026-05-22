"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiX, FiActivity } from "react-icons/fi";
import { GalleryItem } from "./GalleryCard";

interface GalleryModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export default function GalleryModal({ item, onClose }: GalleryModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Lock document body scroll when modal is active
  useEffect(() => {
    if (!item) return;
    
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [item]);

  // 2. Listen to Escape keypress for closing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!item || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none outline-none overflow-y-auto"
    >
      {/* 3. Dark backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/95 dark:bg-black/98 backdrop-blur-md cursor-zoom-out"
      />

      {/* 4. Modal visual window container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="relative w-full max-w-4xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.06] rounded-3xl shadow-[0_20px_50px_rgba(239,68,68,0.15)] flex flex-col z-10 max-h-[90vh] overflow-y-auto scrollbar-thin"
      >
        {/* Close button top right */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          aria-label="Close interactive modal"
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.1] flex items-center justify-center text-zinc-300 hover:text-white hover:border-red-500/20 transition-all duration-300 outline-none cursor-pointer"
        >
          <FiX size={15} />
        </motion.button>

        {/* Cinematic optimized image display box */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/8] bg-zinc-200 dark:bg-zinc-900 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            priority
            className="object-cover"
          />
          {/* Subtle gradient overlay to mask image detail text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 pointer-events-none" />
        </div>

        {/* Narrative & telemetry text specs box */}
        <div className="p-6 md:p-8 flex flex-col gap-4 text-zinc-900 dark:text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-red-600/10 dark:bg-red-600/10 border border-red-500/20 text-[8px] font-black uppercase tracking-widest text-red-600 dark:text-red-400">
                  {item.category}
                </span>
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                  <FiActivity size={8} className="text-red-500 animate-pulse" />
                  Apex Active Arena
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-wide text-zinc-950 dark:text-white mt-1">
                {item.title}
              </h3>
            </div>
            
            <div className="text-right hidden sm:flex flex-col text-[8px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <span>Biometric Node: #{(item.id + 100).toString(16).toUpperCase()}</span>
              <span>Resolution: Cinematic High-Def</span>
            </div>
          </div>

          <p className="text-xs font-medium tracking-wide leading-relaxed text-zinc-600 dark:text-zinc-400">
            {item.category === "interior" && 
              "Designed with biomechanically synchronized zones, clinical ventilation systems, and specialized ambient acoustics to trigger deep psychological flow states during heavy load sets."
            }
            {item.category === "workout" && 
              "Every velocity rep and mechanical contraction is structured around clinical biomechanical blueprints. Elevate metabolic output and leverage absolute movement efficiency."
            }
            {item.category === "strength" && 
              "Calibrated high-mass load zones engineered for maximum neuromuscular response, tension optimization, and joint security through clinical-grade resistance calibration."
            }
            {item.category === "trainers" && 
              "Direct coordinated oversight by board-certified exercise physiologists. Access real-time movement profiling, telemetry integration, and precise physical programming."
            }
            {item.category === "cardio" && 
              "Oxygenation-focused intervals using real-time biomechanical telemetry to map exact cardiovascular output, metabolic heart rate thresholds, and cellular respiration levels."
            }
          </p>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
