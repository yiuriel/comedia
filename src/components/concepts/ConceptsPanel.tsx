import { Tags } from "lucide-react";
import { useStore } from "../../store/useStore";
import NewConceptForm from "./NewConceptForm";
import ConceptItem from "./ConceptItem";
import EmptyState from "../ui/EmptyState";

export default function ConceptsPanel() {
  const { concepts } = useStore();

  return (
    <div className="px-5 py-6 space-y-5 w-full">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Tags size={16} className="text-violet-500" />
          <h2 className="text-base font-semibold text-gray-900">Concepts</h2>
        </div>
        <p className="text-xs text-gray-400">Themes and topics to tag your bits with.</p>
      </div>

      <NewConceptForm />

      <div className="space-y-1">
        {concepts.length === 0 && (
          <EmptyState
            icon={<Tags size={28} />}
            title="No concepts yet."
            description="Create one to start tagging your bits."
          />
        )}
        {concepts.map((c) => (
          <ConceptItem key={c.id} concept={c} />
        ))}
      </div>
    </div>
  );
}
