"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";

export default function HeroButtons() {
  const primaryRef = useRef<HTMLAnchorElement>(null);
  const secondaryRef = useRef<HTMLAnchorElement>(null);
  
  // Magnetic coordinates state
  const [coordsPrimary, setCoordsPrimary] = useState({ x: 0, y: 0 });
  const [coordsSecondary, setCoordsSecondary] = useState({ x: 0, y: 0 });

  // Handle magnetic movement on hover
  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement>,
    ref: React.RefObject<HTMLAnchorElement | null>,
    setCoords: (coords: { x: number; y: number }) => void
  ) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Limit pull radius to 15px max for natural feel
    setCoords({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = (setCoords: (coords: { x: number; y: number }) => void) => {
    setCoords({ x: 0, y: 0 });
  };

  // Smooth scroll handler
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const yOffset = -90;
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 mt-2 select-none w-full">
      {/* Primary: Join Now Magnetic Button */}
      <motion.a
        ref={primaryRef}
        href="#contact"
        onClick={(e) => handleScrollToSection(e, "contact")}
        onMouseMove={(e) => handleMouseMove(e, primaryRef, setCoordsPrimary)}
        onMouseLeave={() => handleMouseLeave(setCoordsPrimary)}
        animate={{ x: coordsPrimary.x, y: coordsPrimary.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-red-700 to-red-600 text-xs font-black uppercase tracking-widest text-white border border-red-500/25 flex items-center justify-center gap-2.5 shadow-[0_0_15px_rgba(239,68,68,0.25)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] cursor-pointer outline-none transition-all duration-300"
      >
        <span>Join Now</span>
        <FiArrowRight size={13} className="text-white" />
      </motion.a>

      {/* Secondary: View Classes Magnetic Button */}
      <motion.a
        ref={secondaryRef}
        href="#services"
        onClick={(e) => handleScrollToSection(e, "services")}
        onMouseMove={(e) => handleMouseMove(e, secondaryRef, setCoordsSecondary)}
        onMouseLeave={() => handleMouseLeave(setCoordsSecondary)}
        animate={{ x: coordsSecondary.x, y: coordsSecondary.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-zinc-950/30 backdrop-blur-md border border-white/[0.08] hover:border-white/20 text-xs font-black uppercase tracking-widest text-zinc-300 hover:text-white flex items-center justify-center gap-2.5 shadow-md cursor-pointer outline-none transition-all duration-300"
      >
        <FiPlay size={10} className="text-red-500" />
        <span>View Classes</span>
      </motion.a>
    </div>
  );
}
