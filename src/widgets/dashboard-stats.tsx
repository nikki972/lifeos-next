"use client";

import { usePurchasesStore } from "@/store/purchases-store";

export function DashboardStats() {
  const { purchases } =
    usePurchasesStore();

  const total = purchases.reduce(
    (acc, item) => acc + item.price,
    0
  );

  const completed = purchases.filter(
    (p) => p.status === "completed"
  );

  const completedTotal =
    completed.reduce(
      (acc, item) =>
        acc + item.price,
      0
    );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
        <p className="text-zinc-400 text-sm">
          Всего покупок
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {purchases.length}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
        <p className="text-zinc-400 text-sm">
          Общая сумма
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {total} ₽
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
        <p className="text-zinc-400 text-sm">
          Куплено
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {completed.length}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
        <p className="text-zinc-400 text-sm">
          Потрачено
        </p>

        <h2 className="text-3xl font-bold mt-2 text-green-400">
          {completedTotal} ₽
        </h2>
      </div>
    </div>
  );
}