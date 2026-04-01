"use client";

import React from "react";
import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getEnrollmentConfig } from "@/lib/enrollment-config";
import clsx from "clsx";

/** 与邮箱「立即预约」同尺度（短文案） */
const ORANGE_CTA_SHORT =
  "group relative flex w-full max-w-sm items-center justify-center gap-2 overflow-hidden rounded-xl bg-orange-500 px-3 py-3.5 text-center text-sm font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all hover:bg-orange-600 hover:shadow-[0_0_25px_rgba(249,115,22,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#537FE7] md:py-4 md:text-base";

const BOOKING_ANCHOR_ID = "oio-booking";
const FOCUS_WECHAT_EVENT = "oio-booking-focus-wechat";

function getDocumentScrollY(): number {
  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

/**
 * 自定义缓动滚动：原生 `behavior: 'smooth'` 在长页面常会分段结束，看起来像「一级一级」滚。
 * 这里单次动画从当前位置插值到目标 y，保证一次点按就到位。
 */
function scrollWindowToY(targetY: number) {
  const startY = getDocumentScrollY();
  const dist = targetY - startY;
  if (Math.abs(dist) < 2) return;

  const duration = Math.min(1000, 380 + Math.sqrt(Math.abs(dist)) * 8);
  const t0 = performance.now();
  const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

  function step(now: number) {
    const t = Math.min(1, (now - t0) / duration);
    const y = startY + dist * easeOutCubic(t);
    window.scrollTo(0, y);
    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function scrollToBookingWechat() {
  const el = document.getElementById(BOOKING_ANCHOR_ID);
  if (!el) return;

  window.dispatchEvent(new Event(FOCUS_WECHAT_EVENT));

  const run = () => {
    const marginTop = Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    const y = el.getBoundingClientRect().top + getDocumentScrollY() - marginTop;
    scrollWindowToY(Math.max(0, y));
  };

  requestAnimationFrame(() => requestAnimationFrame(run));
}

export function EnrollmentCta({ className }: { className?: string }) {
  const { t } = useLanguage();
  const e = t.enrollment;
  const { open, ctaUrl } = getEnrollmentConfig();
  const external = /^https?:\/\//i.test(ctaUrl);

  if (!open) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-24px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={clsx("flex w-full justify-center", className)}
      >
        <button
          type="button"
          title={e.reserveAriaLabel}
          aria-label={e.reserveAriaLabel}
          onClick={() => scrollToBookingWechat()}
          className={clsx(ORANGE_CTA_SHORT, "cursor-pointer border-0 font-inherit")}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="min-w-0">{e.reserveNow}</span>
            <MousePointerClick
              className="h-4 w-4 shrink-0 opacity-95 transition-transform group-hover:scale-110"
              aria-hidden
            />
          </span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={clsx("flex w-full justify-center", className)}
    >
      <a
        href={ctaUrl}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={ORANGE_CTA_SHORT}
      >
        <span className="relative z-10 flex items-center gap-2">
          {e.joinNow}
          <MousePointerClick
            className="h-4 w-4 shrink-0 opacity-95 transition-transform group-hover:scale-110"
            aria-hidden
          />
        </span>
      </a>
    </motion.div>
  );
}
