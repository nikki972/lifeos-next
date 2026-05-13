"use client";

import Link from "next/link";

import {
  Home,
  Wallet,
  Clock3,
  Settings,
} from "lucide-react";

export function BottomNavbar() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-zinc-900/90 backdrop-blur border border-zinc-800 rounded-3xl px-6 py-4 flex justify-between items-center z-50">
      <Link href="/">
        <Home className="text-white" />
      </Link>

      <Link href="/purchases">
        <Wallet className="text-white" />
      </Link>

      <Link href="/finance">
        <Clock3 className="text-white" />
      </Link>

      <Link href="/settings">
        <Settings className="text-white" />
      </Link>
    </div>
  );
}