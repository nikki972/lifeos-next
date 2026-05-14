"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { PurchaseCard } from "@/entities/purchase/purchase-card";
import {
  AuthLoading,
  AuthPanel,
  useAuthUser,
} from "@/features/auth/auth-panel";
import { AddPurchaseModal } from "@/features/add-purchase/add-purchase-modal";
import {
  isSupabaseConfigured,
  supabase,
} from "@/lib/supabase";
import { useUIStore } from "@/store/ui-store";
import {
  Purchase,
  PurchaseStatus,
} from "@/types/purchase";
import { FiltersBar } from "@/widgets/filters-bar";

export default function PurchasesPage() {
  const [purchases, setPurchases] =
    useState<Purchase[]>([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");
  const {
    user,
    loading: authLoading,
  } = useAuthUser();

  const {
    search,
    category,
    priority,
    status,
  } = useUIStore();

  const loadPurchases =
    useCallback(async () => {
      if (!isSupabaseConfigured) {
        setError(
          "Добавьте NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY в .env.local или в Vercel Environment Variables."
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
          .from("purchases")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

      if (requestError) {
        console.error(requestError);
        setError(
          "Не удалось загрузить покупки. Проверьте Supabase и интернет."
        );
        setLoading(false);
        return;
      }

      setPurchases(
        (data || []) as Purchase[]
      );
      setError("");
      setLoading(false);
    }, [user]);

  async function addPurchase(
    purchase: Omit<
      Purchase,
      "user_id"
    >
  ) {
    if (!user) {
      return false;
    }

    const { error: requestError } =
      await supabase
        .from("purchases")
        .insert({
          ...purchase,
          user_id: user.id,
        });

    if (requestError) {
      console.error(requestError);
      setError(
        "Не удалось добавить покупку."
      );
      return false;
    }

    await loadPurchases();
    return true;
  }

  async function deletePurchase(
    id: string
  ) {
    const { error: requestError } =
      await supabase
        .from("purchases")
        .delete()
        .eq("id", id);

    if (requestError) {
      console.error(requestError);
      setError(
        "Не удалось удалить покупку."
      );
      return;
    }

    await loadPurchases();
  }

  async function toggleFavorite(
    id: string,
    current: boolean
  ) {
    const { error: requestError } =
      await supabase
        .from("purchases")
        .update({
          is_favorite: !current,
        })
        .eq("id", id);

    if (requestError) {
      console.error(requestError);
      setError(
        "Не удалось обновить избранное."
      );
      return;
    }

    await loadPurchases();
  }

  async function toggleStatus(
    id: string,
    current: PurchaseStatus
  ) {
    const nextStatus =
      current === "completed"
        ? "active"
        : "completed";

    const { error: requestError } =
      await supabase
        .from("purchases")
        .update({
          status: nextStatus,
        })
        .eq("id", id);

    if (requestError) {
      console.error(requestError);
      setError(
        "Не удалось обновить статус."
      );
      return;
    }

    await loadPurchases();
  }

  useEffect(() => {
    if (!user) {
      return;
    }

    void Promise.resolve().then(
      loadPurchases
    );
  }, [loadPurchases, user]);

  useEffect(() => {
    if (
      !isSupabaseConfigured ||
      !user
    ) {
      return;
    }

    const channel = supabase
      .channel("purchases-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "purchases",
        },
        () => {
          loadPurchases();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadPurchases, user]);

  const filteredPurchases =
    useMemo(() => {
      const normalizedSearch =
        search.trim().toLowerCase();

      return purchases.filter(
        (purchase) => {
          const matchesSearch =
            !normalizedSearch ||
            purchase.title
              .toLowerCase()
              .includes(
                normalizedSearch
              );

          const matchesCategory =
            category === "all" ||
            purchase.category ===
              category;

          const matchesPriority =
            priority === "all" ||
            purchase.priority ===
              priority;

          const matchesStatus =
            status === "all" ||
            purchase.status === status;

          return (
            matchesSearch &&
            matchesCategory &&
            matchesPriority &&
            matchesStatus
          );
        }
      );
    }, [
      purchases,
      search,
      category,
      priority,
      status,
    ]);

  if (authLoading) {
    return <AuthLoading />;
  }

  if (!user) {
    return <AuthPanel />;
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Загрузка...
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pb-32 pt-[calc(env(safe-area-inset-top)+20px)] text-white">
      <div className="mx-auto max-w-[430px]">
        <header className="mb-8">
          <p className="text-sm text-zinc-500">
            LifeOS
          </p>

          <h1 className="text-4xl font-bold tracking-normal">
            Покупки
          </h1>

          <p className="mt-2 text-zinc-400">
            Желания, расходы и покупки в одном списке
          </p>
        </header>

        <div className="space-y-6">
          <AddPurchaseModal
            onAdd={addPurchase}
          />

          <FiltersBar />

          {error && (
            <div
              role="alert"
              className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"
            >
              {error}
            </div>
          )}

          <section className="space-y-4">
            {filteredPurchases.length ===
              0 && (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
                {purchases.length === 0
                  ? "Пока нет покупок"
                  : "Ничего не найдено"}
              </div>
            )}

            {filteredPurchases.map(
              (purchase) => (
                <PurchaseCard
                  key={purchase.id}
                  purchase={purchase}
                  onDelete={
                    deletePurchase
                  }
                  onToggleFavorite={
                    toggleFavorite
                  }
                  onToggleStatus={
                    toggleStatus
                  }
                />
              )
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
