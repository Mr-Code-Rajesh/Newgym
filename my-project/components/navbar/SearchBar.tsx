"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiActivity, FiZap, FiTarget } from "react-icons/fi";

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock luxury search indices
  const mockIndices = [
    { title: "Hyper-Velocity Cardio", type: "Telemetry Class", link: "#services", icon: FiZap },
    { title: "Force Biometrics Lift", type: "Strength Class", link: "#services", icon: FiTarget },
    { title: "Neural Reflex Mobility", type: "Recovery Class", link: "#services", icon: FiActivity },
    { title: "Biometric Telemetry Monitoring", type: "Technology", link: "#about", icon: FiActivity },
  ];

  const filteredResults = query.trim() === "" 
    ? [] 
    : mockIndices.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsFocused(false);
      setQuery("");
      inputRef.current?.blur();
    }
  };

  const handleResultClick = (link: string) => {
    setIsFocused(false);
    setQuery("");
    
    const id = link.replace("#", "");
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const yOffset = -90;
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative z-30 select-none">
      {/* Expanding Container */}
      <motion.div 
        animate={{ 
          width: isFocused ? 240 : 130,
          borderColor: isFocused ? "rgba(239, 68, 68, 0.4)" : "rgba(255, 255, 255, 0.08)"
        }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="h-9 px-3 rounded-full border bg-zinc-950/40 backdrop-blur-md flex items-center gap-2 overflow-hidden"
      >
        <FiSearch className={`transition-colors duration-300 ${
          isFocused ? "text-red-500" : "text-zinc-500"
        }`} size={14} />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={isFocused ? "Search telemetry, workouts..." : "Search..."}
          aria-label="Search fitness platform"
          className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-zinc-500 font-sans tracking-wide leading-none"
        />

        <AnimatePresence>
          {(isFocused || query !== "") && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => {
                setQuery("");
                setIsFocused(false);
                inputRef.current?.blur();
              }}
              className="text-zinc-500 hover:text-white transition-colors duration-300 focus:outline-none"
            >
              <FiX size={13} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Luxury Telemetry Dropdown Results */}
      <AnimatePresence>
        {isFocused && query.trim() !== "" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-11 right-0 w-[280px] p-4 rounded-2xl border border-white/[0.08] bg-zinc-950/95 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] flex flex-col gap-3"
          >
            <div className="text-[8px] font-black uppercase tracking-[0.25em] text-zinc-500 border-b border-white/[0.05] pb-2">
              Telemetry Matches ({filteredResults.length})
            </div>

            <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1">
              {filteredResults.length > 0 ? (
                filteredResults.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleResultClick(item.link)}
                      className="w-full text-left p-2.5 rounded-xl border border-transparent hover:border-white/[0.05] hover:bg-white/[0.03] flex items-center justify-between gap-3 group transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/[0.03] flex items-center justify-center text-zinc-500 group-hover:text-red-500 group-hover:border-red-500/10 transition-colors duration-300">
                          <Icon size={12} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[11px] font-black tracking-wide text-white uppercase group-hover:text-red-500 transition-colors duration-300">
                            {item.title}
                          </span>
                          <span className="text-[7.5px] font-extrabold text-zinc-500 uppercase tracking-widest">
                            {item.type}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-6 text-center flex flex-col items-center justify-center gap-2">
                  <FiActivity className="text-zinc-700 animate-pulse" size={24} />
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                    No Telemetry Records Found
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
