"use client";

import { usePurchasesStore } from "@/store/purchases-store";

import { PurchaseCard } from "@/entities/purchase/purchase-card";

export function FavoritesSection() {
  const { purchases } =
    usePurchasesStore();

  const favorites = purchases.filter(
    (p) => p.isFavorite
  );

  if (!favorites.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Избранное
      </h2>

      {favorites.map((purchase) => (
        <PurchaseCard
          key={purchase.id}
          purchase={purchase}
        />
      ))}
    </div>
  );
}