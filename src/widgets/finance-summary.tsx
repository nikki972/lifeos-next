"use client";

import { useFinanceStore } from "@/store/finance-store";

export function FinanceSummary() {
  const { transactions } =
    useFinanceStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce(
      (acc, item) =>
        acc + item.amount,
      0
    );

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (acc, item) =>
        acc + item.amount,
      0
    );

  const balance =
    income - expenses;

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
        <p className="text-zinc-400">
          Баланс
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {balance} ₽
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
          <p className="text-zinc-400">
            Доходы
          </p>

          <h2 className="text-2xl font-bold text-green-400 mt-2">
            {income} ₽
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
          <p className="text-zinc-400">
            Расходы
          </p>

          <h2 className="text-2xl font-bold text-red-400 mt-2">
            {expenses} ₽
          </h2>
        </div>
      </div>
    </div>
  );
}