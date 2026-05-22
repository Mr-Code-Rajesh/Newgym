"use client";

import React from "react";
import { FaStar } from "react-icons/fa6";

interface RatingStarsProps {
  rating: number;
  size?: number;
}

export default function RatingStars({ rating, size = 11 }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, idx) => {
        const isFilled = idx < Math.floor(rating);
        return (
          <FaStar
            key={idx}
            size={size}
            className={`transition-colors duration-300 ${
              isFilled
                ? "text-red-500 drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]"
                : "text-zinc-200 dark:text-zinc-800"
            }`}
          />
        );
      })}
    </div>
  );
}
