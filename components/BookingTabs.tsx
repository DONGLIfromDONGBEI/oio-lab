"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

export function BookingTabs() {
  const { t, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<"email" | "wechat">("email");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (locale === "zh-CN") {
      setActiveTab("wechat");
    } else {
      setActiveTab("email");
    }
  }, [locale]);

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

  return (
    <div className="w-full max-w-md z-10">
      {/* Tabs */}
      <div className="flex p-1 mb-6 bg-[#161616] rounded-2xl border border-[#333333] w-full">
        <button
          onClick={() => setActiveTab("email")}
          className={clsx(
            "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300",
            activeTab === "email"
              ? "bg-[#252525] text-white shadow-sm border border-[#444444]"
              : "text-[#888888] hover:text-white"
          )}
        >
          <Mail className="w-4 h-4" />
          {t.tabs.email}
        </button>
        <button
          onClick={() => setActiveTab("wechat")}
          className={clsx(
            "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300",
            activeTab === "wechat"
              ? "bg-[#07C160]/10 text-[#07C160] shadow-sm border border-[#07C160]/20"
              : "text-[#888888] hover:text-white"
          )}
        >
          <MessageCircle className="w-4 h-4" />
          {t.tabs.wechat}
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === "email" ? (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#161616] border border-[#333333] rounded-3xl p-8 shadow-sm"
            >
              {status === "success" ? (
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
              ) : (
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
                    className="group relative flex items-center justify-center gap-2 w-full py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:shadow-[0_0_25px_rgba(249,115,22,0.25)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {status === "loading" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          {t.emailForm.submit}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                  {status === "error" && (
                    <p className="text-red-400 text-sm text-center">{t.emailForm.error}</p>
                  )}
                </form>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="wechat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#161616] border border-[#333333] rounded-3xl p-8 shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-48 h-48 bg-white rounded-xl mb-6 p-2 shadow-inner border border-gray-100 flex items-center justify-center relative overflow-hidden">
                 <Image 
                   src="/qrcode.jpg" 
                   alt="WeChat QR Code" 
                   fill
                   className="object-cover"
                 />
              </div>
              <p className="text-[#bbbbbb] font-medium mb-2">{t.wechat.instruction}</p>
              <p className="text-[#666666] text-sm">{t.wechat.id}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
