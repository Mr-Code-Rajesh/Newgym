"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EquipmentCard, { EquipmentItem } from "./EquipmentCard";
import EquipmentModal from "./EquipmentModal";

export const equipmentData: EquipmentItem[] = [
  {
    id: 1,
    name: "APEX Curved Bio-Treadmill",
    category: "cardio",
    categoryLabel: "Cardio Machines",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=600&auto=format&fit=crop",
    description: "Zero-motor self-powered curved deck engineered to reduce joint load impact while raising metabolic burn rates by 30%. Maps step frequencies and length continuously.",
    highlightBadge: "Self-Powered Slate",
    targetedMuscles: ["Cardiovascular System", "Hamstrings", "Gastrocnemius", "Hip Flexors"],
    techSpecs: {
      loadAdjustment: "6-Level Magnetic Brake",
      consoleType: "OLED Telemetry Bar",
      telemetry: "ANT+ Heart Rate Broadcast",
      resistance: "Self-Regulated Curved Slate"
    },
    physiologistNotes: "Highly advised for high-velocity interval drills and gait diagnostics. Elevates cellular respiration rates up to 30% faster without impact stress."
  },
  {
    id: 2,
    name: "APEX Force Biometrics Cage",
    category: "strength",
    categoryLabel: "Strength Training",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop",
    description: "3D load-cell integrated squat cage capable of mapping vertical/horizontal force output in real-time. Detects and corrects minor movement imbalances.",
    highlightBadge: "3D Force Mapping",
    targetedMuscles: ["Quadriceps", "Gluteus Maximus", "Spinal Erectors", "Core Stabilizers"],
    techSpecs: {
      loadAdjustment: "Sensor-Integrated Pins",
      consoleType: "15.6\" HD Telemetry Terminal",
      telemetry: "ANT+ / Bluetooth / RFID Sync",
      resistance: "Dynamic Electronic Dampening"
    },
    physiologistNotes: "Recommended for diagnosing absolute power thresholds and detecting minor bilateral force deficits under squat and press loads."
  },
  {
    id: 3,
    name: "APEX Pulley Cable Portal",
    category: "functional",
    categoryLabel: "Functional Training",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
    description: "Dual multi-plane pulley system with custom zero-inertia carbon cables. Enables smooth isolated cable crossover movements with zero load spikes.",
    highlightBadge: "Zero-Inertia Pulley",
    targetedMuscles: ["Pectoralis Major", "Deltoids", "Latissimus Dorsi", "Core Tensors"],
    techSpecs: {
      loadAdjustment: "Electronic Dial Increment",
      consoleType: "Multi-Angle Interactive HUD",
      telemetry: "RFID Automated Logging",
      resistance: "Zero-inertia Tension"
    },
    physiologistNotes: "Optimized for core reflex coordination and targeted muscular recruitment flows. Prevents joint load spikes at terminal range."
  },
  {
    id: 4,
    name: "Titanium Dumbbell Vault",
    category: "weights",
    categoryLabel: "Free Weights",
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=600&auto=format&fit=crop",
    description: "Calibrated single-cast titanium dumbbells with textured non-slip knurling. Stored in RFID trays that automatically count sets and repetitions.",
    highlightBadge: "Calibrated Weight",
    targetedMuscles: ["Biceps Brachii", "Triceps Brachii", "Trapezius", "Forearm Flexors"],
    techSpecs: {
      loadAdjustment: "Static Calibrated Weights",
      consoleType: "RFID Tray Weight Tracker",
      telemetry: "Automated Rep/Set Counter",
      resistance: "Absolute Gravitational Mass"
    },
    physiologistNotes: "Essential for unilateral strength symmetry and developing deep core stability markers. Calibrated down to the nearest gram."
  },
  {
    id: 5,
    name: "Cryo-Oxygenation Pod",
    category: "recovery",
    categoryLabel: "Recovery & Mobility",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop",
    description: "Thermal pressure chamber designed to rapidly decrease muscle inflammation and optimize cellular oxygenation under progressive cooling protocols.",
    highlightBadge: "Cryo-Pulse Thermal",
    targetedMuscles: ["Central Nervous System", "Lymphatic Drainage", "Muscle Tissue Recovery"],
    techSpecs: {
      loadAdjustment: "Dynamic Temperature Control",
      consoleType: "Biometric Touch Controller",
      telemetry: "HRV-guided Chamber Sync",
      resistance: "Atmospheric Hyper-Oxygenation"
    },
    physiologistNotes: "Essential post-workout recovery tool. Reduces lactic index accumulation and accelerates central nervous recovery protocols up to 50% faster."
  }
];

const categories = [
  { id: "all", label: "All Assets" },
  { id: "strength", label: "Strength" },
  { id: "cardio", label: "Cardio" },
  { id: "functional", label: "Functional" },
  { id: "weights", label: "Free Weights" },
  { id: "recovery", label: "Recovery" },
];

export default function EquipmentGrid() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredData = activeTab === "all"
    ? equipmentData
    : equipmentData.filter((item) => item.category === activeTab);

  const handleExamine = (item: EquipmentItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-10 w-full items-center select-none">
      {/* 1. Category Filter Pills */}
      <div className="flex flex-wrap gap-2 justify-center bg-zinc-100 dark:bg-zinc-950 p-1.5 rounded-full border border-zinc-200 dark:border-white/[0.05] max-w-3xl">
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
                layoutId="activeEquipmentFilterPill"
                className="absolute inset-0 bg-red-600 rounded-full shadow-md shadow-red-600/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 2. Bento Grid Layout */}
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
                <EquipmentCard
                  item={item}
                  onClick={() => handleExamine(item)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* 3. Detail Popup Modal */}
      <EquipmentModal
        item={selectedItem}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
