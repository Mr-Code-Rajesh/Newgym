"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiMessageSquare } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function CartSummary() {
  const { cart, cartTotal } = useCart();

  const shipping = cartTotal >= 1500 ? 0 : 99;
  const grandTotal = cartTotal + shipping;

  const handleCheckout = () => {
    // Format the WhatsApp message content
    let message = "Hello Apex Core Store! I want to order the following gym products:\n\n";
    
    cart.forEach((item) => {
      const discountPrice = item.product.price * (1 - (item.product.discount || 0) / 100);
      message += `• ${item.quantity}x ${item.product.title} - ₹${discountPrice.toLocaleString("en-IN")} each\n`;
    });

    if (shipping > 0) {
      message += `\nShipping: ₹${shipping}\n`;
    } else {
      message += `\nShipping: FREE (Apex Priority Shipping)\n`;
    }

    message += `Grand Total: ₹${grandTotal.toLocaleString("en-IN")}\n\n`;
    message += "Please confirm my order and share coordinates for payment!";

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6383168050?text=${encodedText}`;

    // Open WhatsApp URL
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/[0.04] flex flex-col gap-4 select-none">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-white/[0.04] pb-2 text-left">
        ORDER DIAGNOSTICS
      </h3>

      {/* Summary Rows */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          <span>Subtotal</span>
          <span className="font-mono text-zinc-800 dark:text-zinc-350">
            ₹{cartTotal.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          <span>Uplink Delivery</span>
          <span className="font-mono text-zinc-800 dark:text-zinc-350">
            {shipping === 0 ? "FREE" : `₹${shipping}`}
          </span>
        </div>
        
        {/* Shipping free progress bar indicator */}
        {cartTotal < 1500 && (
          <div className="w-full mt-1 text-left">
            <div className="h-[3px] w-full rounded-full bg-zinc-200 dark:bg-zinc-850 overflow-hidden">
              <div 
                className="h-full bg-red-600 dark:bg-red-500 transition-all duration-500" 
                style={{ width: `${(cartTotal / 1500) * 100}%` }}
              />
            </div>
            <span className="text-[8px] text-zinc-400 dark:text-zinc-500 tracking-wider font-semibold block mt-1 uppercase">
              Add ₹{(1500 - cartTotal).toLocaleString("en-IN")} more for FREE priority shipping
            </span>
          </div>
        )}

        <div className="border-t border-zinc-200 dark:border-white/[0.04] my-2 pt-3 flex items-center justify-between text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">
          <span>Grand Total</span>
          <span className="font-mono text-red-600 dark:text-red-500 text-sm">
            ₹{grandTotal.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <motion.button
        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34, 197, 94, 0.25)" }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCheckout}
        className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10.5px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all cursor-pointer outline-none"
      >
        <FiMessageSquare size={13} className="animate-pulse" />
        Checkout via WhatsApp
      </motion.button>
    </div>
  );
}
