"use client";

import { useUIStore } from "@/store/ui-store";

export function FiltersBar() {
  const {
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus,
  } = useUIStore();

  return (
    <div className="space-y-3">
      {/* search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск..."
        className="w-full bg-zinc-900 rounded-2xl px-4 py-3 outline-none"
      />

      {/* category */}
      <div className="flex gap-2 overflow-x-auto">
        {["all", "apartment", "car", "3d", "clothes", "rest"].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c as any)}
            className={`px-3 py-2 rounded-2xl whitespace-nowrap ${
              category === c
                ? "bg-white text-black"
                : "bg-zinc-900 text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* status */}
      <div className="flex gap-2 overflow-x-auto">
        {["planned", "completed", "postponed", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s as any)}
            className={`px-3 py-2 rounded-2xl whitespace-nowrap ${
              status === s
                ? "bg-white text-black"
                : "bg-zinc-900 text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}