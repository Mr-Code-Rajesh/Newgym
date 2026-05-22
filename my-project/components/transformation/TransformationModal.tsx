"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle, FiTrendingUp, FiTrendingDown, FiActivity } from "react-icons/fi";
import BeforeAfterCard from "./BeforeAfterCard";
import TransformationBadge from "./TransformationBadge";
import { MemberTransformation } from "./TransformationCard";

interface TransformationModalProps {
  member: MemberTransformation | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TransformationModal({ member, isOpen, onClose }: TransformationModalProps) {
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

  if (!member || !mounted) return null;

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

            {/* Left Side: Large Compare Slider (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-center w-full">
              <BeforeAfterCard
                beforeImage={member.beforeImage}
                afterImage={member.afterImage}
                beforeAlt={`${member.name} Large Before Image`}
                afterAlt={`${member.name} Large After Image`}
                className="shadow-[0_16px_48px_rgba(0,0,0,0.4)] border border-zinc-200 dark:border-white/[0.05]"
              />
            </div>

            {/* Right Side: Biometrics and Biography (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col gap-6 w-full text-left">
              {/* Badges & Identity */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <TransformationBadge text={member.duration} variant="duration" />
                  <TransformationBadge text={member.goal} variant="goal" glow />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 dark:text-white mt-1">
                  {member.name}
                </h2>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                  <span>Subject Ident ID #{2840 + member.id}</span>
                  <span>•</span>
                  <span>APEX Bio-Vault Recalibration</span>
                </div>
              </div>

              {/* Emotional Quote Segment */}
              <blockquote className="relative p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900/35 border-l-2 border-red-500 border-y border-r border-zinc-200 dark:border-white/[0.04]">
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium italic tracking-wide leading-relaxed">
                  "{member.quote}"
                </p>
              </blockquote>

              {/* Detailed Biometric Telemetry */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
                  Biomechanical Telemetry Logs
                </span>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* VO2 Max Indicator */}
                  {member.biometrics.vo2max && (
                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/[0.04] bg-white dark:bg-zinc-900/10 flex flex-col gap-1.5">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">VO2 Max Capacity</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-mono font-black text-zinc-800 dark:text-white">{member.biometrics.vo2max}</span>
                        <FiTrendingUp size={11} className="text-red-500" />
                      </div>
                    </div>
                  )}

                  {/* Absolute Strength Index */}
                  {member.biometrics.strengthIndex && (
                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/[0.04] bg-white dark:bg-zinc-900/10 flex flex-col gap-1.5">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Absolute Force Index</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-mono font-black text-zinc-800 dark:text-white">{member.biometrics.strengthIndex}</span>
                        <FiTrendingUp size={11} className="text-red-500" />
                      </div>
                    </div>
                  )}

                  {/* Recovery Rate Reduction */}
                  {member.biometrics.recoveryTime && (
                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/[0.04] bg-white dark:bg-zinc-900/10 flex flex-col gap-1.5">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Recovery Interval</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-mono font-black text-zinc-800 dark:text-white">{member.biometrics.recoveryTime}</span>
                        <FiTrendingDown size={11} className="text-green-500 dark:text-green-400" />
                      </div>
                    </div>
                  )}

                  {/* Body Fat Comparison */}
                  {member.biometrics.bodyFatBefore && member.biometrics.bodyFatAfter && (
                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/[0.04] bg-white dark:bg-zinc-900/10 flex flex-col gap-1.5">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Body Fat Delta</span>
                      <div className="flex items-center gap-1.5 text-xs font-mono font-black text-zinc-800 dark:text-white">
                        <span className="text-zinc-400 dark:text-zinc-500 line-through">{member.biometrics.bodyFatBefore}</span>
                        <FiTrendingDown size={11} className="text-green-500 dark:text-green-400" />
                        <span className="text-red-500">{member.biometrics.bodyFatAfter}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Physiologist Recommendation / Trainer Notes */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
                  Apex Training Officer Logs
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
                      {member.trainerNotes}
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
