"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroStats() {
  // Numeric count metrics
  const [members, setMembers] = useState(0);
  const [trainers, setTrainers] = useState(0);
  const [success, setSuccess] = useState(0);

  useEffect(() => {
    // Eased count up timers on mount
    const duration = 1500;
    const startTime = performance.now();

    const animateCounts = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic Ease Out

      setMembers(Math.floor(easedProgress * 15));
      setTrainers(Math.floor(easedProgress * 48));
      setSuccess(parseFloat((easedProgress * 99.4).toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(animateCounts);
      }
    };

    // Tiny mount delay to let primary layout draw first
    const delayTimeout = setTimeout(() => {
      requestAnimationFrame(animateCounts);
    }, 600);

    return () => clearTimeout(delayTimeout);
  }, []);

  const stats = [
    { value: `${members}K+`, label: "Members Active" },
    { value: `${trainers}+`, label: "Elite Coaches" },
    { value: `${success}%`, label: "Success Rate" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-white/[0.06] select-none w-full">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 1.2 + index * 0.1,
          }}
          className="flex flex-col gap-1.5"
        >
          {/* Monospaced Digit Counter */}
          <span className="text-2xl sm:text-3xl font-mono font-black text-white tracking-tight leading-none">
            {stat.value}
          </span>
          <span className="text-[8px] sm:text-[9px] font-black text-zinc-500 uppercase tracking-[0.25em] leading-none mt-0.5">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
