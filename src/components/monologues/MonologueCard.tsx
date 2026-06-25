import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useStore } from "../../store/useStore";
import { useI18n } from "../../i18n";
import SortableBitRow from "./SortableBitRow";
import Button from "../ui/Button";
import { getColorMeta, type Monologue } from "../../types";

interface Props {
  monologue: Monologue;
}

export default function MonologueCard({ monologue }: Props) {
  const { bits, updateMonologue, deleteMonologue } = useStore();
  const { t } = useI18n();
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(monologue.title);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const selectedBits = monologue.bitIds.map((id) => bits.find((b) => b.id === id)).filter(Boolean);
  const availableBits = bits.filter((b) => !monologue.bitIds.includes(b.id));
  const totalMinutes = selectedBits.length * 2;

  const toggleBit = (bitId: string) => {
    const next = monologue.bitIds.includes(bitId)
      ? monologue.bitIds.filter((b) => b !== bitId)
      : [...monologue.bitIds, bitId];
    updateMonologue(monologue.id, { bitIds: next });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = monologue.bitIds.indexOf(active.id as string);
    const newIndex = monologue.bitIds.indexOf(over.id as string);
    updateMonologue(monologue.id, { bitIds: arrayMove(monologue.bitIds, oldIndex, newIndex) });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-5 space-y-4">
      <div className="flex justify-between items-center">
        {editing ? (
          <div className="flex gap-2 items-center flex-1 mr-3">
            <input
              className="flex-1 border border-gray-200 rounded-xl px-3 py-1.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-colors"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
            />
            <Button
              onClick={() => { updateMonologue(monologue.id, { title: editTitle.trim() }); setEditing(false); }}
              className="text-sm px-3 py-1.5"
            >
              {t("bit.save")}
            </Button>
            <button onClick={() => setEditing(false)} className="text-sm px-3 py-1.5 text-gray-500 font-medium hover:text-gray-700 transition-colors">{t("bit.cancel")}</button>
          </div>
        ) : (
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{monologue.title}</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {t("monologue.bits_count", { count: selectedBits.length })} · {t("monologue.minutes", { minutes: totalMinutes })}
            </p>
          </div>
        )}
        <div className="flex gap-1">
          {!editing && (
            <button onClick={() => { setEditing(true); setEditTitle(monologue.title); }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all">
              <Pencil size={14} />
            </button>
          )}
          <button onClick={() => deleteMonologue(monologue.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {selectedBits.length > 0 && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={monologue.bitIds} strategy={verticalListSortingStrategy}>
            <div className="space-y-1.5">
              {selectedBits.map((b, i) => (
                <SortableBitRow key={b!.id} bit={b!} index={i} onRemove={() => toggleBit(b!.id)} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <div className="border-t border-gray-100 pt-3">
        {availableBits.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {availableBits.map((b) => {
              const cm = getColorMeta(b.color);
              return (
                <button
                  key={b.id}
                  onClick={() => toggleBit(b.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-medium transition-all ${
                    cm
                      ? `${cm.bg} ${cm.border} ${cm.text} hover:shadow-sm`
                      : "border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {cm && <div className={`w-1.5 h-1.5 rounded-full ${cm.dot}`} />}
                  {b.title}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-gray-400">
            {bits.length === 0 ? t("monologue.bits.empty") : t("monologue.bits.add_all")}
          </p>
        )}
      </div>
    </div>
  );
}
