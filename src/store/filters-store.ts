"use client";

import { create } from "zustand";

interface FiltersStore {
  search: string;

  setSearch: (
    value: string
  ) => void;

  category: string;

  setCategory: (
    value: string
  ) => void;
}

export const useFiltersStore =
  create<FiltersStore>((set) => ({
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
  }));