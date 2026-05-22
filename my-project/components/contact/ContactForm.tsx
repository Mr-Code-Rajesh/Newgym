"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiActivity } from "react-icons/fi";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("strength");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "transmitting" | "completed">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setStatus("transmitting");

    // 1.5s premium simulated telemetry signal transmit duration
    setTimeout(() => {
      setStatus("completed");
    }, 1500);
  };

  return (
    <div className="w-full select-none">
      <AnimatePresence mode="wait">
        {status === "completed" ? (
          /* Success Screen */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-center flex flex-col items-center justify-center gap-4 min-h-[300px]"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full border border-emerald-500/20 border-t-emerald-500 animate-ping absolute inset-0" />
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 relative z-10">
                <FiCheckCircle size={20} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-black uppercase tracking-widest text-emerald-500">
                Transmission Uplink Secure
              </h3>
              <p className="text-[9.5px] font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 uppercase tracking-wider max-w-xs mx-auto">
                Baseline parameters registered successfully. An Apex biological advisor will initiate connection inside 12 solar hours.
              </p>
            </div>

            <button
              onClick={() => {
                setName("");
                setEmail("");
                setGoal("strength");
                setMessage("");
                setStatus("idle");
              }}
              className="mt-2 px-5 py-2 rounded-full bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800 text-[8.5px] font-black uppercase tracking-widest text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-white/[0.04] transition-colors cursor-pointer"
            >
              Transmit Another Signal
            </button>
          </motion.div>
        ) : (
          /* Standard Input Form */
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-950/40 border border-zinc-200 dark:border-white/[0.05] backdrop-blur-xl shadow-xl text-zinc-950 dark:text-white"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[7.5px] font-black uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                  Ident Call Sign (Full Name)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MARCUS AURELIUS"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === "transmitting"}
                  className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/[0.08] focus:border-red-500/40 focus:ring-1 focus:ring-red-500/10 text-xs text-zinc-950 dark:text-white outline-none font-sans tracking-wide transition-all duration-300 disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[7.5px] font-black uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                  Uplink Code (Email Address)
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. MARCUS@APEX.NET"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "transmitting"}
                  className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/[0.08] focus:border-red-500/40 focus:ring-1 focus:ring-red-500/10 text-xs text-zinc-950 dark:text-white outline-none font-sans tracking-wide transition-all duration-300 disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[7.5px] font-black uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                Select Biometric Program Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                disabled={status === "transmitting"}
                className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/[0.08] focus:border-red-500/40 focus:ring-1 focus:ring-red-500/10 text-xs text-zinc-950 dark:text-white outline-none font-sans tracking-wide transition-all duration-300 disabled:opacity-50"
              >
                <option value="cardio">Hyper-Velocity Cardio Optimization</option>
                <option value="strength">Force Biometrics & Mass Tensors</option>
                <option value="recovery">Neural Reflex & Cryo-Oxygenation Flow</option>
                <option value="elite">VIP All-Access Titanium Core</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[7.5px] font-black uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                Transmission Notes
              </label>
              <textarea
                rows={4}
                placeholder="Transceiver notes, baseline metrics, program objectives..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status === "transmitting"}
                className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-white/[0.08] focus:border-red-500/40 focus:ring-1 focus:ring-red-500/10 text-xs text-zinc-950 dark:text-white outline-none font-sans tracking-wide transition-all duration-300 resize-none disabled:opacity-50"
              />
            </div>

            {/* Submit Signal Button */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              disabled={status === "transmitting"}
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-700 to-red-600 text-[10.5px] font-black uppercase tracking-[0.25em] text-white border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 outline-none cursor-pointer flex items-center justify-center gap-1.5"
            >
              {status === "transmitting" ? (
                <>
                  <FiActivity className="animate-spin text-white" size={13} />
                  TRANSMITTING BASELINE...
                </>
              ) : (
                "TRANSMIT SIGNAL UPLINK →"
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
