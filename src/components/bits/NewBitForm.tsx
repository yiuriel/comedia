import { useState } from "react";
import { Plus } from "lucide-react";
import { useStore } from "../../store/useStore";
import { useI18n } from "../../i18n";
import TiptapEditor from "../ui/TiptapEditor";
import ConceptPills from "../ui/ConceptPills";
import ColorPicker from "../ui/ColorPicker";
import Button from "../ui/Button";
import type { BitColor } from "../../types";

interface Props {
  onDone?: () => void;
}

export default function NewBitForm({ onDone }: Props) {
  const { addBit, concepts } = useStore();
  const { t } = useI18n();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState<BitColor>(null);
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]);

  const toggleConcept = (id: string) => {
    setSelectedConcepts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const create = () => {
    if (!title.trim()) return;
    addBit(title.trim(), content, selectedConcepts, color);
    setTitle("");
    setContent("");
    setColor(null);
    setSelectedConcepts([]);
    onDone?.();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-4 space-y-3">
      <input
        className="w-full text-lg font-semibold border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-colors"
        placeholder={t("bit.title.placeholder")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <TiptapEditor content={content} onChange={setContent} placeholder={t("bit.content.placeholder")} />

      <div className="flex items-center justify-between">
        <ColorPicker value={color} onChange={setColor} />
        <ConceptPills concepts={concepts} selected={selectedConcepts} onToggle={toggleConcept} />
      </div>

      <div className="flex gap-2 pt-1">
        <Button onClick={create} disabled={!title.trim()}>
          <Plus size={16} /> {t("bit.create")}
        </Button>
        <button onClick={onDone} className="px-4 py-2 text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors">
          {t("bit.cancel")}
        </button>
      </div>
    </div>
  );
}
