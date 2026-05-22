"use client";

import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

export default function EmptyCart() {
  const { toggleCart } = useCart();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center select-none">
      {/* Icon with radar pulse halo */}
      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.04] text-zinc-400 dark:text-zinc-500 mb-6">
        <FiShoppingBag size={24} />
        <span className="absolute inset-0 rounded-full border border-red-500/20 animate-ping opacity-75" />
      </div>

      <h3 className="text-xs font-black uppercase tracking-[0.25em] text-zinc-900 dark:text-white mb-2">
        CART TRANSCIEVER EMPTY
      </h3>
      <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest max-w-[240px] leading-relaxed mb-8">
        No active biometrics equipment or nutrition compounds are currently registered in your queue.
      </p>

      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(239, 68, 68, 0.25)" }}
        whileTap={{ scale: 0.97 }}
        onClick={() => toggleCart(false)}
        className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(239,68,68,0.2)] transition-all cursor-pointer"
      >
        Return to Arenas
      </motion.button>
    </div>
  );
}
