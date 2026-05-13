"use client";

import { create } from "zustand";

import { persist } from "zustand/middleware";

import { Purchase } from "@/types/purchase";

interface PurchasesStore {
  purchases: Purchase[];

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

        addPurchase: (
          purchase
        ) =>
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

        toggleFavorite: (
          id
        ) =>
          set((state) => ({
            purchases:
              state.purchases.map(
                (purchase) =>
                  purchase.id === id
                    ? {
                        ...purchase,
                        isFavorite:
                          !purchase.isFavorite,
                      }
                    : purchase
              ),
          })),

        completePurchase: (
          id
        ) =>
          set((state) => ({
            purchases:
              state.purchases.map(
                (purchase) =>
                  purchase.id === id
                    ? {
                        ...purchase,
                        status:
                          "completed",
                      }
                    : purchase
              ),
          })),
      }),
      {
        name: "lifeos-purchases",
      }
    )
  );