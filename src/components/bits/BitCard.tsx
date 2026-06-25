import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useStore } from "../../store/useStore";
import { useI18n } from "../../i18n";
import TiptapEditor from "../ui/TiptapEditor";
import ConceptPills from "../ui/ConceptPills";
import Button from "../ui/Button";
import ColorPicker from "../ui/ColorPicker";
import ConfirmDialog from "../ui/ConfirmDialog";
import { getColorMeta, type Bit, type BitColor } from "../../types";

interface Props {
  bit: Bit;
}

export default function BitCard({ bit }: Props) {
  const { updateBit, deleteBit, concepts, monologues } = useStore();
  const { t } = useI18n();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(bit.title);
  const [content, setContent] = useState(bit.content);
  const [color, setColor] = useState<BitColor>(bit.color);
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>(bit.concepts);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const linkedMonologues = monologues.filter((m) => m.bitIds.includes(bit.id));
  const colorMeta = getColorMeta(bit.color);

  const save = () => {
    updateBit(bit.id, { title, content, color, concepts: selectedConcepts });
    setEditing(false);
  };

  const cancel = () => {
    setTitle(bit.title);
    setContent(bit.content);
    setColor(bit.color);
    setSelectedConcepts(bit.concepts);
    setEditing(false);
  };

  const toggleConcept = (conceptId: string) => {
    setSelectedConcepts((prev) =>
      prev.includes(conceptId) ? prev.filter((c) => c !== conceptId) : [...prev, conceptId]
    );
  };

  const handleDelete = () => {
    if (linkedMonologues.length > 0) {
      setConfirmDelete(true);
    } else {
      deleteBit(bit.id);
    }
  };

  if (editing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-4 space-y-3 transition-all">
        <input
          className="w-full text-lg font-semibold border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-colors"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <TiptapEditor content={content} onChange={setContent} />
        <ColorPicker value={color} onChange={setColor} />
        <ConceptPills concepts={concepts} selected={selectedConcepts} onToggle={toggleConcept} />
        <div className="flex gap-2 pt-1">
          <Button onClick={save}>{t("bit.save")}</Button>
          <button onClick={cancel} className="px-4 py-2 text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors">
            {t("bit.cancel")}
          </button>
        </div>
      </div>
    );
  }

  const bitConcepts = concepts.filter((c) => bit.concepts.includes(c.id));
  const plainText = bit.content.replace(/<[^>]+>/g, "").trim();

  return (
    <>
      <div
        onClick={() => setEditing(true)}
        className="bg-white rounded-xl border border-gray-200/60 cursor-pointer hover:shadow-sm hover:border-gray-300/60 transition-all duration-150 group overflow-hidden"
      >
        {colorMeta && <div className={`h-0.5 ${colorMeta.dot}`} />}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              {colorMeta && <div className={`w-2 h-2 rounded-full ${colorMeta.dot} shrink-0`} />}
              <h3 className="text-sm font-semibold text-gray-900">{bit.title}</h3>
              {bitConcepts.length > 0 && (
                <div className="hidden sm:flex items-center gap-1 shrink-0">
                  {bitConcepts.slice(0, 3).map((c) => (
                    <span key={c.id} className="px-1.5 py-0.5 bg-violet-50 text-violet-600 rounded text-[10px] font-medium">
                      {c.name}
                    </span>
                  ))}
                  {bitConcepts.length > 3 && (
                    <span className="text-[10px] text-gray-400">+{bitConcepts.length - 3}</span>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(); }}
              className="p-1 rounded-md text-gray-300 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all shrink-0"
            >
              <Trash2 size={13} />
            </button>
          </div>
          {plainText && (
            <p className="text-xs text-gray-400 mt-2 leading-relaxed whitespace-pre-wrap">{plainText}</p>
          )}
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          title={t("bit.delete.confirm.title")}
          message={t("bit.delete.confirm.message", {
            count: linkedMonologues.length,
            names: linkedMonologues.map((m) => m.title).join(", "),
          })}
          onConfirm={() => { deleteBit(bit.id); setConfirmDelete(false); }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  );
}
