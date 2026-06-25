import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { translations, type Locale } from "./translations";

function detectLocale(): Locale {
  const saved = localStorage.getItem("comedia-locale") as Locale | null;
  if (saved && translations[saved]) return saved;

  const browserLang = navigator.language.split("-")[0] as Locale;
  if (translations[browserLang]) return browserLang;

  return "en";
}

function pluralize(count: number, one: string, other: string): string {
  return count === 1 ? one : other;
}

function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const val = vars[key];
    return val !== undefined ? String(val) : `{${key}}`;
  });
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("comedia-locale", l);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      let raw = translations[locale]?.[key] ?? translations.en[key] ?? key;

      // Handle ICU-style plurals: {count, plural, one {monologue} other {monologues}}
      raw = raw.replace(
        /\{(\w+),\s*plural,\s*one\s*\{([^}]+)\}\s*other\s*\{([^}]+)\}\}/g,
        (_, varName: string, one: string, other: string) => {
          const val = vars?.[varName];
          return typeof val === "number" ? pluralize(val, one, other) : other;
        }
      );

      if (vars) {
        raw = interpolate(raw, vars);
      }

      return raw;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
