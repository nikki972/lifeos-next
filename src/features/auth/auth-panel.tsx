"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import type { User } from "@supabase/supabase-js";

import {
  isSupabaseConfigured,
  supabase,
} from "@/lib/supabase";

export function useAuthUser() {
  const [user, setUser] =
    useState<User | null>(null);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      void Promise.resolve().then(() =>
        setLoading(false)
      );
      return;
    }

    let mounted = true;

    void supabase.auth
      .getUser()
      .then(({ data }) => {
        if (!mounted) {
          return;
        }

        setUser(data.user);
        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(
          session?.user ?? null
        );
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
  };
}

export function AuthPanel() {
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [mode, setMode] =
    useState<"login" | "signup">(
      "login"
    );
  const [loading, setLoading] =
    useState(false);
  const [message, setMessage] =
    useState("");
  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent
  ) {
    event.preventDefault();

    if (!email.trim()) {
      setError("Введите email.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Пароль должен быть не короче 6 символов."
      );
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword(
            {
              email:
                email.trim(),
              password,
            }
          )
        : await supabase.auth.signUp({
            email: email.trim(),
            password,
          });

    setLoading(false);

    if (result.error) {
      setError(
        result.error.message
      );
      return;
    }

    if (
      mode === "signup" &&
      !result.data.session
    ) {
      setMessage(
        "Проверьте email и подтвердите регистрацию."
      );
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <main className="min-h-screen px-4 pb-32 pt-[calc(env(safe-area-inset-top)+20px)] text-white">
        <div className="mx-auto max-w-[430px] rounded-3xl border border-red-500/30 bg-red-500/10 p-5 text-red-100">
          Supabase не настроен.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 pb-32 pt-[calc(env(safe-area-inset-top)+20px)] text-white">
      <div className="mx-auto max-w-[430px]">
        <header className="mb-6">
          <p className="text-sm text-zinc-500">
            LifeOS
          </p>

          <h1 className="text-4xl font-bold">
            Вход
          </h1>
        </header>

        <form
          onSubmit={handleSubmit}
          className="rounded-[30px] border border-zinc-800 bg-zinc-900 p-5"
        >
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-black p-1">
            <button
              type="button"
              onClick={() =>
                setMode("login")
              }
              className={`min-h-10 rounded-xl text-sm font-medium ${
                mode === "login"
                  ? "bg-white text-black"
                  : "text-zinc-400"
              }`}
            >
              Войти
            </button>

            <button
              type="button"
              onClick={() =>
                setMode("signup")
              }
              className={`min-h-10 rounded-xl text-sm font-medium ${
                mode === "signup"
                  ? "bg-white text-black"
                  : "text-zinc-400"
              }`}
            >
              Создать
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <input
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="Email"
              type="email"
              autoComplete="email"
              className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
            />

            <input
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Пароль"
              type="password"
              autoComplete={
                mode === "login"
                  ? "current-password"
                  : "new-password"
              }
              className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
            />

            {error && (
              <p className="text-sm text-red-300">
                {error}
              </p>
            )}

            {message && (
              <p className="text-sm text-green-300">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-white py-3 font-semibold text-black disabled:opacity-60"
            >
              {loading
                ? "Подождите..."
                : mode === "login"
                  ? "Войти"
                  : "Создать аккаунт"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export function AuthLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 text-white">
      Загрузка...
    </main>
  );
}
