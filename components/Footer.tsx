"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="w-full py-8 mt-auto text-center text-[#e0e0e0] text-sm">
      <p>{t.footer.copyright}</p>
    </footer>
  );
}

