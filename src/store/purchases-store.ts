"use client";

import { create } from "zustand";

import { persist } from "zustand/middleware";

import { Purchase } from "@/types/purchase";

import { supabase } from "@/lib/supabase";

interface PurchasesStore {
  purchases: Purchase[];

  fetchPurchases: () => Promise<void>;

  addPurchase: (
    purchase: Purchase
  ) => Promise<void>;

  removePurchase: (
    id: string
  ) => Promise<void>;

  toggleFavorite: (
    id: string
  ) => Promise<void>;

  completePurchase: (
    id: string
  ) => Promise<void>;
}

export const usePurchasesStore =
  create<PurchasesStore>()(
    persist(
      (set, get) => ({
        purchases: [],

        fetchPurchases: async () => {
          const { data } =
            await supabase
              .from("purchases")
              .select("*")
              .order(
                "created_at",
                {
                  ascending: false,
                }
              );

          if (!data) return;

          set({
            purchases:
              data as Purchase[],
          });
        },

        addPurchase: async (
          purchase
        ) => {
          set((state) => ({
            purchases: [
              purchase,
              ...state.purchases,
            ],
          }));

          await supabase
            .from("purchases")
            .insert({
              ...purchase,
              created_at:
                purchase.createdAt,
              is_favorite:
                purchase.isFavorite,
            });
        },

        removePurchase: async (
          id
        ) => {
          set((state) => ({
            purchases:
              state.purchases.filter(
                (p) => p.id !== id
              ),
          }));

          await supabase
            .from("purchases")
            .delete()
            .eq("id", id);
        },

        toggleFavorite:
          async (id) => {
            const purchase =
              get().purchases.find(
                (p) => p.id === id
              );

            if (!purchase) return;

            const updated =
              !purchase.isFavorite;

            set((state) => ({
              purchases:
                state.purchases.map(
                  (p) =>
                    p.id === id
                      ? {
                          ...p,
                          isFavorite:
                            updated,
                        }
                      : p
                ),
            }));

            await supabase
              .from("purchases")
              .update({
                is_favorite:
                  updated,
              })
              .eq("id", id);
          },

        completePurchase:
          async (id) => {
            set((state) => ({
              purchases:
                state.purchases.map(
                  (p) =>
                    p.id === id
                      ? {
                          ...p,
                          status:
                            "completed",
                        }
                      : p
                ),
            }));

            await supabase
              .from("purchases")
              .update({
                status:
                  "completed",
              })
              .eq("id", id);
          },
      }),
      {
        name: "lifeos-purchases",
      }
    )
  );