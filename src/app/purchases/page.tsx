"use client";

import { useEffect, useState } from "react";

import { PurchaseCard } from "@/entities/purchase/purchase-card";

import { Purchase } from "@/types/purchase";

import { supabase } from "@/lib/supabase";

import { AddPurchaseModal } from "@/features/add-purchase/add-purchase-modal";

export default function PurchasesPage() {
  const [purchases, setPurchases] =
    useState<Purchase[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadPurchases();
  }, []);

  async function loadPurchases() {
    setLoading(true);

    const { data, error } =
      await supabase
        .from("purchases")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(error);

      setLoading(false);

      return;
    }

    const normalized =
      (data || []).map((item: any) => ({
        id: item.id,

        title: item.title,

        price: item.price,

        category:
          item.category,

        priority:
          item.priority,

        status: item.status,

        createdAt:
          item.created_at,

        isFavorite:
          item.is_favorite,
      }));

    setPurchases(normalized);

    setLoading(false);
  }

  async function deletePurchase(
    id: string
  ) {
    await supabase
      .from("purchases")
      .delete()
      .eq("id", id);

    setPurchases((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  }

  async function toggleFavorite(
    id: string,
    current: boolean
  ) {
    await supabase
      .from("purchases")
      .update({
        is_favorite: !current,
      })
      .eq("id", id);

    setPurchases((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,

              isFavorite:
                !current,
            }
          : item
      )
    );
  }

  async function toggleStatus(
    id: string,
    current: string
  ) {
    const nextStatus =
      current === "planned"
        ? "completed"
        : "planned";

    await supabase
      .from("purchases")
      .update({
        status: nextStatus,
      })
      .eq("id", id);

    setPurchases((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,

              status:
                nextStatus as any,
            }
          : item
      )
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-4">
        <div className="max-w-xl mx-auto">
          Загрузка...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-4 pb-40">
      <div className="max-w-xl mx-auto">
        <h1 className="text-5xl font-bold">
          Покупки
        </h1>

        <p className="text-zinc-400 mt-2 mb-8">
          Cloud synced purchases
        </p>

        <AddPurchaseModal />

        <div className="space-y-4 mt-8">
          {purchases.map(
            (purchase) => (
              <PurchaseCard
                key={purchase.id}
                purchase={
                  purchase
                }
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
        </div>
      </div>
    </main>
  );
}