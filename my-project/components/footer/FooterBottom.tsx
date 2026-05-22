"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronUp } from "react-icons/fi";

export default function FooterBottom() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 1. Scroll tracking observer for floating Scroll-to-Top trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-5 select-none text-[9.5px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 border-t border-zinc-200 dark:border-white/[0.04] pt-6 pb-8 relative z-20">
      {/* Dynamic Copyright Year */}
      <div className="text-center sm:text-left">
        <span>© {currentYear} APEX CORE. ALL RIGHTS SHIELDED.</span>
      </div>

      {/* Policies Quick Links */}
      <div className="flex items-center gap-4">
        <a href="#contact" className="hover:text-red-500 transition-colors duration-200">
          PRIVACY SCHEMAS
        </a>
        <span>•</span>
        <a href="#contact" className="hover:text-red-500 transition-colors duration-200">
          TERMS PROTOCOL
        </a>
      </div>

      {/* Watermark Credits */}
      <div className="text-center sm:text-right text-zinc-400/60 dark:text-zinc-500/40">
        DESIGNED BY APEX NEURAL STUDIO
      </div>

      {/* 2. Floating spring-powered Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="fixed bottom-20 right-6 sm:bottom-8 sm:right-8 z-50 w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-[0_5px_15px_rgba(239,68,68,0.35)] hover:shadow-[0_8px_20px_rgba(239,68,68,0.5)] transition-all duration-300 outline-none cursor-pointer"
          >
            <FiChevronUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
