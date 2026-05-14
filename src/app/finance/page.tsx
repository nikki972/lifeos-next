"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Trash2,
} from "lucide-react";

import {
  AuthLoading,
  AuthPanel,
  useAuthUser,
} from "@/features/auth/auth-panel";
import {
  isSupabaseConfigured,
  supabase,
} from "@/lib/supabase";
import {
  formatMoney,
  formatShortDate,
} from "@/lib/formatters";
import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_TYPE_LABELS,
  Transaction,
  TransactionCategory,
  TransactionType,
} from "@/types/finance";

const initialType: TransactionType =
  "expense";
const initialCategory: TransactionCategory =
  "other";

export default function FinancePage() {
  const [
    transactions,
    setTransactions,
  ] = useState<Transaction[]>([]);
  const [title, setTitle] =
    useState("");
  const [amount, setAmount] =
    useState("");
  const [type, setType] =
    useState<TransactionType>(
      initialType
    );
  const [category, setCategory] =
    useState<TransactionCategory>(
      initialCategory
    );
  const [loading, setLoading] =
    useState(true);
  const [submitting, setSubmitting] =
    useState(false);
  const [error, setError] =
    useState("");
  const {
    user,
    loading: authLoading,
  } = useAuthUser();

  const loadTransactions =
    useCallback(async () => {
      if (!isSupabaseConfigured) {
        setError(
          "Добавьте Supabase env-переменные для синхронизации финансов."
        );
        setLoading(false);
        return;
      }

      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data, error: requestError } =
        await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

      if (requestError) {
        console.error(requestError);
        setError(
          "Не удалось загрузить финансы."
        );
        setLoading(false);
        return;
      }

      setTransactions(
        (data || []) as Transaction[]
      );
      setError("");
      setLoading(false);
    }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    void Promise.resolve().then(
      loadTransactions
    );
  }, [loadTransactions, user]);

  useEffect(() => {
    if (
      !isSupabaseConfigured ||
      !user
    ) {
      return;
    }

    const channel = supabase
      .channel("transactions-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
        },
        () => {
          loadTransactions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadTransactions, user]);

  const totals = useMemo(() => {
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
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  async function handleSubmit(
    event: FormEvent
  ) {
    event.preventDefault();

    const trimmedTitle =
      title.trim();
    const numericAmount =
      Number(amount);

    if (!trimmedTitle) {
      setError(
        "Введите название операции."
      );
      return;
    }

    if (
      !Number.isFinite(
        numericAmount
      ) ||
      numericAmount <= 0
    ) {
      setError(
        "Введите сумму больше нуля."
      );
      return;
    }

    if (!user) {
      setError(
        "Войдите в аккаунт."
      );
      return;
    }

    setSubmitting(true);
    setError("");

    const { error: requestError } =
      await supabase
        .from("transactions")
        .insert({
          id: crypto.randomUUID(),
          user_id: user.id,
          title: trimmedTitle,
          amount: numericAmount,
          type,
          category,
          created_at:
            new Date().toISOString(),
        });

    setSubmitting(false);

    if (requestError) {
      console.error(requestError);
      setError(
        "Не удалось сохранить операцию."
      );
      return;
    }

    setTitle("");
    setAmount("");
    setType(initialType);
    setCategory(initialCategory);
    await loadTransactions();
  }

  async function deleteTransaction(
    id: string
  ) {
    const { error: requestError } =
      await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

    if (requestError) {
      console.error(requestError);
      setError(
        "Не удалось удалить операцию."
      );
      return;
    }

    await loadTransactions();
  }

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
            LifeOS
          </p>

          <h1 className="text-4xl font-bold tracking-normal">
            Финансы
          </h1>
        </header>

        <section className="grid grid-cols-2 gap-3">
          <div className="col-span-2 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">
              Баланс
            </p>
            <p className="mt-2 text-4xl font-bold">
              {formatMoney(
                totals.balance
              )}
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4">
            <p className="text-sm text-zinc-400">
              Доходы
            </p>
            <p className="mt-1 text-xl font-semibold text-green-300">
              {formatMoney(
                totals.income
              )}
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4">
            <p className="text-sm text-zinc-400">
              Расходы
            </p>
            <p className="mt-1 text-xl font-semibold text-red-300">
              {formatMoney(
                totals.expenses
              )}
            </p>
          </div>
        </section>

        <form
          onSubmit={handleSubmit}
          className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-4"
        >
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-black p-1">
            {(
              [
                "expense",
                "income",
              ] as TransactionType[]
            ).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setType(value)
                }
                className={`min-h-10 rounded-xl text-sm font-medium transition ${
                  type === value
                    ? "bg-white text-black"
                    : "text-zinc-400"
                }`}
              >
                {
                  TRANSACTION_TYPE_LABELS[
                    value
                  ]
                }
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <input
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              placeholder="Название"
              className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                value={amount}
                onChange={(event) =>
                  setAmount(
                    event.target.value
                  )
                }
                placeholder="Сумма"
                type="number"
                min="0"
                step="1"
                inputMode="decimal"
                className="min-w-0 rounded-2xl border border-zinc-700 bg-black px-4 py-3 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
              />

              <select
                value={category}
                onChange={(event) =>
                  setCategory(
                    event.target
                      .value as TransactionCategory
                  )
                }
                className="min-w-0 rounded-2xl border border-zinc-700 bg-black px-3 py-3 outline-none"
              >
                {TRANSACTION_CATEGORIES.map(
                  (value) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {
                        TRANSACTION_CATEGORY_LABELS[
                          value
                        ]
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            {error && (
              <p
                role="alert"
                className="text-sm text-red-300"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-white py-3 font-semibold text-black transition disabled:opacity-60"
            >
              {submitting
                ? "Сохраняем..."
                : "Добавить операцию"}
            </button>
          </div>
        </form>

        <section className="mt-5 space-y-3">
          {loading && (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-500">
              Загрузка...
            </div>
          )}

          {!loading &&
            transactions.length ===
              0 && (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-500">
                Операций пока нет
              </div>
            )}

          {transactions.map(
            (transaction) => {
              const isIncome =
                transaction.type ===
                "income";

              return (
                <article
                  key={transaction.id}
                  className="flex items-center gap-3 rounded-3xl border border-zinc-800 bg-zinc-900 p-4"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                      isIncome
                        ? "bg-green-500/15 text-green-300"
                        : "bg-red-500/15 text-red-300"
                    }`}
                  >
                    {isIncome ? (
                      <ArrowDownLeft
                        size={19}
                      />
                    ) : (
                      <ArrowUpRight
                        size={19}
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-semibold">
                      {
                        transaction.title
                      }
                    </h2>
                    <p className="mt-0.5 truncate text-sm text-zinc-500">
                      {
                        TRANSACTION_CATEGORY_LABELS[
                          transaction.category
                        ]
                      }
                      {formatShortDate(
                        transaction.created_at
                      )
                        ? ` · ${formatShortDate(
                            transaction.created_at
                          )}`
                        : ""}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={`font-semibold ${
                        isIncome
                          ? "text-green-300"
                          : "text-white"
                      }`}
                    >
                      {isIncome
                        ? "+"
                        : "-"}
                      {formatMoney(
                        Number(
                          transaction.amount
                        )
                      )}
                    </p>

                    <button
                      type="button"
                      aria-label="Удалить операцию"
                      onClick={() =>
                        deleteTransaction(
                          transaction.id
                        )
                      }
                      className="mt-1 inline-flex rounded-xl p-1 text-zinc-500 transition hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              );
            }
          )}
        </section>
      </div>
    </main>
  );
}
