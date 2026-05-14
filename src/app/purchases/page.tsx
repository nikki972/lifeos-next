"use client";

import { useEffect, useState } from "react";

import { PurchaseCard } from "@/entities/purchase/purchase-card";

import { AddPurchaseModal } from "@/features/add-purchase/add-purchase-modal";

import { Purchase } from "@/types/purchase";

import { supabase } from "@/lib/supabase";

export default function PurchasesPage() {
  const [purchases, setPurchases] =
    useState<Purchase[]>([]);

  const [loading, setLoading] =
    useState(true);

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

    setPurchases(data || []);

    setLoading(false);
  }

  async function addPurchase(
    purchase: Purchase
  ) {
    const { error } =
      await supabase
        .from("purchases")
        .insert(purchase);

    if (error) {
      console.error(error);

      return;
    }

    await loadPurchases();
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

    await loadPurchases();
  }

  async function toggleFavorite(
    id: string,
    current: boolean
  ) {
    const { error } =
      await supabase
        .from("purchases")
        .update({
          is_favorite: !current,
        })
        .eq("id", id);

    if (error) {
      console.error(error);

      return;
    }

    await loadPurchases();
  }

  async function toggleStatus(
    id: string,
    current: string
  ) {
    const nextStatus =
      current === "completed"
        ? "active"
        : "completed";

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

    await loadPurchases();
  }

  useEffect(() => {
    loadPurchases();
  }, []);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Загрузка...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 pb-32">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold mb-2">
          Покупки
        </h1>

        <p className="text-zinc-400 mb-10">
          Cloud synced purchases
        </p>

        <AddPurchaseModal
          onAdd={addPurchase}
        />

        <div className="space-y-4 mt-8">
          {purchases.length === 0 && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center text-zinc-500">
              Пока нет покупок
            </div>
          )}

          {purchases.map((purchase) => (
            <PurchaseCard
              key={purchase.id}
              purchase={purchase}
              onDelete={deletePurchase}
              onToggleFavorite={
                toggleFavorite
              }
              onToggleStatus={
                toggleStatus
              }
            />
          ))}
        </div>
      </div>
    </main>
  );
}