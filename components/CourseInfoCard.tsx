"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function CourseInfoCard() {
  const { t } = useLanguage();
  const c = t.courseInfo;

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full mt-8"
    >
      <div className="mx-auto w-full max-w-[38rem] rounded-2xl border border-[#333333] bg-[#161616] px-6 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.45)] md:px-10 md:py-8">
        <h3 className="mb-4 text-center text-lg font-semibold text-white md:text-left md:text-xl">
          {c.title}
        </h3>
        <p className="mb-4 text-center text-sm italic leading-relaxed text-white md:text-left md:text-base">
          {c.timezoneNote}
        </p>

        <ul className="space-y-3 text-left text-sm leading-relaxed text-[#e0e0e0] md:text-[0.9375rem]">
          <li>{c.scheduleLine}</li>
          <li>{c.firstWeekLine}</li>
          <li>{c.replayLine}</li>
          <li>{c.refundLine}</li>
        </ul>
      </div>
    </motion.section>
  );
}
