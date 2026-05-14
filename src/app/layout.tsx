import type { Metadata } from "next";

import "./globals.css";

import { BottomNavbar } from "@/widgets/bottom-navbar";

export const metadata: Metadata = {
  title: "LifeOS",

  description:
    "Личная система покупок и финансов",

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,

    statusBarStyle:
      "black-translucent",

    title: "LifeOS",
  },

  icons: {
    icon: "/icon-192.png",

    apple: "/icon-192.png",
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        {children}

        <BottomNavbar />
      </body>
    </html>
  );
}
