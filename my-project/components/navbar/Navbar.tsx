"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import NavbarLogo from "./NavbarLogo";
import NavLinks from "./NavLinks";
import CartButton from "./CartButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Custom AI Search Overlay State
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle window scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut: ESC to close search panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSearch(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // IntersectionObserver scroll spy to track active sections
  useEffect(() => {
    const sections = ["home", "about", "coaches", "gallery", "calculator", "testimonials", "faq", "services", "pricing", "blog", "contact"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Focus middle of the viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Mapped Search Engine Keywords for AI search command panel
  const searchRoutes = [
    { name: "Consistency Dashboard", href: "/consistency", desc: "Premium active biometric attendance tracker" },
    { name: "HIIT Workstation", href: "/gymtool", desc: "Interactive interval training clocks" },
    { name: "Step Telemetry", href: "/gymtool", desc: "Cardio displacement logs steps tracker" },
    { name: "Hydration Cells", href: "/gymtool", desc: "Dynamic fluid loader wave charts" },
    { name: "Streak Achievements", href: "/gymtool", desc: "Consecutive check-offs and XP achievements" },
    { name: "Calorie Burn Map", href: "/gymtool", desc: "Workout energy analytics vertical chart" },
    { name: "Bio Calculator", href: "#calculator", desc: "Science-based calorie Mifflin targets calculator" },
    { name: "Elite Coaches", href: "#coaches", desc: "Performance biometrics trainers listing" },
    { name: "Pricing Plans", href: "#pricing", desc: "Membership billing plans & tiers" },
    { name: "Success Stories", href: "#testimonials", desc: "Member biometric tracking cases stories" },
    { name: "FAQ Help Portal", href: "#faq", desc: "Biometrics and memberships common details" },
  ];

  const filteredRoutes = searchQuery
    ? searchRoutes.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchRoutes.slice(0, 4); // Default links showcase top 4

  const handleSearchSelect = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setShowSearch(false);
    setSearchQuery("");

    if (href.startsWith("/")) {
      // standard next redirection
      return;
    }

    e.preventDefault();
    const id = href.replace("#", "");

    if (window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }

    const target = document.getElementById(id);
    if (target) {
      const yOffset = -90;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* Sticky header container */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1], // Premium ease out
          delay: 0.2 
        }}
        className="fixed top-0 inset-x-0 z-40 w-full transition-all duration-500"
      >
        <div 
          className={`w-full transition-all duration-500 flex items-center justify-between px-6 md:px-12 py-4 ${
            scrolled 
              ? "bg-zinc-950/80 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
              : "bg-transparent border-b border-transparent py-5"
          }`}
          style={{
            boxShadow: scrolled 
              ? "0 4px 30px rgba(0,0,0,0.4), inset 0 -1px 0 rgba(239,68,68,0.05)"
              : "none"
          }}
        >
          {/* Logo brand component */}
          <NavbarLogo />

          {/* Desktop link items */}
          <div className="hidden lg:flex items-center">
            <NavLinks activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>

          {/* Desktop Shop, Search Icon, CTA Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* 1. Custom Command Search Trigger Icon */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Toggle custom AI Search Console"
              className="w-9 h-9 rounded-full border border-white/[0.08] bg-zinc-950/40 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-500/20 transition-all duration-300 outline-none cursor-pointer"
            >
              {showSearch ? <FiX size={15} /> : <FiSearch size={15} />}
            </motion.button>
            
            <div className="flex items-center gap-3 border-l border-white/[0.08] pl-4">
              <CartButton />
            </div>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-red-700 to-red-600 text-[10px] font-black uppercase tracking-widest text-white border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-500 cursor-pointer"
            >
              Join Now
            </motion.a>
          </div>

          {/* Mobile Actions: Hamburgers, Search, Shop */}
          <div className="flex lg:hidden items-center gap-3.5">
            {/* Quick search icon trigger for mobile */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Toggle custom mobile Search Console"
              className="w-9 h-9 rounded-full border border-white/[0.08] bg-zinc-950/40 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-500/20 transition-all duration-300 outline-none cursor-pointer"
            >
              {showSearch ? <FiX size={14} /> : <FiSearch size={14} />}
            </motion.button>

            <CartButton />

            {/* Accessible hamburger menu trigger button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="w-9 h-9 rounded-full bg-zinc-950/40 border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-300 outline-none cursor-pointer"
            >
              <FiMenu size={16} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* 2. Premium 70% Width AI Search Console Overlay */}
      <AnimatePresence>
        {showSearch && (
          <>
            {/* Search Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSearch(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 cursor-pointer pointer-events-auto"
            />

            {/* Slide Down Search Panel */}
            <motion.div
              initial={{ opacity: 0, y: -25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[84px] left-1/2 -translate-x-1/2 z-35 w-[70vw] max-w-3xl rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.08] backdrop-blur-2xl p-5 shadow-2xl flex flex-col gap-4 text-left pointer-events-auto"
            >
              {/* Command style search bar row */}
              <div className="flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/[0.04] focus-within:border-red-500/40 transition-all duration-300">
                <FiSearch size={16} className="text-zinc-400" />
                <input
                  type="text"
                  placeholder="SEARCH ATHLETIC PROGRAMS, BIOMETRICS OR SECURE UPLINKS..."
                  className="flex-1 bg-transparent border-none outline-none text-[10.5px] font-black tracking-widest text-zinc-950 dark:text-white placeholder-zinc-400/80"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="text-[7.5px] font-black text-zinc-400 border border-zinc-200 dark:border-white/[0.08] px-1.5 py-0.5 rounded select-none">ESC</span>
              </div>

              {/* Command lists search routes results */}
              <div className="flex flex-col gap-1 mt-1 select-none">
                <span className="text-[7.5px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 mb-1 px-1">
                  {searchQuery ? "SEARCH MATCHES FOUND" : "QUICK UPLINKS & DISCIPLINARY PORTALS"}
                </span>

                {filteredRoutes.length > 0 ? (
                  <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-1">
                    {filteredRoutes.map((route) => (
                      <a
                        key={route.name}
                        href={route.href}
                        onClick={(e) => handleSearchSelect(e, route.href)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group outline-none"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-800 group-hover:bg-red-500 transition-colors" />
                          <span className="text-[9.5px] font-black uppercase tracking-widest text-zinc-900 dark:text-white group-hover:text-red-500 transition-colors">
                            {route.name}
                          </span>
                        </div>
                        <span className="text-[8.5px] text-zinc-400 dark:text-zinc-500 font-semibold group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                          {route.desc}
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                    No active telemetry coordinates matched.
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Responsive Slide Menu panel for mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu 
            isOpen={mobileOpen} 
            onClose={() => setMobileOpen(false)} 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        )}
      </AnimatePresence>
    </>
  );
}
