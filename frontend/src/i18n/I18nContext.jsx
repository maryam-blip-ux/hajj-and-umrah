import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries } from "./dictionaries.js";
import { languages } from "./languages.js";

const I18nContext = createContext(null);

export function translate(code, text, vars) {
  if (!text) return "";
  const dictionary = dictionaries[code] || {};
  const template = dictionary[text] || text;
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
}

export function I18nProvider({ children }) {
  const [code, setCode] = useState(() => localStorage.getItem("hajj-lang") || "en");
  const language = languages.find((item) => item.code === code) || languages[0];

  useEffect(() => {
    document.documentElement.lang = language.code;
    document.documentElement.dir = language.dir;
    localStorage.setItem("hajj-lang", language.code);
    document.title = translate(language.code, "Hajj and Umrah Services");
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      languages,
      setLanguage: setCode,
      t: (text, vars) => translate(language.code, text, vars),
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
