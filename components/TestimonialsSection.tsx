"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type TestimonialItem = {
  id: string;
  highlight: string;
  tag: string;
  imageSrc: string;
  imageAlt: string;
};

function OIOBlue({ text }: { text: string }) {
  const parts = text.split("OIO");
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 ? <span className="text-[#537FE7]">OIO</span> : null}
        </span>
      ))}
    </>
  );
}

const ITEMS_CN: TestimonialItem[] = [
  {
    id: "dylan",
    highlight: "颠覆了我过去学英文的世界观，让我找到了适合自己且能持续的英文学习方法",
    tag: "忙碌奶爸DY",
    imageSrc: "/testimonials/dylan.png",
    imageAlt: "学员反馈截图 Dylan",
  },
  {
    id: "wh",
    highlight: "OIO给我带来的，不只是英文。它让我停下了自我否定，开始坚信‘我本就可以’。",
    tag: "人间清醒的独立女性WH",
    imageSrc: "/testimonials/wh.png",
    imageAlt: "学员反馈截图 WH",
  },
  {
    id: "shuyi",
    highlight: "今天如果不说英语，我反而会觉得难受。",
    tag: "程序技术员SY",
    imageSrc: "/testimonials/shuyi.png",
    imageAlt: "学员反馈截图 Shuyi",
  },
  {
    id: "zoey",
    highlight: "我已经在这里找到答案了，而且我会继续沿着这条路走下去。",
    tag: "啥都不怕的Zoey",
    imageSrc: "/testimonials/zoey.png",
    imageAlt: "学员反馈截图 Zoey",
  },
  {
    id: "alice",
    highlight: "我开始有意识地把英语和自己的日常生活联系起来，并努力让生活丰富起来。",
    tag: "欧洲留学生AL",
    imageSrc: "/testimonials/alice.png",
    imageAlt: "学员反馈截图 Alice",
  },
  {
    id: "he",
    highlight: "上完这门课之后，我最大的收获，是开始学会系统地搭建和消化属于自己的学习素材。",
    tag: "英法双语学习者HE",
    imageSrc: "/testimonials/he.png",
    imageAlt: "学员反馈截图 HE",
  },
  {
    id: "zun",
    highlight: "OIO完美解决了生活中口语练习机会不足的问题。",
    tag: "国际学校高中生ZU",
    imageSrc: "/testimonials/zun.png",
    imageAlt: "学员反馈截图 Zun",
  },
  {
    id: "rw",
    highlight:
      "我发现“自己的内容-英文改写-再输入输出循环”的方式，对我帮助很大，因为内容和自己的生活息息相关，所以更容易形成真实表达。",
    tag: "RW",
    imageSrc: "/testimonials/rw.png",
    imageAlt: "学员反馈截图 RW",
  },
  {
    id: "zhao",
    highlight: "我最大的收获是重拾自信，重新整理自己。",
    tag: "雅思考生ZH",
    imageSrc: "/testimonials/zhao.png",
    imageAlt: "学员反馈截图 Zhao",
  },
  {
    id: "delon",
    highlight: "上课之后，我对自己的处境有了更清晰的了解，比如如何创建真实需要的学习素材。",
    tag: "日本留学生DE",
    imageSrc: "/testimonials/delon.png",
    imageAlt: "学员反馈截图 Delon",
  },
];

const ITEMS_TW: TestimonialItem[] = [
  {
    id: "dylan",
    highlight: "顛覆了我過去學英文的世界觀，讓我找到了適合自己且能持續的英文學習方法",
    tag: "忙碌奶爸DY",
    imageSrc: "/testimonials/dylan.png",
    imageAlt: "學員回饋截圖 Dylan",
  },
  {
    id: "wh",
    highlight: "OIO給我帶來的，不只是英文。它讓我停下了自我否定，開始堅信「我本就可以」。",
    tag: "人間清醒的獨立女性WH",
    imageSrc: "/testimonials/wh.png",
    imageAlt: "學員回饋截圖 WH",
  },
  {
    id: "shuyi",
    highlight: "今天如果不說英文，我反而會覺得難受。",
    tag: "程序技術員SY",
    imageSrc: "/testimonials/shuyi.png",
    imageAlt: "學員回饋截圖 Shuyi",
  },
  {
    id: "zoey",
    highlight: "我已經在這裡找到答案了，而且我會繼續沿著這條路走下去。",
    tag: "啥都不怕的Zoey",
    imageSrc: "/testimonials/zoey.png",
    imageAlt: "學員回饋截圖 Zoey",
  },
  {
    id: "alice",
    highlight: "我開始有意識地把英文和自己的日常生活連結起來，並努力讓生活豐富起來。",
    tag: "歐洲留學生AL",
    imageSrc: "/testimonials/alice.png",
    imageAlt: "學員回饋截圖 Alice",
  },
  {
    id: "he",
    highlight: "上完這門課之後，我最大的收穫，是開始學會系統地搭建和消化屬於自己的學習素材。",
    tag: "英法雙語學習者HE",
    imageSrc: "/testimonials/he.png",
    imageAlt: "學員回饋截圖 HE",
  },
  {
    id: "zun",
    highlight: "OIO完美解決了生活中口語練習機會不足的問題。",
    tag: "國際學校高中生ZU",
    imageSrc: "/testimonials/zun.png",
    imageAlt: "學員回饋截圖 Zun",
  },
  {
    id: "rw",
    highlight:
      "我發現「自己的內容-英文改寫-再輸入輸出循環」的方式，對我幫助很大，因為內容和自己的生活息息相關，所以更容易形成真實表達。",
    tag: "RW",
    imageSrc: "/testimonials/rw.png",
    imageAlt: "學員回饋截圖 RW",
  },
  {
    id: "zhao",
    highlight: "我最大的收穫是重拾自信，重新整理自己。",
    tag: "雅思考生ZH",
    imageSrc: "/testimonials/zhao.png",
    imageAlt: "學員回饋截圖 Zhao",
  },
  {
    id: "delon",
    highlight: "「上課之後，我對自己的處境有了更清晰的了解，包括如何建立真實需要的學習素材。」",
    tag: "日本留學生DE",
    imageSrc: "/testimonials/delon.png",
    imageAlt: "學員回饋截圖 Delon",
  },
];

