"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import GalleryCard, { GalleryItem } from "./GalleryCard";

interface GalleryGridProps {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
}

export default function GalleryGrid({ items, onSelect }: GalleryGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 select-none">
      {/* 3-Column Bento Grid Container with customized height-rows */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px] sm:auto-rows-[260px]"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{
                opacity: { duration: 0.3 },
                layout: { type: "spring", stiffness: 350, damping: 30 },
              }}
              className={item.span}
            >
              <GalleryCard item={item} onSelect={onSelect} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
