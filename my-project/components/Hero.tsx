"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiActivity, 
  FiShield, 
  FiMapPin, 
  FiCalendar, 
  FiArrowRight, 
  FiTrendingUp,
  FiZap
} from "react-icons/fi";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("all");

  // High-performance schedule list
  const classes = [
    { id: 1, name: "Hyper-Velocity Cardio", category: "cardio", time: "08:00 AM", instructor: "Coach Marcus", level: "Advanced", intensity: 95 },
    { id: 2, name: "Force Biometrics Lift", category: "strength", time: "10:30 AM", instructor: "Coach Sarah", level: "All Levels", intensity: 88 },
    { id: 3, name: "Neural Reflex Mobility", category: "recovery", time: "02:00 PM", instructor: "Dr. Elena", level: "Intermediate", intensity: 45 },
    { id: 4, name: "Isometric Power Flow", category: "strength", time: "04:30 PM", instructor: "Coach Marcus", level: "Elite", intensity: 92 },
    { id: 5, name: "Cryo-Pulse Oxygenation", category: "recovery", time: "06:00 PM", instructor: "Staff Medic", level: "All Levels", intensity: 20 },
  ];

  const filteredClasses = activeTab === "all" 
    ? classes 
    : classes.filter(c => c.category === activeTab);

  return (
    <div id="home" className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden select-none">
      
      {/* 1. Background Grid Meshes & Glowing Lights */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated dynamic grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"
          style={{ transform: "perspective(500px) rotateX(60deg) translateY(-20%) scale(1.5)" }}
        />

        {/* Neon Scarlet Red Core Glow */}
        <div className="absolute top-[20%] left-[-10%] w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-red-600/10 blur-[130px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] rounded-full bg-red-800/10 blur-[120px]" />
      </div>

      {/* 2. Hero Main Content Area */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-36 pb-24 md:pt-48 flex flex-col gap-16">
        
        {/* Headline Header */}
        <div className="flex flex-col gap-6 text-center md:text-left max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.9 }}
            className="flex items-center justify-center md:justify-start gap-2 text-xs font-extrabold tracking-[0.4em] uppercase text-red-500"
          >
            <FiZap className="animate-bounce" /> Biometric Peak Performance Arena
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] text-white"
          >
            Train Beyond <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-red-500">
              Human Limits.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="text-sm md:text-base text-zinc-400 font-medium tracking-wide max-w-2xl leading-relaxed"
          >
            APEX combines raw athletic mechanical designs with cinematic environmental atmospheres and next-gen neural biometric mapping. This is not just a club—it is a performance sanctuary.
          </motion.p>
        </div>

        {/* Dynamic Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Stats Telemetry Display (Col 5) */}
          <motion.div 
            id="about"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            className="lg:col-span-5 flex flex-col gap-6 scroll-mt-24"
          >
            {/* Live System Performance Card */}
            <div className="w-full p-6 rounded-3xl border border-white/[0.06] bg-zinc-950/40 backdrop-blur-xl shadow-xl flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600/15 flex items-center justify-center text-red-500 border border-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                    <FiActivity size={18} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-white">Neural Telemetry</h3>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Live Bio-Feed Active</p>
                  </div>
                </div>
                <div className="px-2 py-1 rounded bg-red-600/15 text-[8px] font-extrabold uppercase tracking-widest text-red-400 animate-pulse border border-red-500/10">
                  Apex Connected
                </div>
              </div>

              {/* Heart Rate / Biometric Graph Emulator */}
              <div className="flex items-center justify-between gap-6 py-2">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Average heart rate</span>
                  <span className="text-3xl font-mono font-black text-white">142 <span className="text-xs text-red-500">BPM</span></span>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">HRV Stability</span>
                  <span className="text-3xl font-mono font-black text-green-500">92 <span className="text-xs text-zinc-500">%</span></span>
                </div>
              </div>

              {/* Graphic line animation */}
              <div className="h-10 w-full overflow-hidden flex items-end gap-[3px]">
                {[30, 45, 60, 35, 50, 75, 90, 60, 45, 80, 95, 60, 40, 55, 70, 85, 100, 75, 50, 65, 80].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.04
                    }}
                    className={`flex-1 rounded-t-sm ${h > 80 ? "bg-red-500" : "bg-zinc-800"}`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Metrics Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-white/[0.04] bg-zinc-950/20 backdrop-blur-lg flex flex-col gap-2">
                <FiShield className="text-red-500" size={16} />
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Security Level</span>
                <span className="text-base font-black tracking-wider uppercase text-white">Military Encrypted</span>
              </div>
              <div className="p-5 rounded-2xl border border-white/[0.04] bg-zinc-950/20 backdrop-blur-lg flex flex-col gap-2">
                <FiMapPin className="text-red-500" size={16} />
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Global Arenas</span>
                <span className="text-base font-black tracking-wider uppercase text-white">24+ Premium Club</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Dynamic Cinematic Classes Schedule (Col 7) */}
          <motion.div
            id="services"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.3 }}
            className="lg:col-span-7 w-full p-6 rounded-3xl border border-white/[0.06] bg-zinc-950/40 backdrop-blur-xl shadow-xl flex flex-col gap-6 scroll-mt-24"
          >
            {/* Header / Tab Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Performance Telemetry Schedule</h3>
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Book biometric training classes</p>
              </div>
              
              {/* Category Filter Pills */}
              <div className="flex gap-2 bg-black p-1 rounded-full border border-white/[0.05]">
                {["all", "strength", "cardio", "recovery"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest transition-all duration-300 ${
                      activeTab === cat 
                        ? "bg-red-600 text-white shadow-md shadow-red-600/10" 
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Class Cards Stream */}
            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
              <AnimatePresence mode="popLayout">
                {filteredClasses.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ x: 6, borderColor: "rgba(239, 68, 68, 0.3)" }}
                    className="p-4 rounded-2xl border border-white/[0.04] bg-black/40 hover:bg-zinc-900/30 flex items-center justify-between gap-4 transition-all duration-300"
                  >
                    {/* Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-zinc-900 flex flex-col items-center justify-center border border-white/[0.03]">
                        <FiCalendar size={14} className="text-red-500" />
                        <span className="text-[7px] font-bold uppercase text-zinc-500 leading-none mt-1">Book</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-black tracking-wide text-white uppercase">{item.name}</span>
                        <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                          <span>{item.time}</span>
                          <span>•</span>
                          <span>{item.instructor}</span>
                          <span>•</span>
                          <span className={`${
                            item.level === "Elite" ? "text-red-500" : "text-zinc-400"
                          }`}>{item.level}</span>
                        </div>
                      </div>
                    </div>

                    {/* Intensity Indicator */}
                    <div className="flex flex-col gap-1 items-end">
                      <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Intensity</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-mono font-black text-white">{item.intensity}%</span>
                        <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-500" 
                            style={{ width: `${item.intensity}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>

      {/* 3. Pricing Section */}
      <section id="pricing" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/[0.04] flex flex-col gap-12 scroll-mt-24">
        <div className="flex flex-col gap-3 text-center md:text-left max-w-2xl">
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-500">APEX tiering access</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Membership Bio-Tiers</h2>
          <p className="text-xs text-zinc-400 font-medium tracking-wide leading-relaxed">
            Gain full telemetry integration, biometric mapping capabilities, and absolute arena training rights suited to your schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Apex Core", price: "120", features: ["24/7 Arena Access", "Basic Telemetry Data Feed", "1x Biometric Session/mo", "Locker Room Cryo-Access", "Titanium RFID Passcard"], glow: false },
            { name: "Apex Telemetry Plus", price: "240", features: ["Unlimited Arena Access", "Full Biometric Heart/HRV Mapping", "4x Coach Coordinated Sessions", "Premium Cryo & Hydrotherapy", "Custom Protein Recovery Shakes", "Apex Connect Mobile App"], glow: true },
            { name: "Apex Neural VIP", price: "480", features: ["All Telemetry Plus Rights", "Dedicated 1-on-1 Physiologist", "Continuous Neural Reflex Mapping", "Full Medical Biometric Tracking", "Priority VIP Recovery Lounge", "Private Titanium Squad Coaching"], glow: false },
          ].map((tier, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className={`p-8 rounded-3xl border flex flex-col justify-between gap-8 bg-zinc-950/40 backdrop-blur-xl relative overflow-hidden ${
                tier.glow 
                  ? "border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)]" 
                  : "border-white/[0.05]"
              }`}
            >
              {tier.glow && (
                <div className="absolute top-0 right-0 px-4 py-1 bg-red-600 rounded-bl-2xl text-[8px] font-black uppercase tracking-widest text-white">
                  Peak Choice
                </div>
              )}
              
              <div className="flex flex-col gap-4">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{tier.name}</span>
                <div className="flex items-baseline font-mono font-black text-white">
                  <span className="text-5xl tracking-tighter">${tier.price}</span>
                  <span className="text-xs text-zinc-500 font-semibold tracking-wider ml-2">/ month</span>
                </div>
                
                <ul className="flex flex-col gap-3 mt-4">
                  {tier.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-center gap-2.5 text-xs text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className={`w-full py-3 rounded-full text-center text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  tier.glow 
                    ? "bg-red-600 border-red-500/20 text-white hover:bg-red-700" 
                    : "bg-transparent border-white/[0.08] text-white hover:bg-white/[0.03]"
                }`}
              >
                Acquire Access
              </motion.a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Blog Section */}
      <section id="blog" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/[0.04] flex flex-col gap-12 scroll-mt-24">
        <div className="flex flex-col gap-3 text-center md:text-left max-w-2xl">
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-500">Telemetry intelligence</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Apex Journals & Guides</h2>
          <p className="text-xs text-zinc-400 font-medium tracking-wide leading-relaxed">
            Technical and medical analysis of physical limiters, cellular respiration, and force-biometrics written by our clinical training staff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Maximus Pulse: Oxygenation Optimization Guide", date: "May 15, 2026", author: "Dr. Elena R.", duration: "5 min read", cat: "Telemetry" },
            { title: "Biometrics vs Raw Force: Neural Limit Mapping", date: "May 12, 2026", author: "Coach Marcus T.", duration: "8 min read", cat: "Neuromuscular" },
            { title: "The Cryo-Pulse Recovery Protocol: Clinical Review", date: "May 09, 2026", author: "Dr. Elena R.", duration: "6 min read", cat: "Recovery" },
          ].map((post, idx) => (
            <motion.article
              key={idx}
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl border border-white/[0.05] bg-zinc-950/20 backdrop-blur-xl flex flex-col justify-between gap-6 group hover:border-red-500/20 transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/[0.05] text-[7.5px] font-extrabold uppercase tracking-widest text-red-400">
                    {post.cat}
                  </span>
                  <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{post.duration}</span>
                </div>
                
                <h3 className="text-sm font-black uppercase tracking-wide text-white group-hover:text-red-500 transition-colors duration-300 leading-snug">
                  {post.title}
                </h3>
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.04] pt-4 text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                <span>By {post.author}</span>
                <span>{post.date}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 5. Contact Section */}
      <section id="contact" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/[0.04] flex flex-col gap-12 mb-12 scroll-mt-24">
        <div className="flex flex-col gap-3 text-center md:text-left max-w-2xl">
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-500">Request connection</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Transceiver Secure Uplink</h2>
          <p className="text-xs text-zinc-400 font-medium tracking-wide leading-relaxed">
            Transmit your coordinates and biometric objectives. An Apex advisor will open a secure communication channel within 12 standard solar hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Form Card (Col 7) */}
          <div className="lg:col-span-7 p-8 rounded-3xl border border-white/[0.05] bg-zinc-950/40 backdrop-blur-xl flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[8px] font-black uppercase tracking-[0.25em] text-zinc-500">Ident Call Sign (Full Name)</label>
                <input 
                  type="text" 
                  placeholder="e.g. MARCUS AURELIUS"
                  className="px-4 py-3 rounded-xl bg-black border border-white/[0.05] focus:border-red-500/40 text-xs text-white outline-none font-sans tracking-wide transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[8px] font-black uppercase tracking-[0.25em] text-zinc-500">Uplink Code (Email Address)</label>
                <input 
                  type="email" 
                  placeholder="e.g. MARCUS@APEX.NET"
                  className="px-4 py-3 rounded-xl bg-black border border-white/[0.05] focus:border-red-500/40 text-xs text-white outline-none font-sans tracking-wide transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[8px] font-black uppercase tracking-[0.25em] text-zinc-500">Select Biometric Program Goal</label>
              <select className="px-4 py-3 rounded-xl bg-black border border-white/[0.05] focus:border-red-500/40 text-xs text-white outline-none font-sans tracking-wide transition-all duration-300">
                <option value="cardio">Hyper-Velocity Cardio Optimization</option>
                <option value="strength">Force Biometrics & Mass Tensors</option>
                <option value="recovery">Neural Reflex & Cryo-Oxygenation Flow</option>
                <option value="elite">VIP All-Access Titanium Core</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[8px] font-black uppercase tracking-[0.25em] text-zinc-500">Transmission Notes</label>
              <textarea 
                rows={4}
                placeholder="Transceiver notes, goals, history..."
                className="px-4 py-3 rounded-xl bg-black border border-white/[0.05] focus:border-red-500/40 text-xs text-white outline-none font-sans tracking-wide transition-all duration-300 resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-700 to-red-600 text-[10px] font-black uppercase tracking-widest text-white border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-500 outline-none cursor-pointer"
            >
              Transmit Signal Uplink
            </motion.button>
          </div>

          {/* Quick contact info (Col 5) */}
          <div className="lg:col-span-5 p-8 rounded-3xl border border-white/[0.05] bg-zinc-950/20 backdrop-blur-xl flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/[0.04] flex items-center justify-center text-red-500 shadow-md">
                  <FiActivity size={15} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Headquarters Arena</span>
                  <span className="text-xs font-black uppercase text-white tracking-wide mt-0.5">Apex Central Club, Sector 7</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/[0.04] flex items-center justify-center text-red-500 shadow-md">
                  <FiActivity size={15} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Secure Audio Uplink</span>
                  <span className="text-xs font-black uppercase text-white tracking-wide mt-0.5">+1 (800) APEX-CORE</span>
                </div>
              </div>
            </div>

            {/* Micro maps visualization placeholder */}
            <div className="relative h-44 rounded-2xl border border-white/[0.04] bg-black overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              <div className="relative text-center flex flex-col items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-ping shadow-[0_0_12px_#ef4444]" />
                <span className="text-[7.5px] font-black uppercase tracking-[0.3em] text-red-400">Lock: Lat. 37.77 / Long. -122.41</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background Graphic Watermark */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-8 flex items-center gap-2 opacity-15">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <span className="text-[8px] font-black tracking-[0.4em] uppercase text-zinc-500">
          Apex Biometrics Core v4.1.2026
        </span>
      </div>
    </div>
  );
}
