import { AddPurchaseModal } from "@/features/add-purchase/add-purchase-modal";

import { DashboardStats } from "@/widgets/dashboard-stats";

import { FavoritesSection } from "@/widgets/favorites-section";

import { PlannedSection } from "@/widgets/planned-section";

import { CompletedSection } from "@/widgets/completed-section";

import { PurchasesFilters } from "@/widgets/purchases-filters";

import { MonthBudget } from "@/widgets/month-budget";

export default function PurchasesPage() {
  return (
    <main className="min-h-screen bg-black text-white max-w-xl mx-auto p-4 pb-40">
      <div className="sticky top-0 z-50 bg-black pt-4 pb-4">
        <h1 className="text-5xl font-bold">
          Покупки
        </h1>

        <p className="text-zinc-400 mt-2">
          Управление покупками
        </p>
      </div>

      <div className="space-y-6">
        <DashboardStats />

        <MonthBudget />

        <PurchasesFilters />

        <AddPurchaseModal />

        <div className="space-y-10">
          <FavoritesSection />

          <PlannedSection />

          <CompletedSection />
        </div>
      </div>
    </main>
  );
}