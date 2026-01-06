import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Back To Life | AI Upgrade",
  description: "用 AI 升级你的思维、语言与行动",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={clsx("min-h-screen bg-[#FBFBFA] text-[#1A1A1B] antialiased")}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
