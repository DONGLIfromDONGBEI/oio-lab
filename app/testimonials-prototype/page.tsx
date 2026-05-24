"use client";

import { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Slot = "after-who" | "before-countdown";

type Testimonial = {
  id: string;
  highlight: string;
  tag: string;
  imageSrc: string;
  imageAlt: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "sample-1",
    highlight: "我最大的收获是重拾自信，重新整理自己。",
    tag: "雅思考生",
    imageSrc: "/testimonials/sample-1.png",
    imageAlt: "学员反馈截图样本一",
  },
  {
    id: "sample-2",
    highlight: "OIO带给我的，不只是英文，而是让我找到了“原来我本来就可以”。",
    tag: "人间清醒的独立女性",
    imageSrc: "/testimonials/sample-2.png",
    imageAlt: "学员反馈截图样本二",
  },
];

function Block({ title, muted = false }: { title: string; muted?: boolean }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border px-5 py-4 text-sm md:px-6 md:py-5",
        muted
          ? "border-[#30343d] bg-[#121418] text-[#99a0ae]"
          : "border-[#3a3f4a] bg-[#171a20] text-[#d8dbe5]"
      )}
    >
      {title}
    </div>
  );
}

function TestimonialsCard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const current = TESTIMONIALS[activeIdx];
  const canPrev = activeIdx > 0;
  const canNext = activeIdx < TESTIMONIALS.length - 1;

  const goPrev = () => {
    setActiveIdx((v) => Math.max(0, v - 1));
  };
  const goNext = () => {
    setActiveIdx((v) => Math.min(TESTIMONIALS.length - 1, v + 1));
  };

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    touchDeltaX.current = 0;
  };
  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = (e.touches[0]?.clientX ?? 0) - touchStartX.current;
  };
  const onTouchEnd = () => {
    const threshold = 48;
    if (touchDeltaX.current <= -threshold) goNext();
    if (touchDeltaX.current >= threshold) goPrev();
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <section className="rounded-2xl border border-[#3b4a76] bg-[#151d30] px-5 py-5 md:px-6 md:py-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white md:text-xl">学员真实反馈</h3>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canPrev}
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#3e4d74] bg-[#18223a] text-[#d7e3ff] transition hover:bg-[#213056] disabled:cursor-not-allowed disabled:opacity-35 md:inline-flex"
          aria-label="上一条反馈"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <article
          className="w-full overflow-hidden rounded-xl border border-[#314066] bg-[#121a2b]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex items-start justify-between gap-3 border-b border-[#2c395a] px-4 py-3">
            <p className="text-sm font-semibold leading-relaxed text-[#cfe0ff]">
              “{current.highlight}”
            </p>
            <span className="mt-0.5 shrink-0 rounded-full border border-[#3f5280] bg-[#1b2743] px-2.5 py-1 text-[11px] text-[#cddcff]">
              {current.tag}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="block w-full bg-[#090d16] text-left transition hover:brightness-110"
            aria-label="放大查看截图"
          >
            <div className="relative flex h-[330px] items-center justify-center bg-[#090d16] p-3 md:h-[420px]">
              <Image
                src={current.imageSrc}
                alt={current.imageAlt}
                width={1600}
                height={1200}
                className="max-h-full w-auto max-w-full object-contain"
              />
              <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                点击放大
              </span>
            </div>
          </button>
        </article>

        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#3e4d74] bg-[#18223a] text-[#d7e3ff] transition hover:bg-[#213056] disabled:cursor-not-allowed disabled:opacity-35 md:inline-flex"
          aria-label="下一条反馈"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {TESTIMONIALS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={clsx(
                "h-2.5 rounded-full transition",
                idx === activeIdx ? "w-6 bg-[#6ea0ff]" : "w-2.5 bg-[#3a4561] hover:bg-[#5a6b93]"
              )}
              aria-label={`切换到第 ${idx + 1} 条反馈`}
            />
          ))}
        </div>
        <p className="text-xs text-[#aab2c6]">
          {activeIdx + 1} / {TESTIMONIALS.length}
        </p>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="反馈截图放大查看"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white"
            aria-label="关闭"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            disabled={!canPrev}
            className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white disabled:opacity-30 md:inline-flex"
            aria-label="上一张"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            disabled={!canNext}
            className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white disabled:opacity-30 md:inline-flex"
            aria-label="下一张"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-[90vh] w-full max-w-6xl overflow-auto rounded-xl border border-white/20 bg-[#0f1014] p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.imageSrc}
              alt={current.imageAlt}
              width={2200}
              height={1600}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default function TestimonialsPrototypePage() {
  const [slot, setSlot] = useState<Slot>("after-who");

  const sections = useMemo(() => {
    const base = [
      { id: "hero", node: <Block title="Hero + 首屏价值主张" /> },
      { id: "intro-video", node: <Block title="视频 1（OIO 介绍）" muted /> },
      { id: "course-intro", node: <Block title="OIO 系统拆解" muted /> },
      { id: "who", node: <Block title="WhoItsFor（适合谁 / 不适合谁）" /> },
      { id: "map", node: <Block title="进化地图（六关路径）" /> },
      { id: "course-info", node: <Block title="课程信息卡片" muted /> },
      { id: "countdown", node: <Block title="倒计时 / 名额紧迫感" /> },
      { id: "cta", node: <Block title="报名 CTA" /> },
    ];

    const testimonialNode = { id: "testimonials", node: <TestimonialsCard /> };

    if (slot === "after-who") {
      const idx = base.findIndex((x) => x.id === "who");
      return [...base.slice(0, idx + 1), testimonialNode, ...base.slice(idx + 1)];
    }

    const idx = base.findIndex((x) => x.id === "countdown");
    return [...base.slice(0, idx), testimonialNode, ...base.slice(idx)];
  }, [slot]);

  return (
    <main className="min-h-screen bg-[#0b0c0f] px-6 py-10 text-white">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-6 space-y-3 text-center">
          <h1 className="text-2xl font-bold md:text-3xl">Testimonials 插入位置模拟</h1>
          <p className="text-sm text-[#a8afbe] md:text-base">
            独立页面预览。切换插入位置，比较阅读流和转化节奏。
          </p>
        </header>

        <div className="mb-6 flex justify-center gap-2">
          <button
            onClick={() => setSlot("after-who")}
            className={clsx(
              "rounded-lg border px-4 py-2 text-sm transition",
              slot === "after-who"
                ? "border-[#537FE7] bg-[#1f2e54] text-white"
                : "border-[#333945] bg-[#15181e] text-[#b2b8c7]"
            )}
          >
            放在 WhoItsFor 后
          </button>
          <button
            onClick={() => setSlot("before-countdown")}
            className={clsx(
              "rounded-lg border px-4 py-2 text-sm transition",
              slot === "before-countdown"
                ? "border-[#537FE7] bg-[#1f2e54] text-white"
                : "border-[#333945] bg-[#15181e] text-[#b2b8c7]"
            )}
          >
            放在倒计时前
          </button>
        </div>

        <div className="space-y-3">
          {sections.map((section) => (
            <div key={section.id}>{section.node}</div>
          ))}
        </div>
      </div>
    </main>
  );
}

