"use client";

import React from "react";
import FeaturedTestimonial, { TestimonialData } from "./FeaturedTestimonial";
import TestimonialCard from "./TestimonialCard";

interface TestimonialGridProps {
  featuredMember: TestimonialData;
  secondaryMembers: TestimonialData[];
}

export default function TestimonialGrid({
  featuredMember,
  secondaryMembers,
}: TestimonialGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Large Featured Testimonial Card on the Left (Col 7) */}
        <div className="lg:col-span-7 flex flex-col justify-stretch">
          <FeaturedTestimonial member={featuredMember} />
        </div>

        {/* Small Testimonial Cards on the Right (Col 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          {secondaryMembers.map((member) => (
            <TestimonialCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
