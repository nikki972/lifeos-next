"use client";

import {
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Smartphone,
} from "lucide-react";

import { isSupabaseConfigured } from "@/lib/supabase";
import {
  AuthLoading,
  AuthPanel,
  useAuthUser,
} from "@/features/auth/auth-panel";
import { supabase } from "@/lib/supabase";

const items = [
  {
    title: "iPhone 13 mini",
    description: "Компактный экран, safe-area и PWA",
    icon: Smartphone,
    active: true,
  },
  {
    title: "Supabase",
    description: "Покупки и финансы синхронизируются в базе",
    icon: Database,
    active: isSupabaseConfigured,
  },
  {
    title: "Vercel",
    description: "Готово к продакшен-деплою",
    icon: Cloud,
    active: true,
  },
  {
    title: "GitHub",
    description: "Код хранится в репозитории lifeos-next",
    icon: Code2,
    active: true,
  },
];

export default function SettingsPage() {
  const {
    user,
    loading: authLoading,
  } = useAuthUser();

  if (authLoading) {
    return <AuthLoading />;
  }

  if (!user) {
    return <AuthPanel />;
  }

  return (
    <main className="min-h-screen px-4 pb-32 pt-[calc(env(safe-area-inset-top)+20px)] text-white">
      <div className="mx-auto max-w-[430px]">
        <header className="mb-6">
          <p className="text-sm text-zinc-500">
            LifeOS
          </p>

          <h1 className="text-4xl font-bold tracking-normal">
            Настройки
          </h1>
        </header>

        <section className="rounded-[30px] border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-500/15 text-green-300">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                LifeOS готовится к смартфону
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Интерфейс собран под узкий экран, облачную базу и установку на домашний экран iOS.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 space-y-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="flex items-center gap-3 rounded-3xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black text-zinc-200">
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold">
                    {item.title}
                  </h2>
                  <p className="mt-0.5 text-sm text-zinc-500">
                    {item.description}
                  </p>
                </div>

                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    item.active
                      ? "bg-green-300"
                      : "bg-red-300"
                  }`}
                />
              </article>
            );
          })}
        </section>

        <section className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="font-semibold">
            Аккаунт
          </h2>
          <p className="mt-2 truncate text-sm text-zinc-400">
            {user.email}
          </p>

          <button
            type="button"
            onClick={() =>
              supabase.auth.signOut()
            }
            className="mt-4 w-full rounded-2xl bg-white py-3 font-semibold text-black"
          >
            Выйти
          </button>
        </section>
      </div>
    </main>
  );
}
