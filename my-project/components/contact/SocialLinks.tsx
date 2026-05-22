"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from "react-icons/fa6";

export default function SocialLinks() {
  const socials = [
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram Link" },
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube Channel Link" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter Channel Link" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn Company Link" },
  ];

  return (
    <div className="flex items-center gap-3 select-none">
      {socials.map((soc, idx) => {
        const Icon = soc.icon;
        return (
          <motion.a
            key={idx}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={soc.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={soc.label}
            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.08] flex items-center justify-center text-zinc-500 hover:text-red-500 hover:border-red-500/20 shadow-sm transition-all duration-300 outline-none cursor-pointer"
          >
            <Icon size={13} />
          </motion.a>
        );
      })}
    </div>
  );
}
