import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import type { Bit, BitColor, Concept, Monologue } from "../types";

interface ComediaState {
  bits: Bit[];
  concepts: Concept[];
  monologues: Monologue[];

  addBit: (title: string, content: string, concepts?: string[], color?: BitColor) => string;
  updateBit: (id: string, updates: Partial<Omit<Bit, "id" | "createdAt">>) => void;
  deleteBit: (id: string) => void;

  addConcept: (name: string, description: string) => string;
  updateConcept: (id: string, updates: Partial<Omit<Concept, "id" | "createdAt">>) => void;
  deleteConcept: (id: string) => void;

  addMonologue: (title: string, bitIds?: string[]) => string;
  updateMonologue: (id: string, updates: Partial<Omit<Monologue, "id" | "createdAt">>) => void;
  deleteMonologue: (id: string) => void;
}

export const useStore = create<ComediaState>()(
  persist(
    (set) => ({
      bits: [],
      concepts: [],
      monologues: [],

      addBit: (title, content, concepts = [], color = null) => {
        const id = uuid();
        const now = new Date().toISOString();
        set((s) => ({
          bits: [...s.bits, { id, title, content, color, concepts, createdAt: now, updatedAt: now }],
        }));
        return id;
      },
      updateBit: (id, updates) =>
        set((s) => ({
          bits: s.bits.map((b) =>
            b.id === id ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b
          ),
        })),
      deleteBit: (id) => set((s) => ({ bits: s.bits.filter((b) => b.id !== id) })),

      addConcept: (name, description) => {
        const id = uuid();
        const now = new Date().toISOString();
        set((s) => ({
          concepts: [...s.concepts, { id, name, description, createdAt: now }],
        }));
        return id;
      },
      updateConcept: (id, updates) =>
        set((s) => ({
          concepts: s.concepts.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),
      deleteConcept: (id) => set((s) => ({ concepts: s.concepts.filter((c) => c.id !== id) })),

      addMonologue: (title, bitIds = []) => {
        const id = uuid();
        const now = new Date().toISOString();
        set((s) => ({
          monologues: [...s.monologues, { id, title, bitIds, createdAt: now, updatedAt: now }],
        }));
        return id;
      },
      updateMonologue: (id, updates) =>
        set((s) => ({
          monologues: s.monologues.map((m) =>
            m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m
          ),
        })),
      deleteMonologue: (id) =>
        set((s) => ({ monologues: s.monologues.filter((m) => m.id !== id) })),
    }),
    { name: "comedia-storage" }
  )
);
