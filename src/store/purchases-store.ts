"use client";

import { create } from "zustand";

import { persist } from "zustand/middleware";

import { Purchase } from "@/types/purchase";

interface PurchasesStore {
  purchases: Purchase[];

  hydrated: boolean;

  setHydrated: () => void;

  addPurchase: (
    purchase: Purchase
  ) => void;

  removePurchase: (
    id: string
  ) => void;

  toggleFavorite: (
    id: string
  ) => void;

  completePurchase: (
    id: string
  ) => void;
}

export const usePurchasesStore =
  create<PurchasesStore>()(
    persist(
      (set) => ({
        purchases: [],

        hydrated: false,

        setHydrated: () =>
          set({
            hydrated: true,
          }),

        addPurchase: (purchase) =>
          set((state) => ({
            purchases: [
              purchase,
              ...state.purchases,
            ],
          })),

        removePurchase: (id) =>
          set((state) => ({
            purchases:
              state.purchases.filter(
                (p) => p.id !== id
              ),
          })),

        toggleFavorite: (id) =>
          set((state) => ({
            purchases:
              state.purchases.map((p) =>
                p.id === id
                  ? {
                      ...p,
                      isFavorite:
                        !p.isFavorite,
                    }
                  : p
              ),
          })),

        completePurchase: (id) =>
          set((state) => ({
            purchases:
              state.purchases.map((p) =>
                p.id === id
                  ? {
                      ...p,
                      status:
                        "completed",
                    }
                  : p
              ),
          })),
      }),
      {
        name: "lifeos-purchases",

        onRehydrateStorage: () => {
          return (state) => {
            state?.setHydrated();
          };
        },
      }
    )
  );