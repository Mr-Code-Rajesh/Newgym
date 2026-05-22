"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export default function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className="w-full select-none">
      <div
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={`group w-full text-left p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-950/40 border transition-all duration-300 outline-none cursor-pointer flex flex-col justify-between gap-2.5 ${
          isOpen
            ? "border-red-500 shadow-[0_4px_16px_rgba(239,68,68,0.06)]"
            : "border-zinc-200 dark:border-white/[0.05] hover:border-zinc-300 dark:hover:border-white/[0.08]"
        }`}
      >
        {/* Accordion header: Question + Plus Icon */}
        <div className="flex items-center justify-between gap-4 w-full">
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wide text-zinc-950 dark:text-white transition-colors duration-200 group-hover:text-red-500">
            {question}
          </h3>

          {/* Plus / X rotate symbol indicator */}
          <motion.div
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-300 ${
              isOpen
                ? "bg-red-500 border-red-500 text-white shadow-[0_0_8px_rgba(239,68,68,0.3)]"
                : "border-zinc-200 dark:border-white/[0.08] text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white group-hover:border-zinc-300 dark:group-hover:border-white/[0.12]"
            }`}
          >
            <FiPlus size={13} />
          </motion.div>
        </div>

        {/* Expandable answer pane */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div ref={contentRef} className="pt-2 border-t border-zinc-100 dark:border-white/[0.03] mt-2.5">
            <p className="text-[11.5px] sm:text-xs font-semibold leading-relaxed text-zinc-600 dark:text-zinc-400">
              {answer}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
