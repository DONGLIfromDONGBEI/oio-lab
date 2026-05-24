"use client";

import { useState } from "react";
import clsx from "clsx";

type ReviewItem = {
  phase: number;
  label: string;
  youtubeId?: string;
  bilibiliBvid?: string;
};

const REVIEWS: ReviewItem[] = [
  {
    phase: 1,
    label: "第一期评测",
    youtubeId: "DrLwsubyqcU",
    bilibiliBvid: "BV1Yu5x6AECE",
  },
  {
    phase: 2,
    label: "第二期评测",
    youtubeId: "gPx3W26apUw",
    bilibiliBvid: "BV1eT5x6eE4x",
  },
  {
    phase: 3,
    label: "第三期评测",
  },
  {
    phase: 4,
    label: "第四期评测",
  },
];

export default function ReviewPrototypePage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = REVIEWS[activeIdx] ?? REVIEWS[0];

  const canShowVideo = Boolean(current.youtubeId || current.bilibiliBvid);

  return (
    <main className="min-h-screen bg-[#0b0c0e] px-6 py-12 text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="space-y-3 text-center">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Hailey 深度使用评测 · 展示原型
          </h1>
          <p className="text-sm text-[#b8bcc8] md:text-base">
            独立演示页（不影响当前 Landing Page）：数字期次切换 + 上一期/下一期导航。
          </p>
        </header>

        <section className="rounded-2xl border border-[#333333] bg-[#161616] p-5 md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-white md:text-base">
                选择评测期数：
              </p>
              <div className="flex flex-wrap gap-1.5">
                {REVIEWS.slice(0, 3).map((item, idx) => (
                  <button
                    key={item.phase}
                    onClick={() => setActiveIdx(idx)}
                    className={clsx(
                      "h-8 w-8 rounded-full border text-sm font-semibold transition",
                      idx === activeIdx
                        ? "border-[#537FE7] bg-[#1b2437] text-white"
                        : "border-[#3a3f4d] text-[#c4c7d0] hover:border-[#537FE7]"
                    )}
                    aria-label={`切换到${item.label}`}
                  >
                    {item.phase}
                  </button>
                ))}
              </div>
            </div>
            <h2 className="text-lg font-semibold md:text-xl">{current.label}</h2>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#2f3340] bg-black">
            {canShowVideo ? (
              current.youtubeId ? (
                <iframe
                  title={`${current.label} YouTube`}
                  src={`https://www.youtube.com/embed/${encodeURIComponent(
                    current.youtubeId!
                  )}?rel=0&modestbranding=1`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <iframe
                  title={`${current.label} Bilibili`}
                  src={`https://player.bilibili.com/player.html?isOutside=true&bvid=${encodeURIComponent(
                    current.bilibiliBvid!
                  )}&p=1&autoplay=0&danmaku=0`}
                  className="absolute inset-0 h-full w-full"
                  allowFullScreen
                />
              )
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <p className="text-base font-medium text-[#dbe2ff]">本期评测尚未发布</p>
                <p className="mt-2 text-sm text-[#9ea5b5]">
                  当前仅展示已发布期次；后续新增第 3-6 期时只需补充视频 ID。
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

