"use client";

import { create } from "zustand";

import { persist } from "zustand/middleware";

import { Transaction } from "@/types/finance";

interface FinanceStore {
  transactions: Transaction[];

  addTransaction: (
    transaction: Transaction
  ) => void;

  removeTransaction: (
    id: string
  ) => void;
}

export const useFinanceStore =
  create<FinanceStore>()(
    persist(
      (set) => ({
        transactions: [],

        addTransaction: (
          transaction
        ) =>
          set((state) => ({
            transactions: [
              transaction,
              ...state.transactions,
            ],
          })),

        removeTransaction: (id) =>
          set((state) => ({
            transactions:
              state.transactions.filter(
                (t) => t.id !== id
              ),
          })),
      }),
      {
        name: "lifeos-finance",
      }
    )
  );