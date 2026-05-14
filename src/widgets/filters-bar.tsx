"use client";

import { Search } from "lucide-react";

import { useUIStore } from "@/store/ui-store";
import {
  PURCHASE_CATEGORIES,
  PURCHASE_CATEGORY_LABELS,
  PURCHASE_PRIORITIES,
  PURCHASE_PRIORITY_LABELS,
  PURCHASE_STATUSES,
  PURCHASE_STATUS_LABELS,
  PurchaseCategory,
  PurchasePriority,
  PurchaseStatus,
} from "@/types/purchase";

const allOption = {
  value: "all",
  label: "Все",
} as const;

const categoryOptions = [
  allOption,
  ...PURCHASE_CATEGORIES.map((value) => ({
    value,
    label:
      PURCHASE_CATEGORY_LABELS[
        value
      ],
  })),
];

const priorityOptions = [
  allOption,
  ...PURCHASE_PRIORITIES.map((value) => ({
    value,
    label:
      PURCHASE_PRIORITY_LABELS[
        value
      ],
  })),
];

const statusOptions = [
  allOption,
  ...PURCHASE_STATUSES.map((value) => ({
    value,
    label:
      PURCHASE_STATUS_LABELS[
        value
      ],
  })),
];

function FilterGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: ReadonlyArray<{
    value: T;
    label: string;
  }>;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() =>
              onChange(option.value)
            }
            className={`min-h-10 rounded-2xl px-4 text-sm whitespace-nowrap transition ${
              value === option.value
                ? "bg-white text-black"
                : "bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FiltersBar() {
  const {
    search,
    setSearch,
    category,
    setCategory,
    priority,
    setPriority,
    status,
    setStatus,
  } = useUIStore();

  return (
    <section className="space-y-4">
      <label className="relative block">
        <Search
          aria-hidden="true"
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="Поиск покупки"
          className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-11 py-3 outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
        />
      </label>

      <FilterGroup
        label="Категория"
        value={category}
        options={categoryOptions}
        onChange={(value) =>
          setCategory(
            value as
              | PurchaseCategory
              | "all"
          )
        }
      />

      <FilterGroup
        label="Приоритет"
        value={priority}
        options={priorityOptions}
        onChange={(value) =>
          setPriority(
            value as
              | PurchasePriority
              | "all"
          )
        }
      />

      <FilterGroup
        label="Статус"
        value={status}
        options={statusOptions}
        onChange={(value) =>
          setStatus(
            value as
              | PurchaseStatus
              | "all"
          )
        }
      />
    </section>
  );
}
