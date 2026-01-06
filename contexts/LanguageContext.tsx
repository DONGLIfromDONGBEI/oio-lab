"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, Locale } from "@/lib/dictionaries";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations["zh-CN"];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("zh-TW"); // Default to Traditional/International

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Simple check to see if user has already selected a preference
        const storedLocale = localStorage.getItem("user-locale") as Locale;
        if (storedLocale) {
          setLocale(storedLocale);
          return;
        }

        // IP Detection
        // Using a public IP API. In production, consider a more robust solution or Middleware.
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        
        if (data.country_code === "CN") {
          setLocale("zh-CN");
        } else {
          setLocale("zh-TW");
        }
      } catch (error) {
        console.error("Failed to detect location:", error);
        // Fallback is already set to zh-TW
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

