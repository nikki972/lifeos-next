import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "LifeOS",
  description:
    "Personal finance and wishlist app",

  manifest: "/manifest.json",

  themeColor: "#0a0a0a",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: "LifeOS",
  },

  icons: {
    apple: "/icon-192.png",
    icon: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}