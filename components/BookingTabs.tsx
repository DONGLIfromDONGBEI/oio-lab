"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, MousePointerClick, CheckCircle2, Loader2, Copy, Check } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

const WECHAT_ID = "Oioedu001";

export function BookingTabs() {
  const { t, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<"email" | "wechat">("email");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copiedWechat, setCopiedWechat] = useState(false);
  const [copiedSupportEmail, setCopiedSupportEmail] = useState(false);

  useEffect(() => {
    setActiveTab("wechat");
  }, [locale]);

  useEffect(() => {
    const focusWechat = () => setActiveTab("wechat");
    window.addEventListener("oio-booking-focus-wechat", focusWechat);
    return () => window.removeEventListener("oio-booking-focus-wechat", focusWechat);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "email", locale }),
      });

      if (!response.ok) throw new Error("Failed");

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleCopyWechatId = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(WECHAT_ID);
      setCopiedWechat(true);
      setTimeout(() => setCopiedWechat(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleCopySupportEmail = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(t.booking.supportEmail);
      setCopiedSupportEmail(true);
      setTimeout(() => setCopiedSupportEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleImageClick = () => {
    handleCopyWechatId({ stopPropagation: () => {} } as React.MouseEvent);

    const link = document.createElement("a");
    link.href = "/wechat-qrcode.png";
    link.download = "OioLab_WeChat_QR.png";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const emailContactRow = (
    <div className="mt-4 flex w-full min-w-0 flex-nowrap items-center justify-center gap-1.5 overflow-x-auto bg-[#0b0c0e] px-3 py-2 rounded-lg border border-[#333333] sm:gap-2">
      <span className="shrink-0 text-xs text-[#e0e0e0]">{t.booking.contactEmailLabel}</span>
      <span className="shrink-0 whitespace-nowrap font-mono text-[11px] tracking-tight text-white select-all sm:text-xs">
        {t.booking.supportEmail}
      </span>
      <div className="mx-0.5 h-3 w-px shrink-0 self-center bg-[#333333]" />
      <button
        type="button"
        onClick={handleCopySupportEmail}
        className="group flex shrink-0 items-center gap-1 text-[11px] font-medium text-[#537FE7] transition-colors hover:text-white sm:text-xs"
      >
        {copiedSupportEmail ? (
          <>
            <Check className="h-3.5 w-3.5" />
            <span>{t.booking.copied}</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
            <span>{t.booking.copy}</span>
          </>
        )}
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-md z-10">
      <h2 className="mb-2 text-center text-lg font-semibold leading-snug text-white md:text-xl">
        {t.booking.sectionTitle}
      </h2>
      <p className="mb-5 text-center text-sm leading-relaxed text-[#bbbbbb] md:mb-6 md:text-base">
        {t.booking.sectionSubtitle}
      </p>
      <div className="flex p-1 mb-6 bg-[#161616] rounded-2xl border border-[#333333] w-full">
        <button
          type="button"
          onClick={() => setActiveTab("wechat")}
          className={clsx(
            "flex-1 flex items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-xl text-sm font-medium transition-all duration-300",
            activeTab === "wechat"
              ? "bg-[#07C160]/10 text-[#07C160] shadow-sm border border-[#07C160]/20"
              : "text-[#e0e0e0] hover:text-white"
          )}
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          {t.tabs.wechat}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("email")}
          className={clsx(
            "flex-1 flex items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-xl text-sm font-medium transition-all duration-300",
            activeTab === "email"
              ? "bg-[#252525] text-white shadow-sm border border-[#444444]"
              : "text-[#e0e0e0] hover:text-white"
          )}
        >
          <Mail className="w-4 h-4 shrink-0" />
          {t.tabs.email}
        </button>
      </div>

      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#161616] border border-[#333333] rounded-3xl p-8 shadow-sm flex flex-col items-stretch"
            >
              {status === "success" ? (
                <div className="flex flex-col items-center text-center">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 text-green-500"
                    >
                      <CheckCircle2 className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">{t.emailForm.success}</h3>
                  </div>
                  {emailContactRow}
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <input
                        type="email"
                        required
                        placeholder={t.emailForm.placeholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-4 bg-[#0b0c0e] border border-[#333333] rounded-xl text-white placeholder:text-[#555555] focus:outline-none focus:border-[#537FE7] focus:ring-1 focus:ring-[#537FE7] transition-all"
                      />
                    </div>
                    <button
                      disabled={status === "loading"}
                      type="submit"
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all hover:bg-orange-600 hover:shadow-[0_0_25px_rgba(249,115,22,0.25)] disabled:cursor-not-allowed disabled:opacity-50 md:py-4 md:text-base"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {status === "loading" ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            {t.emailForm.submit}
                            <MousePointerClick
                              className="h-4 w-4 shrink-0 opacity-95 transition-transform group-hover:scale-110"
                              aria-hidden
                            />
                          </>
                        )}
                      </span>
                    </button>
                    {status === "error" && (
                      <p className="text-red-400 text-sm text-center">{t.emailForm.error}</p>
                    )}
                  </form>
                  {emailContactRow}
                </>
              )}
            </motion.div>
          )}
          {activeTab === "wechat" && (
            <motion.div
              key="wechat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#161616] border border-[#333333] rounded-3xl p-8 shadow-sm flex flex-col items-center text-center"
            >
              <div
                onClick={handleImageClick}
                className="w-48 h-48 bg-white rounded-xl mb-6 p-2 shadow-inner border border-gray-100 flex items-center justify-center relative overflow-hidden cursor-pointer active:scale-95 transition-transform"
                title="点击保存图片并复制微信号"
              >
                <Image src="/wechat-qrcode.png" alt="WeChat QR Code" fill className="object-contain" />

                <AnimatePresence>
                  {copiedWechat && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white"
                    >
                      <Check className="w-8 h-8 mb-2 text-green-400" />
                      <span className="text-xs font-medium">已复制 & 已下载</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-[#e0e0e0] font-medium mb-2">{t.wechat.instruction}</p>

              <div className="flex items-center gap-3 bg-[#0b0c0e] px-4 py-2 rounded-lg border border-[#333333]">
                <span className="text-[#e0e0e0] text-sm">微信号:</span>
                <span className="text-white font-mono text-sm tracking-wide select-all">{WECHAT_ID}</span>
                <div className="w-[1px] h-4 bg-[#333333] mx-1" />
                <button
                  type="button"
                  onClick={handleCopyWechatId}
                  className="group flex items-center gap-1.5 text-[#537FE7] hover:text-white transition-colors text-xs font-medium"
                >
                  {copiedWechat ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.booking.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      <span>{t.booking.copy}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
