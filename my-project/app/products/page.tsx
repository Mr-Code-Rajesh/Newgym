import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Apex Fitness Gear & Supplements Store",
  description: "Acquire high-performance gym compounds, customized protein formulas, and heavy-duty training gear engineered for peak metabolic physical outputs.",
  openGraph: {
    title: "Apex Fitness Gear & Supplements Store",
    description: "High-end gym accessories and supplements for serious athletes.",
    images: ["https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=800&auto=format&fit=crop"],
  },
};

export default function ProductsPage() {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col justify-between pt-24 md:pt-32">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Cinematic Grid Header Title */}
        <div className="flex flex-col gap-3 mb-10 text-left select-none max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 font-mono">
              APEX OVERSEAS LOGISTICS SYSTEM
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-wider text-white">
            EQUIPMENT & COMPOUNDS
          </h1>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-semibold tracking-wide uppercase leading-relaxed mt-1">
            Browse our curated reserve of performance-tested formulas, high-friction grip support braces, and heavy-tension calibration systems.
          </p>
        </div>

        {/* Dynamic Catalog Grid */}
        <ProductGrid products={products} />
      </main>

      {/* Modern Gym Footer */}
      <Footer />
    </div>
  );
}
