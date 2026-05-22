"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiMaximize2 } from "react-icons/fi";

interface ProductGalleryProps {
  image: string;
  title: string;
}

export default function ProductGallery({ image, title }: ProductGalleryProps) {
  const [zoom, setZoom] = useState(false);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/[0.04] bg-white dark:bg-zinc-950 backdrop-blur-md select-none group">
      {/* Target Crosshairs / Telemetry overlays for product zoom panel */}
      <div className="absolute inset-4 border border-white/[0.02] pointer-events-none z-10 hidden group-hover:block transition-all duration-300">
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-red-500/30" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-red-500/30" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-red-500/30" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-red-500/30" />
      </div>

      <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-transform duration-700 ease-out ${
            zoom ? "scale-125 cursor-zoom-out" : "scale-100 cursor-zoom-in"
          }`}
          onClick={() => setZoom(!zoom)}
          sizes="(max-w-768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Floating Zoom Tool Trigger Icon */}
      <button
        onClick={() => setZoom(!zoom)}
        className="absolute bottom-4 right-4 z-10 w-8 h-8 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 border border-white/[0.08] backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer outline-none"
        aria-label="Toggle zoom details"
      >
        <FiMaximize2 size={12} />
      </button>

      {/* High-tech overlay watermarks */}
      <div className="absolute top-4 left-4 z-10 px-2 py-0.5 rounded bg-zinc-950/80 border border-white/[0.08] backdrop-blur-md text-[7px] font-mono tracking-widest text-zinc-400 uppercase">
        VISUAL SPECS SHEET // LENS_01
      </div>
    </div>
  );
}
