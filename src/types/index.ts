export type BitColor = "slate" | "rose" | "orange" | "amber" | "emerald" | "cyan" | "violet" | "pink" | null;

export const BIT_COLORS: { value: NonNullable<BitColor>; label: string; bg: string; text: string; border: string; dot: string }[] = [
  { value: "slate",   label: "Slate",   bg: "bg-slate-50",   text: "text-slate-700",   border: "border-slate-200",   dot: "bg-slate-400" },
  { value: "rose",    label: "Rose",    bg: "bg-rose-50",    text: "text-rose-700",    border: "border-rose-200",    dot: "bg-rose-400" },
  { value: "orange",  label: "Orange",  bg: "bg-orange-50",  text: "text-orange-700",  border: "border-orange-200",  dot: "bg-orange-400" },
  { value: "amber",   label: "Amber",   bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-400" },
  { value: "emerald", label: "Emerald", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-400" },
  { value: "cyan",    label: "Cyan",    bg: "bg-cyan-50",    text: "text-cyan-700",    border: "border-cyan-200",    dot: "bg-cyan-400" },
  { value: "violet",  label: "Violet",  bg: "bg-violet-50",  text: "text-violet-700",  border: "border-violet-200",  dot: "bg-violet-400" },
  { value: "pink",    label: "Pink",    bg: "bg-pink-50",    text: "text-pink-700",    border: "border-pink-200",    dot: "bg-pink-400" },
];

export function getColorMeta(color: BitColor) {
  return BIT_COLORS.find((c) => c.value === color) ?? null;
}

export interface Bit {
  id: string;
  title: string;
  content: string;
  color: BitColor;
  concepts: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Concept {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Monologue {
  id: string;
  title: string;
  bitIds: string[];
  createdAt: string;
  updatedAt: string;
}
