"use client";

import React, { useState } from "react";
import FAQHeader from "./FAQHeader";
import FAQCategory, { FAQCatType } from "./FAQCategory";
import FAQAccordion, { FAQData } from "./FAQAccordion";

export default function FAQ() {
  const [activeCat, setActiveCat] = useState<FAQCatType>("all");

  // 1. Rigorous static FAQ dataset
  const fullFaqList: FAQData[] = [
    {
      question: "Do you offer free trial sessions?",
      answer: "Yes! We offer a complimentary, comprehensive 1-day telemetry trial pass, allowing you to access all standard lifting areas, cardio zones, and recovery pools before committing.",
      category: "membership",
    },
    {
      question: "Are personal trainers included?",
      answer: "Our Apex Elite tiers incorporate one-on-one biometrics conditioning coaches who program your force output. Basic tiers provide automated telemetry routines with our mobile app tracking.",
      category: "training",
    },
    {
      question: "What are your membership plans?",
      answer: "We offer three bio-tier memberships: Apex Core ($120/mo), Telemetry Plus ($240/mo), and Neural VIP ($480/mo), matching your biometrics tracking requirements and coach scheduling needs.",
      category: "pricing",
    },
    {
      question: "Is the gym beginner friendly?",
      answer: "Absolutely. Every enrollment triggers an initial full-body biomechanics scan and cellular respiration walkthrough to map your baseline safely. Coaches adjust variables to match your comfort.",
      category: "membership",
    },
    {
      question: "Do you provide diet guidance?",
      answer: "Yes. Our in-house cellular nutritionists compile Mifflin-St Jeor metabolic profiles and write custom macro target recipes loaded directly to your Apex account.",
      category: "training",
    },
    {
      question: "What are the gym working hours?",
      answer: "Apex operates 24/7/365. Access is verified via your custom Titanium RFID Passcard or digital biometrics signature inside the sticky mobile portal.",
      category: "facilities",
    },
    {
      question: "Can I freeze my membership?",
      answer: "Yes. Standard memberships can be frozen for up to 60 solar days per calendar year directly in the profile portal without administrative fees.",
      category: "membership",
    },
    {
      question: "Do you have separate trainers for women?",
      answer: "Yes. We have a highly trained, diverse clinical staff of coaches and certified sports physiologists, ensuring you can train with the exact advisor you prefer.",
      category: "training",
    },
  ];

  // 2. Filter FAQ items based on category selection
  const filteredFaqs =
    activeCat === "all"
      ? fullFaqList
      : fullFaqList.filter((item) => item.category === activeCat);

  // 3. Dynamic SEO Structured Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": filteredFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="relative z-10 w-full bg-zinc-50 dark:bg-black text-zinc-950 dark:text-white py-20 md:py-28 border-t border-zinc-200 dark:border-white/[0.04] flex flex-col gap-12 sm:gap-16 scroll-mt-24 overflow-hidden select-none transition-colors duration-500"
    >
      {/* 4. Injected Structured SEO metadata script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Cinematic background spotlight glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[50%] aspect-square rounded-full bg-red-600/5 blur-[120px] dark:bg-red-950/10 dark:blur-[160px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] aspect-square rounded-full bg-red-600/5 blur-[120px] dark:bg-red-950/10 dark:blur-[160px]" />
      </div>

      {/* Header Block */}
      <div className="relative z-10">
        <FAQHeader />
      </div>

      {/* Category Pills slider */}
      <div className="relative z-10">
        <FAQCategory activeCat={activeCat} setActiveCat={setActiveCat} />
      </div>

      {/* Accordion Panels rows */}
      <div className="relative z-10">
        <FAQAccordion faqList={filteredFaqs} />
      </div>
    </section>
  );
}
