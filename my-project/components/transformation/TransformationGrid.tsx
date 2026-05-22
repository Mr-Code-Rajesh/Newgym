"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TransformationCard, { MemberTransformation } from "./TransformationCard";
import TransformationModal from "./TransformationModal";

export const transformationsData: MemberTransformation[] = [
  {
    id: 1,
    name: "Marcus Chen",
    goal: "Body Recomposition",
    duration: "12 Weeks",
    beforeImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop",
    description: "Recalibrated physical thresholds to drop body fat while developing lean athletic mass.",
    quote: "The biomechanical and neural tracking at APEX changed everything. I didn't just lose weight—I unlocked a brand new athletic capacity.",
    category: "recomp",
    metrics: [
      { label: "Total Mass", value: "-18 lbs", isNegative: true },
      { label: "Body Fat Delta", value: "-9%", isNegative: true },
      { label: "Active Muscle", value: "+6.2 lbs", isNegative: false }
    ],
    biometrics: {
      vo2max: "+12.5 ml/kg",
      strengthIndex: "+24.8%",
      recoveryTime: "-30%",
      bodyFatBefore: "22.5%",
      bodyFatAfter: "13.5%"
    },
    trainerNotes: "Marcus responded exceptionally well to heart rate variability-guided cardiovascular conditioning combined with heavy compound resistance triggers. VO2 Max capacity increased to superior levels."
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    goal: "Force Biometrics & Power",
    duration: "16 Weeks",
    beforeImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop",
    description: "Staggering neuromuscular optimization leading to massive absolute force capacity.",
    quote: "I plateaued for years before coming here. The physical telemetry and targeted reflex training broke all my previous personal records in less than four months.",
    category: "strength",
    metrics: [
      { label: "Squat Max", value: "+95 lbs", isNegative: false },
      { label: "Deadlift Max", value: "+120 lbs", isNegative: false },
      { label: "Power Output", value: "+38%", isNegative: false }
    ],
    biometrics: {
      vo2max: "+6.8 ml/kg",
      strengthIndex: "+38.4%",
      recoveryTime: "-20%",
      bodyFatBefore: "18.2%",
      bodyFatAfter: "12.2%"
    },
    trainerNotes: "Coordinated Sarah's routine around progressive tension overload and specific explosive mechanical extensions. Significant neural motor unit recruitment gains tracked throughout the duration."
  },
  {
    id: 3,
    name: "Elena Rostova",
    goal: "Lean Muscle Synthesis",
    duration: "8 Weeks",
    beforeImage: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop",
    description: "Cellular-level hypertrophy program designed for lean density synthesis and rapid recovery.",
    quote: "Every single training session was monitored down to my heart rate variability. The sheer precision of their recovery protocols is what makes APEX totally different.",
    category: "conditioning",
    metrics: [
      { label: "Lean Muscle", value: "+11.4 lbs", isNegative: false },
      { label: "BMR Rate", value: "+210 kcal", isNegative: false },
      { label: "Recovery Rate", value: "2x Faster", isNegative: false }
    ],
    biometrics: {
      vo2max: "+8.2 ml/kg",
      strengthIndex: "+18.5%",
      recoveryTime: "-45%",
      bodyFatBefore: "16.4%",
      bodyFatAfter: "11.2%"
    },
    trainerNotes: "Elena focused on mechanical hypertrophy training under cryo-pulse recovery protocols. Muscle tissue synthesis rate was highly optimal, matching excellent genetic response metrics."
  },
  {
    id: 4,
    name: "Viktor Vane",
    goal: "Apex Performance Flow",
    duration: "10 Weeks",
    beforeImage: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=600&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600&auto=format&fit=crop",
    description: "Elite conditioning process focused on raw cellular energy efficiency and athletic agility.",
    quote: "The visual and metabolic transformations were dramatic, but the true evolution was in my cognitive and athletic reflexes.",
    category: "recovery",
    metrics: [
      { label: "Reaction Rate", value: "-80 ms", isNegative: true },
      { label: "VO2 Max", value: "+14.8%", isNegative: false },
      { label: "Body Mass", value: "-12 lbs", isNegative: true }
    ],
    biometrics: {
      vo2max: "+14.8 ml/kg",
      strengthIndex: "+12.2%",
      recoveryTime: "-50%",
      bodyFatBefore: "15.8%",
      bodyFatAfter: "9.8%"
    },
    trainerNotes: "Viktor was placed on a high-intensity interval program with active neural sensory inputs. Respiration and lactate threshold curves showed premium adaptation rates."
  }
];

const categories = [
  { id: "all", label: "All Subjects" },
  { id: "recomp", label: "Body Recomp" },
  { id: "strength", label: "Force & Power" },
  { id: "conditioning", label: "Lean Muscle" },
  { id: "recovery", label: "Reflex & Flow" },
];

export default function TransformationGrid() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedMember, setSelectedMember] = useState<MemberTransformation | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredData = activeTab === "all"
    ? transformationsData
    : transformationsData.filter((item) => item.category === activeTab);

  const handleExamine = (member: MemberTransformation) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-10 w-full items-center select-none">
      {/* 1. Category Filter Pills */}
      <div className="flex flex-wrap gap-2 justify-center bg-zinc-100 dark:bg-zinc-950 p-1.5 rounded-full border border-zinc-200 dark:border-white/[0.05] max-w-2xl">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer relative outline-none ${
              activeTab === cat.id
                ? "text-white"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
            }`}
          >
            {activeTab === cat.id && (
              <motion.div
                layoutId="activeFilterPill"
                className="absolute inset-0 bg-red-600 rounded-full shadow-md shadow-red-600/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 2. Bento Responsive Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full items-stretch"
      >
        <AnimatePresence mode="popLayout">
          {filteredData.map((item, idx) => {
            const isFeatured = idx === 0 && activeTab === "all";
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"}
              >
                <TransformationCard
                  member={item}
                  onClick={() => handleExamine(item)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* 3. Detail popup Modal */}
      <TransformationModal
        member={selectedMember}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
