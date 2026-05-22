"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoaderBackground from "./LoaderBackground";
import LoaderLogo from "./LoaderLogo";
import LoaderCounter from "./LoaderCounter";
import LoaderText from "./LoaderText";
import LoaderTransition from "./LoaderTransition";

interface CinematicLoaderProps {
  onComplete: () => void;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [timeline, setTimeline] = useState<"logo" | "counting" | "slogan" | "exit" | "done">("logo");

  // Lock scrolling during the loader phase
  useEffect(() => {
    const originalGutter = document.documentElement.style.scrollbarGutter;
    
    if (timeline !== "done") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.scrollbarGutter = "stable";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.scrollbarGutter = originalGutter;
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.scrollbarGutter = originalGutter;
    };
  }, [timeline]);

  // Event handlers for moving along the timeline
  const handleCounterProgress = (progress: number) => {
    // When the counter crosses 80%, reveal the slogan
    if (progress >= 80 && timeline === "counting") {
      setTimeline("slogan");
    }
  };

  const handleCounterComplete = () => {
    // Trigger exit transition once counting is fully complete (100)
    setTimeline("exit");
  };

  const handleTransitionComplete = () => {
    setTimeline("done");
    onComplete();
  };

  // Keep tracking count internally for slogan reveal
  const [internalCount, setInternalCount] = useState(0);

  return (
    <>
      <AnimatePresence mode="wait">
        {timeline !== "done" && (
          <motion.div
            key="loader-container"
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.5 } }}
            className="fixed inset-0 z-40 select-none overflow-hidden bg-black flex flex-col items-center justify-between py-16 px-6"
          >
            {/* Cinematic Background Layer */}
            <LoaderBackground theme="dark" />

            {/* Top Empty Space for Balancing Layout */}
            <div className="h-10 w-full" />

            {/* Logo Center Stage */}
            <div className="relative z-30 flex flex-col items-center justify-center flex-1 w-full max-w-lg">
              <LoaderLogo isComplete={timeline === "exit"} />
              
              {/* Slogan Text directly underneath logo */}
              <div className="mt-8">
                <LoaderText show={timeline === "slogan" || timeline === "exit"} />
              </div>
            </div>

            {/* Bottom Progress Counter Area */}
            <div className="relative z-30 mb-8">
              {/* Trigger loading count with live progress updates */}
              <LoaderCounter 
                duration={3200} 
                onProgress={(c) => {
                  if (c >= 78 && timeline === "logo") {
                    setTimeline("counting");
                  }
                  if (c >= 80 && timeline === "counting") {
                    setTimeline("slogan");
                  }
                }}
                onComplete={handleCounterComplete}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Flash Frame, Shutter Wipes and Energy Streak Transition Layer */}
      <LoaderTransition 
        isExiting={timeline === "exit"} 
        onTransitionComplete={handleTransitionComplete} 
      />
    </>
  );
}


