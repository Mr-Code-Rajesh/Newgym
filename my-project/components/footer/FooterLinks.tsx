"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FooterLinks() {
  const links = [
    { name: "Home Arena", href: "#home" },
    { name: "About Story", href: "#about" },
    { name: "Bento Gallery", href: "#gallery" },
    { name: "Biometric Calc", href: "#calculator" },
    { name: "Stories Review", href: "#testimonials" },
    { name: "FAQ Portal", href: "#faq" },
    { name: "Contact Secure", href: "#contact" },
  ];

  return (
    <div className="flex flex-col gap-4 select-none text-left">
      {/* Column Title Header */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-white/[0.06] pb-2 mb-2 w-full">
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 animate-pulse shadow-[0_0_6px_#ef4444] shrink-0" />
        <span className="text-[9.5px] font-black uppercase tracking-[0.25em] text-zinc-950 dark:text-white">
          CORE UPLINK
        </span>
      </div>

      {/* Internal Navigation List */}
      <ul className="flex flex-col gap-2.5">
        {links.map((link, idx) => (
          <li key={idx} className="flex w-full">
            <motion.a
              whileHover={{ x: 4 }}
              href={link.href}
              className="group text-[10.5px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-2 w-full"
            >
              <div className="h-[2px] w-2 bg-zinc-300 dark:bg-zinc-800 group-hover:bg-red-500 group-hover:w-4 transition-all duration-300 shrink-0" />
              <span className="group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-200">{link.name}</span>
            </motion.a>
          </li>
        ))}
      </ul>
    </div>
  );
}
