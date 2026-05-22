"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { cartItemsCount, toggleCart, mounted } = useCart();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => toggleCart(true)}
      aria-label={`Shopping cart with ${cartItemsCount} items`}
      className="relative w-9 h-9 rounded-full bg-zinc-950/40 border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:border-red-500/20 shadow-md transition-all duration-300 outline-none cursor-pointer"
    >
      <FiShoppingBag size={15} />

      <AnimatePresence>
        {mounted && cartItemsCount > 0 && (
          <motion.div
            key={cartItemsCount}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.3, 1], // Heartbeat scale jump on increase
              opacity: 1 
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              default: { type: "spring", stiffness: 450, damping: 20 },
              scale: { duration: 0.3, ease: "easeOut" }
            }}
            className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-red-600 border border-black/20 flex items-center justify-center text-[8px] font-black text-white font-mono leading-none shadow-[0_0_8px_rgba(239,68,68,0.6)]"
          >
            {cartItemsCount}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
