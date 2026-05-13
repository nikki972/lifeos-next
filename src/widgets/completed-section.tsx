"use client";

import { usePurchasesStore } from "@/store/purchases-store";

import { PurchaseCard } from "@/entities/purchase/purchase-card";

export function CompletedSection() {
  const { purchases } =
    usePurchasesStore();

  const completed = purchases.filter(
    (p) => p.status === "completed"
  );

  if (!completed.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-green-400">
        Куплено
      </h2>

      {completed.map((purchase) => (
        <PurchaseCard
          key={purchase.id}
          purchase={purchase}
        />
      ))}
    </div>
  );
}