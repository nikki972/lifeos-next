"use client";

import { usePurchasesStore } from "@/store/purchases-store";

import { PurchaseCard } from "@/entities/purchase/purchase-card";

export function PlannedSection() {
  const { purchases } =
    usePurchasesStore();

  const planned = purchases.filter(
    (p) => p.status === "planned"
  );

  if (!planned.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center text-zinc-500">
        Пока нет покупок
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Планируется
      </h2>

      {planned.map((purchase) => (
        <PurchaseCard
          key={purchase.id}
          purchase={purchase}
        />
      ))}
    </div>
  );
}