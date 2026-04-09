import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

/** PWA・モバイル向けのViewport設定 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1565c0" },
    { media: "(prefers-color-scheme: dark)", color: "#111318" },
  ],
  width: "device-width",
  initialScale: 1,
};

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
      className={`${notoSansJP.variable} h-full antialiased`}
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
          <p className="mt-1" style={{ color: "var(--md-outline)" }}>
            緊急時は 110（警察）/ 119（消防・救急）にお電話ください
          </p>
        </footer>
        <ScrollToTop />
      </body>
    </html>
  );
}
