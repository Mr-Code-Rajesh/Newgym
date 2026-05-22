"use client";

import React from "react";
import FeaturedCoach from "./FeaturedCoach";
import CoachCard from "./CoachCard";

export interface CoachData {
  name: string;
  role: string;
  image: string;
  exp: number;
  bio: string;
  badges: string[];
}

interface CoachesGridProps {
  featured: CoachData;
  secondaries: CoachData[];
}

export default function CoachesGrid({ featured, secondaries }: CoachesGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-7xl mx-auto px-4 select-none">
      {/* 1. Left: Featured Master Coach (Col Span 5) */}
      <div className="lg:col-span-5 flex flex-col h-full justify-between">
        <FeaturedCoach {...featured} />
      </div>

      {/* 2. Right: Secondary Coaches Grid (Col Span 7) */}
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full items-stretch">
        {secondaries.map((coach, idx) => {
          // Stretch third card (idx === 2) horizontally on tablet/desktop row 2
          const isThird = idx === 2;
          return (
            <div
              key={idx}
              className={`flex flex-col h-full justify-between ${
                isThird ? "sm:col-span-2" : ""
              }`}
            >
              <CoachCard {...coach} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
