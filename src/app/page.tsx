"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowRight,
  CircleCheck,
  Plus,
  Star,
  Wallet,
} from "lucide-react";

import {
  isSupabaseConfigured,
  supabase,
} from "@/lib/supabase";
import {
  AuthLoading,
  AuthPanel,
  useAuthUser,
} from "@/features/auth/auth-panel";
import { formatMoney } from "@/lib/formatters";
import { Transaction } from "@/types/finance";
import { Purchase } from "@/types/purchase";

const quickActions = [
  {
    href: "/purchases",
    title: "Новая покупка",
    description: "Добавить цель",
    icon: Plus,
  },
  {
    href: "/finance",
    title: "Операция",
    description: "Доход или расход",
    icon: Wallet,
  },
];

export default function HomePage() {
  const [purchases, setPurchases] =
    useState<Purchase[]>([]);
  const [
    transactions,
    setTransactions,
  ] = useState<Transaction[]>([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");
  const {
    user,
    loading: authLoading,
  } = useAuthUser();

  const loadDashboard =
    useCallback(async () => {
      if (!isSupabaseConfigured) {
        setError(
          "Supabase не настроен"
        );
        setLoading(false);
        return;
      }

      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const [
        purchasesResult,
        transactionsResult,
      ] = await Promise.all([
        supabase
          .from("purchases")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          }),
        supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          }),
      ]);

      if (
        purchasesResult.error ||
        transactionsResult.error
      ) {
        console.error(
          purchasesResult.error ||
            transactionsResult.error
        );
        setError(
          "Не удалось загрузить сводку"
        );
        setLoading(false);
        return;
      }

      setPurchases(
        (purchasesResult.data ||
          []) as Purchase[]
      );
      setTransactions(
        (transactionsResult.data ||
          []) as Transaction[]
      );
      setError("");
      setLoading(false);
    }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    void Promise.resolve().then(
      loadDashboard
    );
  }, [loadDashboard, user]);

  const summary = useMemo(() => {
    const activePurchases =
      purchases.filter(
        (purchase) =>
          purchase.status !==
            "completed" &&
          purchase.status !==
            "cancelled"
      );

    const purchasePlan =
      activePurchases.reduce(
        (acc, purchase) =>
          acc +
          Number(purchase.price),
        0
      );

    const income = transactions
      .filter(
        (item) =>
          item.type === "income"
      )
      .reduce(
        (acc, item) =>
          acc + Number(item.amount),
        0
      );

    const expenses = transactions
      .filter(
        (item) =>
          item.type === "expense"
      )
      .reduce(
        (acc, item) =>
          acc + Number(item.amount),
        0
      );

    return {
      activePurchases:
        activePurchases.length,
      favoritePurchases:
        purchases.filter(
          (purchase) =>
            purchase.is_favorite
        ).length,
      purchasePlan,
      balance: income - expenses,
    };
  }, [purchases, transactions]);

  const nextPurchases = purchases
    .filter(
      (purchase) =>
        purchase.status !==
        "completed"
    )
    .slice(0, 3);

  if (authLoading) {
    return <AuthLoading />;
  }

  if (!user) {
    return <AuthPanel />;
  }

  return (
    <main className="min-h-screen px-4 pb-32 pt-[calc(env(safe-area-inset-top)+20px)] text-white">
      <div className="mx-auto max-w-[430px]">
        <header className="mb-6">
          <p className="text-sm text-zinc-500">
            Личная система
          </p>

          <h1 className="text-5xl font-bold tracking-normal">
            LifeOS
          </h1>
        </header>

        {error && (
          <div className="mb-4 rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        <section className="rounded-[30px] border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-zinc-400">
                Баланс
              </p>
              <p className="mt-2 text-4xl font-bold">
                {loading
                  ? "..."
                  : formatMoney(
                      summary.balance
                    )}
              </p>
            </div>

            <CircleCheck
              className="mt-1 text-green-300"
              size={24}
            />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-3xl bg-black p-4">
              <p className="text-xs text-zinc-500">
                План покупок
              </p>
              <p className="mt-1 text-lg font-semibold">
                {loading
                  ? "..."
                  : formatMoney(
                      summary.purchasePlan
                    )}
              </p>
            </div>

            <div className="rounded-3xl bg-black p-4">
              <p className="text-xs text-zinc-500">
                Активные
              </p>
              <p className="mt-1 text-lg font-semibold">
                {loading
                  ? "..."
                  : summary.activePurchases}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 transition active:scale-[0.98]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black">
                  <Icon size={18} />
                </div>
                <h2 className="font-semibold">
                  {action.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </section>

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Ближайшие покупки
            </h2>

            <Link
              href="/purchases"
              className="inline-flex items-center gap-1 text-sm text-zinc-400"
            >
              Все
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="space-y-3">
            {nextPurchases.length === 0 && (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-center text-sm text-zinc-500">
                Список пуст
              </div>
            )}

            {nextPurchases.map(
              (purchase) => (
                <Link
                  key={purchase.id}
                  href="/purchases"
                  className="flex items-center justify-between gap-3 rounded-3xl border border-zinc-800 bg-zinc-900 p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {purchase.title}
                    </p>
                    <p className="mt-0.5 text-sm text-zinc-500">
                      {formatMoney(
                        Number(
                          purchase.price
                        )
                      )}
                    </p>
                  </div>

                  {purchase.is_favorite && (
                    <Star
                      size={17}
                      fill="white"
                    />
                  )}
                </Link>
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
