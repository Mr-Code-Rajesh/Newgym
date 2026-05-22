import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import RelatedProducts from "@/components/products/RelatedProducts";
import { products } from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  
  if (!product) {
    return {
      title: "Item Not Resolved | Apex Portal",
    };
  }

  return {
    title: `${product.title} | Apex Core Store`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

// Generate static pathways for dynamic routing performance boost
export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="relative min-h-screen bg-black text-white flex flex-col justify-between pt-24 md:pt-32">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center select-none">
          <div className="w-16 h-16 rounded-full bg-zinc-950 border border-red-500/30 flex items-center justify-center text-red-500 mb-6 shadow-[0_0_15px_rgba(239,68,68,0.25)]">
            <FiAlertTriangle size={24} />
          </div>
          <h1 className="text-sm font-black uppercase tracking-[0.25em] text-white mb-2">
            SLOT RESOLUTION ERROR
          </h1>
          <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest max-w-[280px] leading-relaxed mb-8">
            The database was unable to resolve active coordinates for the slug: "{slug}".
          </p>
          <Link
            href="/products"
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer outline-none"
          >
            Return to Arena Catalog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col justify-between pt-24 md:pt-32">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 relative z-10 flex flex-col gap-12">
        
        {/* Back Link Breadcrumb */}
        <div className="flex items-center select-none">
          <Link
            href="/products"
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-red-500 transition-colors duration-250 outline-none"
          >
            <FiArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Back to Catalog Arena
          </Link>
        </div>

        {/* Detailed Product Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left image column */}
          <div className="w-full">
            <ProductGallery image={product.image} title={product.title} />
          </div>

          {/* Right info detail specifications column */}
          <div className="w-full">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Related Suggestions Section */}
        <div className="mt-8 border-t border-zinc-200 dark:border-white/[0.04] pt-12">
          <RelatedProducts currentProduct={product} products={products} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
