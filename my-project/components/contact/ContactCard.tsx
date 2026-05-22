"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageSquare } from "react-icons/fi";
import SocialLinks from "./SocialLinks";

export default function ContactCard() {
  const specs = [
    {
      icon: FiMapPin,
      label: "Headquarters Arena",
      val: "Apex Central Club, Sector 7",
    },
    {
      icon: FiPhone,
      label: "Secure Audio Uplink",
      val: "+1 (800) APEX-CORE",
    },
    {
      icon: FiMail,
      label: "Secure Transceiver Email",
      val: "uplink@apex.net",
    },
    {
      icon: FiClock,
      label: "Operational Cycle",
      val: "Open 24/7 / 365 Days",
    },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-950/40 border border-zinc-200 dark:border-white/[0.05] backdrop-blur-xl shadow-xl flex flex-col justify-between gap-8 select-none text-zinc-950 dark:text-white relative overflow-hidden">
      {/* Subtle top-right ambient spotlight */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 blur-2xl pointer-events-none" />

      {/* 4 Details specifications list */}
      <div className="flex flex-col gap-6">
        {specs.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-start gap-4 group">
              {/* Rounded icon box */}
              <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/[0.04] flex items-center justify-center text-red-500 shadow-md group-hover:border-red-500/20 group-hover:shadow-[0_0_10px_rgba(239,68,68,0.15)] transition-all duration-300">
                <Icon size={14} />
              </div>

              {/* Text labels */}
              <div className="flex flex-col">
                <span className="text-[7.5px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  {item.label}
                </span>
                <span className="text-[11.5px] font-black uppercase text-zinc-950 dark:text-white tracking-wide mt-0.5 group-hover:text-red-500 transition-colors duration-300">
                  {item.val}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* WhatsApp and Social Links footer */}
      <div className="flex flex-col gap-6 border-t border-zinc-200/60 dark:border-white/[0.04] pt-6">
        {/* WhatsApp Action Button */}
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="https://wa.me/18002739267"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl bg-emerald-600 dark:bg-emerald-600/10 border border-emerald-500/20 text-white dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-emerald-700 dark:hover:bg-emerald-600/20 transition-all duration-500 cursor-pointer"
        >
          <FiMessageSquare size={13} className="animate-bounce" />
          WhatsApp Telemetry Uplink
        </motion.a>

        {/* Social Accounts block */}
        <div className="flex items-center justify-between">
          <span className="text-[7.5px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Secure Digital Channels
          </span>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
