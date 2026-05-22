"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { FiX, FiActivity, FiChevronDown } from "react-icons/fi";
import { groupLinks } from "./NavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function MobileMenu({ isOpen, onClose, activeSection, setActiveSection }: MobileMenuProps) {
  const router = useRouter();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Lock body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Drawer variants
  const drawerVariants: Variants = {
    hidden: { x: "100%", transition: { type: "spring", stiffness: 380, damping: 38 } },
    visible: { 
      x: "0%", 
      transition: { 
        type: "spring", 
        stiffness: 320, 
        damping: 32,
        staggerChildren: 0.05,
        delayChildren: 0.05
      } 
    }
  };

  // Staggered items variants
  const itemVariants: Variants = {
    hidden: { x: 20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>, 
    href: string, 
    isExternal?: boolean
  ) => {
    if (isExternal) {
      onClose();
      return;
    }

    e.preventDefault();
    onClose();
    
    // Slight delay to allow sliding close animation to finish first before scrolling
    setTimeout(() => {
      const id = href.replace("#", "");

      // If we are currently on a sub-route (like /products), redirect back to homepage + anchor hash
      if (window.location.pathname !== "/") {
        router.push(`/${href}`);
        return;
      }

      const targetElement = document.getElementById(id);
      if (targetElement) {
        const yOffset = -90;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        setActiveSection(id);
      }
    }, 300);
  };

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-auto cursor-pointer"
      />

      {/* Slide Drawer panel */}
      <motion.div
        variants={drawerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className="absolute top-0 bottom-0 right-0 w-4/5 max-w-[340px] bg-zinc-950/95 backdrop-blur-2xl border-l border-white/[0.08] shadow-[0_0_40px_rgba(0,0,0,0.8)] p-6 flex flex-col justify-between pointer-events-auto"
      >
        {/* Header Title & Close Button */}
        <div className="flex items-center justify-between border-b border-white/[0.05] pb-5 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-red-650 flex items-center justify-center font-bold text-xs shadow-[0_0_8px_rgba(239,68,68,0.3)]">
              A
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
              Apex Portal
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            aria-label="Close menu"
            className="w-8 h-8 rounded-full border border-white/[0.08] bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white transition-colors outline-none cursor-pointer"
          >
            <FiX size={15} />
          </motion.button>
        </div>

        {/* Links Navigation Stagger (Scrollable if content overflows) */}
        <nav className="flex-1 overflow-y-auto my-6 pr-1 py-4 flex flex-col gap-4 min-h-0 text-left">
          {groupLinks.map((item) => {
            const hasDropdown = !!item.dropdown;
            const isAccOpen = openAccordion === item.name;
            const rootId = item.href ? item.href.replace("#", "") : "";
            const isRootActive = item.href ? activeSection === rootId : false;

            return (
              <motion.div key={item.name} variants={itemVariants} className="flex flex-col">
                {hasDropdown ? (
                  /* Accordion root toggle button */
                  <button
                    onClick={() => toggleAccordion(item.name)}
                    className="text-md font-black uppercase tracking-[0.15em] flex items-center justify-between py-2 text-zinc-400 hover:text-white transition-colors cursor-pointer outline-none w-full text-left"
                  >
                    <span>{item.name}</span>
                    <motion.span
                      animate={{ rotate: isAccOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-zinc-500"
                    >
                      <FiChevronDown size={14} />
                    </motion.span>
                  </button>
                ) : (
                  /* Standard flat link */
                  <Link
                    href={item.href || ""}
                    onClick={(e) => handleLinkClick(e, item.href || "", item.isExternal)}
                    className={`text-md font-black uppercase tracking-[0.15em] flex items-center justify-between py-2 transition-colors duration-200 outline-none ${
                      isRootActive ? "text-red-500" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span>{item.name}</span>
                    {isRootActive && (
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
                    )}
                  </Link>
                )}

                {/* Dropdown Items list */}
                <AnimatePresence initial={false}>
                  {hasDropdown && isAccOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden pl-4 border-l border-white/[0.04] mt-1 flex flex-col gap-1"
                    >
                      {item.dropdown?.map((sub) => {
                        const subId = sub.href.replace("#", "");
                        const isSubActive = activeSection === subId;

                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={(e) => handleLinkClick(e, sub.href, sub.isExternal)}
                            className={`py-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors ${
                              isSubActive ? "text-red-500" : "text-zinc-500 hover:text-zinc-300"
                            }`}
                          >
                            <span className={`w-1 h-1 rounded-full ${
                              isSubActive ? "bg-red-500" : "bg-zinc-700"
                            }`} />
                            {sub.name}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer Biometrics watermark */}
        <div className="border-t border-white/[0.05] pt-5 shrink-0 flex flex-col gap-3">
          <div className="flex items-center gap-2 opacity-50">
            <FiActivity size={12} className="text-red-500 animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">
              System Telemetry Active
            </span>
          </div>
          
          <div className="text-[7.5px] text-zinc-650 font-semibold tracking-wider text-left">
            APEX ATHLETICS © 2026. <br />
            Designed for Peak Performance.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
