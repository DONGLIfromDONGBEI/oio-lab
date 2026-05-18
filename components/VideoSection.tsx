"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";

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
  /** 内地线路：B 站 BV 号 */
  bilibiliBvid?: string;
  /** 非内地线路：YouTube 视频 ID */
  youtubeVideoId?: string;
  /** 覆盖区块顶部间距（默认 mt-10），用于与上下模块对称留白 */
  sectionClassName?: string;
}

export function VideoSection({
  title,
  subtitle,
  bilibiliBvid,
  youtubeVideoId,
  sectionClassName,
}: VideoSectionProps) {
  const { isMainlandChina, geoReady } = useLanguage();

  const surface: "loading" | "bilibili" | "youtube" | "unavailable" = !geoReady
    ? "loading"
    : isMainlandChina
      ? bilibiliBvid
        ? "bilibili"
        : "unavailable"
      : youtubeVideoId
        ? "youtube"
        : "unavailable";

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={clsx(
        "flex w-full flex-col items-center text-center",
        sectionClassName ?? "mt-10"
      )}
    >
      {(title || subtitle) && (
        <div className="mb-6 flex w-full flex-col items-center gap-3 md:mb-6">
          {title && (
            <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
              <OIOBlue text={title} />
            </h2>
          )}
          {subtitle && (
            <p className="max-w-xl text-base text-[#e0e0e0] md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-[#333333] bg-[#161616] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="relative aspect-video w-full bg-black">
          {surface === "loading" ? (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-[#b5b5b5]">
              正在根据网络地区选择视频线路...
            </div>
          ) : surface === "bilibili" ? (
            <iframe
              title={title ? `${title} — Bilibili` : "Bilibili video"}
              src={`https://player.bilibili.com/player.html?isOutside=true&bvid=${encodeURIComponent(bilibiliBvid!)}&p=1&autoplay=0&danmaku=0`}
              className="absolute inset-0 h-full w-full"
              allowFullScreen
            />
          ) : surface === "youtube" ? (
            <iframe
              title={title ? `${title} — YouTube` : "YouTube video"}
              src={`https://www.youtube.com/embed/${encodeURIComponent(youtubeVideoId!)}?rel=0&modestbranding=1`}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-[#b5b5b5]">
              当前地区的视频线路未配置，请稍后重试或联系管理员。
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
