"use client";

import {
  Home,
  Wallet,
  ChartPie,
  Settings,
} from "lucide-react";

export function BottomNavbar() {
  return (
    <div
      className="
        fixed
        bottom-4
        left-1/2
        -translate-x-1/2
        z-50
        w-[95%]
        max-w-md
        bg-zinc-900/90
        backdrop-blur-xl
        border
        border-zinc-800
        rounded-3xl
        px-6
        py-4
        flex
        justify-between
        shadow-2xl
      "
    >
      <button>
        <Home />
      </button>

      <button>
        <Wallet />
      </button>

      <button>
        <ChartPie />
      </button>

      <button>
        <Settings />
      </button>
    </div>
  );
}