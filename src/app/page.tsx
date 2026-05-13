import { AddPurchaseModal } from "@/features/add-purchase/add-purchase-modal";

import { PurchasesList } from "@/widgets/purchases-list";

import { BottomNavbar } from "@/widgets/bottom-navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-4 max-w-xl mx-auto pb-40">
      <div className="mb-8">
        <h1 className="text-5xl font-bold">
          LifeOS
        </h1>

        <p className="text-zinc-400 mt-2">
          Покупки, финансы и цели
        </p>
      </div>

      <div className="space-y-4">
        <AddPurchaseModal />

        <PurchasesList />
      </div>

      <BottomNavbar />
    </main>
  );
}