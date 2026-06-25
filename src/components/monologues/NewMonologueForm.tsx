import { useState } from "react";
import { Plus } from "lucide-react";
import { useStore } from "../../store/useStore";
import Button from "../ui/Button";

export default function NewMonologueForm() {
  const { addMonologue } = useStore();
  const [title, setTitle] = useState("");

  const create = () => {
    if (!title.trim()) return;
    addMonologue(title.trim());
    setTitle("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-5 flex gap-3 items-end">
      <div className="flex-1">
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Monologue title</label>
        <input
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
          placeholder="e.g. Friday Night Set"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <Button onClick={create} disabled={!title.trim()}>
        <Plus size={16} /> Create
      </Button>
    </div>
  );
}
