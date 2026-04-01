"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

/** 首批招募已结束，始终显示「已截止」文案 */
const DEADLINE_MS = new Date("2026-02-20T23:59:59+08:00").getTime();

function getRemaining(now: number) {
  const d = Math.max(0, DEADLINE_MS - now);
  return {
    days: Math.floor(d / (24 * 60 * 60 * 1000)),
    hours: Math.floor((d % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
    minutes: Math.floor((d % (60 * 60 * 1000)) / (60 * 1000)),
    seconds: Math.floor((d % (60 * 1000)) / 1000),
    expired: d <= 0,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function Countdown() {
  const { t } = useLanguage();
  const [remaining, setRemaining] = useState(() => getRemaining(Date.now()));

  useEffect(() => {
    const tick = () => setRemaining(getRemaining(Date.now()));
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full flex flex-col items-center gap-4 mt-10 text-center"
    >
      <div className="w-full max-w-md mx-auto bg-[#161616] border border-[#333333] rounded-2xl px-6 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {remaining.expired ? (
          <>
            <p className="text-[#e0e0e0] text-sm mb-3">
              {t.countdown.closedLine1}
            </p>
            <p className="text-[#537FE7] font-medium">
              {t.countdown.closedLine2}
            </p>
          </>
        ) : (
          <>
            <p className="text-[#e0e0e0] text-sm mb-4">
              {t.countdown.deadlineNote}
            </p>
            <div className="flex items-baseline gap-2 flex-wrap justify-center">
              <span className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white tabular-nums">
                  {remaining.days}
                </span>
                <span className="text-[#e0e0e0] text-sm">{t.countdown.days}</span>
              </span>
              <span className="text-white/50">:</span>
              <span className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white tabular-nums">
                  {pad(remaining.hours)}
                </span>
                <span className="text-[#e0e0e0] text-sm">{t.countdown.hours}</span>
              </span>
              <span className="text-white/50">:</span>
              <span className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white tabular-nums">
                  {pad(remaining.minutes)}
                </span>
                <span className="text-[#e0e0e0] text-sm">{t.countdown.minutes}</span>
              </span>
              <span className="text-white/50">:</span>
              <span className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white tabular-nums">
                  {pad(remaining.seconds)}
                </span>
                <span className="text-[#e0e0e0] text-sm">{t.countdown.seconds}</span>
              </span>
            </div>
            <p className="text-[#537FE7] text-sm font-medium mt-4">
              {t.countdown.notice}
            </p>
          </>
        )}
      </div>
    </motion.section>
  );
}
