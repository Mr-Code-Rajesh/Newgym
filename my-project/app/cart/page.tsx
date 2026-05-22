"use client";

import React from "react";
import Link from "next/link";
import { FiArrowLeft, FiActivity } from "react-icons/fi";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, mounted } = useCart();

  if (!mounted) {
    return (
      <div className="relative min-h-screen bg-black text-white flex flex-col justify-between pt-24 md:pt-32">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-20 flex items-center justify-center select-none">
          <div className="flex flex-col items-center gap-2.5">
            <FiActivity className="text-red-500 animate-pulse" size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">
              Synchronizing Cart Telemetry...
            </span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col justify-between pt-24 md:pt-32">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 relative z-10">
        
        {/* Header Titles */}
        <div className="flex flex-col gap-2 mb-8 text-left select-none">
          <Link
            href="/products"
            className="group flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-colors mb-4 outline-none"
          >
            <FiArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
            Back to Catalog Arena
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_6px_#ef4444]" />
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-red-500 font-mono">
              APEX CHECKOUT CONSOLE
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">
            SHOPPING BAG REGISTRY
          </h1>
        </div>

        {/* Content Layout */}
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* List column */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cart.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            {/* Diagnostics Column */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-zinc-200 dark:border-white/[0.04] rounded-3xl p-10 bg-zinc-50/50 dark:bg-zinc-950/20">
            <EmptyCart />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
