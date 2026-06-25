import { NavLink } from "react-router-dom";
import { BookOpen, Mic, Sparkles } from "lucide-react";

const nav = [
  { to: "/", label: "Bits", icon: BookOpen },
  { to: "/monologues", label: "Monologues", icon: Mic },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/70 border-b border-gray-200/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg">
            <Sparkles size={16} className="text-white" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-gray-900">
            Comedia
          </h1>
        </div>
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
      </div>
    </header>
  );
}
