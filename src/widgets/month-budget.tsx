"use client";

import { Progress } from "@/components/ui/progress";

import { usePurchasesStore } from "@/store/purchases-store";

export function MonthBudget() {
  const { purchases } =
    usePurchasesStore();

  const LIMIT = 300000;

  const spent = purchases
    .filter(
      (p) => p.status === "completed"
    )
    .reduce(
      (acc, item) =>
        acc + item.price,
      0
    );

  const percent =
    (spent / LIMIT) * 100;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-zinc-400 text-sm">
            Бюджет месяца
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {spent} ₽
          </h2>
        </div>

        <div className="text-right">
          <p className="text-zinc-500 text-sm">
            Лимит
          </p>

          <p className="text-lg">
            {LIMIT} ₽
          </p>
        </div>
      </div>

      <Progress
        value={percent}
        className="mt-5"
      />
    </div>
  );
}