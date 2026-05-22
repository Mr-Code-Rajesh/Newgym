"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import FloatingCTA from "./FloatingCTA";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // 1. Monitor scroll offset thresholds
  useEffect(() => {
    if (isDismissed) return;

    const handleScroll = () => {
      // Reveal bar after scrolling past 500px (beyond Hero fold)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <FloatingCTA onDismiss={handleDismiss} />
      )}
    </AnimatePresence>
  );
}
