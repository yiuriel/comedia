import { Trash2, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getColorMeta, type Bit } from "../../types";

interface Props {
  bit: Bit;
  index: number;
  onRemove: () => void;
}

export default function SortableBitRow({ bit, index, onRemove }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: bit.id,
  });

  const colorMeta = getColorMeta(bit.color);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.8 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm border transition-colors ${
        isDragging
          ? "bg-violet-50 border-violet-300 shadow-lg"
          : colorMeta
            ? `${colorMeta.bg} ${colorMeta.border} hover:shadow-sm`
            : "bg-gray-50 border-gray-100 hover:border-gray-200"
      }`}
    >
      <button
        className="touch-none cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={14} />
      </button>
      <span className="font-mono text-gray-400 text-xs w-5">{index + 1}</span>
      {colorMeta && <div className={`w-2 h-2 rounded-full ${colorMeta.dot} shrink-0`} />}
      <span className="flex-1 font-medium text-gray-900">{bit.title}</span>
      <button
        onClick={onRemove}
        className="p-1 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
