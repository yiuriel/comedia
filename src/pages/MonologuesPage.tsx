import { useStore } from "../store/useStore";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import NewMonologueForm from "../components/monologues/NewMonologueForm";
import MonologueCard from "../components/monologues/MonologueCard";

export default function MonologuesPage() {
  const { monologues } = useStore();

  return (
    <div className="h-full overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
      <PageHeader
        title="Monologues"
        description="A monologue is an ordered set list — pick your bits, arrange the order, and build your set. Drag to reorder as you refine your flow."
      />

      <NewMonologueForm />

      {monologues.length === 0 && (
        <EmptyState
          title="No monologues yet."
          description="Create a monologue to start arranging bits into a set."
        />
      )}

      <div className="space-y-4">
        {monologues.map((m) => (
          <MonologueCard key={m.id} monologue={m} />
        ))}
      </div>
    </div>
  );
}
