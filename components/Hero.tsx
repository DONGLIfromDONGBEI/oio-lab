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
        <span key={key} className="line-through decoration-neutral-500 text-neutral-500 mx-1">
          {content}
        </span>
      );
    } else if (marker === '_' || marker === '*') {
      elements.push(
        <span key={key} className="font-bold text-[#537FE7] mx-1">
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
    <section className="relative flex flex-col items-start justify-start w-full mb-10">
      {/* Header Group */}
      <div className="flex flex-col items-start w-full mb-10 pl-1">
        {/* Eyebrow: Blue Accent, Text-Only (No Box), Left Aligned */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          // Removed border, bg, rounded, padding, and negative margin
          className="text-[#537FE7] text-3xl font-semibold tracking-[0.1em] mb-3"
        >
          {t.eyebrow}
        </motion.div>

        {/* Main Title: White/Off-White */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#ffffff] leading-[1.1]"
        >
          {t.title}
        </motion.h1>
      </div>

      {/* Subtitle Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        // Dark card bg (#161616 or similar), subtle border (#333), dark shadow
        className="w-full max-w-[38rem] bg-[#161616] border border-[#333333] rounded-2xl px-8 py-6 md:pl-10 md:pr-6 md:py-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] self-center"
      >
        <div className="text-base md:text-lg text-[#bbbbbb] text-left">
          <RichTextRenderer text={t.subtitle} />
        </div>
      </motion.div>
    </section>
  );
}
