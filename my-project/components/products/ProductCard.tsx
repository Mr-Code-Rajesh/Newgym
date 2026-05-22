"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiZap, FiCheck, FiArrowRight } from "react-icons/fi";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductBadge from "./ProductBadge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop navigation to detail page
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleQuickOrder = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop navigation
    const discountPrice = product.price * (1 - (product.discount || 0) / 100);
    const message = `Hello Apex Core Store! I want to quick-order this product:\n\n• 1x ${product.title} (₹${discountPrice.toLocaleString("en-IN")})\n\nPlease share coordinates for payments.`;
    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/6383168050?text=${encodedText}`, "_blank");
  };

  const discountPrice = product.price * (1 - (product.discount || 0) / 100);

  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-full rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-white/[0.04] backdrop-blur-md overflow-hidden flex flex-col group-hover:border-red-500/20 dark:group-hover:border-red-500/30 group-hover:shadow-[0_10px_30px_rgba(239,68,68,0.06)] transition-all duration-300 select-none"
      >
        {/* Glow border overlays on hover */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
        </div>

        {/* Product Image Area */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-white/[0.04]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            priority={product.id <= 3}
          />

          {/* Overlays / Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isHot && <ProductBadge type="hot" />}
            {product.discount && <ProductBadge type="discount" value={product.discount} />}
          </div>

          <div className="absolute top-3 right-3 z-10">
            <ProductBadge type="rating" value={product.rating} />
          </div>

          {/* Quick Preview Slide Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
            <motion.span
              className="px-4 py-2 rounded-xl bg-zinc-950/80 border border-white/[0.08] backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-white flex items-center gap-1.5 translate-y-3 group-hover:translate-y-0 transition-transform duration-350"
            >
              Examine Spec Sheet <FiArrowRight size={10} />
            </motion.span>
          </div>
        </div>

        {/* Details Text Content */}
        <div className="p-4 flex-1 flex flex-col justify-between text-left relative z-10">
          <div>
            <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.2em] block mb-1">
              {product.category}
            </span>
            <h3 className="text-xs font-black uppercase tracking-wide text-zinc-900 dark:text-white group-hover:text-red-500 transition-colors duration-250 leading-tight">
              {product.title}
            </h3>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold leading-relaxed mt-2 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="mt-4">
            {/* Price section */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-[13px] font-black font-mono text-zinc-900 dark:text-white">
                ₹{discountPrice.toLocaleString("en-IN")}
              </span>
              {product.discount && (
                <span className="text-[10px] font-bold font-mono text-zinc-400 dark:text-zinc-600 line-through">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Quick Action triggers */}
            <div className="grid grid-cols-2 gap-2">
              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`py-2 px-3 rounded-lg border text-[8.5px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all duration-300 outline-none cursor-pointer ${isAdded
                    ? "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                    : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 border-zinc-200 dark:border-white/[0.04] text-zinc-800 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400"
                  }`}
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.span
                      key="added"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      <FiCheck size={10} /> Added
                    </motion.span>
                  ) : (
                    <motion.span
                      key="cart"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      <FiShoppingCart size={10} /> Buy Slot
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Quick WhatsApp checkout */}
              <button
                onClick={handleQuickOrder}
                className="py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[8.5px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-[0_0_8px_rgba(239,68,68,0.15)] hover:shadow-[0_0_12px_rgba(239,68,68,0.3)] transition-all duration-300 outline-none cursor-pointer"
              >
                <FiZap size={10} /> Uplink Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
