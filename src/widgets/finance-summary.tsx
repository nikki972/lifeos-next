"use client";

import { useFinanceStore } from "@/store/finance-store";

const moneyFormatter =
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });

export function FinanceSummary() {
  const { transactions } =
    useFinanceStore();

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce(
      (acc, item) =>
        acc + item.amount,
      0
    );

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce(
      (acc, item) =>
        acc + item.amount,
      0
    );

  const balance =
    income - expenses;

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
        <p className="text-zinc-400">
          Баланс
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {moneyFormatter.format(
            balance
          )}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-zinc-400">
            Доходы
          </p>

          <h2 className="mt-2 text-2xl font-bold text-green-400">
            {moneyFormatter.format(
              income
            )}
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-zinc-400">
            Расходы
          </p>

          <h2 className="mt-2 text-2xl font-bold text-red-400">
            {moneyFormatter.format(
              expenses
            )}
          </h2>
        </div>
      </div>
    </div>
  );
}
