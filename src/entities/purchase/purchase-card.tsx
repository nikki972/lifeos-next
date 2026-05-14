"use client";

import {
  CheckCircle2,
  Star,
  Trash2,
} from "lucide-react";

import {
  PURCHASE_CATEGORY_LABELS,
  PURCHASE_PRIORITY_LABELS,
  PURCHASE_STATUS_LABELS,
  Purchase,
  PurchaseStatus,
} from "@/types/purchase";

interface Props {
  purchase: Purchase;
  onDelete: (id: string) => void;
  onToggleFavorite: (
    id: string,
    current: boolean
  ) => void;
  onToggleStatus: (
    id: string,
    current: PurchaseStatus
  ) => void;
}

const priceFormatter =
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });

export function PurchaseCard({
  purchase,
  onDelete,
  onToggleFavorite,
  onToggleStatus,
}: Props) {
  const isCompleted =
    purchase.status === "completed";

  return (
    <article className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="break-words text-xl font-bold">
            {purchase.title}
          </h2>

          <p className="mt-1 text-zinc-400">
            {priceFormatter.format(
              purchase.price
            )}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
              {
                PURCHASE_CATEGORY_LABELS[
                  purchase.category
                ]
              }
            </span>

            <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
              {
                PURCHASE_PRIORITY_LABELS[
                  purchase.priority
                ]
              }
            </span>

            <button
              type="button"
              onClick={() =>
                onToggleStatus(
                  purchase.id,
                  purchase.status
                )
              }
              className={`rounded-full px-3 py-1 text-sm transition ${
                isCompleted
                  ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                  : "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30"
              }`}
            >
              {
                PURCHASE_STATUS_LABELS[
                  purchase.status
                ]
              }
            </button>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label={
              purchase.is_favorite
                ? "Убрать из избранного"
                : "Добавить в избранное"
            }
            onClick={() =>
              onToggleFavorite(
                purchase.id,
                purchase.is_favorite
              )
            }
            className="rounded-xl bg-zinc-800 p-2 transition hover:bg-zinc-700"
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
            type="button"
            aria-label={
              isCompleted
                ? "Вернуть в процесс"
                : "Отметить как купленное"
            }
            onClick={() =>
              onToggleStatus(
                purchase.id,
                purchase.status
              )
            }
            className="rounded-xl bg-zinc-800 p-2 transition hover:bg-zinc-700"
          >
            <CheckCircle2
              size={18}
              className={
                isCompleted
                  ? "text-green-300"
                  : "text-zinc-300"
              }
            />
          </button>

          <button
            type="button"
            aria-label="Удалить покупку"
            onClick={() =>
              onDelete(purchase.id)
            }
            className="rounded-xl bg-red-500/20 p-2 transition hover:bg-red-500/30"
          >
            <Trash2
              size={18}
              className="text-red-400"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
