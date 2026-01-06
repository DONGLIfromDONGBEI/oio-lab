"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, ArrowRight, CheckCircle2, Loader2, Download, Copy, Check } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

export function BookingTabs() {
  const { t, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<"email" | "wechat">("email");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

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

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering image download if clicking just the copy button
    try {
      await navigator.clipboard.writeText("Oioedu001");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleImageClick = () => {
    // 1. Also copy ID for convenience
    handleCopy({ stopPropagation: () => {} } as React.MouseEvent);

    // 2. Mobile-friendly Image Handling
    // Instead of forcing a download which might save to Files on iOS,
    // we can open the image in a new tab/lightbox-like behavior or trust standard long-press behavior.
    // However, user specifically asked to fix "saving to folder".
    // On iOS Safari, programmatic 'download' often saves to Files.
    // The most reliable way for users to save to Photos is long-press.
    // But to assist, we can try to create a link that forces image content type.
    
    // Let's try a direct download link with target _blank as fallback
    const link = document.createElement('a');
    link.href = '/qrcode.jpg';
    link.download = 'OioLab_WeChat_QR.jpg'; // Explicit extension
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              {/* Clickable QR Container */}
              <div 
                onClick={handleImageClick}
                className="w-48 h-48 bg-white rounded-xl mb-6 p-2 shadow-inner border border-gray-100 flex items-center justify-center relative overflow-hidden cursor-pointer active:scale-95 transition-transform"
                title="点击保存图片并复制微信号"
              >
                 <Image 
                   src="/qrcode.jpg" 
                   alt="WeChat QR Code" 
                   fill
                   className="object-cover"
                 />
                 
                 {/* Overlay for "Copied" feedback */}
                 <AnimatePresence>
                   {copied && (
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

              <p className="text-[#bbbbbb] font-medium mb-2">{t.wechat.instruction}</p>
              
              {/* WeChat ID & Copy Button - Visible on Mobile & PC */}
              <div className="flex items-center gap-3 bg-[#0b0c0e] px-4 py-2 rounded-lg border border-[#333333]">
                <span className="text-[#888888] text-sm">微信号:</span>
                <span className="text-white font-mono text-sm tracking-wide select-all">Oioedu001</span>
                <div className="w-[1px] h-4 bg-[#333333] mx-1" />
                <button 
                  onClick={handleCopy} 
                  className="group flex items-center gap-1.5 text-[#537FE7] hover:text-white transition-colors text-xs font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      <span>复制</span>
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
