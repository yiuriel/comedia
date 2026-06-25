import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useStore } from "../../store/useStore";
import { useI18n } from "../../i18n";
import ConfirmDialog from "../ui/ConfirmDialog";
import type { Concept } from "../../types";

interface Props {
  concept: Concept;
}

export default function ConceptItem({ concept }: Props) {
  const { bits, updateConcept, deleteConcept } = useStore();
  const { t } = useI18n();
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(concept.name);
  const [editDesc, setEditDesc] = useState(concept.description);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const linkedBits = bits.filter((b) => b.concepts.includes(concept.id));

  const save = () => {
    updateConcept(concept.id, { name: editName.trim(), description: editDesc.trim() });
    setEditing(false);
  };

  const handleDelete = () => {
    if (linkedBits.length > 0) {
      setConfirmDelete(true);
    } else {
      deleteConcept(concept.id);
    }
  };

  if (editing) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 px-3.5 py-3 space-y-2">
        <input
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm outline-none focus:bg-white focus:border-gray-400 transition-colors"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          autoFocus
        />
        <input
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm outline-none focus:bg-white focus:border-gray-400 transition-colors"
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          placeholder={t("concept.description.placeholder")}
        />
        <div className="flex gap-1.5">
          <button onClick={save} className="text-xs px-3 py-1 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors">{t("bit.save")}</button>
          <button onClick={() => setEditing(false)} className="text-xs px-3 py-1 text-gray-500 font-medium hover:text-gray-700 transition-colors">{t("bit.cancel")}</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="group bg-white rounded-xl border border-gray-100 px-3.5 py-3 hover:border-gray-200 transition-all">
        <div className="flex items-start gap-3">
          <div className="mt-1.5 h-2 w-2 rounded-full bg-violet-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900 truncate">{concept.name}</span>
              {linkedBits.length > 0 && (
                <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full tabular-nums shrink-0">
                  {t("concept.bits", { count: linkedBits.length })}
                </span>
              )}
            </div>
            {concept.description && (
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{concept.description}</p>
            )}
          </div>
          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">
            <button
              onClick={() => { setEditing(true); setEditName(concept.name); setEditDesc(concept.description); }}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"
            >
              <Pencil size={12} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          title={t("concept.delete.confirm.title")}
          message={t("concept.delete.confirm.message", {
            name: concept.name,
            count: linkedBits.length,
            names: linkedBits.map((b) => b.title).join(", "),
          })}
          onConfirm={() => { deleteConcept(concept.id); setConfirmDelete(false); }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  );
}
