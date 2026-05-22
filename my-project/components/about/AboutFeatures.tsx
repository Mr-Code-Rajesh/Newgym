"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

export default function AboutFeatures() {
  const items = [
    { title: "Certified Trainers", desc: "Elite exercise physiologists coordinating biomechanics." },
    { title: "Modern Equipment", desc: "Force telemetry loads and real-time biometric feedback." },
    { title: "Personal Programs", desc: "Custom neural reflex mapping and tailored schedules." },
    { title: "Nutrition Guidance", desc: "Cellular respiration fuel & targeted protein pipelines." },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full select-none">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 15,
            delay: 0.2 + index * 0.08,
          }}
          className="p-4 rounded-2xl border border-white/[0.04] bg-zinc-950/20 backdrop-blur-sm flex items-start gap-3.5 hover:border-red-500/10 hover:bg-zinc-900/10 transition-all duration-300 group"
        >
          {/* Micro check sphere */}
          <div className="w-5 h-5 rounded-full bg-red-600/15 flex items-center justify-center text-red-500 border border-red-500/10 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shrink-0 mt-0.5 shadow-[0_0_6px_rgba(239,68,68,0.1)] group-hover:shadow-[0_0_10px_rgba(239,68,68,0.4)]">
            <FiCheck size={11} />
          </div>

          {/* Texts */}
          <div className="flex flex-col gap-0.5">
            <span className="text-[11.5px] font-black uppercase tracking-wider text-white group-hover:text-red-500 transition-colors duration-300">
              {item.title}
            </span>
            <span className="text-[9.5px] text-zinc-500 font-medium leading-relaxed">
              {item.desc}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
