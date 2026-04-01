"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

/** Renders "OIO" in accent blue */
function OIOBlue({ text }: { text: string }) {
  const parts = text.split("OIO");
  return (
    <>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {p}
          {i < parts.length - 1 ? (
            <span className="text-[#537FE7]">OIO</span>
          ) : null}
        </React.Fragment>
      ))}
    </>
  );
}

/** First letter O or I in blue for Output/Imprint headings */
function SectionHeading({ heading }: { heading: string }) {
  if (heading.startsWith("Output：")) {
    return (
      <h3 className="text-[#ffffff] font-semibold text-lg">
        <span className="text-[#537FE7]">O</span>
        {heading.slice(1)}
      </h3>
    );
  }
  if (heading.startsWith("Imprint：") || heading.startsWith("Input：") || heading.startsWith("imprint：")) {
    return (
      <h3 className="text-[#ffffff] font-semibold text-lg">
        <span className="text-[#537FE7]">I</span>
        {heading.slice(1)}
      </h3>
    );
  }
  return (
    <h3 className="text-[#ffffff] font-semibold text-lg">{heading}</h3>
  );
}

export function CourseIntro() {
  const { t } = useLanguage();
  const { sectionTitle, sections } = t.courseIntro;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full flex flex-col items-center gap-6 mt-10 text-center"
    >
      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
        <OIOBlue text={sectionTitle} />
      </h2>
      <div className="w-full max-w-[38rem] mx-auto bg-[#161616] border border-[#333333] rounded-2xl px-8 py-6 md:pl-10 md:pr-6 md:py-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col gap-8 text-base md:text-lg text-[#e0e0e0] text-left">
          {sections.map((sec, i) => (
            <div key={i} className="flex flex-col gap-3">
              <SectionHeading heading={sec.heading} />
              {sec.body && (
                <p className="whitespace-pre-line leading-[1.7] text-[#e0e0e0]">{sec.body}</p>
              )}
              {(sec.bullets as Array<{ title: string; text: string }>).length > 0 && (
                <ul className="list-disc list-outside space-y-2 pl-6">
                  {(sec.bullets as Array<{ title: string; text: string }>).map((b, j) => (
                    <li key={j} className="flex flex-col gap-0.5">
                      <span className="font-semibold text-[#e0e0e0] not-italic">
                        {b.title}：
                      </span>
                      <span className="leading-[1.7] italic text-[#e0e0e0]">
                        {b.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
