import React from "react";
import CTAContent from "./CTAContent";
import ContactForm from "./ContactForm";
import ContactCard from "./ContactCard";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 w-full bg-zinc-50 dark:bg-black text-zinc-950 dark:text-white py-20 md:py-28 border-t border-zinc-200 dark:border-white/[0.04] flex flex-col justify-center scroll-mt-24 overflow-hidden transition-colors duration-500"
    >
      {/* Cinematic background spotlight glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[55vw] h-[55vw] max-w-[550px] rounded-full bg-red-900/5 dark:bg-red-900/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[55vw] h-[55vw] max-w-[550px] rounded-full bg-red-900/5 dark:bg-red-900/5 blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Motivational CTA & Secure Form (Col 7) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <CTAContent size="lg" />
          <ContactForm />
        </div>

        {/* Right Column: Interactive Specs Info (Col 5) */}
        <div className="lg:col-span-5 flex flex-col">
          <ContactCard />
        </div>
      </div>
    </section>
  );
}
