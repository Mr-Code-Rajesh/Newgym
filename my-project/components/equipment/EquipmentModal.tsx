"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiActivity, FiCpu, FiCompass, FiTarget } from "react-icons/fi";
import EquipmentBadge from "./EquipmentBadge";
import { EquipmentItem } from "./EquipmentCard";

interface EquipmentModalProps {
  item: EquipmentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EquipmentModal({ item, isOpen, onClose }: EquipmentModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is active, and restore on unmount
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!item || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto select-none">
          {/* Glass backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.96, y: 30, opacity: 0 }}
            animate={{ 
              scale: 1, 
              y: 0, 
              opacity: 1,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
            }}
            exit={{ scale: 0.96, y: 30, opacity: 0, transition: { duration: 0.3 } }}
            className="relative z-10 w-full max-w-5xl rounded-3xl border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-zinc-950 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 shadow-[0_24px_64px_rgba(0,0,0,0.6)] overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-thin"
          >
            {/* Spotlight Accent Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[250px] h-[250px] rounded-full bg-red-600/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-15%] right-[-15%] w-[300px] h-[300px] rounded-full bg-zinc-800/10 blur-[130px] pointer-events-none" />

            {/* Accessible close button in top right */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              aria-label="Close details modal"
              className="absolute top-4 right-4 md:top-6 md:right-6 w-9 h-9 rounded-full bg-zinc-200/80 dark:bg-zinc-900/60 border border-zinc-300 dark:border-white/[0.08] flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-500 hover:border-red-500/20 shadow-md transition-all duration-300 outline-none cursor-pointer z-20"
            >
              <FiX size={16} />
            </motion.button>

            {/* Left Side: Large Equipment Image (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-center w-full relative aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/[0.05] bg-zinc-100 dark:bg-zinc-950">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center"
              />
            </div>

            {/* Right Side: Biometrics and Technical specifications (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col gap-6 w-full text-left">
              {/* Badges & Identity */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.05] text-[7.5px] font-black uppercase tracking-widest text-zinc-500 dark:text-red-400">
                    {item.categoryLabel}
                  </span>
                  <EquipmentBadge text={item.highlightBadge} glow />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 dark:text-white mt-1">
                  {item.name}
                </h2>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                  <span>System Spec Log #{4200 + item.id}</span>
                  <span>•</span>
                  <span>APEX Laboratory Asset</span>
                </div>
              </div>

              {/* Complete descriptive text */}
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium tracking-wide leading-relaxed">
                {item.description}
              </p>

              {/* Detailed Technical Specs Logs */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 flex items-center gap-1.5">
                  <FiCpu size={12} />
                  <span>Technical Biomechanical Specs</span>
                </span>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Load Adjustments */}
                  {item.techSpecs.loadAdjustment && (
                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/[0.04] bg-white dark:bg-zinc-900/10 flex flex-col gap-1.5">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Load Adjustment</span>
                      <span className="text-xs font-mono font-black text-zinc-800 dark:text-white">{item.techSpecs.loadAdjustment}</span>
                    </div>
                  )}

                  {/* Console Type */}
                  {item.techSpecs.consoleType && (
                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/[0.04] bg-white dark:bg-zinc-900/10 flex flex-col gap-1.5">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Telemetry Interface</span>
                      <span className="text-xs font-mono font-black text-zinc-800 dark:text-white">{item.techSpecs.consoleType}</span>
                    </div>
                  )}

                  {/* Telemetry Sensor */}
                  {item.techSpecs.telemetry && (
                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/[0.04] bg-white dark:bg-zinc-900/10 flex flex-col gap-1.5">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Wireless Connectivity</span>
                      <span className="text-xs font-mono font-black text-zinc-800 dark:text-white">{item.techSpecs.telemetry}</span>
                    </div>
                  )}

                  {/* Resistance Mechanism */}
                  {item.techSpecs.resistance && (
                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/[0.04] bg-white dark:bg-zinc-900/10 flex flex-col gap-1.5">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Resistance Type</span>
                      <span className="text-xs font-mono font-black text-zinc-800 dark:text-white">{item.techSpecs.resistance}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Targeted Muscle Groups */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 flex items-center gap-1.5">
                  <FiTarget size={12} />
                  <span>Targeted Neuromuscular Areas</span>
                </span>
                
                <div className="flex flex-wrap gap-2 select-none">
                  {item.targetedMuscles.map((muscle, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded bg-zinc-200/80 dark:bg-zinc-900/40 border border-zinc-300 dark:border-white/[0.05] text-[9px] font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-400"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trainer recommendations */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 flex items-center gap-1.5">
                  <FiCompass size={12} />
                  <span>Physiologist Recommendations</span>
                </span>
                
                <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.04] flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-lg bg-zinc-200 dark:bg-zinc-900 flex items-center justify-center text-red-500 shrink-0 mt-0.5 border border-zinc-300 dark:border-white/[0.03]">
                    <FiActivity size={12} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      Coordinating Physiologist Journal
                    </span>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium tracking-wide leading-relaxed">
                      {item.physiologistNotes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
