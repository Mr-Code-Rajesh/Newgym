"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { toggleCart, cartItemsCount, mounted } = useCart();

  return (
    <button
      onClick={() => toggleCart(true)}
      aria-label="Open shopping cart"
      className="relative p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-950 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-white/[0.04] text-zinc-800 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 cursor-pointer outline-none flex items-center justify-center"
    >
      <FiShoppingBag size={15} />

      <AnimatePresence>
        {mounted && cartItemsCount > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-red-600 dark:bg-red-500 text-white font-mono font-black text-[9px] flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.6)]"
          >
            {cartItemsCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
