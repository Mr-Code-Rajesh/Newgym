"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface LoaderTextProps {
  show: boolean;
}

export default function LoaderText({ show }: LoaderTextProps) {
  const slogan = "TRAIN BEYOND LIMITS";
  
  // Split slogan into words
  const words = slogan.split(" ");

  // Container variants to stagger words
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  // Individual word animation variants
  const wordVariants: Variants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: { 
      y: 0, 
      opacity: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 1.0, 
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] // Custom ease-out cubic
      } 
    }
  };

  return (
    <div className="relative h-12 overflow-hidden flex items-center justify-center select-none">
      {show && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-4 md:gap-6 items-center"
        >
          {words.map((word, wordIndex) => (
            <div key={wordIndex} className="overflow-hidden py-1">
              <motion.span
                variants={wordVariants}
                className="inline-block text-lg md:text-xl font-bold tracking-[0.35em] text-white/90 uppercase font-sans drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
              >
                {/* Custom styling to highlight "LIMITS" in bold red */}
                {word === "LIMITS" ? (
                  <span className="text-red-500 font-extrabold drop-shadow-[0_0_12px_rgba(239,68,68,0.4)]">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
