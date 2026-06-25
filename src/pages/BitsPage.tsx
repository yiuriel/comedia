import { useState } from "react";
import { Plus, PanelRightOpen, PanelRightClose } from "lucide-react";
import { useStore } from "../store/useStore";
import BitCard from "../components/bits/BitCard";
import NewBitForm from "../components/bits/NewBitForm";
import ConceptsPanel from "../components/concepts/ConceptsPanel";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";

export default function BitsPage() {
  const { bits } = useStore();
  const [showNew, setShowNew] = useState(false);
  const [showConcepts, setShowConcepts] = useState(true);

  return (
    <div className="flex gap-0 h-full">
      <div className={`flex-1 min-w-0 min-h-0 flex flex-col px-4 sm:px-6 py-6 transition-all duration-300 ${showConcepts ? "pr-4" : ""}`}>
        <div className="shrink-0 space-y-4 pb-4">
          <div className="flex items-start justify-between gap-4">
            <PageHeader
              title="Bits"
              description="A bit is a self-contained comedy premise — a joke, observation, or bit of material you can develop and combine with others."
            />
            <button
              onClick={() => setShowConcepts(!showConcepts)}
              className={`shrink-0 mt-1 p-2 rounded-lg border transition-all ${
                showConcepts
                  ? "bg-violet-50 text-violet-600 border-violet-200"
                  : "bg-white text-gray-400 border-gray-200 hover:text-gray-600 hover:bg-gray-50"
              }`}
              title={showConcepts ? "Hide concepts panel" : "Show concepts panel"}
            >
              {showConcepts ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
            </button>
          </div>

          {!showNew && (
            <button
              onClick={() => setShowNew(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <Plus size={15} /> New Bit
            </button>
          )}

          {showNew && <NewBitForm onDone={() => setShowNew(false)} />}
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pb-4">
          {bits.length === 0 && !showNew && (
            <EmptyState
              title="No bits yet."
              description='Click "New Bit" to write your first piece of material.'
            />
          )}
          {bits.map((b) => (
            <BitCard key={b.id} bit={b} />
          ))}
        </div>
      </div>

      <div
        className={`shrink-0 border-l border-gray-200/50 bg-gray-50/30 overflow-y-auto transition-all duration-300 ease-in-out ${
          showConcepts ? "w-2/5 opacity-100" : "w-0 opacity-0 overflow-hidden"
        }`}
      >
        <ConceptsPanel />
      </div>
    </div>
  );
}
