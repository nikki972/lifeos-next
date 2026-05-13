"use client";

import { Input } from "@/components/ui/input";

import { useFiltersStore } from "@/store/filters-store";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PurchasesFilters() {
  const {
    search,
    setSearch,
    category,
    setCategory,
  } = useFiltersStore();

  return (
    <div className="space-y-3 sticky top-0 z-40 bg-black pb-4">
      <Input
        placeholder="Поиск покупок..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <Select
        value={category}
        onValueChange={setCategory}
      >
        <SelectTrigger className="bg-zinc-900 border-zinc-700">
          <SelectValue placeholder="Категория" />
        </SelectTrigger>

        <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
          <SelectItem value="all">
            Все категории
          </SelectItem>

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
    </div>
  );
}