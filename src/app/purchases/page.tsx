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

    const normalized: Purchase[] =
      (data || []).map(
        (item: any) => ({
          id: item.id,

          title: item.title,

          price: Number(
            item.price
          ),

          category:
            item.category,

          priority:
            item.priority,

          status: item.status,

          createdAt:
            item.created_at,

          isFavorite:
            item.is_favorite,
        })
      );

    setPurchases(normalized);

    setLoading(false);
  }

  async function addPurchase(
    purchase: {
      title: string;
      price: number;
      category: string;
      priority: string;
    }
  ) {
    const newPurchase = {
      id: crypto.randomUUID(),

      title: purchase.title,

      price: purchase.price,

      category:
        purchase.category,

      priority:
        purchase.priority,

      status: "planned",

      created_at:
        new Date().toISOString(),

      is_favorite: false,
    };

    const { error } =
      await supabase
        .from("purchases")
        .insert(newPurchase);

    if (error) {
      console.error(error);

      return;
    }

    const normalized: Purchase = {
      id: newPurchase.id,

      title:
        newPurchase.title,

      price:
        newPurchase.price,

      category:
        newPurchase.category as any,

      priority:
        newPurchase.priority as any,

      status:
        newPurchase.status as any,

      createdAt:
        newPurchase.created_at,

      isFavorite:
        newPurchase.is_favorite,
    };

    setPurchases((prev) => [
      normalized,
      ...prev,
    ]);
  }

  async function deletePurchase(
    id: string
  ) {
    const { error } =
      await supabase
        .from("purchases")
        .delete()
        .eq("id", id);

    if (error) {
      console.error(error);

      return;
    }

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
    const { error } =
      await supabase
        .from("purchases")
        .update({
          is_favorite:
            !current,
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

    const { error } =
      await supabase
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
          <p className="text-zinc-400">
            Загрузка...
          </p>
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

        <AddPurchaseModal
          onAdd={addPurchase}
        />

        <div className="space-y-4 mt-8">
          {purchases.length ===
          0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-center text-zinc-500">
              Пока нет покупок
            </div>
          ) : (
            purchases.map(
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
            )
          )}
        </div>
      </div>
    </main>
  );
}