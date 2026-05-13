"use client";

import { create } from "zustand";
import { Category } from "@/types/category";

type PriorityFilter = "all" | "urgent" | "wait" | "wish";
type StatusFilter = "all" | "planned" | "completed" | "postponed" | "cancelled";

interface UIStore {
  search: string;
  setSearch: (v: string) => void;

  category: Category | "all";
  setCategory: (v: Category | "all") => void;

  priority: PriorityFilter;
  setPriority: (v: PriorityFilter) => void;

  status: StatusFilter;
  setStatus: (v: StatusFilter) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  search: "",
  setSearch: (v) => set({ search: v }),

  category: "all",
  setCategory: (v) => set({ category: v }),

  priority: "all",
  setPriority: (v) => set({ priority: v }),

  status: "planned",
  setStatus: (v) => set({ status: v }),
}));