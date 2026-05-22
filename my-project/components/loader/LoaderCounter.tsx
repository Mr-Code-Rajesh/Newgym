"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoaderCounterProps {
  duration?: number; // duration in ms
  onProgress?: (count: number) => void;
  onComplete: () => void;
}

export default function LoaderCounter({ duration = 3000, onProgress, onComplete }: LoaderCounterProps) {
  const [count, setCount] = useState(0);

  // Stable refs to prevent re-triggering the useEffect loop when parent re-renders
  const onProgressRef = React.useRef(onProgress);
  const onCompleteRef = React.useRef(onComplete);

  // Keep refs in sync with incoming callbacks
  useEffect(() => {
    onProgressRef.current = onProgress;
    onCompleteRef.current = onComplete;
  }, [onProgress, onComplete]);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animId: number;
    
    // Smooth ease-out counter using requestAnimationFrame
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      
      // Calculate progress (0 to 1)
      const progress = Math.min(elapsed / duration, 1);
      
      // Cinematic easing function: Cubic ease out
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentCount = Math.floor(easedProgress * 100);
      setCount(currentCount);

      if (onProgressRef.current) {
        onProgressRef.current(currentCount);
      }

      if (progress < 1) {
        animId = window.requestAnimationFrame(step);
      } else {
        onCompleteRef.current();
      }
    };

    // Delay counting slightly to allow logo drawing animation to start first
    const delayTimeout = setTimeout(() => {
      animId = window.requestAnimationFrame(step);
    }, 800);

    return () => {
      clearTimeout(delayTimeout);
      cancelAnimationFrame(animId);
    };
  }, [duration]);

  return (
    <div className="w-64 md:w-80 flex flex-col items-center select-none">
      {/* Percentage Count Typography */}
      <div className="flex items-baseline font-mono font-black text-white leading-none">
        {/* Padded counter to prevent shifting (e.g. "003", "047", "100") */}
        <span className="text-4xl md:text-5xl tracking-widest">
          {String(count).padStart(3, "0")}
        </span>
        <span className="text-xl md:text-2xl text-red-500 font-bold ml-1 tracking-wider">
          %
        </span>
      </div>

      {/* Progress Track Container */}
      <div className="mt-4 w-full h-[3px] bg-zinc-900 rounded-full overflow-hidden relative border border-white/[0.03]">
        {/* Active glowing progress fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-red-800 via-red-500 to-red-400 rounded-full"
          style={{ width: `${count}%` }}
          transition={{ ease: "easeOut" }}
        />
        
        {/* Running light particle indicator */}
        <motion.div
          className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          style={{ left: `${count - 10}%` }}
        />
      </div>

      {/* Technical HUD Label */}
      <div className="mt-2 flex justify-between w-full text-[8px] font-semibold uppercase tracking-[0.25em] text-zinc-500 font-sans">
        <span>Sys.Ready</span>
        <span className="animate-pulse">Loading Telemetry</span>
      </div>
    </div>
  );
}
