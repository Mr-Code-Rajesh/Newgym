"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiCpu, FiShield, FiTrendingUp } from "react-icons/fi";

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  tagline: string;
  icon: React.ReactNode;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const plans: PricingPlan[] = [
    {
      name: "Core Access",
      price: billingCycle === "monthly" ? 1999 : 1599,
      period: "mo",
      tagline: "ESSENTIAL METABOLIC CALIBRATION",
      icon: <FiShield size={18} className="text-zinc-400" />,
      features: [
        "Standard access to metabolic training arena",
        "Biometrics progress log tracking",
        "Advanced cardio & HIIT zones",
        "Standard locker cells and hydration ports",
        "Apex web interface log sync"
      ],
      ctaText: "INITIATE CORE UPLINK"
    },
    {
      name: "Pro Calibration",
      price: billingCycle === "monthly" ? 3499 : 2799,
      period: "mo",
      tagline: "HIGH-PERFORMANCE PERFORMANCE SUITE",
      icon: <FiCpu size={18} className="text-red-500" />,
      features: [
        "Complete Core Access + HIIT Workstations",
        "Metabolic Coach consultation (2 sessions/mo)",
        "Premium hydration infusions included",
        "Personalized calorie & macro targets Mifflins",
        "Access to advanced metric charts visualizer",
        "Priority biometric check-in support"
      ],
      isPopular: true,
      ctaText: "CALIBRATE PRO STATUS"
    },
    {
      name: "Apex Dominance",
      price: billingCycle === "monthly" ? 5999 : 4799,
      period: "mo",
      tagline: "PREMIUM PHYSICAL DOMINANCE SYSTEM",
      icon: <FiTrendingUp size={18} className="text-amber-500 animate-pulse" />,
      features: [
        "Unlimited Core + Pro Calibration privileges",
        "Daily cryo-pulse oxygenation slots",
        "Personal biometric coach support (unlimited)",
        "Custom nutritional supplements formulas",
        "Biometrics barcode key fob console",
        "VIP locker vault & laundry systems access"
      ],
      ctaText: "COMMAND APEX ACCESS"
    }
  ];

  return (
    <section
      id="pricing"
      className="w-full py-20 px-6 relative bg-black border-t border-zinc-900 overflow-hidden select-none"
    >
      {/* Background radial matrix texture overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-950/20 via-black to-black opacity-80 pointer-events-none" />

      {/* Dot grid texture overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 text-left">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 font-mono">
                MEMBERSHIP PROTOCOLS
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-wider text-white">
              PRICING CALIBRATION
            </h2>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-semibold tracking-wide uppercase leading-relaxed mt-2">
              Select your diagnostic membership level. Unlock biometrics dashboards, customized training compounds, and elite conditioning zones.
            </p>
          </div>

          {/* Billing Cycle Switcher Toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-white/[0.04] shrink-0">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-lg text-[9.5px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer outline-none ${billingCycle === "monthly"
                  ? "bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.25)]"
                  : "text-zinc-500 hover:text-zinc-350"
                }`}
            >
              Monthly Cycle
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-2 rounded-lg text-[9.5px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer outline-none ${billingCycle === "annual"
                  ? "bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.25)]"
                  : "text-zinc-500 hover:text-zinc-350"
                }`}
            >
              Annual Cycle (-20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-3xl p-6 flex flex-col justify-between border backdrop-blur-md transition-all duration-300 ${plan.isPopular
                    ? "bg-zinc-950/65 border-red-500/35 shadow-[0_0_30px_rgba(239,68,68,0.05)] scale-102"
                    : "bg-zinc-950/40 border-zinc-200/5 dark:border-white/[0.04] hover:border-zinc-800 dark:hover:border-white/[0.1]"
                  }`}
              >
                {/* Popular red indicator glow border */}
                {plan.isPopular && (
                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                )}

                {/* Top Module Header */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500">
                      {plan.tagline}
                    </span>
                    <div className="p-2 rounded-xl bg-zinc-900 border border-white/[0.04]">
                      {plan.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-black uppercase tracking-wider text-white">
                    {plan.name}
                  </h3>

                  {/* Pricing Tag */}
                  <div className="flex items-baseline gap-1.5 my-5">
                    <span className="text-3xl font-black font-mono text-white">
                      ₹{plan.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      / {plan.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="flex flex-col gap-3.5 border-t border-zinc-200/5 dark:border-white/[0.03] pt-5 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-[10px] text-zinc-400 font-semibold leading-snug">
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.isPopular ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-zinc-900 text-zinc-500 border border-white/[0.04]"
                          }`}>
                          <FiCheck size={8} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA trigger */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: plan.isPopular ? "0 0 20px rgba(239,68,68,0.25)" : "none" }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer outline-none border ${plan.isPopular
                      ? "bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                      : "bg-zinc-900/60 border-white/[0.04] text-zinc-300 hover:text-white hover:bg-zinc-850"
                    }`}
                >
                  {plan.ctaText}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
