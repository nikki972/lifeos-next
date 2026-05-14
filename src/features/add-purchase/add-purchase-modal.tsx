"use client";

import { useState } from "react";

import {
  PURCHASE_CATEGORIES,
  PURCHASE_CATEGORY_LABELS,
  PURCHASE_PRIORITIES,
  PURCHASE_PRIORITY_LABELS,
  Purchase,
  PurchaseCategory,
  PurchasePriority,
} from "@/types/purchase";

interface Props {
  onAdd: (
    purchase: Omit<
      Purchase,
      "user_id"
    >
  ) => Promise<boolean>;
}

const initialCategory: PurchaseCategory =
  "apartment";

const initialPriority: PurchasePriority =
  "medium";

export function AddPurchaseModal({
  onAdd,
}: Props) {
  const [title, setTitle] =
    useState("");
  const [price, setPrice] =
    useState("");
  const [category, setCategory] =
    useState<PurchaseCategory>(
      initialCategory
    );
  const [priority, setPriority] =
    useState<PurchasePriority>(
      initialPriority
    );
  const [error, setError] =
    useState("");
  const [submitting, setSubmitting] =
    useState(false);

  async function handleAdd(
    event: React.FormEvent
  ) {
    event.preventDefault();

    const trimmedTitle =
      title.trim();
    const numericPrice =
      Number(price);

    if (!trimmedTitle) {
      setError(
        "Введите название покупки."
      );
      return;
    }

    if (
      !Number.isFinite(
        numericPrice
      ) ||
      numericPrice <= 0
    ) {
      setError(
        "Введите цену больше нуля."
      );
      return;
    }

    setSubmitting(true);
    setError("");

    const saved = await onAdd({
      id: crypto.randomUUID(),
      title: trimmedTitle,
      price: numericPrice,
      category,
      priority,
      status: "active",
      created_at:
        new Date().toISOString(),
      is_favorite: false,
    });

    setSubmitting(false);

    if (!saved) {
      setError(
        "Не удалось сохранить покупку. Проверьте подключение к базе."
      );
      return;
    }

    setTitle("");
    setPrice("");
    setCategory(initialCategory);
    setPriority(initialPriority);
  }

  return (
    <form
      onSubmit={handleAdd}
      className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4"
    >
      <div className="space-y-4">
        <input
          className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
          placeholder="Название"
          value={title}
          onChange={(event) =>
            setTitle(
              event.target.value
            )
          }
        />

        <input
          className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
          placeholder="Цена"
          type="number"
          min="0"
          step="1"
          inputMode="decimal"
          value={price}
          onChange={(event) =>
            setPrice(
              event.target.value
            )
          }
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Категория
            </span>

            <select
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target
                    .value as PurchaseCategory
                )
              }
              className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 outline-none"
            >
              {PURCHASE_CATEGORIES.map(
                (value) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {
                      PURCHASE_CATEGORY_LABELS[
                        value
                      ]
                    }
                  </option>
                )
              )}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Приоритет
            </span>

            <select
              value={priority}
              onChange={(event) =>
                setPriority(
                  event.target
                    .value as PurchasePriority
                )
              }
              className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 outline-none"
            >
              {PURCHASE_PRIORITIES.map(
                (value) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {
                      PURCHASE_PRIORITY_LABELS[
                        value
                      ]
                    }
                  </option>
                )
              )}
            </select>
          </label>
        </div>

        {error && (
          <p
            role="alert"
            className="text-sm text-red-400"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-2xl bg-white py-3 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? "Сохраняем..."
            : "Добавить покупку"}
        </button>
      </div>
    </form>
  );
}
