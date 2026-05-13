import { AddPurchaseModal } from "@/features/add-purchase/add-purchase-modal";

import { DashboardStats } from "@/widgets/dashboard-stats";

import { FavoritesSection } from "@/widgets/favorites-section";

import { PlannedSection } from "@/widgets/planned-section";

import { CompletedSection } from "@/widgets/completed-section";

export default function PurchasesPage() {
  return (
    <main className="min-h-screen bg-black text-white max-w-xl mx-auto p-4 pb-40">
      <h1 className="text-5xl font-bold">
        Покупки
      </h1>

      <p className="text-zinc-400 mt-2 mb-8">
        Управление покупками
      </p>

      <DashboardStats />

      <div className="mt-6">
        <AddPurchaseModal />
      </div>

      <div className="mt-10 space-y-10">
        <FavoritesSection />

        <PlannedSection />

        <CompletedSection />
      </div>
    </main>
  );
}