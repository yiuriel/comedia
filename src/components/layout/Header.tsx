import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BookOpen, Mic, Sparkles, Globe } from "lucide-react";
import { useI18n } from "../../i18n";
import { LOCALES } from "../../i18n/translations";

export default function Header() {
  const { t, locale, setLocale } = useI18n();
  const [langOpen, setLangOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = LOCALES.find((l) => l.value === locale);

  const nav = [
    { to: "/", label: t("nav.bits"), icon: BookOpen },
    { to: "/monologues", label: t("nav.monologues"), icon: Mic },
  ];

  return (
    <header className="shrink-0 h-14 backdrop-blur-xl bg-white/70 border-b border-gray-200/50">
      <div className="h-full max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg">
            <Sparkles size={16} className="text-white" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-gray-900">
            {t("app.name")}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <nav className="flex gap-0.5 bg-gray-100/60 rounded-xl p-0.5">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-white/60"
                  }`
                }
              >
                <n.icon size={14} />
                <span className="hidden sm:inline">{n.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="relative" ref={ref}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title="Language"
            >
              <Globe size={14} />
              <span className="text-xs">{current?.flag}</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 py-1 min-w-[140px] z-50 animate-fade-in">
                {LOCALES.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => { setLocale(l.value); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                      locale === l.value
                        ? "bg-gray-50 text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
