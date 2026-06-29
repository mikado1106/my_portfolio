"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, Language } from "@/i18n/dictionaries";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  dict: typeof dictionaries.en;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language;
    if (saved && (saved === 'en' || saved === 'id')) {
      setLang(saved);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, dict: dictionaries[lang] }}>
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
