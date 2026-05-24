"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";

type ReviewPhase = {
  phase: number;
  label: string;
  bilibiliBvid?: string;
  youtubeVideoId?: string;
};

interface ReviewPhasesSectionProps {
  title?: string;
  phases: ReviewPhase[];
  sectionClassName?: string;
}

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

export function ReviewPhasesSection({
  title,
  phases,
  sectionClassName,
}: ReviewPhasesSectionProps) {
  const { locale, countryCode, isMainlandChina, geoReady } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  const safeIdx = Math.min(activeIdx, Math.max(0, phases.length - 1));
  const current = phases[safeIdx];

  const selectorLabel =
    locale === "zh-TW" ? "選擇評測期數：" : "选择评测期数：";
  const unavailableLabel =
    locale === "zh-TW" ? "本期正在體驗中，敬請期待" : "本期正在体验中，敬请期待";
  const loadingLabel = locale === "zh-TW" ? "視頻加載中…" : "视频加载中…";
  const geoFailedLabel =
    locale === "zh-TW"
      ? "網路地區檢測失敗，請刷新頁面重試。"
      : "网络地区检测失败，请刷新页面重试。";

  const surface: "loading" | "geo-unavailable" | "bilibili" | "youtube" | "unavailable" =
    !geoReady
      ? "loading"
      : countryCode === null
        ? "geo-unavailable"
        : isMainlandChina
          ? current?.bilibiliBvid
            ? "bilibili"
            : "unavailable"
          : current?.youtubeVideoId
            ? "youtube"
            : "unavailable";

  const titleText = useMemo(() => current?.label ?? "", [current]);

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
      {title && (
        <div className="mb-6 flex w-full flex-col items-center gap-3 md:mb-6">
          <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
            <OIOBlue text={title} />
          </h2>
        </div>
      )}

      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-[#333333] bg-[#161616] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-white md:text-base">{selectorLabel}</p>
            <div className="flex flex-wrap gap-1.5">
              {phases.slice(0, 3).map((item, idx) => (
                <button
                  key={item.phase}
                  onClick={() => setActiveIdx(idx)}
                  className={clsx(
                    "h-8 w-8 rounded-full border text-sm font-semibold transition",
                    idx === safeIdx
                      ? "border-[#537FE7] bg-[#1b2437] text-white"
                      : "border-[#3a3f4d] text-[#c4c7d0] hover:border-[#537FE7]"
                  )}
                  aria-label={item.label}
                >
                  {item.phase}
                </button>
              ))}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white md:text-xl">{titleText}</h3>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#2f3340] bg-black">
          {surface === "loading" ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <svg
                className="h-8 w-8 animate-spin text-[#537FE7]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span className="text-sm text-[#b5b5b5]">{loadingLabel}</span>
            </div>
          ) : surface === "geo-unavailable" ? (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-[#b5b5b5]">
              {geoFailedLabel}
            </div>
          ) : surface === "bilibili" ? (
            <iframe
              title={`${titleText} — Bilibili`}
              src={`https://player.bilibili.com/player.html?isOutside=true&bvid=${encodeURIComponent(
                current.bilibiliBvid!
              )}&p=1&autoplay=0&danmaku=0`}
              className="absolute inset-0 h-full w-full"
              allowFullScreen
            />
          ) : surface === "youtube" ? (
            <iframe
              title={`${titleText} — YouTube`}
              src={`https://www.youtube.com/embed/${encodeURIComponent(
                current.youtubeVideoId!
              )}?rel=0&modestbranding=1`}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <p className="text-base font-medium text-[#dbe2ff]">{unavailableLabel}</p>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

