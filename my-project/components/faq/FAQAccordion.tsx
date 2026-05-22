"use client";

import React, { useState } from "react";
import FAQItem from "./FAQItem";

export interface FAQData {
  question: string;
  answer: string;
  category: "membership" | "training" | "facilities" | "pricing";
}

interface FAQAccordionProps {
  faqList: FAQData[];
}

export default function FAQAccordion({ faqList }: FAQAccordionProps) {
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  if (faqList.length === 0) {
    return (
      <div className="w-full text-center py-10 select-none">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          No records matching current directive.
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 w-full flex flex-col gap-4">
      {faqList.map((faq, idx) => (
        <FAQItem
          key={idx}
          question={faq.question}
          answer={faq.answer}
          isOpen={activeIdx === idx}
          onClick={() => setActiveIdx(activeIdx === idx ? -1 : idx)}
        />
      ))}
    </div>
  );
}
