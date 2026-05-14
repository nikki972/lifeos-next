"use client";

import { Trash2, Star } from "lucide-react";

import { Purchase } from "@/types/purchase";

interface Props {
  purchase: Purchase;

  onDelete: (id: string) => void;

  onToggleFavorite: (
    id: string,
    current: boolean
  ) => void;

  onToggleStatus: (
    id: string,
    current: string
  ) => void;
}

const categoryMap: Record<
  string,
  string
> = {
  tech: "Техника",
  home: "Дом",
  clothes: "Одежда",
  apartment: "Квартира",
};

const priorityMap: Record<
  string,
  string
> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
};

export function PurchaseCard({
  purchase,
  onDelete,
  onToggleFavorite,
  onToggleStatus,
}: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {purchase.title}
          </h2>

          <p className="text-zinc-400 mt-1">
            ₽{purchase.price}
          </p>

          <div className="flex gap-2 mt-3 flex-wrap">
            <div className="bg-zinc-800 text-sm px-3 py-1 rounded-full">
              {
                categoryMap[
                  purchase.category
                ]
              }
            </div>

            <div className="bg-zinc-800 text-sm px-3 py-1 rounded-full">
              {
                priorityMap[
                  purchase.priority
                ]
              }
            </div>

            <button
              onClick={() =>
                onToggleStatus(
                  purchase.id,
                  purchase.status
                )
              }
              className={`text-sm px-3 py-1 rounded-full ${
                purchase.status ===
                "completed"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {purchase.status ===
              "completed"
                ? "Куплено"
                : "В процессе"}
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              onToggleFavorite(
                purchase.id,
                purchase.is_favorite
              )
            }
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
          >
            <Star
              size={18}
              fill={
                purchase.is_favorite
                  ? "white"
                  : "none"
              }
            />
          </button>

          <button
            onClick={() =>
              onDelete(purchase.id)
            }
            className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition"
          >
            <Trash2
              size={18}
              className="text-red-400"
            />
          </button>
        </div>
      </div>
    </div>
  );
}