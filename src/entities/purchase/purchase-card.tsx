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

const categoryMap = {
  apartment: "Квартира",
  car: "Машина",
  "3d": "3D",
  clothes: "Одежда",
  rest: "Отдых",
};

const priorityMap = {
  urgent: "Срочно",
  wait: "Подождет",
  wish: "Хочу",
};

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

          <p className="text-2xl font-bold mt-2">
            {purchase.price} ₽
          </p>

          <div className="flex gap-2 mt-3">
            <div className="bg-zinc-800 text-sm px-3 py-1 rounded-full">
              {
                categoryMap[
                  purchase.category
                ]
              }
            </div>

            <div
              className={`
                text-sm
                px-3
                py-1
                rounded-full
                ${
                  purchase.priority ===
                  "urgent"
                    ? "bg-red-500/20 text-red-400"
                    : ""
                }
                ${
                  purchase.priority ===
                  "wait"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : ""
                }
                ${
                  purchase.priority ===
                  "wish"
                    ? "bg-blue-500/20 text-blue-400"
                    : ""
                }
              `}
            >
              {
                priorityMap[
                  purchase.priority
                ]
              }
            </div>
          </div>

          {purchase.status ===
            "completed" && (
            <div className="mt-3 text-green-400 text-sm">
              Куплено
            </div>
          )}
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

      <div className="flex gap-2 mt-5">
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