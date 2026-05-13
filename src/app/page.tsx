import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white max-w-xl mx-auto p-4 pb-40">
      <h1 className="text-6xl font-bold">
        LifeOS
      </h1>

      <p className="text-zinc-400 mt-3">
        Личная система управления жизнью
      </p>

      <div className="space-y-5 mt-10">
        <Link href="/purchases">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 active:scale-[0.98] transition">
            <h2 className="text-2xl font-bold">
              Покупки
            </h2>

            <p className="text-zinc-400 mt-2">
              Покупки, wishlist, расходы
            </p>
          </div>
        </Link>

        <Link href="/finance">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 active:scale-[0.98] transition">
            <h2 className="text-2xl font-bold">
              Финансы
            </h2>

            <p className="text-zinc-400 mt-2">
              Доходы, бюджет, аналитика
            </p>
          </div>
        </Link>

        <Link href="/settings">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 active:scale-[0.98] transition">
            <h2 className="text-2xl font-bold">
              Настройки
            </h2>

            <p className="text-zinc-400 mt-2">
              Персонализация приложения
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}