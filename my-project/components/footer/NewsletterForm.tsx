"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiSend } from "react-icons/fi";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");

    // 1s simulated registration
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-4 select-none text-left w-full max-w-sm sm:max-w-none">
      {/* Column Title Header */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-white/[0.06] pb-2 mb-2 w-full">
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 animate-pulse shadow-[0_0_6px_#ef4444] shrink-0" />
        <span className="text-[9.5px] font-black uppercase tracking-[0.25em] text-zinc-950 dark:text-white">
          TELEMETRY FEED
        </span>
      </div>

      <p className="text-[10px] font-semibold leading-relaxed text-zinc-500 dark:text-zinc-400">
        Register your transceiver coordinates to receive critical biological briefs, metabolic updates, and elite arena access alerts.
      </p>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          /* Success Alert Box */
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <FiCheck size={11} />
            </div>
            Transceiver Feed Registered
          </motion.div>
        ) : (
          /* Glassmorphic Subscription Input */
          <motion.form
            key="form"
            onSubmit={handleSubscribe}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-stretch gap-2 w-full mt-1"
          >
            <input
              type="email"
              required
              disabled={status === "submitting"}
              placeholder="UPLINK@APEX.NET"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.04] focus:border-red-500 focus:ring-1 focus:ring-red-500/20 text-[10.5px] font-mono text-zinc-950 dark:text-white outline-none tracking-widest transition-all duration-300 disabled:opacity-50 uppercase placeholder:opacity-40"
            />

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 12px rgba(239,68,68,0.3)" }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={status === "submitting"}
              aria-label="Subscribe to Telemetry newsletter"
              className="px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.2)] hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              <FiSend size={12} />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
