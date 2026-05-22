"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaYoutube, FaTwitter, FaWhatsapp } from "react-icons/fa6";

export default function FooterBrand() {
  const socials = [
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram Channel" },
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook Page" },
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube Station" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter Channel" },
    { icon: FaWhatsapp, href: "https://wa.me/18002739267", label: "WhatsApp Uplink" },
  ];

  return (
    <div className="flex flex-col gap-5 select-none max-w-sm text-left">
      {/* 1. Glowing Luxury Gym Logo */}
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          <span className="text-white font-black text-sm tracking-tighter">A</span>
        </div>
        <span className="text-sm font-black tracking-[0.25em] uppercase text-zinc-950 dark:text-white">
          APEX <span className="text-red-600 dark:text-red-500">PORTAL</span>
        </span>
      </div>

      {/* 2. Premium short branding statement */}
      <p className="text-[11px] font-semibold leading-relaxed tracking-wide text-zinc-500 dark:text-zinc-400">
        The ultimate biometrics conditioning arena. We map cellular baseline variables to engineer your absolute neuromuscular and physical output.
      </p>

      {/* 2.5 Biometrics Registry Tag */}
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.05] text-[7.5px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase self-start">
        <span className="w-1 h-1 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
        <span>APEX CORE SYSTEM // SECURED</span>
      </div>

      {/* 3. High-performance social media icon anchors */}
      <div className="flex items-center gap-2.5 mt-1">
        {socials.map((soc, idx) => {
          const Icon = soc.icon;
          return (
            <motion.a
              key={idx}
              whileHover={{ 
                scale: 1.08, 
                backgroundColor: "rgba(239, 68, 68, 0.05)", 
                borderColor: "rgba(239, 68, 68, 0.4)",
                boxShadow: "0 0 12px rgba(239, 68, 68, 0.25)"
              }}
              whileTap={{ scale: 0.92 }}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={soc.label}
              className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-red-500 transition-all duration-300 outline-none cursor-pointer"
            >
              <Icon size={12} />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
