"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true); // Defaults to dark luxury theme

  // Sync theme status on mount
  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(hasDarkClass);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    
    if (nextDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  };

  // Prevent server-side rendering mismatch
  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-zinc-950/40 border border-white/[0.08] flex items-center justify-center text-zinc-500" />
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="w-9 h-9 rounded-full bg-zinc-950/40 border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:border-red-500/20 shadow-md transition-all duration-300 outline-none cursor-pointer overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ y: 20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 90 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <FiMoon size={15} className="text-red-400 drop-shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
          ) : (
            <FiSun size={15} className="text-amber-500 drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
