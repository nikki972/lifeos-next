"use client";

import { usePurchasesStore } from "@/store/purchases-store";

import { PurchaseCard } from "@/entities/purchase/purchase-card";

import { useFiltersStore } from "@/store/filters-store";

export function PlannedSection() {
  const { purchases } =
    usePurchasesStore();

  const { search, category } =
    useFiltersStore();

  const planned = purchases
    .filter(
      (p) =>
        p.status === "planned"
    )
    .filter((purchase) =>
      purchase.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )
    .filter((purchase) =>
      category === "all"
        ? true
        : purchase.category ===
          category
    );

  if (!planned.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center text-zinc-500">
        Ничего не найдено
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