"use client";

import { create } from "zustand";

import {
  PurchaseCategory,
  PurchasePriority,
  PurchaseStatus,
} from "@/types/purchase";

type CategoryFilter = PurchaseCategory | "all";
type PriorityFilter = PurchasePriority | "all";
type StatusFilter = PurchaseStatus | "all";

interface UIStore {
  search: string;
  setSearch: (value: string) => void;

  category: CategoryFilter;
  setCategory: (value: CategoryFilter) => void;

  priority: PriorityFilter;
  setPriority: (value: PriorityFilter) => void;

  status: StatusFilter;
  setStatus: (value: StatusFilter) => void;
}

export const useUIStore = create<UIStore>(
  (set) => ({
    search: "",
    setSearch: (value) =>
      set({
        search: value,
      }),

    category: "all",
    setCategory: (value) =>
      set({
        category: value,
      }),

    priority: "all",
    setPriority: (value) =>
      set({
        priority: value,
      }),

    status: "all",
    setStatus: (value) =>
      set({
        status: value,
      }),
  })
);
