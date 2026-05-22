"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiSliders } from "react-icons/fi";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const CATEGORIES = ["All", "Supplements", "Accessories", "Gear"];

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 25 } },
  };

  return (
    <div className="w-full flex flex-col gap-8 select-none">
      {/* Search and Filters Console Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-white/[0.04] backdrop-blur-md">
        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none scroll-smooth">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-[9.5px] font-black uppercase tracking-widest border transition-all duration-300 outline-none cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-red-600 border-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                    : "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-white/[0.04] text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Search Bar Input */}
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.04] focus-within:border-red-500/40 max-w-sm w-full transition-all duration-300">
          <FiSearch size={13} className="text-zinc-400" />
          <input
            type="text"
            placeholder="SEARCH PRODUCTS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[10px] font-mono tracking-widest text-zinc-950 dark:text-white placeholder-zinc-400/50 uppercase"
          />
        </div>
      </div>

      {/* Grid listing */}
      <AnimatePresence mode="wait">
        {filteredProducts.length > 0 ? (
          <motion.div
            key={selectedCategory + searchQuery}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-zinc-200 dark:border-white/[0.05] rounded-3xl"
          >
            <div className="w-12 h-12 rounded-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.04] flex items-center justify-center text-zinc-400 mb-4">
              <FiSliders size={18} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-zinc-900 dark:text-white mb-2">
              NO METRICS FOUND
            </h3>
            <p className="text-[9.5px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-relaxed max-w-[280px]">
              No fitness compounds or accessories match your selected telemetry query.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
