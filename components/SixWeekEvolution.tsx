"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValueEvent,
} from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";
import clsx from "clsx";

/** 闯关地图插画：无顶栏大标题、无底部「地基 / O / I / O / 整合」图例条（见 public/six-week-map-clean.png） */
const SIX_WEEK_MAP = {
  src: "/six-week-map-clean.png",
  width: 1024,
  height: 470,
} as const;

const CAP_H_PX = 22;
const LINE_BOTTOM_STYLE = { bottom: `${CAP_H_PX}px` } as const;

/** 竖线末端 + 箭头：单一路径、stroke 2px，与主竖线 w-0.5（2px）一致，无断层 */
function TimelineCap({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={8}
      height={CAP_H_PX}
      viewBox="0 0 8 22"
      fill="none"
      aria-hidden
      className={className}
      {...props}
    >
      <line
        x1="4"
        y1="0"
        x2="4"
        y2="12"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0.75 12 L4 18.5 L7.25 12"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
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

function TimelineLabel({ text }: { text: string }) {
  return (
    <div className="pt-0.5 md:pt-1">
      <p className="text-xs font-semibold leading-snug text-[#e0e0e0] md:text-sm">
        {text}
      </p>
    </div>
  );
}

const BODY = "text-sm leading-relaxed text-[#e0e0e0] md:text-[0.9375rem] md:leading-relaxed";
const BODY_BLUE =
  "text-sm font-medium leading-relaxed text-[#537FE7] md:text-[0.9375rem] md:leading-relaxed";

function WeekCard({
  obstacleLabel,
  solutionLabel,
  transformLabel,
  obstacle,
  solution,
  transformation,
}: {
  obstacleLabel: string;
  solutionLabel: string;
  transformLabel: string;
  obstacle: string;
  solution: string;
  transformation: string;
}) {
  const row = (
    label: string,
    body: string,
    variant: "italicBody" | "transform",
    showCheck: boolean
  ) => (
    <div className="flex gap-2.5">
      {showCheck ? (
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#537FE7]/15 text-[#537FE7] md:h-[1.375rem] md:w-[1.375rem]">
          <Check className="h-3 w-3" strokeWidth={2.5} />
        </span>
      ) : (
        <span
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] md:h-[1.375rem] md:w-[1.375rem]"
          aria-hidden
        >
          <span className="h-1 w-1 rounded-full bg-[#b91c1c] md:h-1.5 md:w-1.5" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[#e0e0e0] md:text-xs not-italic">
          {label}
        </span>
        <p
          className={clsx(
            "mt-0.5",
            variant === "transform"
              ? BODY_BLUE
              : clsx(BODY, "italic")
          )}
        >
          {body}
        </p>
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-[#333333] bg-[#161616] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] md:p-6">
      <div className="flex flex-col gap-4 md:gap-5">
        {row(obstacleLabel, obstacle, "italicBody", false)}
        {row(solutionLabel, solution, "italicBody", true)}
        {row(transformLabel, transformation, "transform", true)}
      </div>
    </div>
  );
}

function TimelineSpacer() {
  return <div className="hidden w-5 shrink-0 md:block" aria-hidden />;
}

export function SixWeekEvolution() {
  const { t } = useLanguage();
  const s = t.sixWeek;

  const lineZoneRef = useRef<HTMLDivElement>(null);
  const finalStageRowRef = useRef<HTMLDivElement>(null);
  const finaleAnchorRef = useRef<HTMLDivElement>(null);
  const autoScrollDone = useRef(false);

  /** 滚过最后一关对应进度：一次性点亮竖线剩余段 + 箭头 + 总结句；游标隐藏。回滚则恢复。 */
  const [tailSnap, setTailSnap] = useState(false);
  const SNAP_ON = 0.79;
  const SNAP_OFF = 0.7;

  const isFinalStageInView = useInView(finalStageRowRef, {
    amount: 0.32,
    margin: "0px 0px -12% 0px",
  });

  useEffect(() => {
    if (!isFinalStageInView) {
      autoScrollDone.current = false;
    }
  }, [isFinalStageInView]);

  useEffect(() => {
    if (!isFinalStageInView || autoScrollDone.current) return;
    autoScrollDone.current = true;
    finaleAnchorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [isFinalStageInView]);

  const { scrollYProgress: lineProgress } = useScroll({
    target: lineZoneRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const v = lineProgress.get();
    setTailSnap(v >= SNAP_ON);
  }, [lineProgress]);

  useMotionValueEvent(lineProgress, "change", (latest) => {
    setTailSnap((prev) => {
      if (latest >= SNAP_ON) return true;
      if (latest <= SNAP_OFF) return false;
      return prev;
    });
  });

  const markerTop = useTransform(lineProgress, (p) => `${Math.min(100, Math.max(0, p * 100))}%`);
  /** 仅进场淡入；到达最后一关阈值时整段卸载，与尾段一次性点亮同步 */
  const markerOpacity = useTransform(lineProgress, [0, 0.04], [0, 1]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mt-16 w-full text-center md:text-left"
    >
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
          <OIOBlue text={s.title} />
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#e0e0e0] md:text-base">
          {s.subtitle}
        </p>
      </div>

      <div className="mx-auto mb-10 w-full max-w-3xl md:mb-12">
        <Image
          src={SIX_WEEK_MAP.src}
          alt={s.mapAlt}
          width={SIX_WEEK_MAP.width}
          height={SIX_WEEK_MAP.height}
          className="h-auto w-full rounded-2xl border border-[#333333] bg-[#0b0c0e] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          sizes="(max-width: 768px) 100vw, 896px"
          quality={95}
        />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div ref={lineZoneRef} className="relative pb-0">
          {/* 主竖线止于箭头帽顶，帽由 TimelineCap 一笔连成 */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 hidden w-0 -translate-x-1/2 md:block"
            style={LINE_BOTTOM_STYLE}
            aria-hidden
          >
            <div className="absolute inset-0 left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-[#333333]" />
            {tailSnap ? (
              <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rounded-full bg-[#537FE7]" />
            ) : (
              <motion.div
                className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 rounded-full bg-[#537FE7]"
                style={{
                  height: "100%",
                  transformOrigin: "top",
                  scaleY: lineProgress,
                }}
              />
            )}
          </div>

          {!tailSnap && (
            <motion.div
              className="pointer-events-none absolute left-1/2 top-0 z-20 hidden w-0 -translate-x-1/2 md:block"
              style={{ ...LINE_BOTTOM_STYLE, opacity: markerOpacity }}
              aria-hidden
            >
              <motion.div
                className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0b0c0e] bg-[#537FE7] shadow-[0_0_0_2px_rgba(83,127,231,0.35)]"
                style={{ top: markerTop }}
              />
            </motion.div>
          )}

          {/* 未到最后一关阈值：箭头整段保持灰色；越阈值后与竖线一并全蓝 */}
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 z-10 hidden -translate-x-1/2 md:block"
            aria-hidden
          >
            {tailSnap ? (
              <div className="text-[#537FE7]">
                <TimelineCap className="block" />
              </div>
            ) : (
              <div className="text-[#333333]">
                <TimelineCap className="block" />
              </div>
            )}
          </div>

          {s.weeks.map((week, i) => {
            const card = (
              <WeekCard
                obstacleLabel={s.obstacleLabel}
                solutionLabel={s.solutionLabel}
                transformLabel={s.transformLabel}
                obstacle={week.obstacle}
                solution={week.solution}
                transformation={week.transformation}
              />
            );
            const label = <TimelineLabel text={week.headline} />;

            return (
              <div
                key={i}
                ref={i === s.weeks.length - 1 ? finalStageRowRef : undefined}
                className="relative mb-12 flex flex-col gap-4 md:mb-16 md:grid md:grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)] md:gap-x-6 md:gap-y-0"
              >
                {i % 2 === 0 ? (
                  <>
                    <div className="md:pr-2 md:text-right">{label}</div>
                    <TimelineSpacer />
                    <div className="md:pl-2">{card}</div>
                  </>
                ) : (
                  <>
                    <div className="order-2 md:order-1 md:pr-2">{card}</div>
                    <div className="order-2 md:order-2">
                      <TimelineSpacer />
                    </div>
                    <div className="order-1 md:order-3 md:pl-2 md:text-left">
                      {label}
                    </div>
                  </>
                )}
              </div>
            );
          })}

          <div className="h-6 md:h-[22px]" aria-hidden />
        </div>

        <div ref={finaleAnchorRef} className="mx-auto max-w-xl px-2 pb-0 pt-2 text-center md:pt-4">
          <p className={clsx(BODY_BLUE, "font-semibold")}>{s.finale}</p>
        </div>
      </div>
    </motion.section>
  );
}
