"use client";

import React from "react";
import { motion } from "framer-motion";

interface LoaderBackgroundProps {
  theme?: "dark" | "light";
}

export default function LoaderBackground({ theme = "dark" }: LoaderBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black select-none pointer-events-none">
      {/* Dynamic Radial Ambient Energy Glows (Glow Red / Silver depending on theme) */}
      <div className="absolute inset-0 z-0">
        {/* Center/Top cinematic spotlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full bg-red-600/30 blur-[120px] dark:bg-red-600/20"
        />

        {/* Bottom-right counter-balance glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.08, 0.15, 0.08],
            scale: [0.9, 1.05, 0.9],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-[20%] right-[-10%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-red-700/20 blur-[100px] dark:bg-red-900/15"
        />

        {/* Bottom-left cinematic subtle light streak */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent rotate-12 blur-[1px]"
        />
      </div>

      {/* Repeating Film Grain Overlay Effect - GPU-Optimized with CSS Animation */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.06] mix-blend-overlay">
        <div 
          className="w-[300%] h-[300%] absolute -top-full -left-full bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3D%22www.w3.org%202000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22%2F%3E%3C%2Fsvg%3E')] bg-repeat animate-grain"
          style={{
            animation: "grain 0.8s steps(6) infinite"
          }}
        />
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.95)_100%)]" />

      {/* Soundwave/Pulse horizontal geometric aesthetic lines */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[300px] z-10 opacity-[0.03] flex flex-col justify-between pointer-events-none">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>
    </div>
  );
}
