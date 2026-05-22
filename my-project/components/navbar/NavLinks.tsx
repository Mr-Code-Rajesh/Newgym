"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

interface NavLinksProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

// 1. Original flat links exported for MobileMenu backwards compatibility
export const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Coaches", href: "#coaches" },
  { name: "Gallery", href: "#gallery" },
  { name: "Calculator", href: "#calculator" },
  { name: "Stories", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
  { name: "Services", href: "#services" },
  { name: "Pricing", href: "#pricing" },
  { name: "Blog", href: "#blog" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "#contact" },
];

// 2. Structured Groupings: exactly 6 root categories for Desktop Navbar
export interface NavItem {
  name: string;
  href?: string;
  isExternal?: boolean;
  dropdown?: { name: string; href: string; desc?: string; isExternal?: boolean }[];
}

export const groupLinks: NavItem[] = [
  { name: "Home", href: "#home" },
  {
    name: "About",
    dropdown: [
      { name: "Our Story", href: "#about", desc: "Our core values & credentials" },
      { name: "Elite Coaches", href: "#coaches", desc: "Expert biomechanics coaches" },
      { name: "Success Stories", href: "#testimonials", desc: "Member biometric transformations" },
    ],
  },
  {
    name: "Services",
    dropdown: [
      { name: "Gym Programs", href: "#services", desc: "Active training disciplines" },
      { name: "Pricing Tiers", href: "#pricing", desc: "Biometrics subscription tiers" },
      { name: "Gym Equipment", href: "#equipment", desc: "Tour our active training systems" },
      { name: "Bento Gallery", href: "#gallery", desc: "Vibrant high-contrast athletic spaces" },
      { name: "FAQ Help", href: "#faq", desc: "Access common telemetry answers" },
      { name: "Blog Briefs", href: "#blog", desc: "Metabolic news digests" },
    ],
  },
  {
    name: "GymTools",
    dropdown: [
      { name: "Consistency Dashboard", href: "/consistency", desc: "Macro attendance metrics logs", isExternal: true },
      { name: "Workspace Hub", href: "/gymtool", desc: "Central interactive dashboard", isExternal: true },
      { name: "Bio Calculator", href: "#calculator", desc: "Calorie & macro targets Mifflins" },
      { name: "HIIT Workstation", href: "/gymtool", desc: "Interval timer engine", isExternal: true },
      { name: "Cardio Logs", href: "/gymtool", desc: "Step tracking displacements", isExternal: true },
      { name: "Hydration Cells", href: "/gymtool", desc: "Daily fluid loaders log", isExternal: true },
      { name: "Streak XP", href: "/gymtool", desc: "Level achievement indexes", isExternal: true },
      { name: "Calorie Charts", href: "/gymtool", desc: "Energy burn maps visualizer", isExternal: true },
    ],
  },
  { name: "Products", href: "/products", isExternal: true },
  { name: "Contact", href: "#contact" },
];

export default function NavLinks({ activeSection, setActiveSection }: NavLinksProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Smooth scroll handler with cross-route protection
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isExternal?: boolean
  ) => {
    if (isExternal) {
      // Allow default router navigation
      return;
    }

    e.preventDefault();
    const id = href.replace("#", "");

    // Direct home navigation if on a sub-route
    if (window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }

    const targetElement = document.getElementById(id);
    if (targetElement) {
      const yOffset = -90;
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });

      setActiveSection(id);
    }
    setOpenDropdown(null);
  };

  return (
    <nav className="flex items-center gap-8 select-none relative">
      {groupLinks.map((item) => {
        const hasDropdown = !!item.dropdown;
        const id = item.href ? item.href.replace("#", "") : "";
        const isActive = item.href ? activeSection === id : false;
        const isHovered = hoveredLink === item.name;

        return (
          <div
            key={item.name}
            onMouseEnter={() => {
              setHoveredLink(item.name);
              if (hasDropdown) setOpenDropdown(item.name);
            }}
            onMouseLeave={() => {
              setHoveredLink(null);
              setOpenDropdown(null);
            }}
            className="relative py-4 flex items-center gap-1 cursor-pointer"
          >
            {/* Root Menu Button */}
            {item.href ? (
              <a
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href || "", item.isExternal)}
                className="text-xs font-black uppercase tracking-[0.25em] transition-all duration-300 outline-none focus:text-white flex items-center gap-1"
                style={{
                  color: isActive
                    ? "#ffffff"
                    : hoveredLink && !isHovered
                    ? "rgba(161, 161, 170, 0.4)"
                    : "rgba(161, 161, 170, 0.85)",
                }}
              >
                <span
                  className={`transition-all duration-300 ${
                    hoveredLink && !isHovered ? "blur-[0.5px]" : "blur-0"
                  }`}
                >
                  {item.name}
                </span>
              </a>
            ) : (
              <span
                className="text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 outline-none flex items-center gap-1"
                style={{
                  color:
                    hoveredLink && !isHovered
                      ? "rgba(161, 161, 170, 0.4)"
                      : "rgba(161, 161, 170, 0.85)",
                }}
              >
                <span
                  className={`transition-all duration-300 ${
                    hoveredLink && !isHovered ? "blur-[0.5px]" : "blur-0"
                  }`}
                >
                  {item.name}
                </span>
                <motion.span
                  animate={{ rotate: openDropdown === item.name ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-zinc-500 flex items-center"
                >
                  <FiChevronDown size={11} />
                </motion.span>
              </span>
            )}

            {/* Root Active Indicator Underline */}
            {isActive && (
              <motion.div
                layoutId="activeNavLine"
                className="absolute bottom-1 left-0 right-0 h-[2px] bg-red-500 rounded-full"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  boxShadow: "0 0 10px rgba(239, 68, 68, 0.8), 0 0 4px rgba(239, 68, 68, 0.4)",
                }}
              />
            )}

            {/* Dropdown Panel rendering */}
            <AnimatePresence>
              {openDropdown === item.name && hasDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.08] backdrop-blur-xl p-3 shadow-xl flex flex-col gap-1 z-50 text-left"
                >
                  {item.dropdown?.map((sub) => (
                    <a
                      key={sub.name}
                      href={sub.href}
                      onClick={(e) => handleLinkClick(e, sub.href, sub.isExternal)}
                      className="group flex flex-col p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors duration-200 outline-none"
                    >
                      <div className="flex items-center gap-1.5 text-[9.5px] font-black uppercase tracking-widest text-zinc-950 dark:text-white group-hover:text-red-500 transition-colors">
                        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-800 group-hover:bg-red-500 transition-colors" />
                        {sub.name}
                      </div>
                      {sub.desc && (
                        <span className="text-[8.5px] text-zinc-400 dark:text-zinc-500 font-semibold mt-0.5 ml-2.5 leading-tight">
                          {sub.desc}
                        </span>
                      )}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}
