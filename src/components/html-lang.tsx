"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";

export function HtmlLang() {
  const { lang } = useLanguage();
  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);
  return null;
}
