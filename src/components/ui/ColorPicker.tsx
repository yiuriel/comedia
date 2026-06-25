import { Palette } from "lucide-react";
import { BIT_COLORS, type BitColor } from "../../types";

interface Props {
  value: BitColor;
  onChange: (color: BitColor) => void;
}

export default function ColorPicker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1.5">
      <Palette size={14} className="text-gray-400 shrink-0" />
      <div className="flex gap-1">
        {BIT_COLORS.map((c) => (
          <button
            key={c.value}
            onClick={() => onChange(value === c.value ? null : c.value)}
            title={c.label}
            className={`w-5 h-5 rounded-full ${c.dot} border-2 transition-all duration-150 ${
              value === c.value
                ? "border-gray-900 scale-110 ring-2 ring-gray-900/20"
                : "border-white hover:scale-110 hover:shadow-sm"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
