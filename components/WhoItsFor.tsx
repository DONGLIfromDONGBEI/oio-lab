"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-outside space-y-4 pl-5 text-left text-sm font-medium leading-relaxed text-[#e0e0e0] md:text-[0.9375rem]">
      {items.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  );
}

/** 板块大标题：仅首个 OIO 蓝色，其余白色。 */
function OIOTitle({ text }: { text: string }) {
  const prefix = "OIO";
  if (!text.startsWith(prefix)) {
    return <span className="text-white">{text}</span>;
  }
  return (
    <>
      <span className="text-[#537FE7]">{prefix}</span>
      <span className="text-white">{text.slice(prefix.length)}</span>
    </>
  );
}

export function WhoItsFor() {
  const { t } = useLanguage();
  const w = t.whoItsFor;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mt-12 w-full md:mt-14"
      aria-label={w.title ?? `${w.notTitle} / ${w.forTitle}`}
    >
      <h2 className="mb-8 text-center text-xl font-bold tracking-tight md:mb-10 md:text-2xl">
        <OIOTitle text={w.title ?? `${w.notTitle} / ${w.forTitle}`} />
      </h2>

      <div className="mx-auto w-full max-w-[38rem] rounded-2xl border border-[#333333] bg-[#161616] px-6 py-6 shadow-[0_12px_40px_rgba(0,0,0,0.45)] md:px-10 md:py-8">
        <div>
          <h3 className="mb-3 text-lg font-semibold leading-snug text-white md:text-xl">
            {w.notTitle}
          </h3>
          <p className="mb-5 text-sm font-medium leading-relaxed text-[#e0e0e0] md:mb-6 md:text-[0.9375rem]">
            {w.notIntro}
          </p>
          <BulletList items={w.notItems} />
        </div>

        <div className="my-8 border-t border-[#333333] md:my-10" aria-hidden />

        <div>
          <h3 className="mb-3 text-lg font-semibold leading-snug text-white md:text-xl">
            {w.forTitle}
          </h3>
          <p className="mb-5 text-sm font-medium leading-relaxed text-[#e0e0e0] md:mb-6 md:text-[0.9375rem]">
            {w.forIntro}
          </p>
          <BulletList items={w.forItems} />
        </div>
      </div>
    </motion.section>
  );
}
