"use client";

import React from "react";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  currentProduct: Product;
  products: Product[];
}

export default function RelatedProducts({ currentProduct, products }: RelatedProductsProps) {
  const related = products
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-6 select-none text-left">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_6px_#ef4444]" />
        <h2 className="text-sm font-black uppercase tracking-[0.25em] text-zinc-950 dark:text-white">
          RECOMMENDED METRICS
        </h2>
        <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-white/[0.04]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
