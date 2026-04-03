"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

/** 与 WhoItsFor 列表一致：字号、字重、行高、颜色 */
const BULLET_LIST =
  "list-disc list-outside space-y-4 pl-5 text-left text-sm font-medium leading-relaxed text-[#e0e0e0] md:text-[0.9375rem]";
const NOTE =
  "mb-4 text-left text-sm font-medium leading-relaxed text-[#e0e0e0] md:mb-5 md:text-[0.9375rem]";

export function CourseInfoCard() {
  const { t } = useLanguage();
  const c = t.courseInfo;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-10 flex w-full flex-col items-center gap-6 text-center"
    >
      <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
        {c.title}
      </h2>
      <div className="mx-auto w-full max-w-[38rem] rounded-2xl border border-[#333333] bg-[#161616] px-6 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.45)] md:px-10 md:py-8">
        <p className={NOTE}>{c.timezoneNote}</p>

        <ul className={BULLET_LIST}>
          <li>{c.scheduleLine}</li>
          <li>{c.firstWeekLine}</li>
          <li>{c.replayLine}</li>
          <li>{c.refundLine}</li>
          <li>{c.alternatePaymentNote}</li>
        </ul>
      </div>
    </motion.section>
  );
}
