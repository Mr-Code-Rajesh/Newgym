"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiShield, FiZap, FiAward, FiMoon, FiHeart, FiActivity } from "react-icons/fi";
import BenefitCard from "./BenefitCard";

const benefits = [
  {
    title: "Builds Mental Strength",
    description: "Progressive physical stress triggers deep neural adaptation, elevating emotional resilience and baseline mental threshold limits.",
    icon: FiShield
  },
  {
    title: "Increases Energy Levels",
    description: "Accelerates cellular mitochondria synthesis, resulting in elevated ATP production levels and sustained daily endurance.",
    icon: FiZap
  },
  {
    title: "Improves Confidence",
    description: "Neuromuscular mastery and skeletal improvements physically remodel physiological confidence indicators and posture.",
    icon: FiAward
  },
  {
    title: "Reduces Stress",
    description: "Immediately drops active biological cortisol loads while flushing system pathways with continuous endorphin releases.",
    icon: FiMoon
  },
  {
    title: "Boosts Discipline",
    description: "Rigorous physical patterns establish physical neural pathways in the prefrontal cortex, reinforcing personal willpower traits.",
    icon: FiHeart
  },
  {
    title: "Enhances Physical Health",
    description: "Triggers bone density improvements, lowers active resting heart rates, and optimizes cardiovascular systemic health.",
    icon: FiActivity
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function BenefitGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
    >
      {benefits.map((benefit, idx) => (
        <motion.div key={idx} variants={itemVariants} className="h-full">
          <BenefitCard
            title={benefit.title}
            description={benefit.description}
            icon={benefit.icon}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
