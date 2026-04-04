"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export function FaqSection() {
  const { t } = useLanguage();
  const f = t.faq;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mt-16 w-full flex flex-col items-center gap-6 text-center md:mt-20"
      aria-labelledby="faq-heading"
    >
      <h2
        id="faq-heading"
        className="text-xl font-bold tracking-tight text-white md:text-2xl"
      >
        {f.sectionTitle}
      </h2>

      <div className="w-full max-w-2xl space-y-3 text-left">
        {f.items.map((item, i) => (
          <details
            key={i}
            className={clsx(
              "group rounded-xl border border-[#333333] bg-[#161616]",
              "shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
              "open:border-[#444444]"
            )}
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 text-left md:px-5 md:py-4 [&::-webkit-details-marker]:hidden">
              <ChevronDown
                className="h-4 w-4 shrink-0 text-[#537FE7] transition-transform duration-200 group-open:rotate-180"
                aria-hidden
              />
              <span className="text-sm font-semibold leading-snug text-white md:text-[0.9375rem]">
                {item.q}
              </span>
            </summary>
            <div className="border-t border-[#2a2a2a] px-4 pb-4 pt-3 text-sm font-medium leading-relaxed text-[#e0e0e0] md:px-5 md:text-[0.9375rem] whitespace-pre-line">
              {item.a}
            </div>
          </details>
        ))}
      </div>

      <p className="max-w-xl text-center text-xs font-medium leading-relaxed text-[#a8a8a8] md:text-sm whitespace-pre-line">
        {f.contactFooter}
      </p>
    </motion.section>
  );
}
