"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import clsx from "clsx";

export function BookingTabs() {
  const { t, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<"email" | "wechat">("email");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
      <div className="flex p-1 mb-6 bg-gray-100 rounded-2xl border border-gray-200 w-full">
        <button
          onClick={() => setActiveTab("email")}
          className={clsx(
            "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300",
            activeTab === "email"
              ? "bg-white text-gray-900 shadow-sm border border-gray-200/50"
              : "text-gray-500 hover:text-gray-900"
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
              : "text-gray-500 hover:text-gray-900"
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
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm"
            >
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-600"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.emailForm.success}</h3>
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
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                  </div>
                  <button
                    disabled={status === "loading"}
                    type="submit"
                    className="group relative flex items-center justify-center gap-2 w-full py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-md shadow-orange-500/20"
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
                    <p className="text-red-500 text-sm text-center">{t.emailForm.error}</p>
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
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-48 h-48 bg-gray-50 rounded-xl mb-6 p-2 shadow-inner border border-gray-100 flex items-center justify-center">
                 {/* Placeholder for QR Code */}
                 <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                    QR Code Here
                 </div>
              </div>
              <p className="text-gray-700 font-medium mb-2">{t.wechat.instruction}</p>
              <p className="text-gray-500 text-sm">{t.wechat.id}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
