"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { usePurchasesStore } from "@/store/purchases-store";

export function AddPurchaseModal() {
  const { addPurchase } =
    usePurchasesStore();

  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");

  const createPurchase = () => {
    if (!title || !price) return;

    addPurchase({
      id: crypto.randomUUID(),

      title,

      price: Number(price),

      createdAt:
        new Date().toISOString(),

      isFavorite: false,

      status: "planned",
    });

    setTitle("");

    setPrice("");
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-3">
      <Input
        placeholder="Название"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <Input
        placeholder="Цена"
        type="number"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
      />

      <Button
        className="w-full rounded-2xl"
        onClick={createPurchase}
      >
        Добавить покупку
      </Button>
    </div>
  );
}