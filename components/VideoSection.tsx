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
  const { countryCode, isMainlandChina, geoReady } = useLanguage();

  const surface: "loading" | "geo-unavailable" | "bilibili" | "youtube" | "unavailable" =
    !geoReady
      ? "loading"
      : countryCode === null
        ? "geo-unavailable"
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
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <svg className="h-8 w-8 animate-spin text-[#537FE7]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm text-[#b5b5b5]">视频加载中…</span>
            </div>
          ) : surface === "geo-unavailable" ? (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-[#b5b5b5]">
              网络地区检测失败，请刷新页面重试。
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
