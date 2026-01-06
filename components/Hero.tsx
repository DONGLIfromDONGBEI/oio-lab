"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import React from "react";

// Robust parser component
const RichTextRenderer = ({ text }: { text: string }) => {
  const lines = text.split('\n');

  return (
    <div className="flex flex-col gap-2">
      {lines.map((line, i) => (
        <p key={i} className="leading-[1.7]">
          {renderLine(line)}
        </p>
      ))}
    </div>
  );
};

const renderLine = (text: string) => {
  // ~content~ -> strikethrough
  // _content_ -> bold blue
  // *content* -> bold blue
  const regex = /([~_*])(.*?)\1/g;
  let lastIndex = 0;
  const elements = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(<span key={`text-${lastIndex}`}>{text.substring(lastIndex, match.index)}</span>);
    }

    const marker = match[1];
    const content = match[2];
    const key = `mark-${match.index}`;

    if (marker === '~') {
      elements.push(
        <span key={key} className="line-through decoration-neutral-400 text-neutral-400 mx-1">
          {content}
        </span>
      );
    } else if (marker === '_' || marker === '*') {
      elements.push(
        <span key={key} className="font-bold text-blue-600 mx-1">
          {content}
        </span>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(<span key={`text-end`}>{text.substring(lastIndex)}</span>);
  }

  return elements;
};

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex flex-col items-start justify-start w-full mb-4">
      {/* Header Group */}
      <div className="flex flex-col items-start w-full mb-8 pl-1">
        {/* Eyebrow: Badge Style, Optical Alignment (-ml-6) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block text-blue-700 text-2xl font-semibold tracking-[0.15em] mb-5 px-6 py-2 rounded-full border border-blue-100 bg-blue-50/30 -ml-6"
        >
          {t.eyebrow}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1A1A1B] leading-[1.1]"
        >
          {t.title}
        </motion.h1>
      </div>

      {/* Subtitle Container - CENTERED */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-full max-w-[38rem] bg-white border border-gray-100 rounded-2xl px-8 py-6 md:pl-10 md:pr-6 md:py-8 shadow-[0_20px_50px_rgba(37,99,235,0.04)] self-center"
      >
        <div className="text-base md:text-lg text-gray-700 text-left">
          <RichTextRenderer text={t.subtitle} />
        </div>
      </motion.div>
    </section>
  );
}
