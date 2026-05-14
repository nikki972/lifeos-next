"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Purchase } from "@/types/purchase";

type Props = {
  onAdd: (
    purchase: Purchase
  ) => Promise<void>;
};

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
    useState("wait");

  async function createPurchase() {
    if (!title || !price) return;

    const purchase: Purchase = {
      id: crypto.randomUUID(),

      title,

      price: Number(price),

      category,

      priority,

      status: "active",

      created_at:
        new Date().toISOString(),

      is_favorite: false,
    };

    await onAdd(purchase);

    setTitle("");

    setPrice("");

    setCategory("apartment");

    setPriority("wait");
  }

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-4 space-y-4">
      <Input
        placeholder="Название"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <Input
        type="number"
        placeholder="Цена"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
      />

      <div className="flex gap-4">
        <Select
          value={category}
          onValueChange={setCategory}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="apartment">
              Квартира
            </SelectItem>

            <SelectItem value="car">
              Машина
            </SelectItem>

            <SelectItem value="clothes">
              Одежда
            </SelectItem>

            <SelectItem value="travel">
              Отдых
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={priority}
          onValueChange={setPriority}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="urgent">
              Срочно
            </SelectItem>

            <SelectItem value="wait">
              Подождет
            </SelectItem>

            <SelectItem value="dream">
              Хочу
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={createPurchase}
        className="w-full"
      >
        Добавить покупку
      </Button>
    </div>
  );
}