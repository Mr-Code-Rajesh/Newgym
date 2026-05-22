"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { CartItem as CartItemType, useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const discountPrice = product.price * (1 - (product.discount || 0) / 100);
  const totalItemPrice = discountPrice * quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-white/[0.03] select-none"
    >
      {/* Product Image Thumbnail */}
      <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-200 dark:border-white/[0.04] bg-white dark:bg-zinc-900 shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      {/* Product Text Details */}
      <div className="flex-1 min-w-0 text-left">
        <h4 className="text-[11px] font-black uppercase tracking-wider text-zinc-900 dark:text-white truncate">
          {product.title}
        </h4>
        <span className="text-[9.5px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mt-0.5">
          {product.category}
        </span>
        
        {/* Prices Row */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-[11px] font-black font-mono text-red-600 dark:text-red-500">
            ₹{discountPrice.toLocaleString("en-IN")}
          </span>
          {product.discount && (
            <span className="text-[9px] font-semibold font-mono text-zinc-400 dark:text-zinc-600 line-through">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>

      {/* Adjust quantity controls and delete triggers */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        {/* Total Price for this item quantity */}
        <span className="text-[11px] font-black font-mono text-zinc-900 dark:text-white">
          ₹{totalItemPrice.toLocaleString("en-IN")}
        </span>

        <div className="flex items-center gap-2">
          {/* Quantity Controls */}
          <div className="flex items-center rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.04] overflow-hidden">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="p-1.5 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <FiMinus size={10} />
            </button>
            <span className="px-2 text-[10px] font-mono font-black text-zinc-800 dark:text-zinc-200">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="p-1.5 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <FiPlus size={10} />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(product.id)}
            className="p-1.5 rounded-lg border border-transparent hover:border-red-500/10 dark:hover:border-red-500/20 text-zinc-400 hover:text-red-500 hover:bg-red-500/5 dark:hover:bg-red-500/10 transition-all cursor-pointer"
            aria-label="Remove item"
          >
            <FiTrash2 size={11} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
