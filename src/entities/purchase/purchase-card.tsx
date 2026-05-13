"use client";

import { Purchase } from "@/types/purchase";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Heart,
  Trash2,
  Check,
} from "lucide-react";

import { usePurchasesStore } from "@/store/purchases-store";

interface Props {
  purchase: Purchase;
}

export function PurchaseCard({
  purchase,
}: Props) {
  const {
    removePurchase,
    toggleFavorite,
    completePurchase,
  } = usePurchasesStore();

  return (
    <Card className="bg-zinc-900 border-zinc-800 rounded-3xl p-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {purchase.title}
          </h2>

          <p className="text-zinc-400 mt-1">
            {purchase.price} ₽
          </p>

          <p className="text-sm text-zinc-500 mt-2">
            {purchase.status}
          </p>
        </div>

        <button
          onClick={() =>
            toggleFavorite(purchase.id)
          }
        >
          <Heart
            className={
              purchase.isFavorite
                ? "fill-red-500 text-red-500"
                : "text-zinc-500"
            }
          />
        </button>
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          onClick={() =>
            completePurchase(
              purchase.id
            )
          }
        >
          <Check />
        </Button>

        <Button
          variant="destructive"
          onClick={() =>
            removePurchase(
              purchase.id
            )
          }
        >
          <Trash2 />
        </Button>
      </div>
    </Card>
  );
}