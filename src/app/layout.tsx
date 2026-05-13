import type { Metadata } from "next";

import "./globals.css";

import { BottomNavbar } from "@/widgets/bottom-navbar";

export const metadata: Metadata = {
  title: "LifeOS",

  description:
    "Personal Life Management System",

  manifest: "/manifest.json",

  themeColor: "#000000",

  appleWebApp: {
    capable: true,

    statusBarStyle: "black",

    title: "LifeOS",
  },

  icons: {
    icon: "/icon-192.png",

    apple: "/icon-192.png",
  },
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