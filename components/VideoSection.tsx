"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

/** Renders text with "OIO" in accent blue */
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

interface VideoSectionProps {
  /** Optional section title (omit for no title) */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Video URL */
  src: string;
  /** Optional poster/thumbnail URL when first frame cannot be used */
  poster?: string;
  /** 覆盖区块顶部间距（默认 mt-10），用于与上下模块对称留白 */
  sectionClassName?: string;
}

export function VideoSection({
  title,
  subtitle,
  src,
  poster,
  sectionClassName,
}: VideoSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={clsx(
        "flex w-full flex-col items-center gap-4 text-center",
        sectionClassName ?? "mt-10"
      )}
    >
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          <OIOBlue text={title} />
        </h2>
      )}
      {subtitle && (
        <p className="text-[#e0e0e0] text-base md:text-lg max-w-xl">
          {subtitle}
        </p>
      )}
      <div className="w-full max-w-3xl bg-[#161616] border border-[#333333] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <video
          className="w-full aspect-video object-contain bg-black"
          src={src}
          poster={poster}
          controls
          preload="metadata"
          playsInline
        >
          您的浏览器不支持视频播放。
        </video>
      </div>
    </motion.section>
  );
}
