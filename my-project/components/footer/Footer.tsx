"use client";

import React from "react";
import Image from "next/image";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterServices from "./FooterServices";
import FooterTools from "./FooterTools";
import FooterContact from "./FooterContact";
import NewsletterForm from "./NewsletterForm";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="relative w-full bg-white dark:bg-black text-zinc-950 dark:text-white border-t border-zinc-200 dark:border-white/[0.04] overflow-hidden select-none transition-colors duration-500">
      {/* Premium top gradient glow divider */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent pointer-events-none z-20" />

      {/* Gym Background Image Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop"
          alt="Gym facility background"
          fill
          className="object-cover opacity-15 dark:opacity-25 grayscale mix-blend-multiply dark:mix-blend-screen"
        />
        {/* Adaptive Light/Dark Gradient Fades */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/95 to-white dark:from-black/70 dark:via-black/90 dark:to-black" />
        {/* Biomechanical dot-grid telemetry texture */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(239,68,68,0.04)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(239,68,68,0.06)_1px,transparent_1px)] [background-size:24px_24px] mix-blend-color-dodge pointer-events-none" />
      </div>

      {/* Cinematic background spotlight glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute bottom-0 left-[-10%] w-[35vw] aspect-square rounded-full bg-red-600/5 blur-[100px] dark:bg-red-950/10 dark:blur-[140px]" />
        <div className="absolute bottom-0 right-[-10%] w-[35vw] aspect-square rounded-full bg-red-600/5 blur-[100px] dark:bg-red-950/10 dark:blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-4 relative z-10">
        {/* Horizontal Technical Telemetry Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-white/[0.05] pb-6 mb-12 text-[8.5px] font-mono tracking-[0.25em] text-zinc-400 dark:text-zinc-500 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
            <span>SYS GATEWAY: ONLINE</span>
          </div>
          <div className="hidden md:block">
            <span>UPLINK NODE: APEX_VAULT_01</span>
          </div>
          <div className="hidden sm:block">
            <span>NEURAL TELEMETRY: SYNCED</span>
          </div>
          <div>
            <span>SECURE CONSOLE v3.1</span>
          </div>
        </div>

        {/* Balanced 12-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Column 1: Brand Details & Newsletter Form Stacked (Col span 3) */}
          <div className="md:col-span-12 lg:col-span-3 flex flex-col gap-8">
            <FooterBrand />
            <NewsletterForm />
          </div>

          {/* Column 2: Navigation Links (Col span 2) */}
          <div className="md:col-span-3 lg:col-span-2">
            <FooterLinks />
          </div>

          {/* Column 3: Athletic Programs (Col span 2) */}
          <div className="md:col-span-3 lg:col-span-2">
            <FooterServices />
          </div>

          {/* Column 4: Gym Tools & Telemetry Apps (Col span 2) */}
          <div className="md:col-span-3 lg:col-span-2">
            <FooterTools />
          </div>

          {/* Column 5: Location Specs Coordinates (Col span 3) */}
          <div className="md:col-span-3 lg:col-span-3">
            <FooterContact />
          </div>
        </div>

        {/* Legal copyrights, policies, and Scroll-to-Top triggers */}
        <FooterBottom />
      </div>
    </footer>
  );
}
