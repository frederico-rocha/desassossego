import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, Lang, TranslationKeys } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "pt";
    const saved = localStorage.getItem("lang") as Lang | null;
    return saved === "en" || saved === "pt" ? saved : "pt";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
