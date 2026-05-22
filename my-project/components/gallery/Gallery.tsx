"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import GalleryHeader from "./GalleryHeader";
import GalleryFilter from "./GalleryFilter";
import GalleryGrid from "./GalleryGrid";
import GalleryModal from "./GalleryModal";
import { GalleryItem } from "./GalleryCard";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // 1. Static Unsplash High-Fidelity Open-Source Images Collection
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Apex Bio-Dome Arena",
      category: "interior",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      id: 2,
      title: "Neural Biometrics Run",
      category: "cardio",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 3,
      title: "Hypertrophy Tensor Station",
      category: "strength",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 4,
      title: "Kinetic Velocity Session",
      category: "workout",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200",
      span: "md:col-span-1 md:row-span-2",
    },
    {
      id: 5,
      title: "Isometric Trainer Synergy",
      category: "trainers",
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1200",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: 6,
      title: "Oxygenation Spin Zone",
      category: "cardio",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 7,
      title: "Force Calibration Pull",
      category: "strength",
      image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: 8,
      title: "Apex Power Warehouse",
      category: "interior",
      image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1200",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: 9,
      title: "Metabolic Rope Drive",
      category: "workout",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200",
      span: "md:col-span-1 md:row-span-1",
    },
  ];

  const categories = ["all", "interior", "workout", "trainers", "cardio", "strength"];

  // 2. Filter collection based on active pill
  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section
      id="gallery"
      className="relative z-10 w-full bg-zinc-50 dark:bg-black text-zinc-950 dark:text-white py-20 md:py-28 border-t border-zinc-200 dark:border-white/[0.04] flex flex-col gap-12 sm:gap-16 scroll-mt-24 overflow-hidden select-none transition-colors duration-500"
    >
      {/* 3. Ambient neon lighting glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[50%] aspect-square rounded-full bg-red-600/5 blur-[120px] dark:bg-red-950/10 dark:blur-[160px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] aspect-square rounded-full bg-red-600/5 blur-[120px] dark:bg-red-950/10 dark:blur-[160px]" />
      </div>

      {/* 4. Cinematic Header */}
      <div className="relative z-10">
        <GalleryHeader />
      </div>

      {/* 5. Pill Category Filters */}
      <div className="relative z-10">
        <GalleryFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      {/* 6. Bento Grid Showcase */}
      <div className="relative z-10">
        <GalleryGrid items={filteredItems} onSelect={setSelectedItem} />
      </div>

      {/* 7. Lightbox Modal Details Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <GalleryModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
