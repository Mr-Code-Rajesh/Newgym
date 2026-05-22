"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import AboutFeatures from "./AboutFeatures";

export default function AboutContent() {
  // Smooth scroll handler
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById("contact");
    if (targetElement) {
      const yOffset = -90;
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 18
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start select-none w-full"
    >
      {/* 1. Section Label */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-2 text-[10px] font-black tracking-[0.4em] uppercase text-red-500"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping shadow-[0_0_6px_#ef4444]" />
        <span>About Our Sanctuary</span>
      </motion.div>

      {/* 2. Bold Cinematic Heading */}
      <motion.h2
        variants={itemVariants}
        className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.95] text-white"
      >
        Transform Your Body. <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.15)]">
          Elevate Your Mind.
        </span>
      </motion.h2>

      {/* 3. Short Premium Description */}
      <motion.p
        variants={itemVariants}
        className="text-xs sm:text-sm text-zinc-400 font-medium tracking-wide leading-relaxed max-w-lg"
      >
        APEX is not just a gym—it is a biomechanical research sanctuary and athletic development lab. We believe physical limits are simply data parameters waiting to be recalibrated. Through high-performance neural metrics and raw conditioning workouts, we map your ultimate evolution.
      </motion.p>

      {/* 4. Feature Highlights Grid */}
      <motion.div variants={itemVariants} className="w-full my-2">
        <AboutFeatures />
      </motion.div>

      {/* 5. Start Journey CTA Button */}
      <motion.a
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        href="#contact"
        onClick={handleScrollToContact}
        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-red-700 to-red-600 text-xs font-black uppercase tracking-widest text-white border border-red-500/25 flex items-center justify-center gap-2.5 shadow-[0_0_15px_rgba(239,68,68,0.25)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] cursor-pointer outline-none transition-all duration-300 mt-2"
      >
        <span>Start Your Journey</span>
        <FiArrowRight size={13} className="text-white" />
      </motion.a>
    </motion.div>
  );
}
