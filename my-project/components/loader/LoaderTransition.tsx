"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface LoaderTransitionProps {
  isExiting: boolean;
  onTransitionComplete: () => void;
}

export default function LoaderTransition({ isExiting, onTransitionComplete }: LoaderTransitionProps) {
  // Top shutter slides upwards
  const shutterTopVariants: Variants = {
    initial: { y: "0%" },
    exit: { 
      y: "-100%",
      transition: { 
        duration: 1.0, 
        ease: [0.85, 0, 0.15, 1] as [number, number, number, number], // Custom heavy ease
        delay: 0.5 
      }
    }
  };

  // Bottom shutter slides downwards
  const shutterBottomVariants: Variants = {
    initial: { y: "0%" },
    exit: { 
      y: "100%",
      transition: { 
        duration: 1.0, 
        ease: [0.85, 0, 0.15, 1] as [number, number, number, number],
        delay: 0.5 
      }
    }
  };

  // Red Energy Streak Sweep
  const streakVariants: Variants = {
    initial: { x: "-100vw", skewX: -30 },
    exit: {
      x: "150vw",
      transition: {
        duration: 1.2,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
        delay: 0.1
      }
    }
  };

  // White Cinematic Flash Frame
  const flashVariants: Variants = {
    initial: { opacity: 0 },
    exit: {
      opacity: [0, 1, 0],
      transition: {
        duration: 0.6,
        times: [0, 0.2, 1],
        ease: "easeOut",
        delay: 0.4
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none">
      {isExiting && (
        <>
          {/* Shutter Wipe - Top Curtain */}
          <motion.div
            variants={shutterTopVariants}
            initial="initial"
            animate="exit"
            className="absolute top-0 left-0 w-full h-1/2 bg-black border-b border-red-500/10"
          />

          {/* Shutter Wipe - Bottom Curtain */}
          <motion.div
            variants={shutterBottomVariants}
            initial="initial"
            animate="exit"
            onAnimationComplete={(definition) => {
              // Once the shutters finish sliding out, notify parent to fully unmount
              if (definition === "exit") {
                onTransitionComplete();
              }
            }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-black border-t border-red-500/10"
          />

          {/* Red Energy Streak Sweep */}
          <motion.div
            variants={streakVariants}
            initial="initial"
            animate="exit"
            className="absolute top-0 bottom-0 w-[400px] bg-gradient-to-r from-transparent via-red-600 to-transparent blur-md opacity-90 mix-blend-screen"
            style={{
              height: "200%",
              top: "-50%"
            }}
          />
          
          <motion.div
            variants={streakVariants}
            initial="initial"
            animate="exit"
            className="absolute top-0 bottom-0 w-[15px] bg-white blur-[2px] opacity-100 mix-blend-screen"
            style={{
              height: "200%",
              top: "-50%"
            }}
          />

          {/* Cinematic Flash Frame */}
          <motion.div
            variants={flashVariants}
            initial="initial"
            animate="exit"
            className="absolute inset-0 bg-white mix-blend-screen z-[60]"
          />
        </>
      )}
    </div>
  );
}
