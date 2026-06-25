import { X } from "lucide-react";
import type { Concept } from "../../types";

interface Props {
  concepts: Concept[];
  selected: string[];
  onToggle: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function ConceptPills({ concepts, selected, onToggle, onRemove }: Props) {
  if (concepts.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {concepts.map((c) => {
        const isSelected = selected.includes(c.id);
        return onRemove && isSelected ? (
          <span
            key={c.id}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-50 text-violet-600 rounded-full text-xs font-medium"
          >
            {c.name}
            <button
              onClick={() => onRemove(c.id)}
              className="hover:text-violet-900 transition-colors"
            >
              <X size={11} />
            </button>
          </span>
        ) : (
          <button
            key={c.id}
            onClick={() => onToggle(c.id)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-150 ${
              isSelected
                ? "bg-violet-100 border-violet-300 text-violet-700"
                : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {c.name}
          </button>
        );
      })}
    </div>
  );
}
