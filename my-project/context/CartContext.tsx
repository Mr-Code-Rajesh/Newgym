"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  mounted: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (val?: boolean) => void;
  cartTotal: number;
  cartItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("apex_gym_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (err) {
      console.error("Error loading cart state:", err);
    }
    setMounted(true);
  }, []);

  // Save cart to LocalStorage whenever it changes
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("apex_gym_cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Error saving cart state:", err);
    }
  }, [cart, mounted]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIdx = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingItemIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIdx].quantity += quantity;
        return newCart;
      }
      return [...prevCart, { product, quantity }];
    });
    setIsOpen(true); // Auto-open cart drawer on item add
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = (val?: boolean) => {
    setIsOpen((prev) => (val !== undefined ? val : !prev));
  };

  // Calculations
  const cartTotal = cart.reduce((total, item) => {
    const itemPrice = item.product.price * (1 - (item.product.discount || 0) / 100);
    return total + itemPrice * item.quantity;
  }, 0);

  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        mounted,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        cartTotal,
        cartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
