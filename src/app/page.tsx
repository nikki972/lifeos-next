export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white max-w-xl mx-auto p-4">
      <h1 className="text-6xl font-bold">
        LifeOS
      </h1>

      <p className="text-zinc-400 mt-3">
        Личная система управления жизнью
      </p>

      <div className="mt-10 space-y-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
          <h2 className="text-xl font-semibold">
            Покупки
          </h2>

          <p className="text-zinc-400 mt-2">
            Управление покупками и желаниями
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
          <h2 className="text-xl font-semibold">
            Финансы
          </h2>

          <p className="text-zinc-400 mt-2">
            Аналитика расходов и накоплений
          </p>
        </div>
      </div>
    </main>
  );
}