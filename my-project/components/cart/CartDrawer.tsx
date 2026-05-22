"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, isOpen, toggleCart, clearCart, cartItemsCount, mounted } = useCart();

  // Block document scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-black z-[100] cursor-pointer"
          />

          {/* Cart Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white dark:bg-black border-l border-zinc-200 dark:border-white/[0.06] shadow-2xl flex flex-col z-[101] overflow-hidden"
          >
            {/* Header console */}
            <div className="p-4 border-b border-zinc-200 dark:border-white/[0.04] flex items-center justify-between select-none shrink-0 bg-zinc-50 dark:bg-zinc-950">
              <div className="flex items-center gap-2">
                <FiShoppingBag size={14} className="text-red-600 dark:text-red-500" />
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-950 dark:text-white">
                  CART REGISTRY ({cartItemsCount})
                </span>
              </div>
              <div className="flex items-center gap-3">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="p-1 text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1.5 text-[8.5px] font-black uppercase tracking-wider cursor-pointer"
                    aria-label="Clear cart queue"
                  >
                    <FiTrash2 size={11} />
                    Purge All
                  </button>
                )}
                <button
                  onClick={() => toggleCart(false)}
                  className="p-1 rounded-lg hover:bg-zinc-150 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-250 dark:hover:border-white/[0.04] text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Close drawer"
                >
                  <FiX size={14} />
                </button>
              </div>
            </div>

            {/* Scrollable list items panel */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-0">
              <AnimatePresence initial={false}>
                {cart.length > 0 ? (
                  cart.map((item) => <CartItem key={item.product.id} item={item} />)
                ) : (
                  <EmptyCart />
                )}
              </AnimatePresence>
            </div>

            {/* Checkout block summary */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-zinc-200 dark:border-white/[0.04] bg-zinc-50 dark:bg-zinc-950 shrink-0 flex flex-col gap-3">
                <CartSummary />
                
                <Link
                  href="/cart"
                  onClick={() => toggleCart(false)}
                  className="w-full text-center text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-500 transition-colors py-1 block cursor-pointer"
                >
                  View detailed shopping bag
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
