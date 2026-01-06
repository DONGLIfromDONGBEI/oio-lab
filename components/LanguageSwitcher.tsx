"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-[#161616] hover:bg-[#252525] border border-[#333333] shadow-sm transition-colors z-50 text-[#888888] hover:text-white"
      onClick={() => setLocale(locale === "zh-CN" ? "zh-TW" : "zh-CN")}
    >
      <Globe className="w-4 h-4 text-[#888888]" />
      <span className="text-sm font-medium">
        {locale === "zh-CN" ? "繁體" : "简体"}
      </span>
    </motion.button>
  );
}
