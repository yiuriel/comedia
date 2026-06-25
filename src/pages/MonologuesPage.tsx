import { useStore } from "../store/useStore";
import { useI18n } from "../i18n";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import NewMonologueForm from "../components/monologues/NewMonologueForm";
import MonologueCard from "../components/monologues/MonologueCard";

export default function MonologuesPage() {
  const { monologues } = useStore();
  const { t } = useI18n();

  return (
    <div className="h-full overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
      <PageHeader
        title={t("monologues.title")}
        description={t("monologues.description")}
      />

      <NewMonologueForm />

      {monologues.length === 0 && (
        <EmptyState
          title={t("monologues.empty.title")}
          description={t("monologues.empty.description")}
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
