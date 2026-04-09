import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

/** Google Fontsの設定（Geist Sans / Mono） */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** アプリ全体のSEOメタデータ */
export const metadata: Metadata = {
  title: "KIBOU — 防災情報配信プラットフォーム",
  description:
    "信頼性の高い防災情報のみを配信するマスメディア型防災アプリ。デマやノイズを排除し、確実な情報を届けます。",
};

/** ルートレイアウト — ヘッダー・フッターを全ページ共通で描画 */
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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ background: "var(--md-surface)" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <footer
          className="text-center text-xs py-6 mt-8"
          style={{
            background: "var(--md-surface-container)",
            color: "var(--md-on-surface-variant)",
          }}
        >
          <p className="font-medium">KIBOU 防災情報配信プラットフォーム</p>
          <p className="mt-2 leading-relaxed" style={{ color: "var(--md-outline)" }}>
            本アプリはユーザーからの情報発信機能を持ちません。配信情報は公式情報源に基づいています。
          </p>
        </footer>
      </body>
    </html>
  );
}
