import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Oio Lab",
  description: "自信表达，从容生活",
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
