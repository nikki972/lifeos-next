"use client";

import { useState } from "react";

import { Purchase } from "@/types/purchase";

interface Props {
  onAdd: (
    purchase: Purchase
  ) => Promise<void>;
}

export function AddPurchaseModal({
  onAdd,
}: Props) {
  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("apartment");

  const [priority, setPriority] =
    useState("medium");

  async function handleAdd() {
    if (!title || !price) return;

    await onAdd({
      id: crypto.randomUUID(),

      title,

      price: Number(price),

      category,

      priority,

      status: "active",

      created_at:
        new Date().toISOString(),

      is_favorite: false,
    });

    setTitle("");

    setPrice("");

    setCategory("apartment");

    setPriority("medium");
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
      <div className="space-y-4">
        <input
          className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3 outline-none"
          placeholder="Название"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <input
          className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3 outline-none"
          placeholder="Цена"
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
        />

        <div className="flex gap-4">
          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
          >
            <option value="apartment">
              Квартира
            </option>

            <option value="tech">
              Техника
            </option>

            <option value="home">
              Дом
            </option>

            <option value="clothes">
              Одежда
            </option>
          </select>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
            className="bg-black border border-zinc-700 rounded-2xl px-4 py-3"
          >
            <option value="low">
              Низкий
            </option>

            <option value="medium">
              Средний
            </option>

            <option value="high">
              Высокий
            </option>
          </select>
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-white text-black rounded-2xl py-3 font-semibold hover:opacity-90 transition"
        >
          Добавить покупку
        </button>
      </div>
    </div>
  );
}