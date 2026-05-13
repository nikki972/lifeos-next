"use client";

import { PurchaseCard } from "@/entities/purchase/purchase-card";

import { usePurchasesStore } from "@/store/purchases-store";

export function PurchasesList() {
  const { purchases } =
    usePurchasesStore();

  if (purchases.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center text-zinc-500">
        Пока нет покупок
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {purchases.map((purchase) => (
        <PurchaseCard
          key={purchase.id}
          purchase={purchase}
        />
      ))}
    </div>
  );
}