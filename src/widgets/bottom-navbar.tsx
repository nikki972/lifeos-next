"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Settings,
  ShoppingBag,
  Wallet,
} from "lucide-react";

const items = [
  {
    href: "/",
    label: "Главная",
    icon: Home,
  },
  {
    href: "/purchases",
    label: "Покупки",
    icon: ShoppingBag,
  },
  {
    href: "/finance",
    label: "Финансы",
    icon: Wallet,
  },
  {
    href: "/settings",
    label: "Еще",
    icon: Settings,
  },
];

export function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Основная навигация"
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)]"
    >
      <div className="mx-auto grid h-16 max-w-[390px] grid-cols-4 rounded-[28px] border border-zinc-800 bg-zinc-950/92 p-1.5 shadow-2xl shadow-black/50 backdrop-blur">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                active
                  ? "page"
                  : undefined
              }
              className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-3xl text-[11px] font-medium transition ${
                active
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Icon
                size={18}
                aria-hidden="true"
              />
              <span className="truncate">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
