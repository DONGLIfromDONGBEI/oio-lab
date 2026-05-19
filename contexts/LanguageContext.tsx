"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, Locale } from "@/lib/dictionaries";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations["zh-CN"];
  /** ISO 3166-1 alpha-2（ipapi）；未完成或失败时为 null */
  countryCode: string | null;
  /** 仅内地 IP（country_code === CN）；港澳台与海外均为 false */
  isMainlandChina: boolean;
  /** IP 地域检测结束（成功或失败），用于切换嵌入源前避免误判 */
  geoReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("zh-TW"); // Default to Traditional/International
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [geoReady, setGeoReady] = useState(false);

  useEffect(() => {
    const storedLocale = localStorage.getItem("user-locale") as Locale | null;
    if (storedLocale === "zh-CN" || storedLocale === "zh-TW") {
      setLocale(storedLocale);
    }

    // Local simulation only: override geo by querystring (?geo=cn | ?geo=intl).
    // This only affects video routing, not user's language preference.
    const geoParam = new URLSearchParams(window.location.search).get("geo");
    if (geoParam) {
      const normalized = geoParam.trim().toLowerCase();
      if (normalized === "cn") {
        setCountryCode("CN");
        setGeoReady(true);
        return;
      }
      if (normalized === "intl") {
        setCountryCode("INTL");
        setGeoReady(true);
        return;
      }
    }

    const detectLocation = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const response = await fetch("https://ipapi.co/json/", {
          signal: controller.signal,
        });
        clearTimeout(timeout);
        const data = await response.json();
        const cc =
          typeof data.country_code === "string" ? data.country_code : null;
        setCountryCode(cc);

        if (!storedLocale) {
          setLocale(cc === "CN" ? "zh-CN" : "zh-TW");
        }
      } catch (error) {
        console.error("Failed to detect location:", error);
        setCountryCode(null);
      } finally {
        setGeoReady(true);
      }
    };

    detectLocation();
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("user-locale", newLocale);
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale: handleSetLocale,
        t: translations[locale],
        countryCode,
        isMainlandChina: countryCode === "CN",
        geoReady,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

