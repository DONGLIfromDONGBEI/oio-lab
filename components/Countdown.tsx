"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

/** 固定截止时刻（ISO 含 +08:00）；全球用户看到的剩余时间一致，晚于此刻显示「已截止」 */
const DEADLINE_MS = new Date("2026-05-30T21:00:00+08:00").getTime();

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
      className="mt-8 flex w-full flex-col items-center gap-4 text-center md:mt-10"
    >
      <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
        {t.countdown.sectionTitle}
      </h2>
      <div className="mx-auto w-full max-w-md rounded-2xl border border-[#333333] bg-[#161616] px-6 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
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
            {t.countdown.notice ? (
              <p className="mt-5 max-w-xl text-center text-sm font-medium leading-snug text-[#537FE7] md:text-base">
                {t.countdown.notice}
              </p>
            ) : null}
          </>
        )}
      </div>
    </motion.section>
  );
}
