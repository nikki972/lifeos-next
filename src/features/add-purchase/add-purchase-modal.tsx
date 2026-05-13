"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { usePurchasesStore } from "@/store/purchases-store";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddPurchaseModal() {
  const { addPurchase } =
    usePurchasesStore();

  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("apartment");

  const [priority, setPriority] =
    useState("wait");

  const createPurchase = () => {
    if (!title || !price) return;

    addPurchase({
      id: crypto.randomUUID(),

      title,

      price: Number(price),

      category: category as any,

      priority: priority as any,

      createdAt:
        new Date().toISOString(),

      isFavorite: false,

      status: "planned",
    });

    setTitle("");

    setPrice("");
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-4">
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

      <Select
        value={category}
        onValueChange={setCategory}
      >
        <SelectTrigger>
          <SelectValue placeholder="Категория" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="apartment">
            Квартира
          </SelectItem>

          <SelectItem value="car">
            Машина
          </SelectItem>

          <SelectItem value="3d">
            3D
          </SelectItem>

          <SelectItem value="clothes">
            Одежда
          </SelectItem>

          <SelectItem value="rest">
            Отдых
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={priority}
        onValueChange={setPriority}
      >
        <SelectTrigger>
          <SelectValue placeholder="Приоритет" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="urgent">
            Срочно
          </SelectItem>

          <SelectItem value="wait">
            Может подождать
          </SelectItem>

          <SelectItem value="wish">
            Хочу
          </SelectItem>
        </SelectContent>
      </Select>

      <Button
        className="w-full rounded-2xl"
        onClick={createPurchase}
      >
        Добавить покупку
      </Button>
    </div>
  );
}