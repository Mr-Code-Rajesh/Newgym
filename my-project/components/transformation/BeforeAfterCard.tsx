"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface BeforeAfterCardProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export default function BeforeAfterCard({
  beforeImage,
  afterImage,
  beforeAlt = "Before Transformation",
  afterAlt = "After Transformation",
  className,
}: BeforeAfterCardProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cinematic opening sequence: subtle sweep to reveal interactivity
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Smoothly animate the handle to show it can be dragged
      let start: number | null = null;
      const duration = 1200; // 1.2s

      const animateSweep = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const t = progress / duration;

        if (t < 1) {
          // Double sine wave bounce: oscillates around 50%
          const position = 50 + 15 * Math.sin(t * Math.PI * 2) * (1 - t);
          setSliderPosition(position);
          requestAnimationFrame(animateSweep);
        } else {
          setSliderPosition(50);
        }
      };

      requestAnimationFrame(animateSweep);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
    
    // Capture pointer to ensure dragging works even when mouse leaves window
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`relative overflow-hidden aspect-[4/5] w-full rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-white/[0.04] bg-zinc-100 dark:bg-zinc-950 select-none touch-none cursor-ew-resize group ${className}`}
    >
      {/* Before Image (Background layer) */}
      <div className="absolute inset-0 w-full h-full select-none">
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center grayscale brightness-75 select-none pointer-events-none"
        />
        {/* Absolute labels */}
        <span className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded bg-black/60 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-zinc-400 border border-white/[0.05] pointer-events-none">
          Before
        </span>
      </div>

      {/* After Image (Overlay sliding layer) */}
      <div
        className="absolute inset-0 w-full h-full select-none overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        {/* We keep this image full width so it doesn't compress or stretch when overlay width changes */}
        <div className="absolute top-0 left-0 w-full h-full" style={{ width: containerRef.current?.getBoundingClientRect().width || "100%" }}>
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center select-none pointer-events-none"
          />
        </div>
        {/* Absolute labels */}
        <span className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded bg-red-600/80 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-white border border-red-500/20 pointer-events-none">
          After
        </span>
      </div>

      {/* Divider Separator Line */}
      <div
        className="absolute top-0 bottom-0 z-30 w-[1px] bg-red-500 pointer-events-none"
        style={{
          left: `${sliderPosition}%`,
          boxShadow: "0 0 10px rgba(239, 68, 68, 0.8), 0 0 20px rgba(239, 68, 68, 0.4)",
        }}
      >
        {/* Handle grip */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-950 border border-red-500 flex items-center justify-between px-1.5 shadow-[0_0_15px_rgba(239,68,68,0.4)] group-hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-none">
          <FiChevronLeft size={13} className="text-red-500 animate-pulse" />
          <FiChevronRight size={13} className="text-red-500 animate-pulse" />
        </div>
      </div>

      {/* Overlay Highlight instructions reveal on hover */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[8px] font-bold uppercase tracking-widest text-white border border-white/[0.04] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Drag Slider to Compare
      </div>
    </div>
  );
}
