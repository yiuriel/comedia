import { useState } from "react";
import { Plus } from "lucide-react";
import { useStore } from "../../store/useStore";

interface Props {
  onCreated?: () => void;
}

export default function NewConceptForm({ onCreated }: Props) {
  const { addConcept } = useStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    addConcept(name.trim(), description.trim());
    setName("");
    setDescription("");
    onCreated?.();
  };

  return (
    <div className="space-y-2">
      <input
        className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
        placeholder="Concept name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      {name.trim() && (
        <input
          className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
          placeholder="Description (optional)"
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
          <Plus size={12} /> Add Concept
        </button>
      )}
    </div>
  );
}
