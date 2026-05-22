"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiMessageSquare, FiPlus, FiMinus, FiCheck, FiStar } from "react-icons/fi";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const discountPrice = product.price * (1 - (product.discount || 0) / 100);
  const totalItemPrice = discountPrice * quantity;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hello Apex Core Store! I want to order this gym product:\n\n• ${quantity}x ${product.title} (₹${discountPrice.toLocaleString("en-IN")} each)\nTotal: ₹${totalItemPrice.toLocaleString("en-IN")}\n\nPlease confirm coordinates for payment!`;
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6383168050?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left select-none">
      {/* Category & Badge Row */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black tracking-[0.25em] text-red-500 uppercase">
          {product.category}
        </span>
        <div className="flex items-center gap-1 text-[10px] font-black text-amber-500 font-mono">
          <FiStar size={11} className="fill-amber-500" />
          <span>{product.rating}</span>
          <span className="text-zinc-400 dark:text-zinc-500 font-medium">({product.reviewsCount} reviews)</span>
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <h1 className="text-xl md:text-2xl font-black uppercase tracking-wide text-zinc-900 dark:text-white leading-tight">
          {product.title}
        </h1>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold leading-relaxed mt-3">
          {product.description}
        </p>
      </div>

      {/* Pricing Module */}
      <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.04]">
        <div className="flex items-baseline gap-3">
          <span className="text-xl font-black font-mono text-zinc-900 dark:text-white">
            ₹{discountPrice.toLocaleString("en-IN")}
          </span>
          {product.discount && (
            <>
              <span className="text-[11px] font-bold font-mono text-zinc-400 dark:text-zinc-600 line-through">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-[8.5px] font-black tracking-wider uppercase font-mono">
                Save {product.discount}%
              </span>
            </>
          )}
        </div>
        <span className="text-[8px] text-zinc-400 dark:text-zinc-500 tracking-widest font-black uppercase mt-1.5 block">
          Prices including active biometrics customs and local taxes.
        </span>
      </div>

      {/* Benefits checklist */}
      <div className="flex flex-col gap-2">
        <span className="text-[9px] font-black tracking-[0.2em] text-zinc-400 uppercase">
          PERFORMANCE CHARACTERISTICS
        </span>
        <ul className="flex flex-col gap-2">
          {product.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2 text-[10px] text-zinc-650 dark:text-zinc-350 font-semibold leading-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500/70 dark:bg-red-500 shrink-0 mt-1" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quantity & Purchase Matrix Actions */}
      <div className="flex flex-col gap-3.5 border-t border-zinc-200 dark:border-white/[0.04] pt-5">
        <div className="flex flex-wrap items-center gap-4">
          {/* Quantity Counter box */}
          <div className="flex items-center rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.04] overflow-hidden p-1 shrink-0">
            <button
              onClick={handleDecrease}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer outline-none"
              aria-label="Decrease quantity"
            >
              <FiMinus size={11} />
            </button>
            <span className="px-4 text-xs font-mono font-black text-zinc-900 dark:text-white">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer outline-none"
              aria-label="Increase quantity"
            >
              <FiPlus size={11} />
            </button>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex-1 min-w-[150px] py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all duration-300 outline-none cursor-pointer ${
              isAdded
                ? "bg-emerald-600 border border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-zinc-200 dark:border-white/[0.04] text-zinc-800 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400"
            }`}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.span
                  key="added"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <FiCheck size={12} /> Registered in Cart Queue
                </motion.span>
              ) : (
                <motion.span
                  key="cart"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <FiShoppingCart size={12} /> Add to Cart Queue
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* WhatsApp direct checkout */}
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(220, 38, 38, 0.2)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleWhatsAppOrder}
          className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all cursor-pointer outline-none"
        >
          <FiMessageSquare size={12} className="animate-pulse" />
          Checkout instantly via WhatsApp (₹{totalItemPrice.toLocaleString("en-IN")})
        </motion.button>
      </div>

      {/* Specifications module */}
      <div className="border-t border-zinc-200 dark:border-white/[0.04] pt-5">
        <span className="text-[9px] font-black tracking-[0.2em] text-zinc-400 uppercase block mb-3">
          TECHNICAL DIAGNOSTIC VALUES
        </span>
        <div className="grid grid-cols-2 gap-3.5">
          {Object.entries(product.specs).map(([key, val]) => (
            <div key={key} className="flex flex-col border-b border-zinc-150 dark:border-white/[0.03] pb-1.5">
              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {key}
              </span>
              <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 uppercase mt-0.5">
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