export function TestimonialsSection({ className }: { className?: string }) {
  const { locale } = useLanguage();
  const items = locale === "zh-TW" ? ITEMS_TW : ITEMS_CN;
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const title = locale === "zh-TW" ? "OIO學員真實回饋" : "OIO学员真实反馈";
  const canPrev = activeIdx > 0;
  const canNext = activeIdx < items.length - 1;
  const current = items[activeIdx];

  const goPrev = () => setActiveIdx((v) => Math.max(0, v - 1));
  const goNext = () => setActiveIdx((v) => Math.min(items.length - 1, v + 1));

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
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={clsx("mt-10 flex w-full flex-col items-center", className)}
    >
      <h2 className="mb-6 text-center text-xl font-bold tracking-tight text-white md:text-2xl">
        <OIOBlue text={title} />
      </h2>

      <div className="w-full max-w-3xl">
        <div className="grid items-center gap-3 md:grid-cols-[40px_minmax(0,1fr)_40px]">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#3a3f4d] bg-[#1a1d24] text-[#d7e3ff] transition hover:bg-[#232836] disabled:cursor-not-allowed disabled:opacity-35 md:inline-flex"
            aria-label={locale === "zh-TW" ? "上一則回饋" : "上一条反馈"}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <article
              className="w-full overflow-hidden rounded-xl border border-[#333333] bg-[#161616]"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="flex items-start justify-between gap-3 border-b border-[#333333] px-4 py-3">
              <p className="text-left text-sm font-semibold leading-relaxed text-[#e6ebf8]">
                  “{current.highlight}”
                </p>
                <span className="mt-0.5 shrink-0 rounded-full border border-[#3a3f4d] bg-[#1b1f28] px-2.5 py-1 text-[11px] text-[#d2d8e7]">
                  {current.tag}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="block w-full bg-[#161616] text-left transition hover:brightness-110"
                aria-label={locale === "zh-TW" ? "放大查看截圖" : "放大查看截图"}
              >
                <div className="relative flex h-[300px] items-center justify-center bg-[#161616] p-3 md:h-[380px]">
                  <Image
                    src={current.imageSrc}
                    alt={current.imageAlt}
                    width={1600}
                    height={1200}
                    className="max-h-full w-auto max-w-full object-contain"
                  />
                  <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                    {locale === "zh-TW" ? "點擊放大" : "点击放大"}
                  </span>
                </div>
              </button>
            </article>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {items.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={clsx(
                      "h-2.5 rounded-full transition",
                      idx === activeIdx ? "w-6 bg-[#6ea0ff]" : "w-2.5 bg-[#3a4561] hover:bg-[#5a6b93]"
                    )}
                    aria-label={`${locale === "zh-TW" ? "切換到第" : "切换到第"} ${idx + 1} ${
                      locale === "zh-TW" ? "則回饋" : "条反馈"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-[#aab2c6]">
                {activeIdx + 1} / {items.length}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={!canNext}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#3a3f4d] bg-[#1a1d24] text-[#d7e3ff] transition hover:bg-[#232836] disabled:cursor-not-allowed disabled:opacity-35 md:inline-flex"
            aria-label={locale === "zh-TW" ? "下一則回饋" : "下一条反馈"}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white"
            aria-label={locale === "zh-TW" ? "關閉" : "关闭"}
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
            aria-label={locale === "zh-TW" ? "上一張" : "上一张"}
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
            aria-label={locale === "zh-TW" ? "下一張" : "下一张"}
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
    </motion.section>
  );
}

