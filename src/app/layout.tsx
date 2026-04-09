import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KIBOU — 防災情報配信プラットフォーム",
  description:
    "信頼性の高い防災情報のみを配信するマスメディア型防災アプリ。デマやノイズを排除し、確実な情報を届けます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="bg-slate-800 text-slate-400 text-center text-[11px] py-4">
          <p>KIBOU 防災情報配信プラットフォーム</p>
          <p className="mt-1">
            本アプリはユーザーからの情報発信機能を持ちません。配信情報は公式情報源に基づいています。
          </p>
        </footer>
      </body>
    </html>
  );
}
