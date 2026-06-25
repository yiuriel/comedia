import { useState } from "react";
import { Plus } from "lucide-react";
import { useStore } from "../../store/useStore";
import { useI18n } from "../../i18n";

export default function NewConceptForm() {
  const { addConcept } = useStore();
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    addConcept(name.trim(), description.trim());
    setName("");
    setDescription("");
  };

  return (
    <div className="space-y-2">
      <input
        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
        placeholder={t("concepts.new.name.placeholder")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      {name.trim() && (
        <input
          className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
          placeholder={t("concepts.new.desc.placeholder")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
      )}
      {name.trim() && (
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={12} /> {t("concepts.new.add")}
        </button>
      )}
    </div>
  );
}
