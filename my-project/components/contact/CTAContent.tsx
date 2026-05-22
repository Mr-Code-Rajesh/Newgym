"use client";

import React from "react";

interface CTAContentProps {
  size?: "sm" | "lg";
}

export default function CTAContent({ size = "lg" }: CTAContentProps) {
  if (size === "sm") {
    return (
      <div className="flex flex-col text-left select-none">
        <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-zinc-950 dark:text-white leading-tight">
          Start Your Transformation Today
        </h4>
        <p className="text-[8px] sm:text-[9.5px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest leading-none mt-1">
          Join the gym that pushes you beyond limits.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5 text-center lg:text-left select-none">
      <span className="text-[10px] font-black tracking-[0.4em] uppercase text-red-600 dark:text-red-500 self-center lg:self-start">
        APEX SECURE UPLINK
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
        START YOUR <br className="hidden sm:inline lg:hidden" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500 dark:from-red-500 dark:via-red-400 dark:to-orange-400 drop-shadow-[0_2px_10px_rgba(239,68,68,0.15)]">
          TRANSFORMATION
        </span>{" "}
        TODAY
      </h2>
      <p className="text-xs sm:text-sm font-medium leading-relaxed tracking-wide text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0">
        Step into the ultimate biometrics conditioning arena. Secure your credentials, transmit your baseline details, and let board-certified physiologists engineer your peak athletic output.
      </p>
    </div>
  );
}
