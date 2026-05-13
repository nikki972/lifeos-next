import type { Metadata } from "next";

import "./globals.css";

import { BottomNavbar } from "@/widgets/bottom-navbar";

export const metadata: Metadata = {
  title: "LifeOS",
  description:
    "Покупки, финансы и цели",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="bg-black text-white">
        {children}

        <BottomNavbar />
      </body>
    </html>
  );
}