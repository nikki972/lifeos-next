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

type Props = {
  onAdd: (purchase: {
    title: string;
    price: number;
    category: string;
    priority: string;
  }) => void;
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

  const createPurchase = () => {
    if (!title || !price) return;

    onAdd({
      title,
      price: Number(price),
      category,
      priority,
    });

    setTitle("");
    setPrice("");
    setCategory("apartment");
    setPriority("wait");
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 space-y-4 backdrop-blur">
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

      <div className="grid grid-cols-2 gap-3">
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

            <SelectItem value="vacation">
              Отдых
            </SelectItem>

            <SelectItem value="other">
              Другое
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
              Мечта
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        className="w-full"
        onClick={createPurchase}
      >
        Добавить покупку
      </Button>
    </div>
  );
}