"use client";

import { useEffect, useState } from "react";

import { PurchaseCard } from "@/entities/purchase/purchase-card";

import { Purchase } from "@/shared/types/purchase";

import { supabase } from "@/shared/lib/supabase";

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPurchases();
  }, []);

  async function loadPurchases() {
    setLoading(true);

    const { data, error } = await supabase
      .from("purchases")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setPurchases(data as Purchase[]);
    setLoading(false);
  }

  async function deletePurchase(id: string) {
    const { error } = await supabase
      .from("purchases")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setPurchases((prev) => prev.filter((item) => item.id !== id));
  }

  async function toggleFavorite(id: string, current: boolean) {
    const { error } = await supabase
      .from("purchases")
      .update({
        is_favorite: !current,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setPurchases((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              is_favorite: !current,
            }
          : item
      )
    );
  }

  async function toggleStatus(id: string, current: string) {
    const nextStatus =
      current === "planned" ? "completed" : "planned";

    const { error } = await supabase
      .from("purchases")
      .update({
        status: nextStatus,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setPurchases((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: nextStatus,
            }
          : item
      )
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-4">
        <div className="mx-auto max-w-md">
          <p className="text-zinc-400">Загрузка...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <div className="mx-auto max-w-md space-y-4">
        <div>
          <h1 className="text-5xl font-bold">LifeOS</h1>

          <p className="mt-2 text-zinc-400">
            Все покупки
          </p>
        </div>

        {purchases.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-center text-zinc-500">
            Пока нет покупок
          </div>
        ) : (
          purchases.map((purchase) => (
            <PurchaseCard
              key={purchase.id}
              purchase={purchase}
              onDelete={deletePurchase}
              onToggleFavorite={toggleFavorite}
              onToggleStatus={toggleStatus}
            />
          ))
        )}
      </div>
    </main>
  );
}