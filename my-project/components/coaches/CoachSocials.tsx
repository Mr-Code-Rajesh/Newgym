"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa6";

interface CoachSocialsProps {
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export default function CoachSocials({ instagram, twitter, linkedin }: CoachSocialsProps) {
  const links = [
    { icon: FaInstagram, href: instagram || "https://instagram.com", label: "Coach Instagram" },
    { icon: FaTwitter, href: twitter || "https://twitter.com", label: "Coach Twitter" },
    { icon: FaLinkedinIn, href: linkedin || "https://linkedin.com", label: "Coach LinkedIn" },
  ];

  return (
    <div className="flex items-center gap-2 select-none">
      {links.map((link, idx) => {
        const Icon = link.icon;
        return (
          <motion.a
            key={idx}
            whileHover={{ scale: 1.15, backgroundColor: "rgba(239, 68, 68, 0.15)" }}
            whileTap={{ scale: 0.85 }}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-md border border-white/[0.08] flex items-center justify-center text-white/80 hover:text-red-400 hover:border-red-500/30 transition-all duration-300 outline-none cursor-pointer"
          >
            <Icon size={11} />
          </motion.a>
        );
      })}
    </div>
  );
}
