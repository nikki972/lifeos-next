import { PurchasesList } from "@/widgets/purchases-list";

import { AddPurchaseModal } from "@/features/add-purchase/add-purchase-modal";

export default function PurchasesPage() {
  return (
    <main className="min-h-screen bg-black text-white max-w-xl mx-auto p-4 pb-32">
      <h1 className="text-5xl font-bold">
        Покупки
      </h1>

      <p className="text-zinc-400 mt-2 mb-8">
        Планирование покупок
      </p>

      <AddPurchaseModal />

      <div className="mt-6">
        <PurchasesList />
      </div>
    </main>
  );
}