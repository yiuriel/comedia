import { Tags } from "lucide-react";
import { useStore } from "../../store/useStore";
import { useI18n } from "../../i18n";
import NewConceptForm from "./NewConceptForm";
import ConceptItem from "./ConceptItem";
import EmptyState from "../ui/EmptyState";

export default function ConceptsPanel() {
  const { concepts } = useStore();
  const { t } = useI18n();

  return (
    <div className="px-5 py-6 space-y-5 w-full">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Tags size={16} className="text-violet-500" />
          <h2 className="text-base font-semibold text-gray-900">{t("concepts.title")}</h2>
        </div>
        <p className="text-xs text-gray-400">{t("concepts.description")}</p>
      </div>

      <NewConceptForm />

      <div className="space-y-1">
        {concepts.length === 0 && (
          <EmptyState
            icon={<Tags size={28} />}
            title={t("concepts.empty.title")}
            description={t("concepts.empty.description")}
          />
        )}
        {concepts.map((c) => (
          <ConceptItem key={c.id} concept={c} />
        ))}
      </div>
    </div>
  );
}
